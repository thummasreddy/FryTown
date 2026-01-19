import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Promotions.module.css';

type PromoTab = 'combos' | 'offers';

interface PromotionsProps {
  initialTab?: PromoTab;
}

export default function Promotions({ initialTab = 'combos' }: PromotionsProps) {
  const [activeTab, setActiveTab] = useState<PromoTab>(initialTab);
  const location = useLocation();
  const navigate = useNavigate();

  // Update active tab when URL changes
  useEffect(() => {
    const tabFromUrl = location.pathname.split('/').pop() as PromoTab;
    if (['combos', 'offers'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [location.pathname]);

  const handleTabChange = (tab: PromoTab) => {
    setActiveTab(tab);
    navigate(`/promotions/${tab}`);
  };

  const tabs: { id: PromoTab; label: string }[] = [
    { id: 'combos', label: 'Meal Combos' },
    { id: 'offers', label: 'Special Offers' },
  ];

  return (
    <main className="promotions-page">
      <h1>Promotions</h1>
      
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
        {activeTab === 'combos' && (
          <div className="promo-section">
            <h2>Meal Combos</h2>
            <p>Check out our delicious meal combos at great prices!</p>
            {/* Add combo items here */}
          </div>
        )}
        
        {activeTab === 'offers' && (
          <div className="promo-section">
            <h2>Special Offers</h2>
            <p>Don't miss out on our limited-time special offers!</p>
            {/* Add special offers here */}
          </div>
        )}
      </div>
    </main>
  );
}
