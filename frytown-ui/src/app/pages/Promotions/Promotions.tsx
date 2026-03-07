import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Promotions.module.css';

type PromoTab = 'combos' | 'offers';

interface CountdownTimer {
  hours: number;
  minutes: number;
  seconds: number;
}

interface PromotionsProps {
  initialTab?: PromoTab;
}

export default function Promotions({ initialTab = 'combos' }: PromotionsProps) {
  const [activeTab, setActiveTab] = useState<PromoTab>(initialTab);
  const [countdown, setCountdown] = useState<CountdownTimer>({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Calculate magnetic pull for cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const angleX = (e.clientY - cardCenterY) / 30;
    const angleY = (cardCenterX - e.clientX) / 30;
    
    card.style.setProperty('--mouse-x', `${angleY}px`);
    card.style.setProperty('--mouse-y', `${angleX}px`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--mouse-x', '0px');
    card.style.setProperty('--mouse-y', '0px');
  };

  // Update active tab when URL changes
  useEffect(() => {
    const tabFromUrl = location.pathname.split('/').pop() as PromoTab;
    if (['combos', 'offers'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [location.pathname]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds;
        
        if (totalSeconds <= 0) {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
        
        const newTotal = totalSeconds - 1;
        return {
          hours: Math.floor(newTotal / 3600),
          minutes: Math.floor((newTotal % 3600) / 60),
          seconds: newTotal % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
              <div 
                className="promo-item"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="promo-badge hot">Hot Deal</div>
                <div className="popular-tag">Popular</div>
                <div className="image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=200&fit=crop&crop=center" 
                    alt="Family Feast Combo" 
                    className="promo-image"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <span className="overlay-text">Perfect for family gatherings!</span>
                  </div>
                </div>
                <h3>Family Feast</h3>
                <p>2 Regular Fries + 4 Drinks + Choice of 2 Dips</p>
                <div className="promo-price">₹299</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddComboToCart('family-feast', 'Family Feast', '299')}
                >
                  Add to Cart
                </button>
              </div>
              <div 
                className="promo-item"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="promo-badge new">New</div>
                <div className="image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=200&fit=crop&crop=center" 
                    alt="Party Pack Combo" 
                    className="promo-image"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <span className="overlay-text">Party like a star!</span>
                  </div>
                </div>
                <h3>Party Pack</h3>
                <p>4 Jumbo Fries + 6 Drinks + Choice of 3 Dips</p>
                <div className="promo-price">₹499</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddComboToCart('party-pack', 'Party Pack', '499')}
                >
                  Add to Cart
                </button>
              </div>
              <div 
                className="promo-item"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="promo-badge limited">Limited</div>
                <div className="image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=200&fit=crop&crop=center" 
                    alt="Couple's Delight Combo" 
                    className="promo-image"
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <span className="overlay-text">Romantic meal for two!</span>
                  </div>
                </div>
                <h3>Couple's Delight</h3>
                <p>1 Mini Fries + 2 Drinks + Choice of 1 Dip</p>
                <div className="promo-price">₹199</div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddComboToCart('couples-delight', 'Couple\'s Delight', '199')}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Dips Selection Section */}
            <div className="dips-section">
              <h2>Choose Your Dips</h2>
              <p>Select from our variety of delicious dipping sauces!</p>
              <div className="dips-grid">
                <div className="dip-item">
                  <div className="dip-image-container">
                    <img 
                      src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop&crop=center" 
                      alt="Cheese Dip" 
                      className="dip-image"
                      loading="lazy"
                    />
                    <div className="dip-overlay">
                      <span className="dip-overlay-text">Creamy & Rich</span>
                    </div>
                  </div>
                  <h3>Cheese Dip</h3>
                  <p>Smooth, creamy cheese sauce perfect for dipping</p>
                  <div className="dip-price">₹30</div>
                </div>
                <div className="dip-item">
                  <div className="dip-image-container">
                    <img 
                      src="https://images.unsplash.com/photo-1594394904547-c47eddb05bda?w=300&h=200&fit=crop&crop=center" 
                      alt="Garlic Mayo" 
                      className="dip-image"
                      loading="lazy"
                    />
                    <div className="dip-overlay">
                      <span className="dip-overlay-text">Garlicky Goodness</span>
                    </div>
                  </div>
                  <h3>Garlic Mayo</h3>
                  <p>Rich mayonnaise with roasted garlic flavor</p>
                  <div className="dip-price">₹25</div>
                </div>
                <div className="dip-item">
                  <div className="dip-image-container">
                    <img 
                      src="https://images.unsplash.com/photo-1586232710714-4be2c56b1544?w=300&h=200&fit=crop&crop=center" 
                      alt="Mint Chutney" 
                      className="dip-image"
                      loading="lazy"
                    />
                    <div className="dip-overlay">
                      <span className="dip-overlay-text">Fresh & Herby</span>
                    </div>
                  </div>
                  <h3>Mint Chutney</h3>
                  <p>Fresh mint and cilantro chutney with a tangy kick</p>
                  <div className="dip-price">₹20</div>
                </div>
                <div className="dip-item">
                  <div className="dip-image-container">
                    <img 
                      src="https://images.unsplash.com/photo-1610971028206-0c571842cf06?w=300&h=200&fit=crop&crop=center" 
                      alt="Sweet Chili" 
                      className="dip-image"
                      loading="lazy"
                    />
                    <div className="dip-overlay">
                      <span className="dip-overlay-text">Sweet & Spicy</span>
                    </div>
                  </div>
                  <h3>Sweet Chili</h3>
                  <p>Perfect balance of sweet and spicy flavors</p>
                  <div className="dip-price">₹25</div>
                </div>
                <div className="dip-item">
                  <div className="dip-image-container">
                    <img 
                      src="https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=300&h=200&fit=crop&crop=center" 
                      alt="BBQ Sauce" 
                      className="dip-image"
                      loading="lazy"
                    />
                    <div className="dip-overlay">
                      <span className="dip-overlay-text">Smoky & Bold</span>
                    </div>
                  </div>
                  <h3>BBQ Sauce</h3>
                  <p>Classic smoky BBQ sauce with rich flavor</p>
                  <div className="dip-price">₹25</div>
                </div>
                <div className="dip-item">
                  <div className="dip-image-container">
                    <img 
                      src="https://images.unsplash.com/photo-1574662796623-782921e9b5a8?w=300&h=200&fit=crop&crop=center" 
                      alt="Sriracha Mayo" 
                      className="dip-image"
                      loading="lazy"
                    />
                    <div className="dip-overlay">
                      <span className="dip-overlay-text">Spicy Kick</span>
                    </div>
                  </div>
                  <h3>Sriracha Mayo</h3>
                  <p>Creamy mayo with spicy sriracha heat</p>
                  <div className="dip-price">₹30</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'offers' && (
          <div className="promo-section">
            <h2>Special Offers</h2>
            <p>Don't miss out on our limited-time special offers!</p>
            <div className="countdown-timer urgent">
              <div>⏰ Offers End In:</div>
              <div className="countdown-display">
                <span className="time-unit">{String(countdown.hours).padStart(2, '0')}h</span>
                <span className="time-unit">{String(countdown.minutes).padStart(2, '0')}m</span>
                <span className="time-unit">{String(countdown.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
            <div className="promo-grid">
              <div className="promo-item">
                <div className="discount-indicator">25%</div>
                <div className="promo-badge hot">Weekend</div>
                <div className="promo-visual offer-visual">🔥</div>
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
                <div className="discount-indicator">20%</div>
                <div className="promo-badge limited">Limited</div>
                <div className="promo-visual offer-visual">⏰</div>
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
                <div className="discount-indicator">15%</div>
                <div className="popular-tag">Student</div>
                <div className="promo-visual offer-visual">🎓</div>
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
