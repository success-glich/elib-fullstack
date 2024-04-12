import express from 'express';
import BookController from './book.controller';
import multer from 'multer';
import path from 'node:path';

const bookRouter =express.Router();

// file store local -> upload to cloudinary & delete that local file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname,'../../public/data/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    dest:path.resolve(__dirname,'../../public/data/uploads'),
    limits:{fileSize:3e7} // 30mb 30*1024*1024

})
//routes
bookRouter.post('/',upload.fields([{
    name:'cover',maxCount:1
},{
    name:'file',maxCount:1
}]),BookController.createBook);
// bookRouter.post('/login',UserController.loginUser);

export default bookRouter;