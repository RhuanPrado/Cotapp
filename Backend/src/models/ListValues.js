const { Schema, model } = require ('mongoose');
const ListValuesSchema = new Schema({
    
    values:[{
        value: Number,
        _id:{
            type: Schema.Types.ObjectId,
            ref:'Fornecedor'
        }
    }]

},{
    timestamps: true,
});

module.exports = model('ListValues', ListValuesSchema);