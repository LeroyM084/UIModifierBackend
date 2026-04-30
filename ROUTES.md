# API Routes

Base URL: `/api`

Cette API suit une architecture MVC simple.
- `routes` expose les endpoints HTTP
- `controllers` lisent la requête et renvoient la réponse
- `services` portent la logique métier
- `repositories` parlent à PostgreSQL

## Health

### `GET /api/health`
Vérifie que le serveur répond.

Réponse:
```json
{
  "status": "ok",
  "timestamp": "2026-04-30T10:00:00.000Z"
}
```

---

## Users

### `POST /api/users`
Crée un utilisateur.

Body:
```json
{
  "username": "alice",
  "email": "alice@mail.com",
  "password": "secret"
}
```

Réponse `201`:
```json
{
  "id": 1,
  "username": "alice",
  "email": "alice@mail.com",
  "password": "secret",
  "createdAt": "2026-04-30T10:00:00.000Z"
}
```

Erreurs possibles:
- `409` si l'email existe déjà

### `POST /api/users/login`
Connecte un utilisateur.

Body:
```json
{
  "email": "alice@mail.com",
  "password": "secret"
}
```

Réponse `200`:
```json
{
  "id": 1,
  "username": "alice",
  "email": "alice@mail.com",
  "password": "secret",
  "createdAt": "2026-04-30T10:00:00.000Z"
}
```

Erreurs possibles:
- `401` si les identifiants sont invalides

---

## Schemas

Un "schéma" correspond à une ligne de `stylesheets` dans la base.

### Structure retournée
```json
{
  "id": 10,
  "userId": 1,
  "name": "default",
  "cssContent": "body { color: red; }",
  "isActive": true,
  "createdAt": "2026-04-30T10:00:00.000Z",
  "updatedAt": null
}
```

Le schéma peut aussi être enrichi avec ses targets:
```json
{
  "id": 10,
  "userId": 1,
  "name": "default",
  "cssContent": "body { color: red; }",
  "isActive": true,
  "createdAt": "2026-04-30T10:00:00.000Z",
  "updatedAt": null,
  "targets": [
    {
      "id": 5,
      "stylesheetId": 10,
      "urlPattern": "https://example.com/*"
    }
  ]
}
```

### `POST /api/schemas`
Enregistre un schéma.

Body:
```json
{
  "userId": 1,
  "name": "default",
  "cssContent": "body { color: red; }",
  "urlPatterns": ["https://example.com/*", "https://app.example.com/*"]
}
```

Réponse `201`:
```json
{
  "id": 10,
  "userId": 1,
  "name": "default",
  "cssContent": "body { color: red; }",
  "isActive": true,
  "createdAt": "2026-04-30T10:00:00.000Z",
  "updatedAt": null
}
```

Notes:
- `urlPatterns` sert à créer les entrées de `targets`
- si `urlPatterns` est vide, le schéma est quand même enregistré

### `GET /api/schemas/:userId`
Retourne tous les schémas d'un user, pour afficher une liste.

Exemple:
`GET /api/schemas/1`

Réponse `200`:
```json
[
  {
    "id": 10,
    "userId": 1,
    "name": "default",
    "cssContent": "body { color: red; }",
    "isActive": true,
    "createdAt": "2026-04-30T10:00:00.000Z",
    "updatedAt": null
  }
]
```

### `GET /api/schemas/:userId/:name`
Vérifie si un schéma existe pour un user et le renvoie.

Exemple:
`GET /api/schemas/1/default`

Réponse `200`:
```json
{
  "id": 10,
  "userId": 1,
  "name": "default",
  "cssContent": "body { color: red; }",
  "isActive": true,
  "createdAt": "2026-04-30T10:00:00.000Z",
  "updatedAt": null,
  "targets": [
    {
      "id": 5,
      "stylesheetId": 10,
      "urlPattern": "https://example.com/*"
    }
  ]
}
```

Erreurs possibles:
- `404` si aucun schéma ne correspond

### `PATCH /api/schemas/:id`
Modifie un schéma existant.

Exemple:
`PATCH /api/schemas/10`

Body:
```json
{
  "name": "default-v2",
  "cssContent": "body { color: blue; }",
  "isActive": true,
  "urlPatterns": ["https://example.com/*"]
}
```

Réponse `200`:
```json
{
  "id": 10,
  "userId": 1,
  "name": "default-v2",
  "cssContent": "body { color: blue; }",
  "isActive": true,
  "createdAt": "2026-04-30T10:00:00.000Z",
  "updatedAt": "2026-04-30T10:05:00.000Z",
  "targets": [
    {
      "id": 5,
      "stylesheetId": 10,
      "urlPattern": "https://example.com/*"
    }
  ],
  "requestedUrlPatterns": [
    "https://example.com/*"
  ]
}
```

Notes:
- aujourd'hui, `PATCH` met à jour `stylesheets`
- les `urlPatterns` reçus sont renvoyés dans `requestedUrlPatterns`, mais la mise à jour des `targets` n'est pas encore synchronisée

---

## Codes d'erreur génériques

- `400` payload invalide ou champ manquant
- `401` identifiants invalides
- `404` ressource introuvable
- `409` conflit, par exemple utilisateur déjà existant
- `500` erreur serveur

---

## Contrat côté front

Points importants pour l'intégration:
- tous les endpoints sont sous `/api`
- les IDs sont numériques
- les dates sont renvoyées en ISO 8601
- les champs JSON utilisent le camelCase
- `userId` relie un schéma à un utilisateur
- `urlPatterns` est un tableau de chaînes

