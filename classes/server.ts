import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = require('socket.io')(this.httpServer, {
            cors: {
                origin: "http://localhost:4200",
                credentials: true
              }
        });

        this.escucharSokets();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this() )
    }

    private escucharSokets(){

        console.log( 'Escuchando conexciones - sockets' );

        this.io.on( 'connection', cliente=>{
            // id del socket
            // console.log( cliente.id )

            //Conectar cliente
            socket.conectarCliente( cliente, this.io );

            //Configurar Usuario
            socket.configurarUsuario( cliente, this.io );

            //Escuchar o Obtener Usuarios activos
            socket.obTenerUsuarios( cliente, this.io )

            // Mensajes
            socket.mensaje( cliente, this.io )

            // Desconectar
            socket.desconectar( cliente, this.io );
            

        })

    }

    start( callback: any ){

        this.httpServer.listen( this.port, callback );

    }

}