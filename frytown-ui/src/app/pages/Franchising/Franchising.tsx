import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Franchising.module.css';

type FranchiseTab = 'why' | 'investment' | 'apply';

type FranchiseLeadForm = {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
};

interface FranchisingProps {
  initialTab?: FranchiseTab;
}

const FRANCHISE_INTEREST_STORAGE_KEY = 'frytown-franchise-interest-v1';

const emptyFranchiseLead: FranchiseLeadForm = {
  name: '',
  email: '',
  phone: '',
  location: '',
  message: '',
};

const getFranchiseTabFromPath = (pathname: string): FranchiseTab | null => {
  const slug = pathname.split('/').pop() ?? '';

  if (slug === 'why' || slug === 'investment' || slug === 'apply') {
    return slug;
  }

  return null;
};

function readStoredLead(): FranchiseLeadForm {
  if (typeof window === 'undefined') {
    return emptyFranchiseLead;
  }

  try {
    const rawValue = window.localStorage.getItem(FRANCHISE_INTEREST_STORAGE_KEY);

    if (!rawValue) {
      return emptyFranchiseLead;
    }

    const parsedValue = JSON.parse(rawValue);

    return {
      name: typeof parsedValue?.name === 'string' ? parsedValue.name : '',
      email: typeof parsedValue?.email === 'string' ? parsedValue.email : '',
      phone: typeof parsedValue?.phone === 'string' ? parsedValue.phone : '',
      location: typeof parsedValue?.location === 'string' ? parsedValue.location : '',
      message: typeof parsedValue?.message === 'string' ? parsedValue.message : '',
    };
  } catch {
    return emptyFranchiseLead;
  }
}

export default function Franchising({ initialTab = 'why' }: FranchisingProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = getFranchiseTabFromPath(location.pathname) ?? initialTab;
  const [formData, setFormData] = useState<FranchiseLeadForm>(() => readStoredLead());
  const [submitMessage, setSubmitMessage] = useState('');

  const handleTabChange = (tab: FranchiseTab) => {
    navigate(`/franchising/${tab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      window.localStorage.setItem(FRANCHISE_INTEREST_STORAGE_KEY, JSON.stringify(formData));
      setSubmitMessage(
        'Thanks. Your franchise interest is saved on this device while the live inquiry flow is still being connected.'
      );
    } catch {
      setSubmitMessage('We could not save your details on this device. Please try again.');
    }
  };

  const isSuccess = submitMessage.startsWith('Thanks.');

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.heroBadge}>Growth Partners</span>
        <h1>A focused fries concept with room to scale.</h1>
        <p>
          FryTown is built around a clear menu, strong add-ons, and a guest-friendly brand. We are using this page to shape early partner conversations while the live application pipeline is being finished.
        </p>
      </section>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === 'why' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('why')}
        >
          Why FryTown
        </button>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === 'investment' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('investment')}
        >
          Investment Model
        </button>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === 'apply' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('apply')}
        >
          Apply
        </button>
      </div>

      <section className={styles.panel}>
        {activeTab === 'why' && (
          <div className={styles.contentGrid}>
            <div>
              <h2>Why focused food concepts attract experienced operators</h2>
              <p className={styles.lead}>
                Clear menu logic, repeatable prep, and distinctive branding can make expansion conversations easier from the start.
              </p>
              <div className={styles.cardGrid}>
                <article className={styles.infoCard}>
                  <h3>Focused menu</h3>
                  <p>A fries-first offer keeps the proposition easy to explain and easy for guests to understand.</p>
                </article>
                <article className={styles.infoCard}>
                  <h3>Add-on upside</h3>
                  <p>Dips, drinks, and flavor upgrades create natural basket growth without overcomplicating the core menu.</p>
                </article>
                <article className={styles.infoCard}>
                  <h3>Brand presence</h3>
                  <p>Bright visuals and memorable naming help the concept feel distinct in high-traffic neighborhoods and food courts.</p>
                </article>
              </div>
            </div>
            <aside className={styles.sideCard}>
              <h3>What partners will want to see next</h3>
              <ul className={styles.list}>
                <li>Confirmed format options such as kiosk, inline, or dine-in.</li>
                <li>Supply chain, training, and launch support coverage.</li>
                <li>Territory policy, rollout milestones, and market priorities.</li>
              </ul>
            </aside>
          </div>
        )}

        {activeTab === 'investment' && (
          <div className={styles.contentGrid}>
            <div>
              <h2>A simple concept needs a clear business model</h2>
              <p className={styles.lead}>
                The goal here is to show commercial discipline without inventing numbers before they are finalized by format and market.
              </p>
              <div className={styles.cardGrid}>
                <article className={styles.infoCard}>
                  <h3>Format economics</h3>
                  <p>Finalize capex, fit-out, and equipment assumptions by store type before publishing hard figures.</p>
                </article>
                <article className={styles.infoCard}>
                  <h3>Partner profile</h3>
                  <p>Be clear about whether the right fit is an owner-operator, multi-unit group, or institutional partner.</p>
                </article>
                <article className={styles.infoCard}>
                  <h3>Launch support</h3>
                  <p>Document site selection, training, opening marketing, and early operating support in a way partners can trust.</p>
                </article>
              </div>
            </div>
            <aside className={styles.sideCard}>
              <h3>Numbers to finalize before go-live</h3>
              <ul className={styles.list}>
                <li>Estimated fit-out range by store type.</li>
                <li>Franchise fee, royalty, and marketing fee structure.</li>
                <li>Average timeline from signed agreement to launch.</li>
              </ul>
            </aside>
          </div>
        )}

        {activeTab === 'apply' && (
          <div className={styles.applyLayout}>
            <div>
              <h2>Raise your hand early</h2>
              <p className={styles.lead}>
                Share your market and operating background. This preview saves your details in this browser while the live inquiry route is still being connected.
              </p>
              <div className={styles.noticeBanner}>
                Franchise applications are still in preview. Use this form to test the experience and keep the details on this device.
              </div>
              {submitMessage && (
                <div className={isSuccess ? styles.successBanner : styles.noticeBanner}>
                  {submitMessage}
                </div>
              )}
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.field}>
                <span>Full name</span>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label className={styles.field}>
                <span>Phone</span>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </label>
              <label className={styles.field}>
                <span>City or territory of interest</span>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
              </label>
              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>Tell us about your operating background</span>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Current business, multi-unit experience, or preferred format."
                />
              </label>
              <button type="submit" className={styles.submitButton}>
                Save Interest
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}
