const MasterUser = require('../models/MasterUser');
const User = require('../models/User');



module.exports = {

    async loginUser(req, res){

        const {name} = req.body;

        const user = await User.findOne({name:name});

        if(!user){
            return res.json({ok: false,message:"usuário inexistente"});
        }

        if(!user.habilitado){
            return res.json({ok: false,message:"usuário não está Habilitado"});
        }
        
        return res.json({ ok: true, id: user._id, name: user.name});
    },

    async loginPass(req, res){
        const { id ,pass } = req.body;

        const user = await User.findById(id);

        if(!user){
            return res.json({ok: false, message:"usuário inexistente"});
        }

        if( !(pass == user.password)){
            return res.json({ok: false, message:"senha inválida"});
        }

        return res.json({ok: true});
    },


};