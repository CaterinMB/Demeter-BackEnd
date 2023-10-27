import { typeUser } from '../models/typeuser.model.js'
import { Op } from 'sequelize';

export const getTypeUsers = async (req, res) => {
    try {
        const typeUsers = await typeUser.findAll()
        res.json(typeUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTypeUser = async (req, res) => {
    const { id } = req.params
    
    try {
        const getTypeUser = await typeUser.findOne({
            where: { ID_TypeUser: id }
        })

        if (!getTypeUser) return res.status(404).json({ message: 'El rol no existe.' })

        res.json(getTypeUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkForDuplicates = async (req, res, next) => {
    try {
        const { Name_Type } = req.body;

        const existingTypeUser = await typeUser.findOne({
            where: {
                [Op.or]: [{ Name_Type }],
            },
        });

        if (existingTypeUser) {
            return res.status(400).json({
                error: 'Ya existe un rol con el mismo nombre.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTypeUsers = async (req, res) => {
    const { Name_Type } = req.body;

    try {
        const newTypeUser = await typeUser.create({
            Name_Type,
            State: true
        })

        res.json(newTypeUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTypeUser = async (req, res) => {
    try {
        const { id } = req.params
        const { Name_Type } = req.body

        const updateTypeUser = await typeUser.findByPk(id)

        updateTypeUser.Name_Type = Name_Type

        await updateTypeUser.save()

        res.json(updateTypeUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const toggleTypeUserStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const statusTypeUser = await typeUser.findOne({
            where: { ID_TypeUser: id },
        });

        if (!statusTypeUser) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        };

        statusTypeUser.State = !statusTypeUser.State;

        await statusTypeUser.save();

        return res.json(statusTypeUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTypeUser = async (req, res) => {
    try {
        const { id } = req.params

        await typeUser.destroy({
            where: { ID_TypeUser: id, }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};