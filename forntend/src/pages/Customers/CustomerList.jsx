function CustomerList({ customers, onToggleStatus }) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <ul>
        {customers.map(c => (
          <li key={c._id} className="flex justify-between py-2">
            <span>{c.name} ({c.phone})</span>
            <button onClick={() => onToggleStatus(c._id)} className="btn">
              {c.status === 'active' ? 'Deactivate' : 'Activate'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;
