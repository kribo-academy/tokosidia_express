import express from 'express'
import cors from 'cors'
import users_route from './src/routers/users.js'
import products_route from './src/routers/products.js'

const app = express()

// handle CORS
app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

app.get('/api/v1', (req, res) => {
  res.send({
    message: 'Hello World! - Api V1',
  })
})

app.use('/api/v1', users_route)
app.use('/api/v1', products_route)

// route image
app.use(`/api/v1/image/`, express.static('./public/images'))

app.listen(3001, () => {
  console.log(`Server running on http://localhost:${3001}`)
})
