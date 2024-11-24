const { insertUsers, hashPasswords } = require('../../models/database_Preguntin');
const oracledb = require('oracledb');

jest.mock('oracledb');  // Mock de la librería oracledb

describe('insertUsers function', () => {
  let mockConnection;

  beforeEach(() => {
    // Crear una conexión simulada de Oracle
    mockConnection = {
      execute: jest.fn().mockResolvedValue({ rowsAffected: 1 }),
      commit: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined),
    };

    // Mock de la función getConnection
    oracledb.getConnection.mockResolvedValue(mockConnection);
  });

  afterEach(() => {
    jest.clearAllMocks();  // Limpiar mocks después de cada prueba
  });

  it('should insert a user into the database', async () => {
    // Simular los parámetros de entrada
    const nombreUsuario = 'juanperez';
    const contrasena = 'miContraseñaSecreta';
    const correo = 'bahiron39@gmail.com'

    // Llamar a la función insertUser
    const result = await insertUsers(nombreUsuario, contrasena, correo);

    // Verificar que el método execute fue llamado con los parámetros correctos
    expect(mockConnection.execute).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        name: nombreUsuario,
        HashPassword: expect.any(String),  // Asegurarse de que se pasa un hash
        email : correo
      })
    );
    expect(mockConnection.commit).toHaveBeenCalled();  // Verificar que commit fue llamado
    expect(result).toEqual({ rowsAffected: 1 });  // Esperamos que se haya insertado un registro
  });

  it('should hash the password correctly', () => {
    const password = 'miContraseñaSecreta';
    const hashedPassword = hashPasswords(password);

    // Comprobar que la contraseña se ha convertido en un hash
    expect(hashedPassword).toHaveLength(64);  // SHA-256 genera un hash de 64 caracteres en hexadecimal
  });
});



