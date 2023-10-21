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
  console.log('handling base boi')
  res.render('form', {layout : 'formLayout'});
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});