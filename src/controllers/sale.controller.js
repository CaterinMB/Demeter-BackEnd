import { sale } from '../models/sale.model.js';
import { Op } from 'sequelize';

export const getSale = async (req, res) => {
    try {
        const Sales = await sale.findAll()
        res.json(Sales);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

