/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         u_id:
 *           type: uuid
 *           description: Unique identifier for the user.
 *         name:
 *           type: string
 *           description: Name of the user.
 *         mobile:
 *           type: string
 *           description: Mobile number of the user.
 *         email:
 *           type: string
 *           description: Email of the users.
 *         password:
 *           type: string
 *           description: Hashed password of the user.
 *         address:
 *            type: string
 *            description: Address of user
 *         city:
 *            type: string
 *            description: city name of user's address
 *         state:
 *             type: string
 *             description: state name of user's address
 *         country:
 *              type: string
 *              description: country of user's address
 *         pincode:
 *              type: string
 *              description: pincode of user's address
 *         gender:
 *              type: enum
 *              description: please select your
 *
 *
 *       example:
 *         u_id: users12345
 *         name: John Doe
 *         mobile: "1234567890"
 *         email: johndoe@example.com
 *         password: "$2b$10$hashedPasswordExample"
 *         address: somewhere in Anand
 *         city: anand
 *         state: gujarat
 *         country: india
 *         picode: 380001
 *         gender: male
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: users management API
 */
/**
 * @swagger
 * /api/getUsers:
 *   get:
 *     summary: List all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name:
 *           schema:
 *             type: string
 *             description: name of users
 *         mobile:
 *           schema: 
 *             type: string
 *             description: Mobile number of the user.
 *         email:
 *           schema:
 *             type: string
 *             description: Email of the users.
 *         password:
 *           schema:
 *             type: string
 *             description: Hashed password of the user.
 *         address:
 *            schema:
 *              type: string
 *              description: Address of user
 *         city:
 *            schema:
 *              type: string
 *              description: city name of user's address
 *         state:
 *             schema:
 *               type: string
 *               description: state name of user's address
 *         country:
 *               schema:
 *                  type: string
 *                  description: country of user's address
 *         pincode:
 *              schema:
 *                type: string
 *                description: pincode of user's address
 *         gender:
 *              schema:
 *                type: enum
 *                description: please select your
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
 * /api/createUsers:
 *   post:
 *     summary: create a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name:
 *           schema:
 *             type: string
 *             description: name of users
 *         mobile:
 *           schema:
 *             type: string
 *             description: Mobile number of the user.
 *         email:
 *           schema:
 *             type: string
 *             description: Email of the users.
 *         password:
 *           schema:
 *             type: string
 *             description: Hashed password of the user.
 *         address:
 *            schema:
 *              type: string
 *              description: Address of user
 *         city:
 *            schema:
 *              type: string
 *              description: city name of user's address
 *         state:
 *             schema:
 *               type: string
 *               description: state name of user's address
 *         country:
 *               schema:
 *                  type: string
 *                  description: country of user's address
 *         pincode:
 *              schema:
 *                type: string
 *                description: pincode of user's address
 *         gender:
 *              schema:
 *                type: enum
 *                description: please select your
 *
 *     responses:
 *      201:
 *        description: user created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      400:
 *        description:  user already exists.
 *      404:
 *        description: user not found.
 *      500:
 *        description: Something went wrong.
 *
 *
 */

/**
 * @swagger
 * /api/updateUsers:
 *   put:
 *     summary: update a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name:
 *           schema:
 *             type: string
 *             description: name of users
 *         mobile:
 *           schema:
 *             type: string
 *             description: Mobile number of the user.
 *         email:
 *           schema:
 *             type: string
 *             description: Email of the users.
 *         password:
 *           schema:
 *             type: string
 *             description: Hashed password of the user.
 *         address:
 *            schema:
 *              type: string
 *              description: Address of user
 *         city:
 *            schema:
 *              type: string
 *              description: city name of user's address
 *         state:
 *             schema:
 *               type: string
 *               description: state name of user's address
 *         country:
 *               schema:
 *                  type: string
 *                  description: country of user's address
 *         pincode:
 *              schema:
 *                type: string
 *                description: pincode of user's address
 *         gender:
 *              schema:
 *                type: enum
 *                description: please select your
 *
 *     responses:
 *      201:
 *        description: Admin created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      400:
 *        description:  user already exists.
 *      404:
 *        description: user not found.
 *      500:
 *        description: Something went wrong.
 *
 *
 */

/**
 * @swagger
 * /api/deleteUsers:
 *   delete:
 *     summary: delete a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name:
 *           schema:
 *             type: string
 *             description: name of users
 *         mobile:
 *           schema:
 *             type: string
 *             description: Mobile number of the user.
 *         email:
 *           schema:
 *             type: string
 *             description: Email of the users.
 *         password:
 *           schema:
 *             type: string
 *             description: Hashed password of the user.
 *         address:
 *            schema:
 *              type: string
 *              description: Address of user
 *         city:
 *            schema:
 *              type: string
 *              description: city name of user's address
 *         state:
 *             schema:
 *               type: string
 *               description: state name of user's address
 *         country:
 *               schema:
 *                  type: string
 *                  description: country of user's address
 *         pincode:
 *              schema:
 *                type: string
 *                description: pincode of user's address
 *         gender:
 *              schema:
 *                type: enum
 *                description: please select your
 *
 *     responses:
 *      201:
 *        description: Admin created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      400:
 *        description:  user already exists.
 *      404:
 *        description: user not found.
 *      500:
 *        description: Something went wrong.
 *
 *
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: create a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         email:
 *           schema:
 *             type: string
 *             description: Email of the users.
 *         password:
 *           schema:
 *             type: string
 *             description: Hashed password of the user.
 *
 *     responses:
 *      201:
 *        description: user created successfully.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      400:
 *        description:  user already exists.
 *      404:
 *        description: user not found.
 *      500:
 *        description: Something went wrong.
 *
 *
 */

/**
 * @swagger
 * /api/exportUser:
 *   get:
 *     summary: Download Excel file of all register user
 *     tags: [User]
 *     security:
 *        - bearerAuth: []
 *     required: true
 *     content:
 *       application/json:
 *
 *     responses:
 *       200:
 *         description: File Downloaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *     500:
 *         description: Something went wrong.
 */

// const invoicePdf = async (req, res) => {
//     try {
//       const doc = new PDFDocument();

//
//       const filePath = '../uploads/invoice.pdf';
//       doc.pipe(fs.createWriteStream(filePath));

//       doc.fontSize(27).text('This is the article for GeeksforGeeks', 100, 100);

//       doc.addPage().fontSize(15).text('Generating PDF with the help of pdfkit', 100, 100);

//       doc.end();

//       console.log('PDF created successfully');
//     } catch (error) {
//       console.error('Error in PDF creation:', error);
//     }
//   };
