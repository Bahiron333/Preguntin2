const app = require('../app').app

//enviamos el error 404: page not found
app.use((req,res)=>{
    res.status(404);
})

//error del servidor 
app.use((req, res)=>{
    res.status(500);
})
