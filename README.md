# RESTFUL API TOKOSIDIA

Buatlah project ini kedalam directory yang kalian inginkan, kemudian silahkan init project dengan perintah sebagai berikut ini:

```
npm init
```

Kemudian buatlah file sesuai dengan script main pada package.json yang kalian buat, ditempat saya nama filenya `index.js`.

```
TOKOSIDIA_EXPRESS
----------------------------
  | .env > environment
  | .pretierrc > format documentation
  | index.js
  | package.json
  | public
     | images
       * storage file image for multer
  | src
     | controllers
       * LOGIC etc
     | middleware
       * create authentication, authorization etc...
     | models
       * connecting to DB for access tables
     | routers
       * hanlde routring & middleware
     | utils
       * congifguration or something
```

Kemudian install library berikut ini

```
npm i express cors
```

---

<br/>

## Setup Express

```js
const express = require('express')
const cors = require('cors')

const app = express()

// handle CORS
app.use(cors())

app.get('/', (req, res) => {
  res.send({
    data: null,
    message: 'Hello World!',
  })
})

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`)
})
```

Silahkan jalankan script tersebut menggunakan perintah `node index.js`. Lalu install kembali library nodemon `(npm i nodemon --save-dev)`, Nodemon digunakan untuk menghandle run project secara automatis kita script dijalankan.

Untuk menjalankan ulang script di `index.js` silahkan setting terlebih dahulu tambahkan script didalam package.json seperti berikut:

```js
"scripts": {
  "server": "nodemon index.js"
},
```

Kemudian untuk menjalankan script cukup dengan perintah `npm run server`.

---

<br />

## Routers & Controllers

```js
// ~/controllers/users.js
const list = (req, res) => {
  res.send({
    data: 'Controller',
  })
}

export { list }

// ~/routers/users.js
import express from 'express'
import { list } from '../controllers/users.js'

const Router = express.Router()

Router.get('/users', list)

export default Router
```

---

<br />

## Implementation mysql2

Silahkan install library mysql2 dengan perintah `npm i mysql2`. Buatlah file config.js didalam directory utils.

```js
import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tokosidia',
})

connection.connect(function (err) {
  if (err) {
    console.log('Failed create connection to database', new Error(err))
    process.exit()
  }
  console.log('Connected!')
})

export default connection
```

<br />

## Middleware

### Implementation Upload image use Multer
