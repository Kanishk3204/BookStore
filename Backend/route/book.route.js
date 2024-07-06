import express from "express";
import { getBook ,addBook} from "../controller/book.controller.js";

const router = express.Router();

router.get("/getBook", getBook);
router.post("/addBook", addBook);

export default router;
