/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         u_id:
 *           type: string
 *           description: Unique identifier for the order
 *         user_u_id:
 *           type: string
 *           description: Unique identifier for the user
 *         total_price:
 *           type: number
 *           format: float
 *           description: Total price of all products
 *         status:
 *           type: string
 *           enum: ['pending', 'accept', 'reject']
 *           description: Status of the order
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the order
 *       example:
 *         u_id: ORDER12345
 *         user_u_id: USER1234
 *         total_price: 1500.00
 *         status: pending
 *         date: 2023/10/01
 *     OrderItem:
 *       type: object
 *       properties:
 *         products_u_id:
 *           type: string
 *           description: Unique identifier of the product
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the individual product
 *         quantity:
 *           type: integer
 *           description: Quantity of the product ordered
 *         order_u_id:
 *           type: string
 *           description: Unique identifier of the order
 *       example:
 *         products_u_id: PROD1234
 *         price: 999.99
 *         quantity: 1
 *         order_u_id: ORDER12345
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */
/**
 * @swagger
 * /api/getOrder:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
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
 *                     type: object
 *                     properties:
 *                       u_id:
 *                         type: string
 *                       user_u_id:
 *                         type: string
 *                       total_price:
 *                         type: number
 *                       status:
 *                         type: string
 *                       date:
 *                         type: string
 *                       items:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/OrderItem'
 *                       user:
 *                         type: object
 *                         properties:
 *                           u_id:
 *                             type: string
 *                           email:
 *                             type: string
 *                           name:
 *                             type: string
 *       500:
 *         description: Not found
 */
/**
 * @swagger
 * /api/createOrders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_item:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/OrderItem'
 *               user_u_id:
 *                 type: string
 *                 description: Unique identifier of the user
 *               status:
 *                 type: string
 *                 enum: ["pending", "accept", "reject"]
 *                 description: Status of the order
 *             example:
 *               order_item:
 *                 - products_u_id: PROD1234
 *                   price: 999.99
 *                   quantity: 1
 *               user_u_id: USER1234
 *               status: pending
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Product not found or insufficient quantity
 *       500:
 *         description: Failed to create new order
 */
/**
 * @swagger
 * /api/deleteOrder:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: order_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Something went wrong
 */
/**
 * @swagger
 * /api/invoicePdf:
 *   get:
 *     summary: Generate invoice PDF
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: PDF generated successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Order not found
 *       500:
 *         description: Error in generating PDF
 */
