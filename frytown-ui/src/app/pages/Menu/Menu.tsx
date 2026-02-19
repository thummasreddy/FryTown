import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';

// Import images directly
import BrandLogo from '../../assets/Brand_FryTown.png';
import OriginalFries from '../../assets/Original_French_Fries.png';
import CrispyKrinkles from '../../assets/Crispy_Crinkles_Fries.png';
import CurlyFries from '../../assets/Curly_Fries.png';
import WaffleFries from '../../assets/Waffle French Fries.png';
import TaterTots from '../../assets/Tater Tots.png';

type MenuTab = 'fries' | 'specialty' | 'dips' | 'drinks';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: any; // Using imported image type
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  glutenFree?: boolean;
  calories?: string;
  ingredients?: string[];
}

interface MenuProps {
  initialTab?: MenuTab;
}

export default function Menu({ initialTab = 'fries' }: MenuProps) {
  const [activeTab, setActiveTab] = useState<MenuTab>(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [showFilters, setShowFilters] = useState(false);
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
    { id: 'fries', label: 'Classic Fries' },
    { id: 'specialty', label: 'Specialty Fries' },
    { id: 'dips', label: 'Dipping Sauces' },
    { id: 'drinks', label: 'Beverages' },
  ];

  const friesMenu: MenuItem[] = [
    {
      id: 'original-fries',
      name: 'Classic Original Fries',
      description: 'Hand-cut golden fries with sea salt, perfectly crispy on the outside and fluffy on the inside. Our signature recipe since 1952.',
      price: '$3.99',
      image: OriginalFries,
      popular: true,
      vegetarian: true,
      glutenFree: false,
      calories: '320',
      ingredients: ['Potatoes', 'Sea Salt', 'Vegetable Oil'],
    },
    {
      id: 'crispy-krinkles',
      name: 'Extra Crispy Krinkles',
      description: 'Crinkle-cut fries with maximum crunch and ridges perfect for trapping your favorite dipping sauces.',
      price: '$4.49',
      image: CrispyKrinkles,
      vegetarian: true,
      glutenFree: false,
      calories: '350',
      ingredients: ['Potatoes', 'Sea Salt', 'Special Seasoning', 'Vegetable Oil'],
    },
    {
      id: 'curly-fries',
      name: 'Spicy Curly Fries',
      description: 'Fun spiral-cut fries seasoned with our signature blend of Cajun spices and herbs. A customer favorite!',
      price: '$4.99',
      image: CurlyFries,
      spicy: true,
      popular: true,
      vegetarian: true,
      glutenFree: false,
      calories: '380',
      ingredients: ['Potatoes', 'Cajun Spices', 'Paprika', 'Garlic Powder', 'Vegetable Oil'],
    },
    {
      id: 'waffle-fries',
      name: 'Belgian Waffle Fries',
      description: 'Unique waffle-shaped fries with extra surface area for maximum dipping pleasure. Crispy edges, soft center.',
      price: '$4.49',
      image: WaffleFries,
      vegetarian: true,
      glutenFree: false,
      calories: '340',
      ingredients: ['Potatoes', 'Sea Salt', 'Belgian Seasoning', 'Vegetable Oil'],
    },
    {
      id: 'tater-tots',
      name: 'Golden Tater Tots',
      description: 'Crispy, golden-brown potato tots that are crunchy outside and soft inside. The perfect comfort food.',
      price: '$3.99',
      image: TaterTots,
      popular: true,
      vegetarian: true,
      glutenFree: false,
      calories: '360',
      ingredients: ['Potatoes', 'Onion', 'Flour', 'Sea Salt', 'Vegetable Oil'],
    },
  ];

  const specialtyMenu: MenuItem[] = [
    {
      id: 'loaded-fries',
      name: 'Fully Loaded Fries',
      description: 'Our classic fries topped with melted cheddar cheese, crispy bacon bits, green onions, and a dollop of sour cream.',
      price: '$6.99',
      image: OriginalFries,
      popular: true,
      vegetarian: false,
      glutenFree: false,
      calories: '580',
      ingredients: ['Fries', 'Cheddar Cheese', 'Bacon', 'Green Onions', 'Sour Cream'],
    },
    {
      id: 'cheese-bacon-fries',
      name: 'Double Cheese & Bacon',
      description: 'Golden fries smothered in double melted cheese sauce and extra crispy bacon bits. Pure indulgence!',
      price: '$7.49',
      image: CrispyKrinkles,
      vegetarian: false,
      glutenFree: false,
      calories: '620',
      ingredients: ['Fries', 'Double Cheddar', 'Extra Bacon', 'Chives'],
    },
    {
      id: 'chili-cheese-fries',
      name: 'Chili Cheese Explosion',
      description: 'Hearty homemade chili and melted cheese sauce over our crispy fries, topped with jalapeños.',
      price: '$7.99',
      image: CurlyFries,
      spicy: true,
      popular: true,
      vegetarian: false,
      glutenFree: false,
      calories: '650',
      ingredients: ['Fries', 'Homemade Chili', 'Cheddar Cheese', 'Jalapeños', 'Sour Cream'],
    },
    {
      id: 'ranch-bacon-fries',
      name: 'Ranch Bacon Bliss',
      description: 'Crispy fries with creamy ranch dressing, bacon bits, and shredded cheddar cheese.',
      price: '$6.49',
      image: WaffleFries,
      vegetarian: false,
      glutenFree: false,
      calories: '540',
      ingredients: ['Fries', 'Ranch Dressing', 'Bacon', 'Cheddar Cheese'],
    },
    {
      id: 'poutine-fries',
      name: 'Canadian Poutine',
      description: 'Authentic Canadian-style fries with fresh cheese curds and rich beef gravy.',
      price: '$7.29',
      image: TaterTots,
      popular: true,
      vegetarian: false,
      glutenFree: false,
      calories: '590',
      ingredients: ['Fries', 'Cheese Curds', 'Beef Gravy', 'Black Pepper'],
    },
  ];

  const dipsMenu: MenuItem[] = [
    {
      id: 'ketchup',
      name: 'Classic Heinz Ketchup',
      description: 'Premium quality tomato ketchup with the perfect balance of sweet and tangy.',
      price: '$0.50',
      image: BrandLogo,
      vegetarian: true,
      glutenFree: true,
      calories: '15',
      ingredients: ['Tomatoes', 'Vinegar', 'Sugar', 'Salt'],
    },
    {
      id: 'mustard',
      name: 'Yellow Mustard',
      description: 'Classic American yellow mustard with a smooth, tangy flavor.',
      price: '$0.50',
      image: BrandLogo,
      vegetarian: true,
      glutenFree: true,
      calories: '5',
      ingredients: ['Mustard Seed', 'Vinegar', 'Turmeric', 'Salt'],
    },
    {
      id: 'bbq-sauce',
      name: 'Smoky BBQ Sauce',
      description: 'Rich and smoky barbecue sauce with a hint of sweetness and spice.',
      price: '$0.75',
      image: BrandLogo,
      popular: true,
      vegetarian: true,
      glutenFree: false,
      calories: '25',
      ingredients: ['Tomatoes', 'Molasses', 'Brown Sugar', 'Spices'],
    },
    {
      id: 'ranch',
      name: 'Creamy Buttermilk Ranch',
      description: 'Smooth and creamy ranch dressing with fresh herbs and buttermilk.',
      price: '$0.75',
      image: BrandLogo,
      vegetarian: true,
      glutenFree: false,
      calories: '60',
      ingredients: ['Buttermilk', 'Mayo', 'Herbs', 'Garlic'],
    },
    {
      id: 'cheese-sauce',
      name: 'Warm Cheddar Cheese Sauce',
      description: 'Rich and creamy cheddar cheese sauce, perfect for dipping.',
      price: '$1.00',
      image: BrandLogo,
      popular: true,
      vegetarian: true,
      glutenFree: false,
      calories: '45',
      ingredients: ['Cheddar Cheese', 'Milk', 'Butter', 'Flour'],
    },
    {
      id: 'spicy-mayo',
      name: 'Spicy Sriracha Mayo',
      description: 'Creamy mayonnaise infused with sriracha for a perfect kick of heat.',
      price: '$0.75',
      image: BrandLogo,
      spicy: true,
      vegetarian: true,
      glutenFree: false,
      calories: '50',
      ingredients: ['Mayonnaise', 'Sriracha', 'Lime Juice', 'Garlic'],
    },
    {
      id: 'garlic-aioli',
      name: 'Garlic Aioli',
      description: 'Homemade garlic aioli with roasted garlic and olive oil.',
      price: '$0.85',
      image: BrandLogo,
      popular: true,
      vegetarian: true,
      glutenFree: false,
      calories: '70',
      ingredients: ['Garlic', 'Olive Oil', 'Egg Yolks', 'Lemon'],
    },
    {
      id: 'sweet-chili',
      name: 'Sweet Chili Sauce',
      description: 'Thai-inspired sweet and spicy chili sauce with garlic.',
      price: '$0.75',
      image: BrandLogo,
      spicy: true,
      vegetarian: true,
      glutenFree: true,
      calories: '20',
      ingredients: ['Chili', 'Sugar', 'Garlic', 'Vinegar'],
    },
  ];

  const drinksMenu: MenuItem[] = [
    {
      id: 'cola',
      name: 'Coca-Cola Classic',
      description: 'The original and refreshing cola beverage.',
      price: '$1.99',
      image: BrandLogo,
      vegetarian: true,
      glutenFree: true,
      calories: '140',
      ingredients: ['Carbonated Water', 'Sugar', 'Caffeine', 'Natural Flavors'],
    },
    {
      id: 'diet-cola',
      name: 'Diet Coke',
      description: 'Zero sugar, full flavor cola beverage.',
      price: '$1.99',
      image: BrandLogo,
      vegetarian: true,
      glutenFree: true,
      calories: '0',
      ingredients: ['Carbonated Water', 'Aspartame', 'Caffeine', 'Natural Flavors'],
    },
    {
      id: 'lemonade',
      name: 'Fresh Squeezed Lemonade',
      description: 'Refreshing lemonade made with real lemons, not from concentrate.',
      price: '$2.49',
      image: BrandLogo,
      popular: true,
      vegetarian: true,
      glutenFree: true,
      calories: '120',
      ingredients: ['Fresh Lemons', 'Sugar', 'Water', 'Ice'],
    },
    {
      id: 'iced-tea',
      name: 'Southern Sweet Iced Tea',
      description: 'Classic sweet tea brewed to perfection and served ice cold.',
      price: '$1.99',
      image: BrandLogo,
      vegetarian: true,
      glutenFree: true,
      calories: '80',
      ingredients: ['Tea', 'Sugar', 'Water', 'Lemon'],
    },
    {
      id: 'orange-juice',
      name: 'Fresh Orange Juice',
      description: '100% pure squeezed orange juice, never from concentrate.',
      price: '$2.99',
      image: BrandLogo,
      vegetarian: true,
      glutenFree: true,
      calories: '110',
      ingredients: ['Fresh Oranges'],
    },
    {
      id: 'water',
      name: 'Spring Water',
      description: 'Pure, refreshing spring water from natural sources.',
      price: '$1.49',
      image: BrandLogo,
      vegetarian: true,
      glutenFree: true,
      calories: '0',
      ingredients: ['Spring Water'],
    },
  ];

  const getMenuItems = () => {
    switch (activeTab) {
      case 'fries':
        return friesMenu;
      case 'specialty':
        return specialtyMenu;
      case 'dips':
        return dipsMenu;
      case 'drinks':
        return drinksMenu;
      default:
        return friesMenu;
    }
  };

  const filteredMenuItems = useMemo(() => {
    let items = getMenuItems();
    
    // Filter by search term
    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by price range
    if (priceFilter !== 'all') {
      items = items.filter(item => {
        const price = parseFloat(item.price.replace('$', ''));
        switch (priceFilter) {
          case 'low':
            return price < 1;
          case 'medium':
            return price >= 1 && price < 5;
          case 'high':
            return price >= 5;
          default:
            return true;
        }
      });
    }
    
    return items;
  }, [activeTab, searchTerm, priceFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setPriceFilter('all');
  };

  return (
    <main className={styles.menuPage}>
      <section className={styles.menuHero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>🍟 Since 1952</div>
          <h1>Our <span>Delicious</span> Menu</h1>
          <p>Discover our handcrafted fries and premium dipping sauces, made with love and the finest ingredients</p>
        </div>
      </section>
      
      <div className={styles.menuContainer}>
        <div className={styles.sectionHeader}>
          <h2>Choose Your Favorites</h2>
          <p>From classic fries to specialty creations, we have something for everyone</p>
        </div>
        
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className={styles.searchFilterSection}>
          <div className={styles.searchBar}>
            <div className={styles.searchInputWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search for fries, sauces, drinks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <button 
              className={`${styles.filterToggle} ${showFilters ? styles.active : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <span>⚙️</span>
              <span>Filters</span>
              <span>{showFilters ? '▲' : '▼'}</span>
            </button>
          </div>
          
          {showFilters && (
            <div className={styles.filtersPanel}>
              <div className={styles.filterGroup}>
                <label>Price Range:</label>
                <select 
                  value={priceFilter} 
                  onChange={(e) => setPriceFilter(e.target.value as any)}
                  className={styles.priceFilter}
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under $1</option>
                  <option value="medium">$1 - $5</option>
                  <option value="high">$5 and above</option>
                </select>
              </div>
              
              {(searchTerm || priceFilter !== 'all') && (
                <button className={styles.clearFilters} onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          )}
          
          {filteredMenuItems.length === 0 && (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h3>No items found</h3>
              <p>Try adjusting your search terms or filters to find what you're looking for</p>
            </div>
          )}
        </div>

        <div className={styles.menuGrid}>
          {filteredMenuItems.map((item) => (
            <div key={item.id} className={styles.menuItem}>
              <div className={styles.itemImage}>
                <img src={item.image} alt={item.name} />
                <div className={styles.badgesContainer}>
                  {item.popular && <span className={`${styles.badge} ${styles.popular}`}>⭐ Popular</span>}
                  {item.spicy && <span className={`${styles.badge} ${styles.spicy}`}>🌶️ Spicy</span>}
                  {item.vegetarian && <span className={`${styles.badge} ${styles.vegetarian}`}>🌱 Veg</span>}
                </div>
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.itemHeader}>
                  <h3>{item.name}</h3>
                  <div className={styles.itemMeta}>
                    {item.calories && (
                      <span className={styles.calories}>🔥 {item.calories} cal</span>
                    )}
                    <div className={styles.dietaryBadges}>
                      {item.vegetarian && <span className={styles.dietaryBadge} title="Vegetarian">🌱</span>}
                      {item.glutenFree && <span className={styles.dietaryBadge} title="Gluten-Free">🌾</span>}
                    </div>
                  </div>
                </div>
                <p>{item.description}</p>
                {item.ingredients && (
                  <div className={styles.ingredients}>
                    {item.ingredients.slice(0, 3).map((ingredient, index) => (
                      <span key={index} className={styles.ingredientTag}>{ingredient}</span>
                    ))}
                    {item.ingredients.length > 3 && (
                      <span className={styles.ingredientTag}>+{item.ingredients.length - 3} more</span>
                    )}
                  </div>
                )}
                <div className={styles.itemFooter}>
                  <span className={styles.price}>{item.price}</span>
                  <button className={styles.addToCart}>
                    <span>🛒</span>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
