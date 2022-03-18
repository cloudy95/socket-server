import { Usuario } from "./usuario";


export class UsuarioLista {

    private lista : Usuario[] = [];

    constructor(){

    }

    // Agregar un usuario
    public agregar( usuario: Usuario ){

        this.lista.push( usuario )
        console.log( this.lista )
        return usuario;

    }

    public actualizarNombre( id:string, nombre:string ){

        this.lista.forEach(element => {
            
            if( element.id === id ){

                element.nombre = nombre;

            }

        });

        console.log( '=====Actualizando usuario=====' );
        console.log( this.lista )

    }

    // Obtener lista de usuarios
    public getLista(){

        return this.lista.filter( usuario=>  usuario.nombre !== 'sin-nombre' ) ;

    }

    public getUsuario( id:string ){

        return this.lista.find( usuario => usuario.id === id  )
    }

    //Obtener usuarios en na sale en particular
    public getUsuarioEnSala( sala:string ){

        return this.lista.filter( usuario => usuario.sala === sala )

    }

    // Borrar usuario
    public borrarUsuario( id:string ){

        const temUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario=> usuario.id !== id );
        console.log( 'cliente borrado', this.lista )
        return temUsuario;

    }

}