import { Routes, Route } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import UploadPoster from './pages/Posters/UploadPoster';
import AddCustomer from './pages/Customers/AddCustomer';
import CustomerList from './pages/Customers/CustomerList';
import CreateSchedule from './pages/Schedules/CreateSchedule';
import ProtectedRoute from './components/ProtectedRoute';
import CustomerPage from './pages/Customers/CustomerPage';

function App() {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/upload-poster"
          element={
            <ProtectedRoute>
              <UploadPoster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-customer"
          element={
            <ProtectedRoute>
              <AddCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers-page"
          element={
            <ProtectedRoute>
              {/* <CustomerList /> */}
              <CustomerPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-schedule"
          element={
            <ProtectedRoute>
              <CreateSchedule />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
