const { Schema, model} = require('mongoose');


const FornecedorSchema = new Schema({

    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    pedidos:[
        {
            type:Schema.Types.ObjectId,
            ref:'Pedido'
        }
    ],
    cotacoes:[{
        type:Schema.Types.ObjectId,
        ref:'Cotacao'
    }]
},{
    timestamps: true,
});

module.exports = model('Fornecedor', FornecedorSchema);