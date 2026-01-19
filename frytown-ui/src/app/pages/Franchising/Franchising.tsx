import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Franchising.module.css';

type FranchiseTab = 'why' | 'investment' | 'apply';

interface FranchisingProps {
  initialTab?: FranchiseTab;
}

export default function Franchising({ initialTab = 'why' }: FranchisingProps) {
  const [activeTab, setActiveTab] = useState<FranchiseTab>(initialTab);
  const location = useLocation();
  const navigate = useNavigate();

  // Update active tab when URL changes
  useEffect(() => {
    const tabFromUrl = location.pathname.split('/').pop() as FranchiseTab;
    if (['why', 'investment', 'apply'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [location.pathname]);

  const handleTabChange = (tab: FranchiseTab) => {
    setActiveTab(tab);
    navigate(`/franchising/${tab}`);
  };

  const tabs: { id: FranchiseTab; label: string }[] = [
    { id: 'why', label: 'Why Partner With Us' },
    { id: 'investment', label: 'Investment' },
    { id: 'apply', label: 'Apply Now' },
  ];

  return (
    <main className="franchising-page">
      <div className="hero">
        <h1>Franchise with FryTown</h1>
        <p>Join our growing family of franchisees and bring delicious fries to your community</p>
      </div>
      
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
        {activeTab === 'why' && (
          <div className="franchise-section">
            <h2>Why Partner With FryTown?</h2>
            <div className="benefits">
              <div className="benefit-card">
                <h3>Proven Business Model</h3>
                <p>Join a successful franchise with a track record of profitability and customer satisfaction.</p>
              </div>
              <div className="benefit-card">
                <h3>Comprehensive Training</h3>
                <p>We provide extensive training and ongoing support to ensure your success.</p>
              </div>
              <div className="benefit-card">
                <h3>Marketing Support</h3>
                <p>Benefit from our national and local marketing campaigns to drive customers to your location.</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'investment' && (
          <div className="franchise-section">
            <h2>Investment Details</h2>
            <div className="investment-details">
              <div className="investment-card">
                <h3>Initial Investment</h3>
                <p className="price">$150,000 - $300,000</p>
                <p>Includes franchise fee, equipment, and initial inventory</p>
              </div>
              <div className="investment-card">
                <h3>Ongoing Fees</h3>
                <p>6% Royalty Fee</p>
                <p>2% Marketing Fee</p>
              </div>
              <div className="investment-card">
                <h3>Financing Options</h3>
                <p>We work with preferred lenders to help you secure financing.</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'apply' && (
          <div className="franchise-section">
            <h2>Start Your Franchise Journey</h2>
            <div className="application-form">
              <p>Fill out the form below to begin the application process.</p>
              <form className="franchise-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Preferred Location</label>
                  <input type="text" id="location" name="location" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Tell us about yourself</label>
                  <textarea id="message" name="message" rows={4}></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit Application</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
