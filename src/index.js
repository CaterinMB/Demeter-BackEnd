import app from './app.js'
import { sequelize } from './db/dataBase.js'

import './models/Permission.model.js'
import './models/RoleDetail.model.js'
import './models/Role.model.js'
import './models/User.model.js'
import './models/Login.model.js'
import './models/Supplier.model.js'
import './models/Category.model.js'
import './models/Supplies.model.js'
import './models/Product.model.js'
import './models/ProductDetail.model.js'
import './models/Shopping.model.js'
import './models/ShoppingDetail.model.js'
import './models/Sale.model.js'
import './models/SaleDetail.model.js'

async function main() {
    try{
        await sequelize.sync({force: false})
        app.listen(4080);
        console.log('Server on port ', 4080);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();