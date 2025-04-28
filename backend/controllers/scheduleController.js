import Schedule from '../models/Schedule.js';
import Customer from '../models/Customer.js';
import Poster from '../models/Poster.js';

export const createSchedule = async (req, res) => {
  const { customerId, posterId, scheduleDate } = req.body;

  try {
    // Check if the customer exists and if their status is active
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    if (customer.status !== 'active') {
      return res.status(403).json({ message: 'Only active customers can create schedules' });
    }

    // Check if the poster exists
    const poster = await Poster.findById(posterId);
    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' });
    }

    // Create a new schedule
    const newSchedule = new Schedule({
      customerId,
      posterId,
      scheduleDate,
    });

    await newSchedule.save();

    res.status(201).json({ message: 'Schedule created successfully', schedule: newSchedule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating schedule' });
  }
};
