import '../styles/dashboard.css';
import Sidebar from '../components/sidebar';
import { Navigate } from 'react-router-dom';
import DashboardPage from '../components/dashboard';


function Dashboard() {
  const token = localStorage.getItem('token');

  if (!token){
    return <Navigate to="/login" replace/>;
  }
  return (
    <div className="dashboardContainer">
      <div classname>
        <Sidebar />
      </div>
      <div className="dashboardContainter2">
        <DashboardPage />
      </div>
      
    </div>
  );
}

export default Dashboard;
