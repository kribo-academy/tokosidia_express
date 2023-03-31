import {
  checkEmail,
  createUser,
  allUser,
  detailUser,
  updateUser,
  deleteUser,
} from '../models/users.js'
import messages from '../utils/messages.js'

const registration = async (req, res) => {
  const { email, password, role } = req.body

  if (!email || !password) {
    return messages(
      res,
      422,
      `Field${!email ? ' Email' : ''} ${
        !password ? 'Password ' : ''
      }is reuired!`,
    )
  }

  try {
    const check = await checkEmail(email)

    if (check.length) {
      return messages(res, 400, 'Email has been registed')
    }

    const newData = { email, password, role }

    createUser(newData)
      .then(() => {
        messages(res, 201, 'Create user success')
      })
      .catch((error) => {
        messages(res, 500, error.message)
      })
  } catch (error) {
    messages(res, 500, 'Internal server error')
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return messages(
      res,
      422,
      `Field${!email ? ' Email' : ''} ${
        !password ? 'Password ' : ''
      }is reuired!`,
    )
  }

  try {
    const check = await checkEmail(email)

    if (!check.length) {
      return messages(res, 400, 'User not register')
    }

    if (password !== check[0].password) {
      return messages(res, 400, 'Wrong password')
    }

    messages(res, 200, 'Login success')
  } catch (error) {
    messages(res, 500, 'Internal server error')
  }
}

const all = (req, res) => {
  allUser()
    .then((response) => {
      messages(res, 200, 'Get all users', response)
    })
    .catch((err) => {
      messages(res, 500, err.message)
    })
}

const detail = (req, res) => {
  const { id } = req.params
  detailUser(id)
    .then((response) => {
      if (!response.length) return messages(res, 404, `User id ${id} not found`)
      messages(res, 200, 'Detail users', response[0])
    })
    .catch((err) => {
      messages(res, 500, err.message)
    })
}

const update = (req, res) => {
  const { id } = req.params
  const body = req.body

  updateUser(id, body)
    .then((response) => {
      if (response.affectedRows) messages(res, 200, 'Update success')
      else messages(res, 404, `User id ${id} not found`)
    })
    .catch((err) => {
      messages(res, 500, err.message)
    })
}

const delete_user = (req, res) => {
  const { id } = req.params

  deleteUser(id)
    .then((response) => {
      if (response.affectedRows) messages(res, 200, 'Delete success')
      else messages(res, 404, `User id ${id} not found`)
    })
    .catch((err) => {
      messages(res, 500, err.message)
    })
}

export { registration, login, all, detail, update, delete_user }
