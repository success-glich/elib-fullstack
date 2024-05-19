import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/data/uploads");
  },
  filename: function (req, file, cb) {
    // file.originalname
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage,limits:{fileSize:10*1024*1024} });
