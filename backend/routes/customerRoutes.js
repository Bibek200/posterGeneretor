import express from 'express';
import { addCustomer, getAllCustomers, updateCustomerStatus } from '../controllers/customerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add Customer
router.post('/add', protect, addCustomer);

// Get All Customers
router.get('/list', protect, getAllCustomers);

// Update Customer Status
router.put('/:id/status', protect, updateCustomerStatus);

export default router;
