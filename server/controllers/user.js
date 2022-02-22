import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import express from "express";

const router = express.Router();

export const signin = async (req, res) => {
    const {email, password} = req.body

    try {
        const existingUser = await User.findOne({email})
        if (!existingUser) return res.status(404).json({message: 'User doesent exist'})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(404).json({message: 'Credentials do not match'})
        
        const token = jwt.sign(
            { email:existingUser.email, id:existingUser._id },
            'test',
            {expires:'1h'},
            'test')

        res.status(200).json({result: existingUser, token})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try again.'})
    }
}

export const signup = async (req, res) => {
    const {name, email, password, confirmPassword} = req.body

    try {
        const existingUser = await User.findOne({email})
        if (existingUser) return res.status(400).json({message: 'User already exists!'})

        if (password !== confirmPassword) return res.status(400).json({message: 'Passwords dont match!'})

        const hashedPassword = await bcrypt.hash(password, 12)  // hashing password with salt lvl 12
        const result = await User.create({email, password: hashedPassword, name: '${firstName} ${lastName}'})

        const token = jwt.sign(
            { email: result.email, id: result._id },
            'test',
            {expires:'1h'},
            'test')

        res.status(200).json({result, token})
    } catch (e) {
        res.status(500).json({message: 'Something went wrong, please try again.'})
    }
}
