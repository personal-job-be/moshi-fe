import express from 'express'
import axios from 'axios'
const $config  = require('../nuxt.config');
const API_URL = $config.default.publicRuntimeConfig.API_URL
const app = express()

app.use(express.json())

app.get('/all', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/therapists?isDeleted=false`, {
      headers : {
        Authorization : req.headers.token
      }
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
    const response = await axios.post(`${API_URL}/therapists`, {
      name : req.body.name,
      isvalid : true,
      comission : req.body.comission,
      absensi : req.body.absensi,
      users_permissions_user : req.body.user
    }, {
      headers : {
        'Content-Type': 'application/json',
        Authorization : req.headers.token
      }
    },)
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
    const response = await axios.put(`${API_URL}/therapists/${req.params.id}`, {
      name : req.body.name,
      isvalid : req.body.isValid,
      comission : req.body.comission,
      absensi : req.body.absensi,
      users_permissions_user : req.body.user
    }, {
      headers : {
        'Content-Type': 'application/json',
        Authorization : req.headers.token
      }
    },)
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
    const response = await axios.put(`${API_URL}/therapists/${req.params.id}`, {
      isDeleted : true
    }, {
      headers : {
        'Content-Type': 'application/json',
        Authorization : req.headers.token
      }
    },)
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
  path: '/api/therapists',
  handler: app,
}