import styles from '../styles/MenuTabs.module.css';
import type { MenuTab, Tab } from '../data/menuData';

interface MenuTabsProps {
  tabs: Tab[];
  activeTab: MenuTab;
  onTabChange: (tabId: MenuTab) => void;
}

export default function MenuTabs({ tabs, activeTab, onTabChange }: MenuTabsProps) {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
