const oracledb = require('oracledb') // library for the connection with the database oracle
const crypto = require('crypto')

//configuration of the data base oracle
const dbConfig = {
    user: 'system', //usuario 
    password: '123456', // contraseña
    connectString: 'localhost/xe' //cadena de conexion
}

//function for the insert user into data base, insert data: user, password and email
async function insertUser(user,password,email){

    let connection; //variable for connection
    
    try{

        let HashPassword = hashPasswords(password); //encrypt password, safary user 

        connection = await oracledb.getConnection(dbConfig)


        sqlQuery = "INSERT INTO usuarios (nombre, contraseña, correo) values (:name, :HashPassword, :email)";

        const result  = await connection.execute(sqlQuery,{
            name : user,
            HashPassword: HashPassword,
            email: email
        })
        console.log(result  = await connection.execute('select * from usuarios'))

        await connection.commit();

        result('ususario insertado correctamente')
       /* return {
            id: result.id,
            nombre: result.nombre,

        };*/

    }catch (err){
        console.error('Error en la conexion de la base de datos', err)
        return {status: 500, menssege:'Error en la conexion de bases de datos'}
    }finally{
        if(connection){
            try{
                await connection.close();
            }catch (err){
                console.error('Error al cerrar la conexion')
            }
        }
    }
}

function hashPasswords(password) { return crypto.createHash('sha256').update(password).digest('hex');}


module.exports = {insertUser, hashPasswords};