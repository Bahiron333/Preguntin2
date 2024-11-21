const express  = require('express');
const app = express(); //agregamos express
const handlebars = require('handlebars').create({defaultLayout: 'main'});

app.set('port', process.env.PORT || 3000) //añadimos el puerto 

//configuramos el motor de plantillas, Utiliza handlebars para ejecutar las vistas
app.engine('handlebars', handlebars.engine); //definimos que motor vamos a usar
app.set('views engine','handlebars'); //agregamos handlebars como motor

//inicia el servidor 
app.listen(app.get('port'),()=>{
    console.log("el servidor esta iniciando en http//localhost:"+app.get('port'))
});


//envia la respuesta al cliente 
app.get('/',(req,res)=>{
    res.status(200)
    res.render('index',{layout : null});
})

//enviamos el error 404: page not found
app.use((req,res, next)=>{
    res.status(404);
    res.render('pagina-404');
    next();
})

//error del servidor 
app.use((req, res, next)=>{
    res.status(500);
    res.render('pagina-500')
    next();
})