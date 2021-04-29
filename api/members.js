import express from 'express'
import axios from 'axios'
const $config  = require('../nuxt.config');
const API_URL = $config.default.publicRuntimeConfig.API_URL
const app = express()

app.use(express.json())

app.get('/initial/:initial', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/members?initial=${req.params.initial}&_limit=-1`, {
      headers : {
        Authorization : req.headers.token
      }
    })

    let result = 1

    if(response.data.length > 0) {
      result = response.data.map(el => parseInt(el.kode.substring(1,el.kode.length)))
        .reduce((prev,current) => prev > current ? prev : current) + 1
    }
     
    return res.status(200).json({
      success: true,
      data: req.params.initial + result.toString(),
    })
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    })
  }
})

app.get('/search/:key', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/members?name_contains=${req.params.key}&_limit=-1`, {
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
    const response = await axios.post(`${API_URL}/members`, {
      name : req.body.name,
      address : req.body.address,
      hp : req.body.hp,
      gender : req.body.gender,
      comment : req.body.comment,
      kode : req.body.code,
      initial : req.body.initial,
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
    const response = await axios.put(`${API_URL}/members/${req.params.id}`, {
      name : req.body.name,
      address : req.body.address,
      hp : req.body.hp,
      gender : req.body.gender,
      comment : req.body.comment,
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

export default {
  path: '/api/members',
  handler: app,
}