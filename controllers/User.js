const UserModel = require('../models/user')

exports.create = async (req, res) => {
    if (!req.body.email && !req.body.username && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const user = new UserModel({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    await user.save().then(data => {
        res.send({
            message:"User created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.query.email}).exec();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
exports.update = async (req, res) => {

    if (!req.body.newEmail || !req.body.newUsername || !req.body.newPassword) {
        res.status(400).send({ message: "Content can not be empty!" });
        //res.status(400).render('results', {mydata: "Data to update can not be empty!"})
        return
    }

    //const email = req.params.oldEmail;
    const email = req.body.oldEmail;

    //await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    await UserModel.findOneAndUpdate({email: email}, {
        email:req.body.newEmail,
        username:req.body.newUsername,
        password:req.body.newPassword
    }).then(data => {
        console.log(data)
        if (!data) {
            res.status(404).send({message: `User not found.`});
            //res.status(404).render('results', {mydata: `User not found.`})
        }else{
            res.send({ message: "User updated successfully." })
            //res.status(200).render('results', {mydata: "User updated successfully."})
        }
    }).catch(err => {
        res.status(500).send({message: err.message});
        //res.status(500).render('results', {mydata: err.message})
    });
};
exports.delete = async (req, res) => {
    await UserModel.findByIdAndRemove(req.query.email).then(data => {
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