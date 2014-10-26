/*Dependencias*/
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('./lib/logger');
var cors  = require('cors');

/*Variables locales*/
var server = module.exports = express();
var port = process.env.PORT || 3000;

/*Middlewares*/
server.use(bodyParser.json('application/json'));
server.use(cors());

/*Modulos locales*/
var envios = require('./lib/envios');
server.use('/api/v0.3/', envios);

server.use('/api/v0.3', function(req, res){
	res.json({
	"sensor-api":{
		"version": "0.3",
		"recursos": {
			"envios": "/api/v0.3/envios",
			"notificaciones": ""
		}
	}
	});
});

/*Exponer el servidor*/
if (!module.parent) {
  server.listen(port, function() {
    logger.info(' Escuchando en http://localhost:%s/', port);
  });
}
