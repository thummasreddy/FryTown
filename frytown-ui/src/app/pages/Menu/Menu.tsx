import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Menu.module.css';

type MenuTab = 'fries' | 'specialty' | 'dips' | 'drinks';

interface MenuProps {
  initialTab?: MenuTab;
}

export default function Menu({ initialTab = 'fries' }: MenuProps) {
  const [activeTab, setActiveTab] = useState<MenuTab>(initialTab);
  const location = useLocation();
  const navigate = useNavigate();

  // Update active tab when URL changes
  useEffect(() => {
    const tabFromUrl = location.pathname.split('/').pop() as MenuTab;
    if (['fries', 'specialty', 'dips', 'drinks'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [location.pathname]);

  const handleTabChange = (tab: MenuTab) => {
    setActiveTab(tab);
    navigate(`/menu/${tab}`);
  };

  const tabs: { id: MenuTab; label: string }[] = [
    { id: 'fries', label: 'Fries' },
    { id: 'specialty', label: 'Specialty' },
    { id: 'dips', label: 'Dips' },
    { id: 'drinks', label: 'Drinks' },
  ];

  return (
    <main className="menu-page">
      <h1>Our Menu</h1>
      
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'fries' && (
          <div className="menu-section">
            <h2>Fries</h2>
            {/* Add fries menu items here */}
          </div>
        )}
        
        {activeTab === 'specialty' && (
          <div className="menu-section">
            <h2>Specialty Fries</h2>
            {/* Add specialty menu items here */}
          </div>
        )}
        
        {activeTab === 'dips' && (
          <div className="menu-section">
            <h2>Dipping Sauces</h2>
            {/* Add dips menu items here */}
          </div>
        )}
        
        {activeTab === 'drinks' && (
          <div className="menu-section">
            <h2>Drinks</h2>
            {/* Add drinks menu items here */}
          </div>
        )}
      </div>
    </main>
  );
}
