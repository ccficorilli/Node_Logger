var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')

//var rfs = require('rotating-file-stream')

var app = express()
var logDirectory = path.join(__dirname, 'log.csv')
//var bodyParser = require('body-parser')
// ensure log directory exists
//fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream

var accessLogStream = fs.createWriteStream(logDirectory, {
  flags: 'a'
});
//   interval: '1d', // rotate daily
//   path: logDirectory
// })

// setup the logger
app.use(morgan('dev'));
app.use(morgan('{":user-agent", ":date[iso]", ":method", ":url", ":http-version", ":status"}', {
  stream: accessLogStream
}));

app.get('/', function (req, res) {
  res.send('OK!')
  console.log('this should have logged to the file')
});
app.get('/logs', function (req, res) {
  res.status(200);
  var logData = fs.readFileSync('log.csv');
  var stringData = logData.toString();
  console.log(stringData);
  res.json(stringData);
//   var arrayOne = stringData.split('\r\n');
//   var header = arrayOne[0].split(',');
//   var noOfCol = header.length;
//   var noOfRow=arrayOne.length;
//   var display = [];

//   var i = 0;
//     //for (i = 1; i < noOfRow - 1; i++) {

//     for (i = 0; i < noOfRow - 1; i++) {

//       var myNewLine = arrayOne[i].split(',');
//       display.push('{' + header[i] + ':' + myNewLine[i] + '}');
//    });
  

  console.log(display);
  //res.send(display);

});




// app.get('/', (req, res) => {
// // write your code to respond "ok" here
// console.log('OK');
// res.status(200).send('Page displayed OK!');
// });

// app.get('/logs', (req, res) => {
// // write your code to return a json object containing the log data here
// res.status(200).json('./log.csv');
// });

module.exports = app;
