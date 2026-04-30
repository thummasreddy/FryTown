import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { frytownApi } from '../../api/frytownApi';
import styles from './Franchising.module.css';

type FranchiseTab = 'why' | 'investment' | 'apply';

type FranchiseLeadForm = {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  investment: string;
  experience: string;
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
  city: '',
  state: '',
  investment: '',
  experience: '',
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
      city: typeof parsedValue?.city === 'string' ? parsedValue.city : '',
      state: typeof parsedValue?.state === 'string' ? parsedValue.state : '',
      investment: typeof parsedValue?.investment === 'string' ? parsedValue.investment : '',
      experience: typeof parsedValue?.experience === 'string' ? parsedValue.experience : '',
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTabChange = (tab: FranchiseTab) => {
    navigate(`/franchising/${tab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await frytownApi.createFranchiseLead({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        investment: formData.investment,
        experience: formData.experience,
        message: formData.message.trim() || undefined,
      });

      window.localStorage.removeItem(FRANCHISE_INTEREST_STORAGE_KEY);
      setFormData(emptyFranchiseLead);
      setSubmitMessage('Thanks. Your franchise inquiry was submitted.');
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      setSubmitMessage(message || 'We could not submit your details right now. Please try again.');
    } finally {
      setIsSubmitting(false);
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
                Share your market and operating background. The FryTown team will review your inquiry and follow up with next steps.
              </p>
              <div className={styles.noticeBanner}>
                Franchise applications are open for early partner conversations.
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
                <span>City of interest</span>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
              </label>
              <label className={styles.field}>
                <span>State or region</span>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required />
              </label>
              <label className={styles.field}>
                <span>Investment range</span>
                <select name="investment" value={formData.investment} onChange={handleChange} required>
                  <option value="">Select range</option>
                  <option value="Under $100k">Under $100k</option>
                  <option value="$100k-$250k">$100k-$250k</option>
                  <option value="$250k-$500k">$250k-$500k</option>
                  <option value="$500k+">$500k+</option>
                </select>
              </label>
              <label className={styles.field}>
                <span>Operating experience</span>
                <select name="experience" value={formData.experience} onChange={handleChange} required>
                  <option value="">Select experience</option>
                  <option value="First-time owner">First-time owner</option>
                  <option value="Restaurant operator">Restaurant operator</option>
                  <option value="Multi-unit operator">Multi-unit operator</option>
                  <option value="Investor or development group">Investor or development group</option>
                </select>
              </label>
              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>Tell us more</span>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Current business, multi-unit experience, or preferred format."
                />
              </label>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}
