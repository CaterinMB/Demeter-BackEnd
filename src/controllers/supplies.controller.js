import { supplies } from "../models/supplies.model.js";
import { Op } from 'sequelize';

export const getSupplies = async (req, res) => {
    try {
        const ArraySupplies = await supplies.findAll();
        res.json(ArraySupplies);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const getSupplie = async (req, res) => {
    const { id } = req.params;
    try {
        const oneSupplie = await supplies.findOne({
            where: {
                ID_Supplies: id
            }
        });
        if (!oneSupplie) {
            return res.status(404).json({ mensaje: 'Insumo no encontrado' });
        }
        res.json(oneSupplie);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const checkForDuplicates = async (req, res, next) => {
    try {
        const { Name_Supplies } = req.body;

        const existing = await supplies.findOne({
            where: {
                [Op.or]: [{ Name_Supplies }],
            },
        });

        if (existing) {
            return res.status(400).json({
                error: 'Ya existe un insumo con el mismo nombre.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const createSupplies = async (req, res) => {
    try {
        const measures = ['Unidad(es)', 'Kilogramos (kg)', 'Gramos (g)', 'Litros (L)', 'Mililitros (ml)'];
        const { Name_Supplies, Unit, Measure, Stock, SuppliesCategory_ID } = req.body;

        if (!measures.includes(Measure)) {
            return res.status(400).json({ mensaje: 'Medida no válida.' });
        }

        const createSupplies = await supplies.create({
            Name_Supplies,
            Unit,
            Measure,
            Stock,
            SuppliesCategory_ID,
            State: true 
        });

        res.json(createSupplies);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const disableSupplies = async (req, res) => {
    try {
        const { id } = req.params;

        const supply = await supplies.findOne({
            where: {
                ID_Supplies: id
            }
        });

        if (!supply) {
            return res.status(404).json({ mensaje: 'Insumo no encontrado' });
        }

        const updatedSupply = await supply.update({ State: !supply.State });

        res.json(updatedSupply);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const updateSupplies = async (req, res) => { 
    try {
        const { id } = req.params;

        const measures = ['Unidad(es)', 'Kilogramos (kg)', 'Gramos (g)', 'Litros (L)', 'Mililitros (ml)'];
        const { Name_Supplies, Measure, Stock, SuppliesCategory_ID } = req.body;

        if (!measures.includes(Measure)) {
            return res.status(400).json({ mensaje: 'Medida no válida.' });
        }

        const updateSupplies = await supplies.findByPk(id);

        if (!updateSupplies) {
            return res.status(404).json({ mensaje: 'Insumo no encontrado' });
        }

        updateSupplies.Name_Supplies = Name_Supplies;
        updateSupplies.Measure = Measure;
        updateSupplies.Stock = Stock;
        updateSupplies.SuppliesCategory_ID = SuppliesCategory_ID;

        await updateSupplies.save();

        res.json(updateSupplies);           
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};

export const deleteSupplies = async (req, res) => {
    try {
        const { id } = req.params;
        
        const supply = await supplies.findOne({
            where: {
                ID_Supplies: id
            }
        });

        if (!supply) {
            return res.status(404).json({ mensaje: 'Insumo no encontrado' });
        }

        await supplies.destroy({
            where: {
                ID_Supplies: id
            }
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ mensaje: error.message });
    }
};