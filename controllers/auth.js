import User from "../models/User.js"
import bcrypt from "bcryptjs"


export const signup = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).send("You have successfully registered")
    } catch (err) {
        res.status(500).json("Oops!! An unexpected error occurred!!")
    }
}

export const signin = async(req, res) => {
    try {
        const user = await User.findOne({phone:req.body.phone})
        if (!user) return res.status(400).json("Wrong Username or password")

        const isCorrect = bcrypt.compare(req.body.password, user.password)
        if (!isCorrect) return res.status(400).json("Wrong Username or password")

        const {password, ...others} = user._doc

        res.status(200).json(others)
    } catch (err) {
        res.status(500).json("Oops!! An unexpected error occurred!!")
    }
}