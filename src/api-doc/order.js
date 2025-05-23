/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *      type: object
 *      properties:
 *        u_id:
 *          type: string
 *          description: Unique identifier for the order
 *        total_price:
 *          type: integer
 *          description : Total price of all products.
 *        status:
 *          values: ['pending', 'accept', 'reject']
 *          description: status of order.
 *      example:
 *        u_id: ORDER12345
 *        total_price: 1500
 *        status: accept
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management API
 */
/**
 * @swagger
 * /api/getOrder:
 *   get:
 *     summary: List all order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     required: true
 *     content:
 *       application/json:

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
/**
 * @swagger
 * /api/createOrders:
 *   post:
 *     summery: Add a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
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
 *                   type: object
 *                   properties:
 *                     products_u_id:
 *                       type: string
 *                       description: Unique identifier of the product
 *                     price:
 *                       type: integer
 *                       description: Price of the individual product
 *                     quantity:
 *                       type: integer
 *                       description: Quantity of the product ordered
 *               user_u_id:
 *                 type: string
 *                 description: Unique identifier of the user
 *               status:
 *                 type: string
 *                 enum: ["pending", "accept", "reject"]
 *                 description: Status of the order
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
 *
 *
 */
// /**
//  * @swagger
//  * /api/order:
//  *   put:
//  *     summery: update a order
//  *     tags: [Order]
//  *     security:
//  *       - bearerAuth: []
//  *     required: true
//  *     content:
//  *       application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            total_price:
//  *              type: string
//  *              description: Unique identifier for the order
//  *            status:
//  *              values: ['pending', 'accept', 'reject']
//  *              description: status of order.
//  *
//  *     responses:
//  *       200:
//  *         description: Products update successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Admin'
//  *       500:
//  *         description: Something went wrong.
//  *
//  */
/**
 * @swagger
 * /api/deleteOrder:
 *   delete:
 *     summery: delete a order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            total_price:
 *              type: string
 *              description: Unique identifier for the order
 *            status:
 *              values: ['pending', 'accept', 'reject']
 *              description: status of order.
 *
 *
 */

// <ul>
//             ${order.items
//               .map(
//                 (item) =>
//                   `<li>${item.name} - ${item.quantity} x ${item.price}</li>`
//               )
//               .join("")}
//           </ul>
