const {app} = require('../app')
const database = require('./models/database_Preguntin').insertUser;

//envia la respuesta al cliente 
app.get('/',(req,res)=>{
    database('');
    res.render('index');
 })

