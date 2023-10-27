import { typeUser } from '../models/typeuser.model.js'

export const getTypeUsers = async (req, res) => {
    try {
        const typeUsers = await typeUser.findAll()
        res.json(typeUsers);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const datosType = async (req, res) => {
    try {
        const datos = [
            { ID_TypeUser: 1, Name_Type: 'Empleados' },
            { ID_TypeUser: 2, Name_Type: 'Meseros' }
        ];

        const result = await Promise.all(datos.map(async (dato) => {
            return await typeUser.create(dato);
        }));

        res.json({
            message: "Datos insertados correctamente",
            datos: result,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};