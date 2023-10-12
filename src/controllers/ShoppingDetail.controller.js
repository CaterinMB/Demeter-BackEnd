import { shoppingDetail } from "../models/ShoppingDetail.model.js";

export const getshoppingDetail = async (req, res) => {
    try {
        const ArrayshoppingDetail = await shoppingDetail.findAll();
        res.json(ArrayshoppingDetail);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

