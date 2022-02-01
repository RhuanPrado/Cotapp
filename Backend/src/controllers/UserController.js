const User = require('../models/User');

module.exports = {
    async store (req, res){
        const { name, password } = req.body;

        const userExists = await User.findOne({name: name});

        if(userExists){
            return res.json(userExists);
        }
        
        
        const user = await User.create({
            name: name,
            password: password,
            habilitado: false,
        });

        return res.json(user);
    },

    async update (req, res){
    
        const { userId } = req.params;

        const user = await User.findById(userId);

        if(!user){
            return res.json(400).json({error: "user not exists"});
        }

        const updateUser = await User.updateOne({_id: user._id},{
            $set:{
                name: user.name,
                password: user.password,
                habilitado: true
            }
        });

        return res.json(updateUser);
    },

    async delete (req, res){
        const {userId} = req.params;

        const delUser = await User.findById(userId);

        if(!delUser){
            return res.json(400).json({error: "user not exists"});
        }


        const del = await User.deleteOne({_id: delUser._id});

        return res.json(del);
    },
    
    async index (req , res){

        const users = await User.find();

        return res.json(users);
    }
}