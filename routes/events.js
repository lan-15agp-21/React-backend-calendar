/*
        Event Routes
        /api/events
*/        
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');


const router = Router();

// Todas  tienen que pasar por la validacion JWT
router.use( validarJWT );
// Obtener  eventos
router.get('/', getEventos );


// Crear un nuevo eventos
router.post(
        '/',
        [
            check('title', 'El titulo es obligatorio').not().isEmpty(),
            check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
            check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
            validarCampos
        ], 
        crearEvento
 
);

// Actualizar Eventos
router.put('/:id', actualizarEvento );

// Borrar Eventos
router.delete('/:id', eliminarEvento );

module.exports = router;

