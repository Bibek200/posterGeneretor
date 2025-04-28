import Customer from '../models/Customer.js';

export const addCustomer = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and Phone are required.' });
    }

    const exist = await Customer.findOne({ phone });
    if (exist) {
      return res.status(409).json({ message: 'Customer already exists with this phone number.' });
    }

    const customer = await Customer.create({ name, phone });

    res.status(201).json({ message: 'Customer added successfully', customer });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Get All Customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customers', error: error.message });
  }
};

// Update Customer Status (Activate/Deactivate)
export const updateCustomerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.status = customer.status === 'active' ? 'inactive' : 'active';
    await customer.save();

    res.status(200).json({ message: 'Status updated successfully', customer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
};
