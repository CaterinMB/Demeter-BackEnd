import { shopping } from '../models/shopping.model.js'
import { shoppingDetail } from '../models/shoppingdetail.model.js';
import { supplier } from '../models/supplier.model.js';

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
        const { Datetime, Total, State } = req.body;

        const createShopping = await shopping.create({
            Datetime,
            Total,
            State
        });

        res.json(createShopping);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getShopingAndShopingDetails = async (req, res) => {
    try {

        const shoppingAndShoppingDetails = await shoppingDetail.findAll({
            include: [{
                model: shopping,
                required: true,
                include: [{
                    model: supplier,
                    required: true
                }]
            }],
        })

        res.json(shoppingAndShoppingDetails);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



export const createMultipleShopping = async (req, res) => {
    try {
        const data = Array.from(req.body);
        const dataInserted = []

        for await (const { Datetime, Total, State, Supplier_ID, User_ID, shoppingDetails } of data) {
            const createdShopping = await shopping.create({
                Datetime,
                Total,
                State,
                Supplier_ID,
                User_ID
            });

            const createdShoppingDetail = await shoppingDetail.create({
                ...shoppingDetails,
                Shopping_ID: createdShopping.ID_Shopping
            })

            dataInserted.push({ createdShopping, createdShoppingDetail })
        }

        res.json(dataInserted);
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

        const updatedShop = await shop.update({ State: !shop.State });

        res.json(updatedShop);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// export const updateShopping = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const updateShop = await shopping.findOne({
//             where: {
//                 ID_Shopping: id
//             }
//         });

//         updateShop.set(req.body);
//         await updateShop.save();
//         return res.json(updateShop);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }; 