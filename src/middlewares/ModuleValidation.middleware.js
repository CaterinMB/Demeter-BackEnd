import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"
import { role } from "../models/role.model.js"
import { module } from "../models/module.model.js"
import { request, response } from "express"
import { user } from "../models/user.model.js"
import { modulePermission } from "../models/modulePermission.model.js"

export default class {


  #errorHandler
  #res
  #req
  constructor(errorHandler = ({
    req = request,
    res = response,
    next = () => null,
    error = new Error("")
  }) => null) {

    this.MODULES = {
      DASHBOARD: "dashboard",
      SETTINGS: "settings",
      USER: "user",
      CATEGORY_SUPPLIES: "categorySupplier",
      SUPPLIES: "supplies",
      SUPPLIER: "suppliar",
      CATEGORY_PRODUCT: "categoryProduct",
      PRODUCT: "product",
      WAITER: "waiter",
      SHOPPING: "shopping",
      SALES: "sales"
    }

    this.#errorHandler = errorHandler
    this.userModel = user
    this.moduleTypes = module
    this.modulePermission = modulePermission
    this.roleModel = role
  }

  getCurrentUserAndRole = async () => {

    const token = this.#req.cookies.token
    const user = jwt.decode(token, TOKEN_SECRET)

    return await this.userModel.findOne({
      where: {
        ID_User: user?.id
      },

      include: [
        {
          model: this.roleModel,
          required: true
        }
      ]
    })
  }

  hasPermissions = (...moduleView) => {

    return async (req, res, next) => {
      try {
        this.#res = res
        this.#req = req
        const moduleNames = Array.from(await this.getAssociatedModulePermissionsByRole())
        const includes = moduleView.every(m => moduleNames.some(md => md.Module.Name_Module === m))

        if (!includes) {
          this.#errorHandler({
            req,
            res,
            next,
            error: new Error("No tienes permisos")
          })
          return
        }

        next()
      }
      catch (error) {
        this.#errorHandler({
          error,
          next,
          req,
          res
        })
      }
    }
  }

  getAssociatedModulePermissionsByRole = async () => {

    const user = await this.getCurrentUserAndRole()

    if (!user) throw new Error("El usuario no existe")
    const permissions = await this.modulePermission.findAll({
      where: {
        Role_ID: user.Role_ID
      },
      include: [{
        model: this.moduleTypes,
        required: true
      }]
    })

    return permissions
  }


}

/*

id INT AUTO_INCREMENT,
  modulName VARCHAR(100) NOT NULL,
  state TINYINT DEFAULT 1,
  dahsboard,
  setting,
  user,
  categorySupplies,
  supplies,
  supplier,F
  categoryProduct,
  product,
  waiter,
  shopping,
  sales
  */