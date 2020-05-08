import express from 'express';
import { getOwner, getOwners, createOwner, updateOwner, deleteOwner } from './controller';

const router = express.Router();

router.get('/car_owners/:id', getOwner);
router.get('/car_owners', getOwners);
router.put('/car_owners/:id', updateOwner);
router.post('/car_owners', createOwner);
router.delete('/car_owners/:id', deleteOwner);

console.log('successfully parsed /api/car_owners/route.js')

export default router;