# Server Base - Trabajo Práctico Final Backend - Gonzalo Galarza

npm start => Inicia servidor

npm run dev => Inicia el servidor a través de Nodemon

# Base de datos - SQL

Los datos son almacenados en una base de datos tipo relacional (SQL).
Se utilizó mysql y sequelize para la creación y migración de los modelos.

Para crear las tablas de manera automática en la base de datos se deben realizar los siguientes pasos:

- Crear base de datos con el nombre que se detalla en archivo .env como DB_NAME
- Abrir una consola en el IDE y correr el comando --> npx sequelize-cli db:migrate
- Las tablas se encuentran vacías. Los datos se cargan a través de las peticiones correspondientes.

# Colección de consultas

Se incluye el archivo formato JSON con las colecciones de consultas exportadas desde Postman.

# Autenticación de usuarios y restricciones de accesos a rutas

- Se implementó el uso de JWT para el acceso a las peticiones que alteren datos (POST, PUT y DELETE).
- Todas las rutas se encuentran parcialmente protegidas, excepto las rutas de Registro y Login del usuario, ya que 
a partir de ellas es posible crear el Token para el acceso a las demas rutas.


# Funcionamiento de peticiones

- ('/', index);
    Acceso a la pagina principal - Contiene el titulo del proyecto

# PETICIONES DE AUTENTICACIÓN

- ('/auth', Autenticación);

        -'/register' - Registro de usuario: 

                - Requiere datos en Body:
                    - email - La existencia y formato son validados.
                    - password - La existencia y longitud son validadas.
            
                - Hashea la contraseña.
                - Crea el registro en la base de datos.
            
                - Restricciones: No permite el ingreso de usuarios ya existentes en la base de datos.

        -'/login' - Login de usuario: 

                - Requiere datos en Body:
                    - email - La existencia y formato son validados.
                    - password - La existencia y longitud son validadas.
            
                - Valida si el usuario existe en la base de datos.
                - Compara la contraseña ingresada con la existente en la base de datos.
                - Crea el JWT para el acceso a las demas rutas.
            
                - Restricciones: Login normal - Los datos ingresados deben ser los mismos utilizados para el registro.


# PETICIONES DE GESTIÓN DE USUARIOS Y FAVORITOS

- ('/users', Usuarios);

        GET -'/' - Lista de todos los usuarios: 
            
                - Devuelve una lista de todos los usuarios existentes en la base de datos.
                - La lista general de usuarios no contiene los favoritos de cada usuario. (Se ven en detalle de usuario)
            

        GET -'/:id' - Devuelve un usuario por id: 

                - Requiere parámetro:

                    - id de usuario - Valida que sea de tipo numérico. 

                - Devuelve el detalle de un usuario existente en la base de datos.
                - El detalle contiene los animés favoritos del usuario. 

                - Restricciones:
                - Valida que el id requerido corresponda a un usuario existente.

        POST -'/favorites/:id' - Insertar animé favorito del usuario: 

                - Requiere parámetro:

                    - id de usuario - Valida que sea de tipo numérico. 
                
                - Requiere body:

                    - animeId - Valida que exista el animé con ese Id. Caso contrario no es insertado. 

                - Inserta en la tabla de favoritos el id del anime favorito y el id del usuario.
                
                - Restricciones: 
                        - Requiere JWT.
                        - El animé no es insertado si no existe.
                        - El animé no es insertado si ya se encuentra registrado como favorito del usuario.



        DELETE -'/favorites/:id' - Borrar animé favorito del usuario: 

                - Requiere parámetro:

                    - id de usuario - Valida que sea de tipo numérico. 
                
                - Requiere body:

                    - animeId - Valida que exista el animé con ese Id. 

                - Elimina de la tabla de favoritos el id del anime favorito y el id del usuario.
                
                - Restricciones: 
                        - Requiere JWT.
                        - La peticion es realizada solo si el id de usuario y el id del animé corresponden a datos existentes.
        
        
        DELETE-'/:id' - Elimnar usuario: 

                - Requiere parámetro:

                    - id de usuario - Valida que sea de tipo numérico.  

                - Elimina el usuario de la base de datos.
                - Elimina los registros de favoritos vinculados al usuario.
                
                - Restricciones: 
                        - Requiere JWT.
                        - El usuario no es eliminado si el id no corresponde a un dato existente en la base de datos.

# PETICIONES DE ANIMÉS

