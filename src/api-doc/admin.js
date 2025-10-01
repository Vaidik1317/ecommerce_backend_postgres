/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         u_id:
 *           type: string
 *           description: Unique identifier for the admin (auto-generated).
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
 *     AdminCreate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
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
 *           description: Password of the admin (will be hashed).
 *         role_u_id:
 *           type: string
 *           description: Role identifier associated with the admin.
 *       example:
 *         name: John Doe
 *         mobile: "1234567890"
 *         email: johndoe@example.com
 *         password: "password123"
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
 * /api/createAdmin:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *      201:
 *        description: Admin created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                data:
 *                  $ref: '#/components/schemas/Admin'
 *      500:
 *        description: Something went wrong.
 */

/**
 * @swagger
 * /api/getAdmin:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admins retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Not found.
 */

/**
 * @swagger
 * /api/updateAdmin/{u_id}:
 *   put:
 *     summary: Update an existing admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: u_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Admin updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Admin not found.
 *       500:
 *         description: Failed to update product.
 */
