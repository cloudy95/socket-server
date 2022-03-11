
import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();


router.get('/mensajes', ( req: Request, res: Response )=>{

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    })

});

router.post('/mensajes', ( req: Request, res: Response )=>{

    const { cuerpo, de } = req.body;

    const server = Server.instance;

    const peyload = {
        de,
        cuerpo
    }

    server.io.emit( 'mensaje-nuevo', peyload );

    res.json({
        ok: true,
        cuerpo,
        de
    })

});


router.post('/mensajes/:id', ( req: Request, res: Response )=>{

    const { cuerpo, de } = req.body;
    const { id } = req.params;

    const server = Server.instance;

    const peyload = {
        de,
        cuerpo
    }

    // si le borro el in-- puedo enviar mensaje global
    server.io.in( id ).emit( 'mensaje-privado', peyload );

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })

});

export default router;
