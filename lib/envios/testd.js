var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/rel');


NotSchema = new Schema({
    tmp : String
});

var Not = mongoose.model('not', NotSchema);


EnvSchema = new Schema({
    origen : String,
    nots  : [{ type: ObjectId, ref: 'NotSchema' }]
});

var Env = mongoose.model('env', EnvSchema);



var newNot = new Not({tmp: 40});

newNot.save();


//var newEnvSchema = new Env({origen: 'Monteria', nots: newNot._id});
//newEnvSchema.save();


mongoose.disconnect();