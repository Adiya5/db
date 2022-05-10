const UserModel = require('../models/user')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.username && !req.body.email && !req.body.password) {
        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }

    const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    await user.save().then(data => {
        res.render('results', {mydata: "user "+ data.username +" created succesfully!"})
    }).catch(err => {
        res.render('results', {mydata: err.message || "Some error occurred while creating user"})
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec();
        res.status(200).render('find', {mydata: "user: " + user.username + " " + user.email + " " + user.password});
        if(user == null) {
            res.status(200).render('find', {mydata: "user not found"})
        }
    } catch(error) {
        res.status(404).render('find', { message: error.message});
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await UserModel.deleteOne(req.query.email).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        } else {
            res.send({
                message: "User deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};