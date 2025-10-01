/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         product_u_id:
 *           type: string
 *           description: Unique identifier for the product (auto-generated).
 *         name:
 *           type: string
 *           description: Name of the product.
 *         description:
 *           type: string
 *           description: Description of the product.
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the product.
 *         quantity:
 *           type: integer
 *           description: Quantity available.
 *         products_category_u_id:
 *           type: string
 *           description: Unique identifier for the product category.
 *       example:
 *         product_u_id: PROD1234
 *         name: iPhone 13
 *         description: Latest Apple iPhone model
 *         price: 999.99
 *         quantity: 10
 *         products_category_u_id: CATEGORY1234
 *     ProductCreate:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - quantity
 *         - products_category_u_id
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the product.
 *         description:
 *           type: string
 *           description: Description of the product.
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the product.
 *         quantity:
 *           type: integer
 *           description: Quantity available.
 *         products_category_u_id:
 *           type: string
 *           description: Unique identifier for the product category.
 *       example:
 *         name: iPhone 13
 *         description: Latest Apple iPhone model
 *         price: 999.99
 *         quantity: 10
 *         products_category_u_id: CATEGORY1234
 */
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */
/**
 * @swagger
 * /api/getProducts:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
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
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Not found
 */
/**
 * @swagger
 * /api/createProducts:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to create product
 */
/**
 * @swagger
 * /api/updateProducts/{product_u_id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: product_u_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to update product
 */
/**
 * @swagger
 * /api/deleteProducts/{product_u_id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: product_u_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Something went wrong
 */
