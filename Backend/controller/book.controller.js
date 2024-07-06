// Import the necessary modules
import Book from "../model/book.model.js";
import cloudinary from '../middleware/cloudinary.js';
import multer from 'multer';
import fs from 'fs';

import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const random = uuidv4(); 
      cb(null, random+""+file.originalname )
    }
  })
const upload = multer({ storage: storage })


export const getBook = async (req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const addBook = [upload.single('image'), async (req, res) => {
        const { name, price, category, title } = req.body;
        const x =  await cloudinary.uploader.upload(req.file.path)
        const nami = req.body.name;
        
        const newBook = new Book({ 
            name:name,
            price:price,
            category:category,
            image: x.secure_url ,
            title:title,
        });

        await newBook.save();

        fs.unlink((req.file.path),function(err) {
            if (err) console.log(err);
            else {
                console.log("\nDeleted file");
            }
        })

        res.json({newBook})
    }
];
