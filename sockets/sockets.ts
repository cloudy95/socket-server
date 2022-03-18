import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuarioLista();

export const conectarCliente = ( cliente: Socket, io: socketIO.Server )=>{

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario )

}

export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on( 'disconnect', ()=>{
        
        usuariosConectados.borrarUsuario( cliente.id )

        io.emit( 'usuarios-activos', usuariosConectados.getLista() )

    })


}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on( 'mensaje', ( payload )=>{

        console.log( 'Mensaje recibido', payload )

        io.emit( 'mensaje-nuevo', payload )

    })

}

// Configurar usuario
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on( 'configurar-usuario', ( payload, callback: Function )=>{

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );

        io.emit( 'usuarios-activos', usuariosConectados.getLista() )

        callback({
            ok:true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        })

        // io.emit( 'mensaje-nuevo', payload )

    })

}

// Obtener Usuarios
export const obTenerUsuarios = ( cliente: Socket, io: socketIO.Server ) =>{

    cliente.on( 'obtener-usuarios', ()=>{

        io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.getLista() )
    })


}