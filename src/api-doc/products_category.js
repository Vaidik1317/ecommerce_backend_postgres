/**
 * @swagger
 * components:
 *   schemas:
 *     Products categories:
 *        type: object
 *        properties:
 *          u_id:
 *             type: string
 *             description: Unique id for the product category
 *          name:
 *             type: string
 *             description: name of product category
 *        example:
 *          u_id: CATEGORY1234
 *          name: Smart Phone
 */
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category management API
 */
/**
 * @swagger
 * /api/createProductsCategory:
 *   post:
 *     summery: Add a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: name of category

 *     responses:
 *      201:
 *        description: category created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      400:
 *        description:  category already exists.
 *      404:
 *        description: category not found.
 *      500:
 *        description: Something went wrong.
 *
 *
 */

/**
 * @swagger
 * /api/getProductsCategory:
 *   get:
 *     summery: List all product's categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: name of category
 *
 *     responses:
 *      201:
 *        description: Category created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      400:
 *        description:  Category already exists.
 *      404:
 *        description: Category not found.
 *      500:
 *        description: Something went wrong.
 *
 *
 */

/**
 * @swagger
 * /api/updateProductsCategory/{u_id}:
 *   put:
 *     summary: Update a Category's details
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: u_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the blog.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string

 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       400:
 *         description: Invalid input or the blog with this ID does not exist.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Something went wrong.
 */

/**
 * @swagger
 * /api/deleteProductsCategory:
 *   delete:
 *     summery: delete category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     required: true
 *     content:
 *       application/json:

 *     responses:
 *      201:
 *        description: category delete successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'

 *      500:
 *        description: Something went wrong.
 *
 *
 */
