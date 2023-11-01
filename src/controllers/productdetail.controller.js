import { productDetail } from '../models/productdetail.model.js';
import { Op } from 'sequelize';

export const createDetail = async (req, res) => {
    const {Product_ID, Supplies_ID} = req.body

    try {
        const newDetail = await productDetail.create({
            Product_ID : Product_ID,
            Supplies_ID : Supplies_ID
        })
        res.json(newDetail);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getDetail = async (req, res) => {
    try {
        const {id} = req.params
        const recip = await productDetail.findAll({where: {Product_ID : id}})
        res.json(recip);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createManyDetails = async (req, res) => {

    const newrecipe = req.body

    try {
        const recipe = await productDetail.bulkCreate(newrecipe)
        res.json(recipe);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const lotUpdate = async (req, res) => {
    try {
        const {ID_Product, math} = req.body
        
        const existingProduct = await productDetail.findByPk(ID_Product);

        if (!existingProduct) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        existingProduct.Lot_ProductDetail + math
       
        await existingProduct.save();

        res.json(existingProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}