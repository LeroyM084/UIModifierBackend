import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";
import {
  getSchema,
  listSchemasByUser,
  saveSchema,
  updateSchema,
  deleteSchema,
} from "../controllers/stylesheet.controller.js";
import { loginUser, registerUser, refreshToken, logoutUser } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

export const apiRouter = Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Vérifier la santé du serveur
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Le serveur est en bonne santé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Health'
 */
apiRouter.get("/health", getHealth);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Payload invalide ou champ manquant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email déjà existant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
apiRouter.post("/users", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connecter un utilisateur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Payload invalide ou champ manquant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Identifiants invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
apiRouter.post("/users/login", loginUser);

/**
 * @swagger
 * /api/users/refresh:
 *   post:
 *     summary: Renouveler le token d'accès
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token renouvelé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Token invalide ou expiré
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
apiRouter.post("/users/refresh", refreshToken);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Se déconnecter
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
apiRouter.post("/users/logout", logoutUser);

/**
 * @swagger
 * /api/schemas:
 *   post:
 *     summary: Créer un nouveau schéma de stylesheet
 *     tags:
 *       - Stylesheets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - name
 *               - cssContent
 *             properties:
 *               userId:
 *                 type: number
 *               name:
 *                 type: string
 *               cssContent:
 *                 type: string
 *               urlPatterns:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Schéma créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stylesheet'
 *       400:
 *         description: Payload invalide ou champ manquant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
apiRouter.post("/schemas", auth, saveSchema);

/**
 * @swagger
 * /api/schemas:
 *   get:
 *     summary: Récupérer tous les schémas de l'utilisateur connecté
 *     tags:
 *       - Stylesheets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des schémas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stylesheet'
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
apiRouter.get("/schemas", auth, listSchemasByUser);

/**
 * @swagger
 * /api/schemas/{name}:
 *   get:
 *     summary: Récupérer un schéma spécifique par nom
 *     tags:
 *       - Stylesheets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom du schéma
 *     responses:
 *       200:
 *         description: Schéma trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stylesheet'
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Schéma non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
apiRouter.get("/schemas/:name", auth, getSchema);

/**
 * @swagger
 * /api/schemas/{id}:
 *   patch:
 *     summary: Mettre à jour un schéma existant
 *     tags:
 *       - Stylesheets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID du schéma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cssContent:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               urlPatterns:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Schéma mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stylesheet'
 *       400:
 *         description: Payload invalide ou champ manquant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Schéma non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
apiRouter.patch("/schemas/:id", auth, updateSchema);

/**
 * @swagger
 * /api/schemas/{id}:
 *   delete:
 *     summary: Supprimer un schéma
 *     tags:
 *       - Stylesheets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID du schéma
 *     responses:
 *       200:
 *         description: Schéma supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Non autorisé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Schéma non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
apiRouter.delete("/schemas/:id", auth, deleteSchema);
