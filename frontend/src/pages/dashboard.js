import '../styles/dashboard.css';
import Sidebar from '../components/sidebar';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const token = localStorage.getItem('token');

  if (!token){
    return <Navigate to="/login" replace/>;
  }
  return (
    <div className="dashboardContainer">
      <p>This is the dashboard page.</p>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
