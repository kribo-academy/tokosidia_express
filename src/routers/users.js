import express from 'express'
import {
  registration,
  login,
  all,
  detail,
  update,
  delete_user,
} from '../controllers/users.js'

const Router = express.Router()

Router.post('/user/registration', registration)
Router.post('/user/login', login)
Router.get('/users', all)
Router.get('/user/:id', detail)
Router.patch('/user/:id', update)
Router.delete('/user/:id', delete_user)

export default Router
