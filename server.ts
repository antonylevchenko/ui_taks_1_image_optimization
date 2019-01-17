const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const formidableMiddleware = require('express-formidable');


const appPath = path.join(__dirname, '../images-app/');
const imagesFolderPath =  appPath  + 'data/images/';
const tempPath = imagesFolderPath + 'temp/';

console.log(appPath);
const imageService = require('./server/businessLogic/image-service.ts');


app.use(formidableMiddleware({
  uploadDir: tempPath
}));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(express.static('data'));



app.listen(5000, () => {
  console.log('Server started!');
});


app.route('/api/image/list').get((req, res) => {
  const result = imageService.getList();
  res.send(result);
});

app.route('/api/image/remove').get((req, res) => {
  console.log(req.query.name);
  const name = req.query.name;
  const result = imageService.remove(name);
  res.send(true);
});



app.route('/api/image/add').post((req, res) => {
  const result = imageService.add(req.files.file);
  res.send(result);
});

app.route('/api/image/load-minified/*').get((req, res) => {
  const name = req.path.substr(req.path.lastIndexOf('/') + 1);
  const result = imageService.loadMinifiedImage(name);
  res.sendFile(result);
});

app.route('/api/image/load-normal/*').get((req, res) => {
  const name = req.path.substr(req.path.lastIndexOf('/') + 1);
  const result = imageService.loadNormalImage(name);
  res.sendFile(result);
});

app.route('*').post((req, res) => {
  console.log(req);
  return (false);
});



