const express  = require('express');
const path = require('path')
const app = express(); //agregamos express


app.set('port', process.env.PORT || 3000) //añadimos el puerto 

//configuramos el motor de plantillas, Utiliza handlebars para ejecutar las vistas
app.set('view engine','ejs'); //agregamos handlebars como motor
app.set('views', path.join(__dirname,'views'))


//inicia el servidor 
app.listen(app.get('port'),()=>{
    console.log("el servidor esta iniciando en http://localhost:"+app.get('port'))
});


module.exports = app;