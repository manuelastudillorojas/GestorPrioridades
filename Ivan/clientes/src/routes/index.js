const {
    Router
} = require('express');
const router = Router();

const {
    getClientes,
    createCliente,
    getClientesById,
    deleteCliente,
    updateCliente
} = require('../controllers/index.controller')

router.get('/clientes', getClientes);
router.get('/clientes/:id', getClientesById);
router.post('/cliente', createCliente);
router.delete('/cliente/:id', deleteCliente);
router.put('/cliente/:id', updateCliente);

module.exports = router;