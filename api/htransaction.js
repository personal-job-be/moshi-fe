import express from 'express'
import axios from 'axios'
const $config  = require('../nuxt.config');
const API_URL = $config.default.publicRuntimeConfig.API_URL
const app = express()

app.use(express.json())

app.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/h-transactions?note_contains=${req.params.id}&_limit=-1`,{
      headers : {
        Authorization : req.headers.token
      }
    })
    let note = null
    if(response.data.length > 0)
    {
      let index = response.data.map(note => parseInt(note.note.substring(9,11))).reduce((prev,current) => prev > current ? prev : current )
      index ++ 
      const indexStr = index.toString().length === 1 ? '0'+index.toString() : index.toString()
      note = req.params.id + indexStr
    }
    else
      note = req.params.id + '01'      
     
    return res.status(200).json({
      success: true,
      data: note,
    })
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    })
  }
})

app.get('/date/:date', async(req,res)=> {
  try {
    const response = await axios.get(`${API_URL}/h-transactions?date=${req.params.date}&_limit=-1`,{
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

app.get('/salary/:start/:end', async (req, res) => {
  try {
    const id = req.headers.therapist
    const start = req.params.start
    const end = req.params.end
    console.log('rex',req.headers.token);
    const response = await axios.get(`${API_URL}/h-transactions/salary/${id}/${start}/${end}`,{
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
    const response = await axios.post(`${API_URL}/h-transactions`, {
      note : req.body.note,
      member : req.body.member,
      name : req.body.name,
      date : req.body.date,
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
    const response = await axios.put(`${API_URL}/h-transactions/${req.params.id}`, {
      member : req.body.member,
      name : req.body.name,
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
  path: '/api/htrans',
  handler: app,
}