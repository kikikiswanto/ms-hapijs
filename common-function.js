var parseString = require('xml2js').parseString;

export class CommonFunction {

    generateResponse(payload){
        parseString(payload, function (err, result) {
            return {
                responseCode : 200,
                responseStatus : 'OK',
                data : result
            }
        });
        
    }
}