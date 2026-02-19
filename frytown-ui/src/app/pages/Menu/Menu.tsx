import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/Menu.module.css';
import MenuTabs from './components/MenuTabs';
import MenuItemCard from './components/MenuItemCard';
import SearchFilter from './components/SearchFilter';
import { tabs, getMenuItems, type MenuTab, type MenuItem } from './data/menuData';

interface MenuProps {
  initialTab?: MenuTab;
}

export default function Menu({ initialTab = 'fries' }: MenuProps) {
  const [activeTab, setActiveTab] = useState<MenuTab>(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  
  const location = useLocation();
  const navigate = useNavigate();

  // Update tab based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/menu/specialty')) {
      setActiveTab('specialty');
    } else if (path.includes('/menu/dips')) {
      setActiveTab('dips');
    } else if (path.includes('/menu/drinks')) {
      setActiveTab('drinks');
    } else {
      setActiveTab('fries');
    }
  }, [location]);

  // Update URL when tab changes
  const handleTabChange = (tabId: MenuTab) => {
    setActiveTab(tabId);
    setSearchTerm('');
    setPriceFilter('all');
    
    const path = `/menu/${tabId === 'fries' ? '' : tabId}`;
    navigate(path);
  };

  // Filter menu items based on search and price
  const filteredMenuItems = useMemo(() => {
    const menuItems = getMenuItems(activeTab);
    
    return menuItems.filter((item) => {
      // Search filter
      const matchesSearch = 
        searchTerm === '' || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Price filter
      let matchesPrice = true;
      if (priceFilter !== 'all') {
        const price = parseFloat(item.price.replace('$', ''));
        switch (priceFilter) {
          case 'low':
            matchesPrice = price < 1;
            break;
          case 'medium':
            matchesPrice = price >= 1 && price < 5;
            break;
          case 'high':
            matchesPrice = price >= 5;
            break;
        }
      }
      
      return matchesSearch && matchesPrice;
    });
  }, [activeTab, searchTerm, priceFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setPriceFilter('all');
  };

  const handleAddToCart = (item: MenuItem) => {
    // Cart functionality can be implemented here
    console.log('Added to cart:', item.name);
  };

  return (
    <main className={styles.menuPage}>
      <section className={styles.menuHero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Our Best Sellers</span>
          <h1>Our Menu</h1>
          <p>Discover our delicious variety of fries and more, crafted with passion since 1952</p>
        </div>
      </section>
      
      <div className={styles.menuContainer}>
        <MenuTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />

        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
          onClearFilters={clearFilters}
          resultCount={filteredMenuItems.length}
        />

        <div className={styles.menuGrid}>
          {filteredMenuItems.map((item) => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
