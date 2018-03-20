const express = require('express');
const app = express();
const fs = require('fs');
const log = ('./log.csv');
const tester = ('./tester.csv')
app.get('/', function (req, res) {
  res.status(200);
 // console.log(req);
  var time = new Date().toISOString();

  var agent = req.headers['user-agent'];
  agent = agent.replace(',', '-');
  var method = req.method;
  var resource = req.url;
  var version = 'HTTP ' + req.httpVersion;
  var status = res.statusCode;
  var logData = [agent,time,method,resource,version,status];
  fs.appendFile(log, '\r\n' + logData, function (err) {
    if (err) throw err;
    else console.log('Log Updated!')
  });
  console.log(logData);

  res.send('OK');
})

//////Setup data for display
app.get('/logs', function (req, res) {
  res.status(200);

   //Create keys/data arrays for JSON
  var jsonData = fs.readFileSync(log, 'utf8').split('\r\n');
  //console.log(jsonData)
  var csvHeader = jsonData.splice(0, 1);
  var headerArray = csvHeader[0].split(',');

  //Organize the data for JSON export
  var lineData = jsonData.map(function (data) {
    var obj = {}
    for (i = 0; i < headerArray.length; i++) {
      var temp = data.split(',');
      obj[headerArray[i]] = temp[i];

    }    
    return obj;
    //console.log (obj);
  })


  console.log('Everything seems in order...')
  
  
  res.send(lineData);
})

module.exports = app;
