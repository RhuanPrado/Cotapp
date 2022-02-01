const { Schema, model } = require ('mongoose');
const CotacaoSchema = new Schema({

    name:{
        type: String,
        required: true,
    },

    idUser:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },

    produtos:[{
        id:{
            type: Schema.Types.ObjectId,
            ref:'Product'
        },

        qtd:Number,
        
        listValuesId:{
            type: Schema.Types.ObjectId,
            ref:'ListValues'
        }

    }],
    
    status: Boolean,

},{
    timestamps: true,
});

module.exports = model('Cotacao', CotacaoSchema);