const express = require('express');
const routes = express.Router();
const Users = require('../models/subscribers')

// Get ALL
routes.get('/', async (req, res)=>{
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
})

// Get ONE
routes.get('/:id', getSubscriber, (req, res)=>{
    res.status(200).json(res.user);
})

// Create ONE
routes.post('/', async (req, res)=>{
    const user = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        subscriberToChannel: req.body.subscriberToChannel
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message : error.message })
    }
})

// Update ONE
routes.patch('/:id', getSubscriber, async (req, res)=>{
try {
    const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    res.status(200).json(updatedUser);
} catch (error) {
    res.status(500).json({message: error.message})
}
})

// Delete ONE
routes.delete('/:id', getSubscriber, async (req, res)=>{
    try {
        await res.user.deleteOne();
        res.status(200).json({message : "User deleted successfully !"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
});

//Middleware pour obtenir un subscriber par son id
async function getSubscriber(req, res, next){
    let user;
    try {
        user = await Users.findById(req.params.id);
        if(user == null){
            return res.status(404).json({message : `Cannaot find user of id ${req.params.id}`});
        }
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
    res.user = user;
    next()
}

module.exports = routes;