import { role } from '../models/role.model.js';
import { typeUser } from '../models/typeuser.model.js';
import { user } from '../models/user.model.js';
import { Op } from 'sequelize';

export const getRoles = async (req, res) => {
    try {
        const roles = await role.findAll()
        res.json(roles);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getRoleByState = async (req, res) => {

    try {
        const RoleStatus = await role.findAll({
            where: {
                State: 1
            }
        });

        res.json(RoleStatus);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getRole = async (req, res) => {
    const { id } = req.params
    
    try {
        const getRole = await role.findOne({
            where: { ID_Role: id }
        })

        if (!getRole) return res.status(404).json({ message: 'El rol no existe.' })

        res.json(getRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const checkForDuplicates = async (req, res, next) => {
    try {
        const { Name_Role } = req.body;

        const existingRole = await role.findOne({
            where: {
                [Op.or]: [{ Name_Role }],
            },
        });

        if (existingRole) {
            return res.status(400).json({
                error: 'Ya existe un rol con el mismo nombre.',
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createRoles = async (req, res) => {
    const { Name_Role } = req.body;

    try {
        const newRole = await role.create({
            Name_Role,
            State: true
        })

        res.json(newRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateRole = async (req, res) => {
    try {
        const { id } = req.params
        const { Name_Role } = req.body

        const updateRole = await role.findByPk(id)

        updateRole.Name_Role = Name_Role

        await updateRole.save()

        res.json(updateRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const toggleRoleStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const statusRole = await role.findOne({
            where: { ID_Role: id },
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

export const deleteRole = async (req, res) => {
    const { id } = req.params

    try {

        const existRoleInUsers = await user.findOne({
            where: {
                Role_ID: id
            }
        })

        if (existRoleInUsers) {
            return res.status(403).json({
                message: "El rol no puede ser eliminado.",
                useDelete: false
            })
        }

        await role.destroy({
            where: { ID_Role: id, }
        });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ------------------------------------- PERMISOS -------------------------------------- //

export const addModuleToRole = async (req, res) => {
    try {
        const { moduleId, roleId } = req.params;

        const existingRole = await modulePermission.findOne({
            where: {
                Role_ID: roleId,
                Module_ID: moduleId
            },
        });

        if (existingRole) {
            return res.status(400).json({
                error: 'El rol ya tiene este modulo asignado',
            });
        }

        const createdModulePermission = await modulePermission.create({
            Role_ID: roleId,
            Module_ID: moduleId
        })

        res.json({
            data: createdModulePermission,
            message: "Modulo agregado correctamente"
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const addMultipleModuleAndRole = async (req, res) => {
    try {
        const modules = req.body;
        const { roleId } = req.params
        const data = []

        for await (const moduleId of modules) {
            const existingRole = await modulePermission.findOne({
                where: {
                    Role_ID: roleId,
                    Module_ID: moduleId
                },
            });

            if (existingRole) {
                return res.status(400).json({
                    error: 'El rol ya tiene este modulo asignado',
                });
            }

            const createdModulePermission = await modulePermission.create({
                Role_ID: roleId,
                Module_ID: moduleId
            })

            data.push(createdModulePermission)
        }

        res.json({
            data,
            message: "Modulo agregado correctamente"
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const addMultipleModuleAndRoleAndDeleteIfExists = async (req, res) => {
    try {
        const modules = req.body;
        const { roleId } = req.params
        const data = []

        for await (const moduleId of modules) {
            const existingRole = await modulePermission.findOne({
                where: {
                    Role_ID: roleId,
                    Module_ID: moduleId
                },
            });

            if (existingRole) {
                await modulePermission.destroy({
                    where: {
                        Role_ID: roleId,
                        Module_ID: moduleId
                    }
                })

                continue
            }

            const createdModulePermission = await modulePermission.create({
                Role_ID: roleId,
                Module_ID: moduleId
            })

            data.push(createdModulePermission)
        }

        res.json({
            data,
            message: "Modulo agregado correctamente"
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};