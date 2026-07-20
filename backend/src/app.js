const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const client = require('prom-client');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')

const app = express();

const register = new client.Registry();

client.collectDefaultMetrics({ register });

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics()); // Reads from Registry & Exports it
});

app.get('/simulate-error', (req, res) => {
  res.status(500).send('💥 Simulated 500 Internal Server Error!');
});

app.use(cors())

app.use(express.json());

app.get('/', (req, res) =>{
    res.send("hello world");
})
 app.use('/ai', aiRoutes)

module.exports = app;