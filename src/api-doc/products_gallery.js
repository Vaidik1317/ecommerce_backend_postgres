/**
 * @swagger
 * components:
 *   schemas:
 *     ProductsGallery:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the gallery item
 *         products_url:
 *           type: string
 *           description: Path to uploaded image or PDF
 *         products_u_id:
 *           type: string
 *           description: ID of the product this image belongs to
 *       example:
 *         id: 1
 *         products_url: public/upload/PRO-IMG-1234567890.png
 *         products_u_id: PROD123456
 */

/**
 * @swagger
 * tags:
 *   name: Gallery
 *   description: Upload and retrieve product gallery items
 */

/**
 * @swagger
 * /api/createGallery:
 *   post:
 *     summary: Upload product gallery files and associate them with a product
 *     tags: [Gallery]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               products_u_id:
 *                 type: string
 *                 description: Product ID the file belongs to
 *                 example: PROD123456
 *               products_url:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Files uploaded and linked to the product successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *       400:
 *         description: No file uploaded or missing product ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/getGallery:
 *   get:
 *     summary: Retrieve all uploaded product gallery items
 *     tags: [Gallery]
 *     responses:
 *       201:
 *         description: Successfully retrieved gallery
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductsGallery'
 *       500:
 *         description: Server error while fetching gallery
 */
