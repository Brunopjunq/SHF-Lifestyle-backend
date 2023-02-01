import express from 'express';
import cors from 'cors';
import router from './routers/index.js';

const server = express();

server
.use(cors())
.use(express.json())
.use(router)
.get('/status', (req,res) => {
    res.send('Ok')
});

server.listen(4000, () => {
    console.log('Listening on port 4000')
});