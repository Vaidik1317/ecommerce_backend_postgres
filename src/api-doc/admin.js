/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         u_id:
 *           type: string
 *           description: Unique identifier for the admin.
 *         name:
 *           type: string
 *           description: Name of the admin.
 *         mobile:
 *           type: string
 *           description: Mobile number of the admin.
 *         email:
 *           type: string
 *           description: Email of the admin.
 *         password:
 *           type: string
 *           description: Hashed password of the admin.
 *         role_u_id:
 *           type: string
 *           description: Role identifier associated with the admin.
 *       example:
 *         u_id: ADMIN12345
 *         name: John Doe
 *         mobile: "1234567890"
 *         email: johndoe@example.com
 *         password: "$2b$10$hashedPasswordExample"
 *         role_u_id: ROLE12345
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management API
 */
/**
 * @swagger
 * /api/admin:
 *   post:
 *     summary: Add a admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name of admin
 *               mobile:
 *                 type: string
 *                 description: Mobile number of the admin.
 *               email:
 *                 type: string
 *                 description: Email of the admin.
 *               password:
 *                 type: string
 *                 description: Password for the admin.
 *     responses:
 *      201:
 *        description: Admin created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      400:
 *        description:  Email already exists.
 *      404:
 *        description: Admin not found.
 *      500:
 *        description: Something went wrong.
 */

/**
 * @swagger
 * /api/getAdmin:
 *   get:
 *     summary: List all admins
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve.
 *       - in: query
 *         name: items_per_page
 *         schema:
 *           type: integer
 *         description: The number of items per page.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: The search .
 *     responses:
 *       200:
 *         description: Admins retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Something went wrong.
 */
