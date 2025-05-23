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
/**
 * @swagger
 * /api/getUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
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
 *       500:
 *         description: Not found
 */

/**
 * @swagger
 * /api/createUsers:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               pincode:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Failed to create new user
 */

/**
 * @swagger
 * /api/updateUsers/{u_id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: u_id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               pincode:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       201:
 *         description: User updated successfully
 *       500:
 *         description: Failed to update user
 */

/**
 * @swagger
 * /api/deleteUsers/{u_id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: u_id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       201:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Something went wrong
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *       404:
 *         description: Invalid email or password
 *       500:
 *         description: Error logging in
 */

/**
 * @swagger
 * /api/exportUser:
 *   get:
 *     summary: Export users to Excel
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Excel file download
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Error in export user
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
