"use strict"
// var http = require('http');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 
var https = require('https');
let request = require('request')
let argv = require('yargs').default('host', 'localhost')
                            .usage('Usage: $0 <command> [options]')
                            .example('$0 node index.js -p 8001 -h google.com')
                            .alias('p', 'port')
                            .describe('p', 'Specify a forwarding port')
                            .alias('x', 'host')
                            .describe('x', 'Specify a forwarding host')                            
                            .alias('l', 'log')
                            .describe('l', 'Specify a output log file')                            
                            .help('h')
                            .alias('h', 'help')
                            .epilog('copyright 2015 Dang Kim Khanh')
                            .argv
let path = require('path')
let fs = require('fs')
let spawn = require('child_process').spawn

let scheme = 'https://'
let port = argv.port || (argv.host === 'localhost' ? 8000 : 80)
let destinationURL = argv.url || scheme + argv.host + ':' + port
// let destinationURL = 'localhost:8000' || scheme + argv.host + ':' + port
// let destinationURL = '127.0.0.1:8000'

let logPath = argv.log && path.join(__dirname + "/logs", argv.log)
// let getLogStream = () => {logPath ? fs.createWriteStream(logPath) : process.stdout}
let logStream = logPath ? fs.createWriteStream(logPath) : process.stdout

let currentLogLevel = argv.loglevel

// let logLevels = ['Emergency', 'Alert', 'Critical', 'Error', 
//                  'Warning', 'Notice', 'Informational', 'Debug' ] 

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

let logLevel = {
    Emergency: 7,
    Alert: 6,
    Critical: 5,
    Error: 4,
    Warning: 3,
    Notice: 2,
    Informational: 1,
    Debug: 0
}


function log(level, msg) {
    if (level <= logLevel){
        
    }   
}


// if(argv.exec){
//     console.log(argv.exec)
//     spawn(argv.exec)
// }

https.createServer(options, (req, res) =>{
    console.log(`Request received at: ${req.url}`)
    for(let header in req.headers){
        res.setHeader(header, req.headers[header])
    } 

    req.pipe(res)
    logStream.write("\n")    
}).listen(8000)

https.createServer(options, (req, res) =>{ 
    console.log(`Proxying request to: ${destinationURL}${req.url} `)
    req.headers['x-destination-url'] 
    let options = {
        headers: req.headers,
        url: req.headers['x-destination-url'] || `${destinationURL}`
    }

    console.log(`TEST ${argv.port}`)
    console.log(`TEST ${argv.url}`)

    options.method = req.method
    // req.pipe(request(options)).pipe(res)

    let downstreamResponse = req.pipe(request(options))
    process.stdout.write(JSON.stringify(downstreamResponse.headers))
    downstreamResponse.pipe(process.stdout)
    downstreamResponse.pipe(res)

    logStream.write("Request Headers: " + JSON.stringify(req.headers) + "\n")
    process.stdout.write('\n\n\n' + JSON.stringify(req.headers))
    // req.pipe(progess.stdout)
    // req.pipe(getLogStream())

    req.pipe(logStream, {end: false})
}).listen(8001)
