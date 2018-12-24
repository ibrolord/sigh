var AWS = require('aws-sdk');
// const cors = require("cors")({origin:true});
var ses = new AWS.SES();
 

var RECEIVER = 'cahanonu@goshenconsulting.ca';
var SENDER = 'cahanonu@goshenconsulting.ca';
var client_response = `
   <pre> Thank you for reaching out to us. We have received your message and we will respond within two
business days. In the mean time, you can check <a href="https://www.fortlaw.ca.ca/FAQs">our website</a> for general inquiries.

Regards,
Fort Law Team</pre>`;

var clientEmail = "event.email";

// var response = 
//   {
//       statusCode:200,
//     "headers": {
//         "Access-Control-Allow-Origin" : "https://goshenconsulting.ca"},
//         "body":"done",
//     "method": ["POST"],
//   }
// ;



exports.handler = (event, context, callback) => {
    console.log('Received event:', event);
    sendEmail(event, function (err, data) {
        var response = {
            "isBase64Encoded": false,
            "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://www.fortlaw.ca' },
            "statusCode": 200,
            "body": "{\"result\": \"Success.\"}"
        };
        callback(err, response);
    });
};

// 1. send to Charles
function sendEmail (event, done) {

    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'name: ' + event.name +  '\nemail: ' + event.email + '\ndesc: ' + event.desc,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Website Referral Form: ' + event.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    var params2 = {
        Destination: {
            ToAddresses: [
                event.email
            ]
        },
        Message: {
            Body: {
                Html: {
                    Data: client_response,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Submition Received: Thank You',
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    
    var prom = new Promise((resolve, reject)=>{
            ses.sendEmail(params, done);
            ses.sendEmail(params2, done); 
            
            resolve();
    })
    
    
}