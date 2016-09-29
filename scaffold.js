var appName = process.argv[2].toString();

var obj = process.argv[3].toString();
var objModel = obj[0].toUpperCase() + obj.slice(1, obj.length - 1);

var br = '\n';
var tab = '\t';

var fs = require('fs');

fs.mkdir('./' + appName, function(err){
  if (err) {
    console.log('ERROR: Creating project directory');
  } else {
    console.log('SUCCESS: Created project directory');
  }
});

var code = '';

code += 'var express = require(\'express\');' + br;
code += 'var app = express();' + br;
code += br;
code += 'var logger = require(\'morgan\');' + br;
code += br;
code += 'var bodyParser = require(\'body-parser\');' + br;
code += br;
code += 'var ' + objModel.toLowerCase() + 'Routes = require(\'./routes/' + obj + '.js\');' + br;
code += br;
code += 'var mongoose = require(\'mongoose\');' + br;
code += br;
code += 'mongoose.connect(\'mongodb://localhost/' + appName + '\', function(err, db){' + br;
code += tab + 'if(err) {' + br;
code += tab + tab + 'console.log("ERROR: DB Connection.");' + br;
code += tab + '} else {' + br;
code += tab + tab + 'console.log("SUCCESS: DB Connected.");' + br;
code += tab + '}' + br;
code += '});' + br;
code += br;
code += 'app.use(logger("dev"));' + br;
code += 'app.use(bodyParser.json());' + br;
code += 'app.user(\'/' + obj + '\', ' +  objModel.toLowerCase() + 'Routes);' + br;
code += br;
code += 'app.listen(3000, function(){' + br;
code += tab + 'console.log("Server running on port 3000!");' + br;
code += '});';



fs.writeFile('./' + appName + '/server.js', code, function(err){
  if (err) {
    console.log('ERROR: Creating server.js');
  } else {
    console.log('SUCCESS: Created server.js');
  }
});

fs.mkdir('./' + appName + '/routers', function(err){
  if (err) {
    console.log('ERROR: Creating routers directory.');
  } else {
    console.log('SUCCESS: Created routers directory.');

    var code = '';

    code += 'var express = require(\'express\');' + br;
    code += 'var router = express.Router();' + br;
    code += br;
    code += 'var controller = require(\'../controllers/' + obj + '.js\');' + br;
    code += br;
    code += 'router.route(\'/\')' + br;
    code += tab + '.get(controller.index)' + br;
    code += tab + '.post(controller.create);' + br;
    code += br;
    code += 'router.route(\'/:id\')' + br;
    code += tab + '.get(controller.index)' + br;
    code += tab + '.patch(controller.update)' + br;
    code += tab + '.delete(controller.delete);' + br;
    code += br;
    code += 'module.exports = router;';


    fs.writeFile('./' + appName + '/routers/' + obj + '.js', code, function(err){
      if (err) {
        console.log('ERROR: Creating /routers/' + obj + '.js');
      } else {
        console.log('SUCCESS: Created /routers/' + obj + '.js');
      }
    });
  }
});

fs.mkdir('./' + appName + '/models', function(err){
  if (err) {
    console.log('ERROR: Creating models directory.');
  } else {
    console.log('SUCCESS: Created models directory.');

    var code = '';

    code += 'var mongoose = require(\'mongoose\');' + br;
    code += br;
    code += 'var ' + objModel.toLowerCase() + 'Schema = mongoose.Schema({' + br;
    code += br;
    code += '});' + br;
    code += br;
    code += 'var ' + objModel + ' = mongoose.model(\'' + objModel + '\', ' + objModel.toLowerCase() + 'Schema);' + br;
    code += br;
    code += 'module.exports = ' + objModel + ';';

    fs.writeFile('./' + appName + '/models/' + objModel + '.js', code, function(err){
      if (err) {
        console.log('ERROR: Creating /models/' + objModel + '.js');
      } else {
        console.log('SUCCESS: Created /models/' + objModel + '.js');
      }
    });
  }
});

fs.mkdir('./' + appName + '/views', function(err){
  if (err) {
    console.log('ERROR: Creating views directory.');
  } else {
    console.log('SUCCESS: Created views directory.');
    fs.writeFile('./' + appName + '/views/' + obj + '.js', '//TODO', function(err){
      if (err) {
        console.log('ERROR: Creating /views/' + obj + '.js');
      } else {
        console.log('SUCCESS: Created /views/' + obj + '.js');
      }
    });
  }
});

fs.mkdir('./' + appName + '/controllers', function(err){
  if (err) {
    console.log('ERROR: Creating controllers directory.');
  } else {
    console.log('SUCCESS: Created controllers directory.');

    var code = '';
    code += 'var ' + objModel + ' = require(\'../models/' + objModel + '.js\');' + br;
    code += br;
    code += 'var controller = {' + br;

    code += tab + 'index: function(req, res){' + br;
    code += tab + tab + objModel + '.find({}, function(err, data){' + br;
    code += tab + tab + tab + 'res.json(data);' + br;
    code += tab + tab + '});' + br;
    code += tab + '},' + br;

    code += tab + 'show: function(req, res){' + br;
    code += tab + tab + objModel + '.findById(req.res, function(err, data){' + br;
    code += tab + tab + tab + 'res.json({message: "Record found.", data: data});' + br;
    code += tab + tab + '});' + br;
    code += tab + '},' + br;

    code += tab + 'create: function(req, res){' + br;
    code += tab + tab + objModel + '.create(req.body, function(err, data){' + br;
    code += tab + tab + tab + 'res.json({message: "Record created.", data: data});' + br;
    code += tab + tab + '});' + br;
    code += tab + '},' + br;

    code += tab + 'update: function(req, res){' + br;
    code += tab + tab + objModel + '.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, data){' + br;
    code += tab + tab + tab + 'res.json({message: "Record updated.", data: data});' + br;
    code += tab + tab + '});' + br;
    code += tab + '},' + br;

    code += tab + 'delete: function(req, res){' + br;
    code += tab + tab + objModel + '.findByIdAndRemove(req.params.id, function(err, data){' + br;
    code += tab + tab + tab + 'res.json({message: "Record deleted."});' + br;
    code += tab + tab + '});' + br;
    code += tab + '}' + br;

    code += '};' + br;
    code += br;
    code += 'modules.exports = controller;';

    fs.writeFile('./' + appName + '/controllers/' + obj + '.js', code, function(err){
      if (err) {
        console.log('ERROR: Creating /controllers/' + obj + '.js');
      } else {
        console.log('SUCCESS: Created /controllers/' + obj + '.js');
      }
    });
  }
});
