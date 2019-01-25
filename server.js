const express = require('express');
let app = express();
const fs = require('fs')

const log = require('npmlog');
const hbs = require('hbs');

const port = process.env.PORT || 8080;



// express static folder
app.use(express.static(__dirname + '/public'));
//Setting view engine
app.set('view engine', hbs)
// Setting up partials
hbs.registerPartials(__dirname + '/views/partials')
// Define variable to use
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());




// Registering Middelleware
app.use((req, res, next) => {
  let now = new Date().toString();
  log.info('Express', `${now}: ${req.method} - ${req.url} - a request is made`)
  let logData = `${now}: ${req.method} - ${req.url} - a request is made`
  fs.appendFile('server.log', logData + '\n', (err) => {
    if (err) {
      console.log('unable to append log file')
    }
  });
  next();
})

/*
// use for maintenance purpose only
app.use((req, res, next) => {
  res.render('maintenance.hbs', {
    title: 'we will be right back!!'
  })
})
*/

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!!</h1>');
  res.render('home.hbs')
})
app.get('/project', (req, res) => {
  // res.send('<h1>Hello Express!!</h1>');
  res.render('project.hbs')
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About page hbs'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to find that page'
  })
})


app.listen(port, () => {
  log.info('Express', `app listenting on port ${port}...`);
})