import express from 'express'
import axios from 'axios'
const $config  = require('../nuxt.config');
const API_URL = $config.default.publicRuntimeConfig.API_URL
const app = express()

app.use(express.json())

app.get('/:month/:year', async(req,res)=> {
  try {
    const month = req.params.month
    const year = req.params.year
    const therapist = req.headers.therapist
    const response = await axios.get(`${API_URL}/absences?month=${month}&year=${year}&therapist=${therapist}&_limit=-1`,{
      headers : {
        Authorization : req.headers.token
      }
    })

    console.log(response);
    
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
    const response = await axios.put(`${API_URL}/absences/${req.params.id}`, {
      attendance : req.body.attendance,
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

app.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/absences`, {
      month : req.body.month,
      year : req.body.year,
      attendance : req.body.attendance,
      therapist : req.body.therapist,
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

export default {
  path: '/api/absence',
  handler: app,
}