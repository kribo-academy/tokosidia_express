import connection from '../utils/config.js'

const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT email, password FROM users WHERE email='${email}'`,
      (err, result) => {
        if (!err) resolve(result)
        else reject(new Error(err))
      },
    )
  })
}

const createUser = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET?', data, (err, result) => {
      if (!err) resolve(result)
      else reject(new Error(err))
    })
  })
}

const allUser = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT id, email, image, created_at, updated_at FROM users',
      (err, result) => {
        if (!err) resolve(result)
        else reject(new Error(err))
      },
    )
  })
}

const detailUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, email, image, role, created_at, updated_at FROM users WHERE id=${id}`,
      (err, result) => {
        if (!err) resolve(result)
        else reject(new Error(err))
      },
    )
  })
}

const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE users SET? WHERE id=${id}`,
      data,
      (err, result) => {
        if (!err) resolve(result)
        else reject(new Error(err))
      },
    )
  })
}

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM users WHERE id=${id}`, (err, result) => {
      if (!err) resolve(result)
      else reject(new Error(err))
    })
  })
}

export { checkEmail, createUser, allUser, detailUser, updateUser, deleteUser }
