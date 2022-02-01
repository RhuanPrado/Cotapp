const { Schema, model } = require('mongoose');

const PedidoSchema = new Schema({
    idCot:{
        type: Schema.Types.ObjectId,
        ref:'Cotacao'
    },
    idF:{
        type: Schema.Types.ObjectId,
        ref:'Fornecedor'
    },
    produtos:[{
        _id:{
            type: Schema.Types.ObjectId,
        ref:'Product'
        },
        qtd: Number,
        value: Number
    }]

},{
    timestamps: true,
});

module.exports = model('Pedido', PedidoSchema);