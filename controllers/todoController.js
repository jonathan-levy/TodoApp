var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://jojo:jojo@ds129038.mlab.com:29038/todo-jojo');

//Create a schema - This is like a blueprint
var todoSchema = new mongoose.Schema({
	item : String
})

var Todo = mongoose.model('Todo', todoSchema);

/*var itemOne = Todo({item: 'buy flowers'}).save(function(err){

	if(err) throw err;
	console.log('item saved');
}
	);
*/
//var data = [{item : 'get milk'}, {item : 'walk dog'}, {item : 'kick some coding ass'}];


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app)
{

	app.get('/todo', function(req, res)
	{ // get data forom mongodb and pass to the view
		Todo.find({}, function(err,data){
			if(err) throw err;
			res.render('todo', {jojo:data});
		})
	});

	app.post('/todo', urlencodedParser, function(req, res)
	{
		//get data fron the view and add it to mongodb
		var newTodo = Todo(req.body).save(function(err,data){
			if(err) throw err;
			res.json(data);

		})
		//data.push();
	});

	app.delete('/todo/:item', function(req, res)
	{
		//delete the resquested item from mongodb
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
 
		if(err) throw err;
		res.json(data);

		});
		
		//data = data.filter(function(todo){
		//		return todo.item.replace(/ /g, '-') !== req.params.item;
		//	});
		//res.json(data);
	});

};