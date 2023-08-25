var express = require('express');
var ProductRouter = express.Router();
const ProductController = require("../../controllers/admin/ProductController")

const multer = require('multer')
const upload = multer({ dest: 'public/productUploads/' })


ProductRouter.post("/adminapi/product/add", upload.single('file'), ProductController.add)
ProductRouter.post("/adminapi/product/list", upload.single('file'), ProductController.updateList)
ProductRouter.get("/adminapi/product/list", ProductController.getList)
ProductRouter.get("/adminapi/product/list/:id", ProductController.getList)
ProductRouter.delete("/adminapi/product/list/:id", ProductController.delList)


module.exports = ProductRouter
