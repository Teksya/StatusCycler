import { readFileSync } from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

async function getUserInfo(token) {
    const headers = { 'authorization': token };
    try {
        const response = await fetch("https://discord.com/api/v10/users/@me", { headers });
        if (response.status === 200) {
            const data = await response.json();
            return [data.username, true];
        }
    } catch (error) {
        console.error('Error getting user info:', error);
    }
    return ["Invalid token", false];
}

async function changeStatus(token, message, emojiName, newStatus) {
    const headers = {
        'authorization': token,
        'Content-Type': 'application/json'
    };
    
    const payload = {
        "custom_status": {
            "text": message,
            "emoji_name": emojiName
        }
    };

    if (newStatus) {
        payload.status = newStatus;
    }

    try {
        const response = await fetch('https://discord.com/api/v10/users/@me/settings', {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(payload)
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error changing status:', error);
        return false;
    }
}

function clearConsole() {
    process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
}

async function main() {
    const config = JSON.parse(readFileSync('config.json', 'utf-8'));
    const token = process.env.DISCORD_TOKEN;
    const [username, isValidToken] = await getUserInfo(token);
    
    if (!isValidToken) {
        console.error("Invalid token. Exiting the program.");
        return;
    }

    let sequenceIndex = 0;

    async function updateStatus() {
        try {
            const sequence = config.sequences[sequenceIndex % config.sequences.length];
            const status = config.use_status_sequence ? 
                config.status_sequence[sequenceIndex % config.status_sequence.length] : 
                null;

            console.log(`[${new Date().toLocaleTimeString()}] Updating status...`);
            const success = await changeStatus(
                token,
                sequence.text,
                sequence.emoji,
                status
            );

            if (success) {
                console.log(`Status updated: ${sequence.emoji} ${sequence.text}`);
                sequenceIndex++;
                
                if (config.clear_enabled && sequenceIndex % config.clear_interval === 0) {
                    clearConsole();
                }
            }
        } catch (error) {
            console.error('Error in update cycle:', error);
        }
    }

    // Start the rotation
    console.log(`Logged in as: ${username}`);
    updateStatus();
    setInterval(updateStatus, config.speed_rotator * 1000);
}

process.on('SIGINT', () => {
    console.log('\nStopping status rotator...');
    process.exit();
});

main().catch(console.error);
