import { product } from '../models/product.model.js';
import { Op } from 'sequelize';

export const getProductsByCategory = async (req, res) => {
    try {
        const {id} = req.params
        const products = await product.findAll({where : {ProductCategory_ID: id}})
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getProduct = async (req, res) => {
    try {
        const {id} = req.params
        const products = await product.findOne({where: {ID_Product : id}})
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getAllProduct = async (req, res) => {
    try {
        const products = await product.findAll()
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};