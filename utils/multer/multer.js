const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, res, cb) {
    cb(null, Date.now() + res.originalname);
  },
});

const deleteFile = async (image) => {
  if (image !== "defaultPic.jpg") {
    await fs.unlink(path.join(__dirname, `/../../uploads/${image}`), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("flie deleted");
      }
    });
  }
};

module.exports = { storage, deleteFile };
