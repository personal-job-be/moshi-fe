import express from 'express'
import axios from 'axios'
const $config  = require('../nuxt.config');
const API_URL = $config.default.publicRuntimeConfig.API_URL
const app = express()

app.use(express.json())

app.get('/', async (req,res)=> {
  try {
    const response = await axios.get(`${API_URL}/users`,{
      headers : {
        Authorization : req.headers.token
      }
    })
    return res.status(200).json({
      success: true,
      data: response.data,
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    })
  }
})

app.get('/findone/:id', async (req,res)=> {
  try {
    const response = await axios.get(`${API_URL}/users/${req.params.id}`,{
      headers : {
        Authorization : req.headers.token
      }
    })
    return res.status(200).json({
      success: true,
      data: response.data,
    })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    })
  }
})

app.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local/register`, {
      email : req.body.email,
      username : req.body.email,
      password : req.body.password,
      confirmed : true,
      role : 'Authenticated'
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

app.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local`, {
      identifier : req.body.email,
      password : req.body.password,
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

app.put('/permission/:id', async (req, res) => {
  try {
    const response = await axios.put(`${API_URL}/users/${req.params.id}`, {
      permission : req.body.permission,
    },{
      headers : {
        'Content-Type': 'application/json',
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

export default {
  path: '/api/user',
  handler: app,
}