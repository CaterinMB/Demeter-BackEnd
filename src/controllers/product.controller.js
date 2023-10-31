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
                error: 'Ya existe un producto con el mismo nombre.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    const { Name_Products } = req.body;

    try {
        const newProduct = await product.create({
            Name_Products,
            State: true
        })

        res.json(newProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { Name_Products } = req.body

        const updateProduct = await product.findByPk(id)

        updateProduct.Name_Products = Name_Products

        await updateProduct.save()

        res.json(updateProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const toggleProductStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const statusProduct = await product.findOne({
            where: { ID_Product: id },
        });

        if (!statusProduct) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        };

        statusProduct.State = !statusProduct.State;

        await statusProduct.save();

        return res.json(statusProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    const {id} = req.params
    try {
        const products = await product.findAll({where : {ProductCategory_ID: id}})
        res.json(products);
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