- ('/animes', Animes);

        GET -'/' - Lista de todos los animés registrados: 
            
                - Devuelve una lista de todos los animés existentes en la base de datos.
                - La lista general de animés no contiene los capítulos correspondientes a cada uno. (Se ven en detalle de animé)
            
        

        GET -'/:id' - Devuelve el detalle de un animé por id: 

                - Requiere parámetro:

                    - id de animé - Valida que sea de tipo numérico. 

                - Devuelve el detalle de un animé existente en la base de datos.
                - El detalle contiene los capítulos correspondientes al animé. 

                - Restricciones:
                - Valida que el id ingresado corresponda a un animé existente.


        POST -'/' - Insertar animé nuevo en base de datos: 
             
                - Requiere body:

                    - titulo - (string) - Valida que exista y que la longitud sea entre 2 y 20 caractéres.
                    - descripcion -(string) - Valida que exista y que la longitud no supere los 600 caractéres.
                    - imagen - (string) - Valida que exista.
                    - categoria - (string) - Valida que exista, que sea tipo alfabética y que la longitud no supere los 20 caractéres.


                - Inserta en la tabla de animés.
                
                - Restricciones: 
                        - Requiere JWT.
                        - El animé no es insertado si alguno de los campos no existe o no cumple con las validaciones de formato.

        
        PUT -'/:id' - Actualizar animé en base de datos: 
                      
                - Requiere parámetro:

                    - id de animé - Valida que sea de tipo numérico. 
             
                - Requiere body:

                    - titulo - (string) - Valida que exista y que la longitud sea entre 2 y 20 caractéres.
                    - descripcion -(string) - Valida que exista y que la longitud no supere los 600 caractéres.
                    - imagen - (string) - Valida que exista.
                    - categoria - (string) - Valida que exista, que sea tipo alfabética y que la longitud no supere los 20 caractéres.


                - Actualiza en la tabla de animés.
                
                - Restricciones: 
                        - Requiere JWT.
                        - El animé no es actualizado si el id no corresponde a un anime existente en la base de datos.
                        - El animé no es actualizado si alguno de los campos no existe o no cumple con las validaciones de formato.

        
        DELETE-'/:id' - Elimnar animé: 

                - Requiere parámetro:

                    - id de anime - Valida que sea de tipo numérico.  

                - Elimina el animé de la base de datos.
                - Elimina los registros de favoritos vinculados al animé.
                - Elimina los capítulos vinculados al animé.
                
                - Restricciones: 
                        - Requiere JWT.
                        - El animé no es eliminado si el id no corresponde a un anime existente en la base de datos.

# PETICIONES DE CAPÍTULOS

- ('/chapters', Capítulos);

        GET -'/?animeId=id' - Lista de todos los capítulos pertenecientes a un animé: 

                - Requiere parámetro tipo query:

                    - id de animé - Valida que sea de tipo numérico.
            
                - Devuelve una lista de todos los capítulos existentes y relacionados al animé.
    

        
        GET -'/:id' - Devuelve un capítulo por id: 

                - Requiere parámetro:

                    - id de capítulo - Valida que sea de tipo numérico. 

                - Devuelve el detalle de un capítulo existente en la base de datos.

                - Restricciones: 
                - Valida que el id ingresado corresponda a un animé existente.


        POST -'/' - Insertar capítulo nuevo en base de datos: 
             
                - Requiere body:

                    - titulo - (string) - Valida que exista y que la longitud sea entre 2 y 20 caractéres.
                    - descripcion -(string) - Valida que exista y que la longitud no supere los 600 caractéres.
                    - video - (string) - Valida que exista.


                - Inserta en la tabla de capítulos.
                
                - Restricciones: 
                        - Requiere JWT.
                        - El capítulo no es insertado si alguno de los campos no existe o no cumple con las validaciones de formato.

        
        PUT -'/:id' - Actualizar capítulo en base de datos: 
                      
                - Requiere parámetro:

                    - id de capítulo - Valida que sea de tipo numérico. 
             
                - Requiere body:

                    - titulo - (string) - Valida que exista y que la longitud sea entre 2 y 20 caractéres.
                    - descripcion -(string) - Valida que exista y que la longitud no supere los 600 caractéres.
                    - imagen - (string) - Valida que exista.


                - Actualiza en la tabla de capítulos.
                
                - Restricciones: 
                        - Requiere JWT.
                        - El capítulo no es actualizado si el id no corresponde a un capítulo existente en la base de datos.
                        - El capítulo no es actualizado si alguno de los campos no existe o no cumple con las validaciones de formato.

        
        DELETE-'/:id' - Elimnar capítulo: 

                - Requiere parámetro:

                    - id de capítulo - Valida que sea de tipo numérico.  

                - Elimina el capítulo de la base de datos.
                
                - Restricciones: 
                        - Requiere JWT.
                        - El capítulo no es eliminado si el id no corresponde a un capítulo existente en la base de datos.


