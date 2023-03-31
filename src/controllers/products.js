import { detailUser } from '../models/users.js'
import {
  createProduct,
  detailProduct,
  editProduct,
  allProduct,
  deleteProduct,
} from '../models/products.js'
import messages from '../utils/messages.js'
import fs from 'fs'

const create = async (req, res) => {
  const user_id = req.params.user_id
  const body = req.body
  const file = req.file

  try {
    const detail = await detailUser(user_id)

    if (!detail.length)
      return messages(res, 404, `User ID ${user_id} not found`)

    const data = { ...body, users_id: user_id }

    if (file && file.fieldname) {
      Object.assign(data, { image: file.filename })
    }

    createProduct(data)
      .then(() => {
        messages(res, 201, 'Create product success')
      })
      .catch((err) => {
        if (file && file.fieldname) {
          const path = `./public/images/${file.filename}`
          fs.unlinkSync(path) // delete file
        }

        messages(res, 500, err.message)
      })
  } catch (error) {
    messages(res, 500, 'Internal server error')
  }
}

const update_product = async (req, res) => {
  const user_id = req.query.user_id
  const product_id = req.params.id
  const file = req.file
  const body = req.body

  try {
    const detail_user = await detailUser(user_id)
    const detail_product = await detailProduct(product_id)

    if (!detail_user.length) {
      const path = `./public/images/${file.filename}`
      fs.unlinkSync(path) // delete file
      return messages(res, 404, `User ID ${user_id} not found`)
    }

    if (!detail_product.length) {
      const path = `./public/images/${file.filename}`
      fs.unlinkSync(path) // delete file
      return messages(res, 404, `Product ID ${product_id} not found`)
    }

    const data = { ...body, users_id: user_id }

    if (file && file.fieldname) {
      Object.assign(data, { image: file.filename })

      const path = `./public/images/${detail_product[0].image}`

      // check file existting image
      if (fs.existsSync(path)) {
        fs.unlinkSync(path) // delete old file
      }
    } else {
      delete data.image
    }

    editProduct(product_id, data)
      .then(() => {
        messages(res, 200, 'Update product success')
      })
      .catch((err) => {
        messages(res, 500, err.message)
      })
  } catch (error) {
    messages(res, 500, 'Internal server error')
  }
}

const all = (req, res) => {
  allProduct()
    .then((response) => {
      messages(res, 200, 'Get product', response)
    })
    .catch((err) => {
      messages(res, 500, 'Internal server error')
    })
}

const detail_product = (req, res) => {
  const id = req.params.id
  detailProduct(id)
    .then((response) => {
      if (!response.length)
        return messages(res, 404, `Product id ${id} not found`)

      messages(res, 200, 'Get product', response[0])
    })
    .catch((err) => {
      messages(res, 500, 'Internal server error')
    })
}

const delete_product = async (req, res) => {
  const id = req.params.id

  try {
    const detail = await detailProduct(id)

    if (!detail.length) return messages(res, 404, `Product id ${id} not found`)

    const image = detail[0].image
    const path = `./public/images/${image}`

    // check file existting image
    if (fs.existsSync(path)) {
      fs.unlinkSync(path) // delete file
    }

    deleteProduct(id)
      .then((response) => {
        messages(res, 200, 'Delete product success')
      })
      .catch((err) => {
        messages(res, 500, err.message)
      })
  } catch (error) {
    messages(res, 500, 'Internal server error')
  }
}

export { create, update_product, all, detail_product, delete_product }
