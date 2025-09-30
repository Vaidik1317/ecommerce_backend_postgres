/**
 * @swagger
 * components:
 *   schemas:
 *     ProductCategory:
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
 *     summary: Add a new category
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
 *        description: Category created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProductCategory'
 *      500:
 *        description: Failed to create new product.
 *
 *
 */

/**
 * @swagger
 * /api/getProductsCategory:
 *   get:
 *     summary: List all product's categories
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Categories retrieved successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/ProductCategory'
 *      500:
 *        description: Not found.
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
 *         description: Unique identifier for the category.
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductCategory'
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Failed to update product.
 */

/**
 * @swagger
 * /api/deleteProductsCategory/{u_id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: u_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the category.
 *     responses:
 *      200:
 *        description: Category deleted successfully.
 *      404:
 *        description: Category not found.
 *      500:
 *        description: Something went wrong.
 *
 *
 */
