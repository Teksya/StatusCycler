# StatusCycler

## Description
StatusCycler est un projet permettant de changer automatiquement votre statut sur Discord. Ce projet utilise un script pour récupérer le token utilisateur et interagir avec l'API de Discord.

## Instructions

### Récupération du Token Discord
1. Connectez-vous à votre compte Discord via [discord.com/app](https://discord.com/app).
2. Ouvrez les outils de développement (raccourci : **Ctrl + Shift + I**).
3. Exécutez le script suivant dans la console pour récupérer votre token utilisateur :

```javascript
webpackChunkdiscord_app.push(
    [[""]],
    {},
    (e) => {
        for (let t in ((m = []), e.c)) m.push(e.c[t]);
    }
);
m.find((e) => e?.exports?.default?.getToken !== void 0).exports.default.getToken();
```

4. Copiez le token affiché dans la console.

### Utilisation
1. Clonez ce dépôt sur votre machine locale.
2. Configurez le script avec votre token Discord.
3. Lancez le script pour commencer à cycler votre statut.

## Avertissement
L'utilisation de ce script peut enfreindre les conditions d'utilisation de Discord. Utilisez-le à vos propres risques. Nous ne sommes pas responsables des éventuelles sanctions appliquées à votre compte.

## Contributions
Les contributions sont les bienvenues ! N'hésitez pas à soumettre des pull requests ou à signaler des problèmes.

## Licence
Ce projet est sous licence MIT. Consultez le fichier `LICENSE` pour plus d'informations.  