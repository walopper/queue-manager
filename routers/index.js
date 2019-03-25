'use strict';

const router = require('express').Router();
const queueController = require('../controllers/queue.controller');

// esto podria hacer un control de servicios y puertos abiertos
// tambien podria intercambiar informacion via node-cache para 
// tener estadisticas de los envios.
router.get('/health', (req, res) => res.send('ok'));

router.post('/queue', queueController.add);

module.exports = router;