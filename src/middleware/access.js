import { detailUser } from '../models/users.js'
import messages from '../utils/messages.js'

const authorization = async (req, res, next) => {
  const user_id = req.params.user_id || req.query.user_id

  try {
    const user = await detailUser(user_id)

    if (!user.length) return messages(res, 404, `User id ${user_id} not found`)

    res.access = user[0].role

    next()
  } catch (error) {
    messages(res, 500, 'Internal server error')
  }
}

const admin = (req, res, next) => {
  const access = Number(res.access)
  if (access === 1) {
    next()
  } else {
    messages(res, 403, 'Access forbiden')
  }
}

const cashier = (req, res, next) => {
  const access = Number(res.access)
  if (access === 0) {
    next()
  } else {
    messages(res, 403, 'Access forbiden')
  }
}

export { authorization, admin, cashier }
