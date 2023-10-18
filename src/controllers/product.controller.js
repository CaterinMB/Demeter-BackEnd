import { product } from '../models/product.model.js';
import { Op } from 'sequelize';

export const getProducts = async (req, res) => {
    try {
        const products = await product.findAll()
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params
    
    try {
        const getProduct = await product.findOne({
            where: { ID_Product: id }
        })

        if (!getProduct) return res.status(404).json({ message: 'El rol no existe.' })

        res.json(getProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkForDuplicates = async (req, res, next) => {
    try {
        const { Name_Products } = req.body;

        const existingProduct = await product.findOne({
            where: {
                [Op.or]: [{ Name_Products }],
            },
        });

        if (existingProduct) {
            return res.status(400).json({
                error: 'Ya existe un rol con el mismo nombre.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createProducts = async (req, res) => {
    const { Name_Products } = req.body;

    try {
        const newRole = await product.create({
            Name_Products,
            State: true
        })

        res.json(newRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { Name_Products } = req.body

        const updateRole = await product.findByPk(id)

        updateRole.Name_Products = Name_Products

        await updateRole.save()

        res.json(updateRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const toggleProductStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const statusRole = await product.findOne({
            where: { ID_Product: id },
        });

        if (!statusRole) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        };

        statusRole.State = !statusRole.State;

        await statusRole.save();

        return res.json(statusRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        await product.destroy({
            where: { ID_Product: id, }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};