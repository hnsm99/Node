const con = require('../../config/dbConnection');
var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';

function encrypt(text){
var cipher = crypto.createCipher(algorithm,password)
var crypted = cipher.update(text,'utf8','hex')
crypted += cipher.final('hex');
return crypted;
}

function decrypt(text){
var decipher = crypto.createDecipher(algorithm,password)
var dec = decipher.update(text,'hex','utf8')
dec += decipher.final('utf8');
return dec;
}

module.exports = app => {
const connection=con();
  app.get('/', (req,res)=>{
    connection.query('select * from usuario', (err, result) => {
      console.log(result);
    res.render('news/news',{
      news: result
    });
    });
  });

  app.post('/news', (req, res) =>{
      var contrasena=encrypt('holamundo');
      var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
      var f=new Date();
      var fecha=(f.getDate()+'/'+meses[f.getMonth()]+'/2018');
    const {nombre,apellido, correo, direccion, telefono, pass}=req.body;
    contrasena=encrypt(pass);
    connection.query('Insert into usuario SET?',{
      nombre:nombre,
      apellido:apellido,
      correo:correo,
      direccion:direccion,
      telefono:telefono,
      fecha_registro:fecha,
      contrasena:contrasena
    }, (err, result)=>{
      res.redirect('/');
    });
  });
}
