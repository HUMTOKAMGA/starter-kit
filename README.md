# Starter Kit Monorepo

Ce projet est un starter kit monorepo utilisant Angular 18 pour le frontend, Node.js pour le backend, et MongoDB pour la base de données. Il utilise @ts-rest pour la validation des schémas et la génération automatique de la documentation Swagger.

## Prérequis

- Docker
- Docker Compose
- Node.js 20.x (pour le développement local)

## Structure du Projet

```
.
├── frontend/          # Application Angular
├── backend/          # API Node.js
├── docker-compose.yml
└── README.md
```

## Démarrage du Projet

Pour démarrer l'ensemble du projet, exécutez la commande suivante à la racine du projet :

```bash
docker-compose up --build
```

Cette commande va :

1. Construire les images Docker pour le frontend et le backend
2. Démarrer les containers pour :
   - Frontend Angular (accessible sur http://localhost:4200)
   - Backend Node.js (accessible sur http://localhost:3000)
   - MongoDB (accessible sur mongodb://localhost:27017)

## Documentation API

La documentation Swagger de l'API est accessible à l'adresse :
http://localhost:3000/api/docs

## Développement

### Frontend (Angular)

Le frontend est configuré avec :

- Angular 18
- @ts-rest pour la validation des schémas
- Hot-reload activé

### Backend (Node.js)

Le backend est configuré avec :

- Express.js
- TypeScript
- MongoDB avec Mongoose
- @ts-rest pour la validation des schémas et la génération de la documentation Swagger
- Hot-reload activé

## Arrêt du Projet

Pour arrêter tous les containers :

```bash
docker-compose down
```

## Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request
