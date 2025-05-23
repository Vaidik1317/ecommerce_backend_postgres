/**
 * @swagger
 * components:
 *   schemas:
 *     Products Gallery:
 *        type: object
 *        properties:
 *          u_id:
 *             type: string
 *             description: Unique id for the product category
 *          images,video:
 *             type: string
 *             description: name of product category
 *        example:
 *          u_id: CATEGORY1234
 *          name: Smart Phone
 */
/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: Gallery management API
 */

/**
 * @swagger
 * /api/createGallery:
 *   post:
 *     summery: Add a new category
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            products_url:
 *              type: string
 *              description: images and videos for products

 *     responses:
 *      201:
 *        description: gallery created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      500:
 *        description: Something went wrong.
 *
 *
 */

/**
 * @swagger
 * /api/getGallery:
 *   get:
 *     summery: List all product's galleries
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            products_url:
 *              type: string
 *              description: name of gallery
 *
 *     responses:
 *      201:
 *        description: gallery created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      500:
 *        description: Something went wrong.
 *
 *
 */

/**
 * @swagger
 * /api/Gallery:
 *   put:
 *     summery: update a category
 *     tags: [Gallery]
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
 *                description: name of gallery

 *     responses:
 *      201:
 *        description: gallery update successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      500:
 *        description: Something went wrong.
 *
 *
 */

/**
 * @swagger
 * /api/Gallery:
 *   delete:
 *     summery: delete category
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     required: true
 *     content:
 *       application/json:

 *     responses:
 *      201:
 *        description: gallery delete successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'

 *      500:
 *        description: Something went wrong.
 *
 *
 */
