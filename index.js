'use strict';

const Hapi = require('@hapi/hapi');
const axios = require('axios');
const convert = require('xml-js');

function generateResponse(payload){
    return convert.xml2json(payload, {compact: true, spaces: 4});
}

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'], // an array of origins or 'ignore'
                headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers' 
                exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
                additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
                credentials: true // boolean - 'Access-Control-Allow-Credentials'
            }
        }
    });

    server.route(
    {
        method: 'GET',
        path: '/products',
        handler: (request, h) => {
            return axios(
                {
                    method: 'get',
                    url: 'http://api.elevenia.co.id/rest/prodservices/product/listing?page=1',
                    headers: {
                        openapikey : '721407f393e84a28593374cc2b347a98'
                    },
                    responseType: 'application/json'
                })
            .then(function (response) {
              // handle success
              return generateResponse(response.data);
            })
            .catch(function (error) {
              // handle error
              return generateResponse("");
            });
          
        }
    }
    );

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();