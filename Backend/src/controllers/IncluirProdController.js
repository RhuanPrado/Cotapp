const Product = require('../models/Product');
const Cotacao = require('../models/Cotacao');
const ListValues = require('../models/ListValues');

module.exports = {
    async store( req, res){
        const {productId} = req.params;
        const {cot, qtd} = req.headers;

        const incProduct = await Product.findById(productId);
        const cotacao = await Cotacao.findById(cot);
        
        if(!incProduct){
            return res.status(400).json({ error: 'Product not exists'});
        }

        if(!cotacao){
            return res.status(400).json({ error: 'cotacao not exists'});
        }

        const listValuesId = await ListValues.create({
            values: []
        });

        const product = {
            _id:incProduct._id,
            qtd: qtd,
            listValuesId: listValuesId._id,
        };

        cotacao.produtos.push(product);

        await cotacao.save();

        return res.json(product);
    },

    async delete( req, res){
        const {productId} = req.params;
        const {cot, li} = req.headers;

        const incProduct = await Product.findById(productId);
        const cotacao = await Cotacao.findById(cot);
        const listV = await ListValues.findById(li);
        
        if(!incProduct){
             return res.status(400).json({ error: 'Product not exists'});
        }

        if(!cotacao){
            return res.status(400).json({ error: 'cotacao not exists'});
        }

        if(!listV){
            return res.status(400).json({ error: 'list not exists'});
        }
        console.log(listV._id);
        const del = await ListValues.deleteOne({_id: listV._id});

        cotacao.produtos.pop({_id: incProduct._id});

        await cotacao.save();

        return res.json(incProduct);
    },

    async update(req, res){

        
    }
};