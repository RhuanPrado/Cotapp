const Cotacao = require('../models/Cotacao');
const ListValues = require('../models/ListValues');
const Fornecedor = require('../models/Fornecedor');
const Pedido = require('../models/Pedido');

module.exports = {
    async gerarCot(req, res){

        const {cotId} = req.params;

        const cotacao = await Cotacao.findById(cotId);

        if(!cotacao){
            return res.status(400).json({ error: 'cotacao not exists'});
        }

        await selectValues(cotacao);

        const pedidos = await Pedido.find({idCot: cotacao._id});

        return res.json(pedidos);
    }
};

async function selectValues(cotacao){
    for(const product of cotacao.produtos){
        
        const listV = await ListValues.findById(product.listValuesId);
        var minV = listV.values[0];
        listV.values.forEach( (el) => {
            if(minV.value > el.value){
                minV = el;
            }      
        });
        
        if(!minV){
            continue;
        }

        const fornecedor = await Fornecedor.findById(minV._id);
        
        const  pedido = await Pedido.findOne({
            $and:[
                {idCot: {$in: cotacao._id }},
                {idF: {$in: fornecedor._id}}
            ]
        });

        console.log(pedido);

        pedido.produtos.push({
            _id:product._id,
            qtd:product.qtd,
            value: minV.value
        });

        await pedido.save();
    }
}
