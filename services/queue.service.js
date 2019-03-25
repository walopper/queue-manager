'use strict';

const fs = require('promise-fs');
const QueueModel = require('../models/queue.model');

const mapDomain = require('../utils/domainMapper');

/**
 * guarda el email en archivo y en mongo
 */
const add = ({ messageId, domain, requestData, ip }) => new Promise(async (resolve, reject) => {
    if (!messageId) {
        reject({
            status: 400,
            message: 'missing messageId'
        });
    }

    if (!requestData) {
        reject({
            status: 400,
            message: 'missing requestData'
        });
    }

    let dir = `/var/spool/smtp_queue/`;


    domain = mapDomain(domain);

    // guardo el archivo
    fs.writeFile(dir + messageId, requestData)
        .catch((error) => reject({
            status: 500,
            message: 'cannot write file in ' + dir + '/' + messageId
        }))
        .then(result => {
            console.log("file saved " + dir + messageId);

            const newQueue = new QueueModel({ messageId, ip, domain });

            console.log("guardando en mongo");

            newQueue.save((error, result) => {
                if (error) {
                    console.log("mongo fail", error);
                    return reject({
                        status: 500,
                        message: error
                    });
                }

                console.log("mongo resolved", result);
                resolve({
                    id: result._id
                });
            })
        })
});

const getChunk = () => {

}

module.exports = {
    add,
    getChunk
}