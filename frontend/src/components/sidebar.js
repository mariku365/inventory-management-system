import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sidebar.css';
import { 
    MenuUnfoldOutlined, 
    MenuFoldOutlined,
    HomeOutlined,
    BarChartOutlined,
    SettingOutlined,
    LogoutOutlined
 } from '@ant-design/icons'



const Sidebar = () => { 
  const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        <button 
            className={`toggle-btn ${isOpen ? 'open' : 'collapsed'}`} 
            onClick={() => setIsOpen(!isOpen)}
            >
            {isOpen 
                ? <MenuFoldOutlined className="icon close-icon"/> 
                : <MenuUnfoldOutlined className="icon open-icon"/>}
        </button>

      <ul className="menu">
        <li ><HomeOutlined className="icon"/>{isOpen && 'Dashboard'}</li>
        <li ><BarChartOutlined className="icon"/>{isOpen && 'Reports'}</li>
        <li ><SettingOutlined className="icon"/>{isOpen && 'Settings'}</li>
      </ul>

       <div className="logout" onClick={handleLogout}>
            <LogoutOutlined className="icon"/>{isOpen && 'Logout'}
        </div>

    </div>
  );
};

export default Sidebar;
