import { useState, useEffect } from 'react';
import API from '../services/api'; // Assuming you have an API service to handle requests
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function CreateSchedule() {
  const [form, setForm] = useState({ customerId: '', scheduleDate: '', scheduleTime: {} });
  const [selectedPosters, setSelectedPosters] = useState({});
  const [categories, setCategories] = useState({
    offers: [],
    events: [],
    festivals: []
  });
  const [customers, setCustomers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No authentication token found');
          return;
        }

        const response = await API.get('/customers/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const activeCustomers = response.data.filter(customer => customer.status === 'active');
        setCustomers(activeCustomers);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
        alert('Failed to fetch customers');
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleTimeChange = (date, time) => {
    setForm(prevForm => ({
      ...prevForm,
      scheduleTime: { ...prevForm.scheduleTime, [date]: time },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        customerId: form.customerId,
        scheduleDate: form.scheduleDate,
        scheduleTime: form.scheduleTime,
        posters: selectedPosters
      };
      await API.get(`/posters/category/${category}`, data);
      alert('Schedule created successfully');
      setForm({ customerId: '', scheduleDate: '', scheduleTime: {} });
      setSelectedPosters({});
      setSelectedCategory({});
    } catch (error) {
      alert(error.response?.data?.message || 'Schedule failed');
    }
  };

  useEffect(() => {
    flatpickr("#schedule_date", {
      mode: "multiple",
      dateFormat: "Y-m-d",
      onChange: function (selectedDates) {
        generateCategoryPostersForEachDate(selectedDates);
      }
    });
  }, []);

  const generateCategoryPostersForEachDate = (selectedDates) => {
    const updatedPosters = { ...selectedPosters };
    selectedDates.forEach(date => {
      if (!updatedPosters[date]) {
        updatedPosters[date] = [];
      }
    });
    setSelectedPosters(updatedPosters);
    setSelectedCategory(prev => {
      const updatedCategories = { ...prev };
      selectedDates.forEach(date => {
        if (!updatedCategories[date]) {
          updatedCategories[date] = 'all';  
        }
      });
      return updatedCategories;
    });
  };

  const handlePosterSelection = (date, poster) => {
    setSelectedPosters(prev => {
      const updatedPosters = { ...prev };
      if (updatedPosters[date].includes(poster)) {
        updatedPosters[date] = updatedPosters[date].filter(p => p !== poster);
      } else {
        updatedPosters[date].push(poster);
      }
      return updatedPosters;
    });
  };

  const handleCategoryChange = (date, category) => {
    setSelectedCategory(prev => {
      const updatedCategories = { ...prev };
      updatedCategories[date] = category;
      return updatedCategories;
    });
  };

  const renderCategoriesSelector = (date) => (
    <div className="mb-4">
      <label htmlFor={`category-${date}`} className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
      <select
        id={`category-${date}`}
        name={`category-${date}`}
        value={selectedCategory[date] || 'all'}
        onChange={(e) => handleCategoryChange(date, e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="offers">Offers</option>
        <option value="events">Events</option>
        <option value="festivals">Festivals</option>
      </select>
    </div>
  );

  const renderPostersForDate = (date) => {
    const filteredPosters = selectedCategory[date] === 'all'
      ? categories.offers.concat(categories.events, categories.festivals)
      : categories[selectedCategory[date]];
  
    console.log('Filtered Posters for', date, filteredPosters);
    return (
      <div className="mt-4">
        <h5 className="text-md font-semibold mb-2">🖼 Select Posters</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPosters.map((poster) => (
          <label key={poster} className="flex flex-col items-center border rounded p-2 cursor-pointer hover:shadow">
            <img src={`/images/${poster}`} alt={poster} className="h-24 object-cover mb-2" />
            <input
              type="checkbox"
              checked={selectedPosters[date]?.includes(poster)}
              onChange={() => handlePosterSelection(date, poster)}
              className="form-checkbox"
            />
            <span className="text-xs mt-1">{poster}</span>
          </label>
        ))}
        </div>
      </div>
    );
  };

  const renderTimeInputForDate = (date) => (
    <div className="mb-4">
      <label htmlFor={`time-${date}`} className="block text-sm font-medium text-gray-700 mb-1">Select Time for {date}</label>
      <input
        type="time"
        id={`time-${date}`}
        name={`time-${date}`}
        onChange={(e) => handleTimeChange(date, e.target.value)}
        className="w-full border rounded p-2"
        required
      />
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">📅 Schedule Posters</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
          <select
            id="customer"
            name="customerId"
            value={form.customerId}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">-- Choose Customer --</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Select Multiple Dates */}
        <div className="mb-4">
          <label htmlFor="schedule_date" className="block text-sm font-medium text-gray-700 mb-1">Select Dates</label>
          <input
            type="text"
            id="schedule_date"
            name="schedule_date"
            value={form.scheduleDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
          <small className="text-gray-600">Click on the calendar to select multiple dates.</small>
        </div>

        {/* Step 3: Display Category Selector and Time Input per Date */}
        {Object.keys(selectedPosters).map(date => (
          <div key={date}>
            <h4 className="text-lg font-medium mb-2">{date}</h4>
            {renderCategoriesSelector(date)}
            {renderPostersForDate(date)}
            {renderTimeInputForDate(date)}
          </div>
        ))}

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          📤 Schedule
        </button>
      </form>
    </div>
  );
}

export default CreateSchedule;
