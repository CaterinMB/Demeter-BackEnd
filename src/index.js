import app from './app.js'
import { sequelize } from './db/dataBase.js'

import './models/category_product.model.js'
import './models/category_supplies.model.js'
import './models/detail_sale.model.js'
import './models/detail_shopping.model.js'
import './models/payment_method.model.js'
import './models/permission.model.js'
import './models/product.model.js'
import './models/recipe.model.js'
import './models/restaurant.model.js'
import './models/role_permission.model.js'
import './models/role.model.js'
import './models/sale.model.js'
import './models/shopping.model.js'
import './models/supplier.model.js'
import './models/supplies.model.js'
import './models/user.model.js'
import './models/waiter.model.js'

async function main() {
    try{
        await sequelize.sync({force: true})
        app.listen(4000);
        console.log('Server on port ', 4000);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();