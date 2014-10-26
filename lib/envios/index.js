var app = require('express')();
var shortId = require('shortid');
var logger = require('../logger');
var _ = require('lodash');
var Envio = require('./model');

//var db = {};

/* Rutas para [envios] */

app.get('/envios', function(req, res) {
  //var envios = _.values(db);
  Envio.find({}, function(err, envios){
    res
      .status(200)
      .set('Content-Type','application/json')
      .json({
        envios: envios
       });
    });
});


app.route('/envios/:id?')

  .all(function(req, res, next){
    //console.log(req.method, req.path, req.body);
    res.set('Content-Type', 'application/json');
    next();
  })

  .post(function(req, res){
      var envioNuevo = req.body.envio;
      // Crear un nuevo objeto en la base de datos
      Envio.create(envioNuevo, function(err, envio){
      // Respuesta
      res
        .status(201)
        .json({
          envio: envio
        });
      })

      /*
      TEST SIN PERSISTENCIA
      envioNuevo.id = shortId.generate();
      envioNuevo.fecha_creacion = new Date();
      envioNuevo.notificaciones_url = req.protocol +'://'+ req.get('host')
      +'/envios/' + envioNuevo.id + '/notificaciones';
      envioNuevo.estado = '0';
      db[envioNuevo.id] = envioNuevo;
      */
  })

  .get(function(req, res, next){
    // Obtener envios por id
      var id = req.params.id;

      if(!id){
        return next();
      }


      Envio.findById(id, function(err, envio){

        if(!envio){
          return res
            .status(404)
            .send({});
        }

        res.json({
            envio: envio
          })

    })
  })

  .put(function(req, res){
    var id = req.params.id;
    var envioActualizado = req.body.envio;

    if(!id){
      return next();
    }

    Envio.update({_id:id}, envioActualizado, function(err, envio, results){

      if(results.ok){
        return res
          .json({
            envio: results
          });
      }
      res
        .status(500)
        .send(err);
    });
  })

  .delete(function(req, res){
    var id = req.params.id;

    if(!id){
      return next();
    }

    Envio.remove({_id:id} , function(err){
      res
        .status(204)
        .send();
    });
  });


module.exports = app;
