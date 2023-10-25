import { saleDetail } from '../models/saledetail.model.js';
import { Op } from 'sequelize';

export const createSaleDetail = async (req, res) => {
    const {Sale_ID, Product_ID} = req.body

    try {
        const newSaleDetail = await saleDetail.create({
            Sale_ID : Sale_ID,
            Product_ID : Product_ID
        })
        res.json(newSaleDetail);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getDetails = async (req, res) => {
    try {
        const {id} = req.params
        const details = await saleDetail.findAll({where: {Sale_ID : id}})
        res.json(details);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};