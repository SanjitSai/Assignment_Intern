require('dotenv').config();

/**
 * Required dependencies
 */
const express = require("express");
const cors = require("cors");
const connectToDatabase = require('./db');
const multer = require("multer");
const bodyParser = require("body-parser");
//const routes = require("./routes");
const registerRoute = require('./routes/register.js');
const loginRoute = require('./routes/login.js');
const verifyRoute = require('./routes/verify.js');
const verifyforgotRoute = require('./routes/verifyForgotPassword.js')
const forgotPasswordRoute = require('./routes/forgotPassword.js');
const resetPasswordRoute = require('./routes/resetPassword.js')
const workExperience = require('./routes/userProfile/workExperience')
const education = require('./routes/userProfile/education');
const skill = require('./routes/userProfile/skills');
const blog = require('./routes/userProfile/blog');
//const image = require('./routes/userProfile/uploadImage')
/**
 * Create an instance of Express app
 */
const app = express();

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/verify', verifyRoute);
app.use('/forgotpassword', forgotPasswordRoute);
app.use('/verifyForgotPassword', verifyforgotRoute);
app.use('/resetpassword', resetPasswordRoute);
app.use('/addwork', workExperience);
app.use("/updatework", workExperience)
app.use("/addeducation", education);
app.use("/updateeducation", education);
app.use("/addskill", skill);
app.use("/deleteskill", skill)
app.use("/displayskills", skill)
app.use("/blogs", blog)
app.use("/deleteblog",blog)
//app.use('/uploadimage',image)
//app.use(routes);

const port = process.env.PORT || 3004;
// Start the server
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

const storage = multer.diskStorage({
  /**
   * Set the destination directory for uploaded files.
   *
   * @param {Object} req - The request object.
   * @param {Object} file - The uploaded file object.
   * @param {Function} cb - The callback function to execute.
   */
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Specify the destination directory for uploaded files
  },
  /**
   * Set the filename for uploaded files.
   *
   * @param {Object} req - The request object.
   * @param {Object} file - The uploaded file object.
   * @param {Function} cb - The callback function to execute.
   */
  filename: (req, file, cb) => {
    cb(null, file.originalname);// Set the filename for uploaded files
  },
});

const upload = multer({ storage: storage });// Create an instance o