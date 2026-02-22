import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Promotions.module.css';

type PromoTab = 'combos' | 'offers';

interface PromotionsProps {
  initialTab?: PromoTab;
}

export default function Promotions({ initialTab = 'combos' }: PromotionsProps) {
  const [activeTab, setActiveTab] = useState<PromoTab>(initialTab);
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();

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

  const handleAddComboToCart = (comboId: string, name: string, price: string) => {
    const comboItem = {
      id: comboId,
      name: name,
      price: parseInt(price.replace('₹', '')),
      type: 'regular' as const,
    };

    addItem(comboItem);
  };

  const handleAddOfferToCart = (offerId: string, name: string, price: string) => {
    const offerItem = {
      id: offerId,
      name: name,
      price: parseInt(price.replace('₹', '')),
      type: 'regular' as const,
    };

    addItem(offerItem);
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
            <div className="promo-grid">
              <div className="promo-item">
                <h3>Family Feast</h3>
                <p>2 Regular Fries + 4 Drinks + 2 Dips</p>
                <div className="promo-price">₹299</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddComboToCart('family-feast', 'Family Feast', '299')}
                >
                  Add to Cart
                </button>
              </div>
              <div className="promo-item">
                <h3>Party Pack</h3>
                <p>4 Jumbo Fries + 6 Drinks + 3 Dips</p>
                <div className="promo-price">₹499</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddComboToCart('party-pack', 'Party Pack', '499')}
                >
                  Add to Cart
                </button>
              </div>
              <div className="promo-item">
                <h3>Couple's Delight</h3>
                <p>1 Mini Fries + 2 Drinks + 1 Dip</p>
                <div className="promo-price">₹199</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddComboToCart('couples-delight', 'Couple\'s Delight', '199')}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'offers' && (
          <div className="promo-section">
            <h2>Special Offers</h2>
            <p>Don't miss out on our limited-time special offers!</p>
            <div className="promo-grid">
              <div className="promo-item">
                <h3>Weekend Special</h3>
                <p>Buy 2 Get 1 Free on Classic Fries</p>
                <div className="promo-price">₹149 <span className="original-price">₹198</span></div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddOfferToCart('weekend-special', 'Weekend Special', '149')}
                >
                  Add to Cart
                </button>
              </div>
              <div className="promo-item">
                <h3>Happy Hour Deal</h3>
                <p>20% off all beverages between 2-6 PM</p>
                <div className="promo-price">₹32 <span className="original-price">₹40</span></div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddOfferToCart('happy-hour', 'Happy Hour Deal', '32')}
                >
                  Add to Cart
                </button>
              </div>
              <div className="promo-item">
                <h3>Student Discount</h3>
                <p>15% off with valid student ID</p>
                <div className="promo-price">₹85 <span className="original-price">₹99</span></div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddOfferToCart('student-discount', 'Student Discount', '85')}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
