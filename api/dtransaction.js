import express from 'express'
import axios from 'axios'
const $config  = require('../nuxt.config');
const API_URL = $config.default.publicRuntimeConfig.API_URL
const app = express()

app.use(express.json())

app.get('/:note', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/d-transactions?h_transaction=${req.params.note}`,{
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
    const response = await axios.post(`${API_URL}/d-transactions`, {
      h_transaction : req.body.h_transaction,
      therapist : req.body.therapist,
      type : req.body.type,
      promo : req.body.promo,
      users_permissions_user : req.body.user
    },{
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

app.put('/:id', async (req, res) => {
  try {
    const response = await axios.put(`${API_URL}/d-transactions/${req.params.id}`, {
      therapist : req.body.therapist,
      type : req.body.type,
      promo : req.body.promo,
      users_permissions_user : req.body.user
    },{
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

app.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${API_URL}/d-transactions/${req.params.id}`, {
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

export default {
  path: '/api/dtrans',
  handler: app,
}