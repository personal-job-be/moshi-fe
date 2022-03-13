import express from 'express'
import axios from 'axios'
const $config = require('../nuxt.config')
const API_URL = $config.default.publicRuntimeConfig.API_URL
const app = express()

app.use(express.json())

app.get('/all', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/types?isDeleted=false`, {
      headers: {
        Authorization: req.headers.token,
      },
    })
    return res.status(200).json({
      success: true,
      data: response.data,
    })
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    })
  }
})

app.post('/', async (req, res) => {
  try {
    const response = await axios.post(
      `${API_URL}/types`,
      {
        name: req.body.name,
        isvalid: true,
        base_price: req.body.basePrice,
        sale_price: req.body.salePrice,
        users_permissions_user: req.body.user,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.token,
        },
      }
    )
    return res.status(200).json({
      success: true,
      data: response.data,
    })
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    })
  }
})

app.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(
      `${API_URL}/types/${req.params.id}`,
      {
        name: req.body.name,
        isvalid: req.body.isValid,
        base_price: req.body.basePrice,
        sale_price: req.body.salePrice,
        users_permissions_user: req.body.user,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.token,
        },
      }
    )
    return res.status(200).json({
      success: true,
      data: response.data,
    })
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    })
  }
})

app.put('/delete/:id', async (req, res) => {
  try {
    const response = await axios.put(
      `${API_URL}/types/${req.params.id}`,
      {
        isDeleted: true,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.token,
        },
      }
    )
    return res.status(200).json({
      success: true,
      data: response.data,
    })
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    })
  }
})

export default {
  path: '/api/types',
  handler: app,
}
