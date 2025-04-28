import { useState } from 'react';
import API from '../services/api';

function AddCustomer({ onCustomerAdded }) {
  const [form, setForm] = useState({ name: '', phone: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/customers/add', form);
      alert('Customer added successfully');
      setForm({ name: '', phone: '' });
      if (onCustomerAdded) onCustomerAdded(); 
    } catch (error) {
      alert(error.response?.data?.message || 'Add failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="input"
          required
        />
        <button type="submit" className="btn">Add</button>
      </form>
    </div>
  );
}

export default AddCustomer;
