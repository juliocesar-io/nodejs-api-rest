var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");


mongoose.connect('mongodb://localhost/rel2');

var ParentSchema = new mongoose.Schema({
    children:[{ type:Schema.ObjectId, ref:"Child" }]
});
var Parent = mongoose.model("Parent", ParentSchema);

var ChildSchema = new mongoose.Schema({
    parent: { type:Schema.ObjectId, ref:"Parent", childPath:"children" }
});
ChildSchema.plugin(relationship, { relationshipPathName:'parent' });
var Child = mongoose.model("Child", ChildSchema)

//var parent = new Parent({});
//parent.save();
var child = new Child({parent:parent._id});
child.save() //the parent children property will now contain child's id
//child.remove() //the parent children property will no longer contain the child's id


mongoose.disconnect();