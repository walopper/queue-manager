'use strict';

const queueService = require('../services/queue.service');

const handleResponse = (promise, res) => promise
    .then(result => res.json(result))
    .catch(error => res.status(error.status).json({ message: '' })) && true;

const add = (req, res) => handleResponse(queueService.add(req.body), res);
const getChenk = (req, res) => handleResponse(queueService.getChenk(req.body), res);

module.exports = {
    add,
    getChenk
};