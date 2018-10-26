import {Router} from 'express';

import controller = require ('../controllers/customerController');

const router = Router ();

router.get('/', controller.list);
router.post('/add', controller.save);
router.get('/delete/:id', controller.delete);
router.get('/update/:id', controller.edit);
router.post('/update/:id', controller.update);


export default router;