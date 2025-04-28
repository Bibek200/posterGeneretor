import { useState, useEffect } from 'react';
import API from '../services/api';
import AddCustomer from './AddCustomer';
import CustomerList from './CustomerList';

function CustomerPage() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const res = await API.get('/customers/list');
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCustomerAdded = () => {
    fetchCustomers(); 
  };

  const toggleStatus = async (id) => {
    await API.put(`/customers/${id}/status`);
    fetchCustomers();
  };

  return (
    <div className="space-y-8 p-6">
      <AddCustomer onCustomerAdded={handleCustomerAdded} />
      <CustomerList customers={customers} onToggleStatus={toggleStatus} />
    </div>
  );
}

export default CustomerPage;
