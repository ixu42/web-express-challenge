const multer = require("multer");

const storage = multer.memoryStorage(); // Memory storage to keep files in memory as a buffer
const upload = multer({ storage: storage });
module.exports = upload;