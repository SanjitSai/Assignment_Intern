const express = require('express');
const router = express.Router();
const { User, userService } = require("../../userService");
const multer = require("multer");


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

const upload = multer({ storage: storage });// Create an instance of the multer middleware with the specified storage configuration

/**
 * Handle the PUT request to "/uploadimage" route with multer middleware.
 * Uploads an image file to the server.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.put(
    "/",
    upload.single("testImage"),
    async (req, res) => {
        /**
         * Create a new instance of imageModel with the provided data.
         *
         * @param {string} name - The name associated with the uploaded image.
         * @param {Object} img - The image object containing file data and content type.
         */
        try {
            const saveImage = User({
                imgName: req.body.name,// Extract the name from the request body
                img: {
                    data: fs.readFileSync("../uploads/car.png"),// Read and store the image file data
                    contentType: "image/png",// Set the content type of the image
                },
            });

            saveImage
                .save()
                .then((result) => {
                    console.log("Image is saved to the database");
                })
                .catch((err) => {
                    console.log("Error occurred while saving image:", err);
                });

            res.send('Image is saved');
        }
        catch (error) {
            console.error('Error while uploading image')

        }
    }
);

/**
 * Handle the GET request to "/image" route.
 * Retrieves all image data from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.get('/image', async (req, res) => {
    const allData = await imageModel.find();// Retrieve all image data from the database
    res.json(allData);// Send the retrieved data as a JSON response
});

// app.listen(port, () => {
//     console.log("Server is running on port", port);
// });

// const fs = require('fs');

// // Read the image file as binary data
// const imageData = fs.readFileSync('C:\Users\Sanjit Kolla\OneDrive\Desktop\images');

// // Convert binary data to base64 encoding
// const base64Image = imageData.toString('base64');

// console.log(base64Image);

module.exports = router;