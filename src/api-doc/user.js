/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         u_id:
 *           type: string
 *           description: Unique identifier for the user (auto-generated).
 *         name:
 *           type: string
 *           description: Name of the user.
 *         email:
 *           type: string
 *           description: Email of the user.
 *         password:
 *           type: string
 *           description: Hashed password of the user.
 *         address:
 *           type: string
 *           description: Address of the user.
 *         city:
 *           type: string
 *           description: City name of user's address.
 *         state:
 *           type: string
 *           description: State name of user's address.
 *         country:
 *           type: string
 *           description: Country of user's address.
 *         pincode:
 *           type: string
 *           description: Pincode of user's address.
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: Gender of the user.
 *       example:
 *         u_id: USER1234
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: "hashedpassword"
 *         address: 123 Example Lane
 *         city: Anand
 *         state: Gujarat
 *         country: India
 *         pincode: "380001"
 *         gender: male
 *     UserCreate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user.
 *         email:
 *           type: string
 *           description: Email of the user.
 *         password:
 *           type: string
 *           description: Password of the user (will be hashed).
 *         address:
 *           type: string
 *           description: Address of the user.
 *         city:
 *           type: string
 *           description: City name of user's address.
 *         state:
 *           type: string
 *           description: State name of user's address.
 *         country:
 *           type: string
 *           description: Country of user's address.
 *         pincode:
 *           type: string
 *           description: Pincode of user's address.
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: Gender of the user.
 *       example:
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: "password123"
 *         address: 123 Example Lane
 *         city: Anand
 *         state: Gujarat
 *         country: India
 *         pincode: "380001"
 *         gender: male
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: users management API
 */
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
 *                     $ref: '#/components/schemas/User'
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
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Failed to create user
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
 *                     type: integer
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
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
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
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
