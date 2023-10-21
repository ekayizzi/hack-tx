const express = require('express');
const handlebars = require('express-handlebars');

const PORT = 3000;

const app = express();
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('form', {layout : 'formLayout'});
});

app.get('/score', (req, res) => {
  if(
    Object.keys(req.query).length !== 1 ||
    !('score' in req.query) ||
    !/^((\d+(\.\d+)?)|(\.\d+))$/.test(req.query.score)
  ) {
    res.redirect('/');
    return;
  }
  console.log(req.query);
  res.render('score', {layout : 'formLayout', score: req.query.score});
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});