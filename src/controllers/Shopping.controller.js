import {shopping} from '../models/shopping.model.js'

export const getShopping = async (req, res) => {
    try {
        const ArrayShopping = await shopping.findAll();
        res.json(ArrayShopping);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getShop = async (req, res) => {
    const { id } = req.params;
    try {                                                                                                                 
        const oneShop = await shopping.findOne({
            where: {
                ID_Shopping: id
            }
        });
        res.json(oneShop);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createShopping = async (req, res) => {
    try {
        const { ID_Shopping, Datetime, ID_Supplier, Total, State, User_ID } = req.body;

        const createShopping = await shopping.create({
         ID_Shopping,	
         Datetime, 
         Total,
         User_ID, 
         ID_Supplier, 
         State
        });

        res.json(createShopping);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const disableShop = async (req, res) => {
    try {
        const { id } = req.params;

        const shop = await shopping.findOne({
            where: {
                ID_Shopping: id
            }
        });

        if (!shop) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }

        const updatedShop = await shop.update({ Estado: !shop.Estado });

        res.json(updatedShop);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateShopping = async (req, res) => { 
    const { id } = req.params;
    try {
        const updateShop = await shopping.findOne({
            where: {
                ID_Shopping: id
            }
        });

        updateShop.set(req.body);
        await updateShop.save();
        return res.json(updateShop);           
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};