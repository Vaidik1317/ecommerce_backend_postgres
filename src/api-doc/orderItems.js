// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Order items:
//  *       type: object
//  *       properties:
//  *         u_id:
//  *           type: string
//  *           description: Unique id for the order items
//  *         price:
//  *            type: integer
//  *            description: price for individual product
//  *         quantity:
//  *            type: integer
//  *            description: quantity for individual product
//  *       example:
//  *         u_id: ORDERITEM12334
//  *         price: 500
//  *         quantity: 3
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: Order Items
//  *   description: Order Item management API
//  */

// /**
//  * @swagger
//  * /api/Order_Items:
//  *   post:
//  *     summery: Add a new Order Items
//  *     tags: [Order Items]
//  *     security:
//  *       - bearerAuth: []
//  *     required: true
//  *     content:
//  *       application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *            price:
//  *               type: integer
//  *               description: price for individual product
//  *            quantity:
//  *               type: integer
//  *               description: quantity for individual product

//  *     responses:
//  *      201:
//  *        description: Order Items created successfully.
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#/components/schemas/Admin'

//  *      500:
//  *        description: Something went wrong.
//  *
//  *
//  */

// /**
//  * @swagger
//  * /api/Order Items:
//  *   get:
//  *     summery: List all Order Items
//  *     tags: [Order Items]
//  *     security:
//  *       - bearerAuth: []
//  *     required: true
//  *     content:
//  *       application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *         price:
//  *            type: integer
//  *            description: price for individual product
//  *         quantity:
//  *            type: integer
//  *            description: quantity for individual product
//  *
//  *     responses:
//  *      201:
//  *        description: Category created successfully.
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#/components/schemas/Admin'
//  *      400:
//  *        description:  Order Items already exists.
//  *      404:
//  *        description: Order Items not found.
//  *      500:
//  *        description: Something went wrong.
//  *
//  *
//  */

// /**
//  * @swagger
//  * /api/Order Items:
//  *   put:
//  *     summery: update a Order Items
//  *     tags: [Order Items]
//  *     security:
//  *       - bearerAuth: []
//  *     required: true
//  *     content:
//  *       application/json:
//  *         schema:
//  *          type: object
//  *          properties:
//  *         price:
//  *            type: integer
//  *            description: price for individual product
//  *         quantity:
//  *            type: integer
//  *            description: quantity for individual product

//  *     responses:
//  *      201:
//  *        description: Order Items update successfully.
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#/components/schemas/Admin'
//  *      500:
//  *        description: Something went wrong.
//  *
//  *
//  */

// /**
//  * @swagger
//  * /api/Order Items:
//  *   delete:
//  *     summery: delete Order Items
//  *     tags: [Order Items]
//  *     security:
//  *       - bearerAuth: []
//  *     required: true
//  *     content:
//  *       application/json:

//  *     responses:
//  *      201:
//  *        description: Order Items delete successfully.
//  *        content:
//  *          application/json:
//  *            schema:
//  *              $ref: '#/components/schemas/Admin'

//  *      500:
//  *        description: Something went wrong.
//  *
//  *
//  */
