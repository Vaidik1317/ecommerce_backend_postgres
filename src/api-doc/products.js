/**
 * @swagger
 * components:
 *    schemas:
 *      Products:
 *         type: object
 *         properties:
 *           u_id:
 *              type: string
 *              description: Unique id for the Product
 *           name:
 *              type: string
 *              description: Name of product
 *           description:
 *              type: string
 *              description: Description of product
 *           price:
 *              type: integer
 *              description: price of product
 *           quantity:
 *              type: integer
 *              description: quantity of product
 *         example:
 *           u_id: PRODUCT12345
 *           name: samsung A22
 *           description: smart phone
 *           price: 15000
 *           quantity: 1
 */
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Products management API
 */

/**
 * @swagger
 * /api/getProducts:
 *   get:
 *     summary: List all users
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name:
 *             type: string
 *             description: name of users
 *         description:

 *              type: string
 *              description: Description of product
 *         price:
 
 *            type: integer
 *            description: price of product
 *         quantity:

 *            type: integer
 *            description: quantity of product
 *
 *     responses:
 *       200:
 *         description: Users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Something went wrong.
 */

/**
 * @swagger
 * /api/createProducts:
 *   post:
 *     summary: create a new product
 *     tags: [Product]
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
 *                   type: string
 *                   description: name of users
 *               description:
 *                    type: string
 *                    description: Description of product
 *               price:
 *                  type: integer
 *                  description: price of product
 *               quantity:
 *                  type: integer
 *                  description: quantity of product
 *
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Something went wrong.
 */
/**
 * @swagger
 * /api/updateProducts:
 *   put:
 *     summary: update a product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name:
 *             type: string
 *             description: name of users
 *         description:

 *              type: string
 *              description: Description of product
 *         price:
 
 *            type: integer
 *            description: price of product
 *         quantity:

 *            type: integer
 *            description: quantity of product
 *
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Something went wrong.
 */
/**
 * @swagger
 * /api/deleteProducts:
 *   delete:
 *     summary: delete products
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []

 *
 *     responses:
 *       200:
 *         description: Products deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Something went wrong.
 */
