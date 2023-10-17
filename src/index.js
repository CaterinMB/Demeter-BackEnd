import app from './app.js'
import { sequelize } from './db/dataBase.js'

import './models/permission.model.js'
import './models/role.model.js'
import './models/supplier.model.js'
import './models/suppliescategory.model.js'
import './models/productcategory.model.js'
import './models/supplies.model.js'
import './models/roledetail.model.js'
import './models/user.model.js'
import './models/typeuser.model.js'
import './models/supplier.model.js'
import './models/supplies.model.js'
import './models/product.model.js'
import './models/productdetail.model.js'
import './models/shopping.model.js'
import './models/shoppingdetail.model.js'
import './models/sale.model.js'
import './models/saledetail.model.js'

async function main() {
    try{
        await sequelize.sync({force: true})
        app.listen(4080);
        console.log('Server on port ', 4080);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();