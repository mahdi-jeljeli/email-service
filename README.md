# Email Service

## Description

Ce projet est un service d'envoi d'e-mails qui facilite la gestion et l'envoi d'e-mails depuis votre application. Il permet d'enregistrer les e-mails envoyés et de gérer les statistiques associées. Une middleware API Key a été intégrée pour renforcer la sécurité des requêtes et protéger l'accès aux fonctionnalités critiques.

## Fonctionnalités

- **Envoi d'e-mails :** Envoyez des e-mails à différents destinataires avec des informations personnalisées.
- **Journalisation :** Enregistre les e-mails envoyés pour un suivi et une vérification ultérieurs.
- **Statistiques :** Suivez les statistiques d'envoi d'e-mails, y compris le nombre d'e-mails envoyés et les échecs.
- **Middleware API Key :** Sécurisez les accès avec une clé API.

## Technologies Utilisées

- **NestJS** - Framework pour construire des applications Node.js efficaces.
- **TypeORM** - ORM pour interagir avec les bases de données.
- **NodeMailer** - Bibliothèque pour envoyer des e-mails.
- **Swagger** - Documentation API interactive.
- - **MySQL** - base de données relationnel.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/mahdi-jeljeli/email-service.git
   
2.Accédez au répertoire du projet
   cd email-service
   
3.Installez les dépendances :

     npm install
  
   
4.Configurez votre environnement (voir .env.example pour les variables nécessaires).

     npm run start
  
Accédez à la documentation de l'API via Swagger à l'adresse :

  http://localhost:3000/api
 
API
Envoyer un e-mail
Endpoint : POST /emails/send
Corps de la requête :
  {
  "recipient": "exemple@domain.com",
  "subject": "Objet de l'e-mail",
  "body": "Contenu de l'e-mail",
  "emailType": "type"
}

Obtenir des statistiques
Endpoint : GET /statistics/:projectName



