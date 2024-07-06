import User from "../model/user.model.js";
import CryptoJS from 'crypto-js';
import { generateToken } from '../auth.js';


export const signup = async(req, res) => {
    try {
        const { fullname, email} = req.body;
        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword= CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();


        const createdUser = new User({
            fullname,
            email,
            password: hashPassword,
        });
        await createdUser.save();
        const token = generateToken(createdUser);
        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async(req, res) => {
    try {
        const { email} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && res.status(401).json("Wrong Password");

        const token = generateToken(user);
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
