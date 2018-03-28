const app = require('./config/server');

require('./app/routes/news')(app);

// server start
app.listen(app.get('port'), ()=>{
  console.log('server on port', app.get('port'));
});
