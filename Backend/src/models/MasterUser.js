const { Schema, model } = require ('mongoose');
const MasterUserSchema = new Schema({

    user:{
        type:String,
        required: true
    },

    password:{
        type: String,
        required: true,
    },

    master: Boolean,
},{
    timestamps:true,
});

module.exports = model('MasterUser', MasterUserSchema);