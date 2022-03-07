import Server from "./classes/server";
import { SERVER_PORT } from "./global/enviroment";
import router from './routes/router';
import bodyParser from "body-parser";
import cors from 'cors';


const server = Server.instance;

// BodyParser
// para generar un obj de javaScript, de lo q venga en el POST
server.app.use( bodyParser.urlencoded( { extended: true } ) )
server.app.use( bodyParser.json() )

//CORS
// para q cualquier persona pueda llamar los servicios desde otro hosting
// en origin se puede agregar la url unica que dejara tener acceso, ( http://mipagina.com )
server.app.use( cors({ origin: true, credentials: true}) )

//Se crea la ruta de servicios
server.app.use( '/', router )

server.start( ()=>{
    console.log( `Servidor corriendo en el puerto ${ SERVER_PORT }` )
})