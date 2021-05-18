import express from 'express'
import axios from 'axios'
const $config  = require('../nuxt.config');
const API_URL = $config.default.publicRuntimeConfig.API_URL
const app = express()

app.use(express.json())

app.get('/:start/:end', async (req, res) => {
  try {
    console.log('reza');
    const response = await axios.get(`${API_URL}/members?updatedAt_gte=${req.params.start}&updatedAt_lte=${req.params.end}&_limit=-1`, {
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
  path: '/api/logs',
  handler: app,
}