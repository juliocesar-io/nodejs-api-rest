var mongoose = require('mongoose');
var Schema = mongoose.Schema

//Conexión a la base de datos
mongoose.connect('mongodb://localhost/sensor-api');


var envioSchema = new Schema({
	origen: String,
	notificaciones: [{type: Schema.ObjectId, ref: 'notificacion' }]
});
module.exports = mongoose.model('envio', envioSchema);



var notificacionSchema = new Schema({
	temp: {type: String,  required: false}
});
module.exports = mongoose.model('notificacion', notificacionSchema);

