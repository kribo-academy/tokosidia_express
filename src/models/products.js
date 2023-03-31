import connection from '../utils/config.js'

const createProduct = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO products SET?', data, (err, result) => {
      if (!err) resolve(result)
      else reject(new Error(err))
    })
  })
}

const allProduct = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM products', (err, result) => {
      if (!err) resolve(result)
      else reject(new Error(err))
    })
  })
}

const detailProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM products WHERE id=${id}`, (err, result) => {
      if (!err) resolve(result)
      else reject(new Error(err))
    })
  })
}

const editProduct = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE products SET? WHERE id=${id}`,
      data,
      (err, result) => {
        if (!err) resolve(result)
        else reject(new Error(err))
      },
    )
  })
}

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM products WHERE id=${id}`, (err, result) => {
      if (!err) resolve(result)
      else reject(new Error(err))
    })
  })
}

export { createProduct, allProduct, detailProduct, editProduct, deleteProduct }
