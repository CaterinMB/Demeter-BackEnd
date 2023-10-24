import { productCategory } from '../models/productcategory.model.js';
import { Op } from 'sequelize';

export const getCategoriesProducts = async (req, res) => {
    try {
        const products = await productCategory.findAll()
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

