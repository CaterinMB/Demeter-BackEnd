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


export const createSale = async(req, res) => {

    
    try {
    const newSale = await sale.create({  
       
    })

    res.json(newSale)
} catch (error) {
    return res.status(500).json({ message: error.message });
}
}

export const updateSale = async (req, res) => {
    try {
        const {ID_Sale, SubTotal, Total} = req.body
        
        const existingSale = await sale.findByPk(ID_Sale);

        if (!existingSale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        existingSale.SubTotal = SubTotal;
        existingSale.Total = Total;

       
        await existingSale.save();

        res.json(existingSale);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
