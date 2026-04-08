import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Franchising.module.css';

type FranchiseTab = 'why' | 'investment' | 'apply';

interface FranchisingProps {
  initialTab?: FranchiseTab;
}

const getFranchiseTabFromPath = (pathname: string): FranchiseTab | null => {
  const slug = pathname.split('/').pop() ?? '';

  if (slug === 'why' || slug === 'investment' || slug === 'apply') {
    return slug;
  }

  return null;
};

export default function Franchising({ initialTab = 'why' }: FranchisingProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = getFranchiseTabFromPath(location.pathname) ?? initialTab;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTabChange = (tab: FranchiseTab) => {
    navigate(`/franchising/${tab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.heroBadge}>Growth Partners</span>
        <h1>Franchising should communicate trust, operating discipline, and brand support.</h1>
        <p>
          This page is now positioned as a serious lead-generation surface instead of a generic placeholder.
          It still needs real commercial inputs before launch.
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
              <h2>Why experienced operators would take this seriously</h2>
              <p className={styles.lead}>
                A launch-ready franchise page should show clarity around positioning, unit economics, onboarding,
                and operator support without overstating what is not yet validated.
              </p>
              <div className={styles.cardGrid}>
                <article className={styles.infoCard}>
                  <h3>Focused concept</h3>
                  <p>FryTown has a single-category strength: premium fries, high-margin add-ons, and simple menu logic.</p>
                </article>
                <article className={styles.infoCard}>
                  <h3>Operational simplicity</h3>
                  <p>Shorter prep times, compact equipment needs, and repeatable assembly standards help scalability.</p>
                </article>
                <article className={styles.infoCard}>
                  <h3>Brand storytelling</h3>
                  <p>Distinctive identity, strong visual consistency, and a menu customers immediately understand.</p>
                </article>
              </div>
            </div>
            <aside className={styles.sideCard}>
              <h3>Before go-live, add real proof</h3>
              <ul className={styles.list}>
                <li>Confirmed launch formats such as kiosk, inline, or dine-in.</li>
                <li>Support coverage across training, supply chain, and local store marketing.</li>
                <li>Territory policy and onboarding milestones.</li>
              </ul>
            </aside>
          </div>
        )}

        {activeTab === 'investment' && (
          <div className={styles.contentGrid}>
            <div>
              <h2>Investment information should be specific only when verified</h2>
              <p className={styles.lead}>
                The previous page showed hard numbers with no qualification. That is risky. This version frames the
                commercial conversation responsibly until real figures are approved.
              </p>
              <div className={styles.cardGrid}>
                <article className={styles.infoCard}>
                  <h3>Commercial discussion</h3>
                  <p>Share actual capex, fit-out, and equipment assumptions only after they are finalized by format.</p>
                </article>
                <article className={styles.infoCard}>
                  <h3>Operator profile</h3>
                  <p>Define whether the target is an owner-operator, multi-unit franchisee, or institutional partner.</p>
                </article>
                <article className={styles.infoCard}>
                  <h3>Rollout support</h3>
                  <p>Document site selection, launch marketing, staff training, and opening-week operations support.</p>
                </article>
              </div>
            </div>
            <aside className={styles.sideCard}>
              <h3>Recommended data to add</h3>
              <ul className={styles.list}>
                <li>Estimated fit-out range by store type.</li>
                <li>Franchise fee, royalty, and marketing fee structure.</li>
                <li>Average opening timeline from signed agreement to launch.</li>
              </ul>
            </aside>
          </div>
        )}

        {activeTab === 'apply' && (
          <div className={styles.applyLayout}>
            <div>
              <h2>Start the conversation</h2>
              <p className={styles.lead}>
                This form is now a clean lead capture surface. It still needs backend handling or CRM integration
                before a real public launch.
              </p>
              {isSubmitted && (
                <div className={styles.successBanner}>
                  Inquiry captured locally. Connect this form to email or CRM before launch.
                </div>
              )}
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.field}>
                <span>Full name</span>
                <input type="text" name="name" required />
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input type="email" name="email" required />
              </label>
              <label className={styles.field}>
                <span>Phone</span>
                <input type="tel" name="phone" required />
              </label>
              <label className={styles.field}>
                <span>City or territory of interest</span>
                <input type="text" name="location" required />
              </label>
              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>Tell us about your operating background</span>
                <textarea name="message" rows={5} placeholder="Current business, multi-unit experience, or preferred format." />
              </label>
              <button type="submit" className={styles.submitButton}>
                Submit inquiry
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}
