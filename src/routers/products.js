import express from 'express'
import {
  create,
  all,
  detail_product,
  update_product,
  delete_product,
} from '../controllers/products.js'
import uploadImage from '../middleware/upload_img.js'
import { authorization, admin, cashier } from '../middleware/access.js'

const Routers = express.Router()

Routers.post(
  '/product/create/:user_id',
  authorization,
  admin,
  uploadImage,
  create,
)
Routers.get('/products', all)
Routers.get('/product/:id', detail_product)
Routers.put('/product/:id', authorization, cashier, uploadImage, update_product)
Routers.delete('/product/:id', delete_product)

export default Routers
