import { user } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import { Op } from 'sequelize';

export const getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            where: {
                TypeUser_ID: 1
            }
        });
        res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params

    try {
        const getUser = await user.findOne({ where: { ID_User: id } });

        if (!getUser) return res.status(404).json({ message: 'El usuario no existe' })

        res.json(getUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkForDuplicates = async (req, res, next) => {
    try {
        const { Document, Email } = req.body;

        const existingUser = await user.findOne({
            where: {
                [Op.or]: [{ Document }, { Email }],
            },
        });

        if (existingUser) {
            return res.status(400).json({
                error: 'Ya existe un usuario con la misma cédula o correo electrónico.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const { Type_Document, Document, Name_User, LastName_User, Password, Email, Role_ID } = req.body;

    try {
        const passwordHast = await bcrypt.hash(Password, 10)
        const newUser = await user.create({
            Type_Document,
            Document,
            Name_User,
            LastName_User,
            Email,
            Password: passwordHast,
            Restaurant: null,
            TypeUser_ID: 1,
            Role_ID,
            State: true
        });

        const token = await createAccessToken({ id: newUser.id });

        res.cookie('token', token);
        res.json({
            message: "Usuario creado correctamente",
            Nombre: newUser.Name_User,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params

    try {
        const { Type_Document, Document, LastName_User, Name_User, Email, Role_ID } = req.body

        const updateUser = await user.findByPk(id)

        updateUser.Type_Document = Type_Document
        updateUser.Document = Document
        updateUser.Name_User = Name_User
        updateUser.LastName_User = LastName_User
        updateUser.Role_ID = Role_ID
        updateUser.Email = Email

        await updateUser.save();

        return res.json(updateUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const editProfile = async (req, res) => {
    const { id } = req.params

    try {
        const { Name_User, LastName_User, Email } = req.body

        const updateUser = await user.findByPk(id)

        updateUser.Name_User = Name_User
        updateUser.LastName_User = LastName_User
        updateUser.Email = Email

        await updateUser.save();

        return res.json(updateUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const changePassword = async (req, res) => {
    const { id } = req.params

    try {

        const { Password, NewPassword } = req.body;

        const userFound = await user.findOne({ where: { ID_User: id } });

        const isMatch = await bcrypt.compare(Password, userFound.Password)

        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        const passwordHast = await bcrypt.hash(NewPassword, 10)

        const updateUser = await user.findByPk(id)

        updateUser.Password = passwordHast

        await updateUser.save();

        
        const token = await createAccessToken({ ID_User: userFound.ID_User });
        res.cookie('token', token);

        return res.json(updateUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const toggleUserStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const statusUser = await user.findOne({
            where: { ID_User: id },
        });

        if (!statusUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        };

        statusUser.State = !statusUser.State;

        await statusUser.save();

        return res.json(statusUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        await user.destroy({
            where: { ID_User: id },
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// --------------------------- Mesero ------------------------------------- //

export const getWaiters = async (req, res) => {
    try {
        const users = await user.findAll({
            where: {
                TypeUser_ID: 2
            }
        });
        res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getWaiter = async (req, res) => {
    const { id } = req.params

    try {
        const getUser = await user.findOne({ where: { ID_User: id } });

        if (!getUser) return res.status(404).json({ message: 'El usuario no existe' })

        res.json(getUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createWaiter = async (req, res) => {
    const { Type_Document, Document, Name_User, LastName_User, Restaurant } = req.body;

    try {
        const newUser = await user.create({
            Type_Document,
            Document,
            Name_User,
            LastName_User,
            Restaurant,
            TypeUser_ID: 2,
            Email: null,
            Password: null,
            Role_ID: null,
            State: true
        });

        res.json({
            message: "Mesero creado correctamente",
            Nombre: newUser.Name_User,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const duplicateWaiter = async (req, res, next) => {
    try {
        const { Document } = req.body;

        const existingWaiter = await user.findOne({
            where: {
                [Op.or]: [{ Document }],
            },
        });

        if (existingWaiter) {
            return res.status(400).json({
                error: 'Ya existe un usuario con la misma cédula',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};