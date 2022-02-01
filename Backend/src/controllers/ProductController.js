const Product = require('../models/Product');
const Cotacao = require('../models/Cotacao');

module.exports = {
    async index(req, res){
        const { cot } = req.headers;
        
        if(cot == 0){
            const products = await Product.find();
            return res.json(products);
        }
        const cotacao = await Cotacao.findById(cot);

        if(!cotacao){
            return res.status(400).json({ error: 'cotaçao not exist'})
        }

        const products = await Product.find({
            $and:[
                { _id: { $nin: cotacao.produtos }}
            ],
        });

        return res.json(products);
    },
    async indexProductsCot(req, res){
        
        const { cot } = req.headers;

        const cotacao = await Cotacao.findById(cot);

        if(!cotacao){
            return res.status(400).json({ error: 'cotaçao not exist'})
        }

        const products = await Product.find({
            $and:[
                { _id: { $in: cotacao.produtos }}
            ],
        });

        return res.json(products);
    },

    async store(req, res) {
        const { name, und} = req.body;

        const productExists = await Product.findOne({name: name});

        if(productExists){
            return res.json(productExists);
        }
        
        const product = await Product.create({
            name: name,
            und: und,
        })

        return res.json(product);
    },

    async delete(req, res){
        const {productId} = req.params;

        const delproduct = await Product.findById(productId);

        if(!delproduct){
            return res.status(400).json({error: "produto not exists"})
        }

        const del = await Product.deleteOne({_id:delproduct._id});
    
        return res.json(del);
    },

    async update( req, res){
        const { name, und} = req.body;

        const {productId} = req.params;

        const updateProduct = await Product.updateOne({_id:productId},{
            $set:{
                name: name,
                und: und,
            },
        });
        
        return res.json(updateProduct);
    },


};