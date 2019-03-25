'use strict';

const queueService = require('../services/queue.service');
// const logger = require('./logger.controller');

const handleResponse = ( promise, responseCallback ) => promise
    .then(result => {
        console.log("resuelto");
        responseCallback(result)
    })
    .catch(error => {
        console.log("servicio fallo" + error);
        responseCallback(error)
    }) && true; // este true evita devolver una promesa, y que la llamda necesite un catch


const onQueueAdd = ( data, responseCallback ) => {
    console.log("queue_add triggered");
    let requestData;

    try {
        requestData = JSON.parse(data);
    } catch (error) {
        return responseCallback({
            status: 500,
            message: 'JSON.parse error en data received'
        });
    }

    if(requestData && requestData.messageId) {
        let data = {
            messageId: requestData.messageId,
            domain: requestData.recipientDomain,
            requestData: JSON.stringify(requestData),
            ip: requestData.bindingIP,
        }
        handleResponse(queueService.add(data), responseCallback);
    }
}

const socketController = ( socket ) => {
    console.log("Conexion sio entrante");
    socket.on('queue_add', onQueueAdd);
}

function init(io) {
    io.on('connection', socketController);
}

module.exports = init;