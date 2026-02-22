import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';
import { useCart } from '../../context/CartContext';

// Import images directly
import OriginalFries from '../../assets/Original_French_Fries.png';
import CrispyKrinkle from '../../assets/Crispy_Crinkles_Fries.png';
import CurlyFries from '../../assets/Curly_Fries.png';
import WaffleFries from '../../assets/Waffle French Fries.png';
import TaterTots from '../../assets/Tater Tots.png';
import MiniSize from '../../assets/Mini.png';
import RegularSize from '../../assets/Regular.png';
import JumboSize from '../../assets/Jumbo.png';
import FryTownClassicFries from '../../assets/FryTown_Classic_Fries.png';
import FryTownCrinkleFries from '../../assets/FryTown_Crinkle_Fries.png';
import FryTownCurlyFries from '../../assets/FryTown_Curly_Fries.png';
import FryTownPotatoWedges from '../../assets/FryTown_Potato_Wedges.png';
import FryTownSweetPotatoFries from '../../assets/FryTown_Sweet_Potato_Fries.png';
import FryTownTaterTots from '../../assets/FryTown_Tater_tots.png';
import FryTownWaffleFries from '../../assets/FryTown_Waffle_Fries.png';

type MenuTab = 'classic' | 'build-your-fries' | 'specialty' | 'dips' | 'beverages';

type Size = {
  name: string;
  price: number;
};

type Style = {
  name: string;
  additionalPrice?: number;
};

type Flavor = {
  name: string;
  additionalPrice?: number;
  category: 'dry' | 'premium' | 'sweet';
};

type FriesCustomization = {
  size: string;
  style: string;
  flavors: string[];
};

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: any;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  glutenFree?: boolean;
  calories?: string;
  ingredients?: string[];
  buildYourOwn?: boolean;
  combo?: boolean;
}

interface MenuProps {
  initialTab?: MenuTab;
}

export default function Menu({ initialTab = 'classic' }: MenuProps) {
  const [activeTab, setActiveTab] = useState<MenuTab>(initialTab);
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  // Build Your Fries state
  const [customization, setCustomization] = useState<FriesCustomization>({
    size: '',
    style: '',
    flavors: [],
  });

  useEffect(() => {
    const rawTabFromUrl = (location.pathname.split('/').pop() ?? '') as string;
    const mappedTabFromUrl =
      rawTabFromUrl === 'fries'
        ? 'classic'
        : rawTabFromUrl === 'drinks'
          ? 'beverages'
          : rawTabFromUrl;

    if (
      mappedTabFromUrl === 'classic' ||
      mappedTabFromUrl === 'build-your-fries' ||
      mappedTabFromUrl === 'specialty' ||
      mappedTabFromUrl === 'dips' ||
      mappedTabFromUrl === 'beverages'
    ) {
      setActiveTab(mappedTabFromUrl);
    }
  }, [location.pathname, navigate]);

  const handleTabChange = (tab: MenuTab) => {
    setActiveTab(tab);
    navigate(`/menu/${tab}`);
    window.scrollTo(0, 0);
  };

  const tabs: { id: MenuTab; label: string }[] = [
    { id: 'classic', label: 'Classic Fries' },
    { id: 'specialty', label: 'Specialty Fries' },
    { id: 'build-your-fries', label: 'Build Your Fries' },
    { id: 'dips', label: 'Dipping Sauces' },
    { id: 'beverages', label: 'Beverages' },
    
  ];

  // Build Your Fries Options
  const sizes: Size[] = [
    { name: 'Mini', price: 69 },
    { name: 'Regular (Best Seller)', price: 99 },
    { name: 'Jumbo', price: 139 },
  ];

  const sizeImages: Record<string, any> = {
    Mini: MiniSize,
    'Regular (Best Seller)': RegularSize,
    Jumbo: JumboSize,
  };

  const fryStyles: Style[] = [
    { name: 'Classic Fries' },
    { name: 'Crinkle Fries' },
    { name: 'Curly Fries', additionalPrice: 10 },
    { name: 'Potato Wedges', additionalPrice: 10 },
    { name: 'Sweet Potato Fries', additionalPrice: 20 },
    { name: 'Tater Tots', additionalPrice: 10 },
    { name: 'Waffle Fries', additionalPrice: 10 },
  ];

  const styleImages: Record<string, any> = {
    'Classic Fries': FryTownClassicFries,
    'Crinkle Fries': FryTownCrinkleFries,
    'Curly Fries': FryTownCurlyFries,
    'Potato Wedges': FryTownPotatoWedges,
    'Sweet Potato Fries': FryTownSweetPotatoFries,
    'Tater Tots': FryTownTaterTots,
    'Waffle Fries': FryTownWaffleFries,
  };

  const flavors: Flavor[] = [
    // Dry Masala Flavors
    { name: 'Classic Salted', category: 'dry' },
    { name: 'Peri Peri Masala', category: 'dry' },
    { name: 'Chaat Masala', category: 'dry' },
    { name: 'Mint & Coriander', category: 'dry' },
    { name: 'Curry Leaf Spice', category: 'dry' },
    { name: 'Garlic Pepper', category: 'dry' },
    // Premium Flavors
    { name: 'Butter Garlic', category: 'premium', additionalPrice: 10 },
    { name: 'Cheese & Jalapeño', category: 'premium', additionalPrice: 10 },
    { name: 'Lemon Pepper', category: 'premium', additionalPrice: 10 },
    { name: 'Smoky BBQ (Indian Style)', category: 'premium', additionalPrice: 10 },
    // Sweet Option
    { name: 'Cinnamon Sugar Fries', category: 'sweet' },
  ];

  const handleSizeSelect = (size: string) => {
    setCustomization(prev => ({ ...prev, size }));
  };

  const handleStyleSelect = (style: string) => {
    setCustomization(prev => ({ ...prev, style }));
  };

  const handleFlavorToggle = (flavor: string) => {
    setCustomization(prev => {
      const flavors = [...prev.flavors];
      const index = flavors.indexOf(flavor);
      if (index > -1) {
        flavors.splice(index, 1);
      } else {
        if (flavors.length < 2) {
          flavors.push(flavor);
        } else {
          // Replace the second flavor if already have 2
          flavors[1] = flavor;
        }
      }
      return { ...prev, flavors };
    });
  };

  const handleAddToCart = () => {
    if (!customization.size || !customization.style || customization.flavors.length === 0) {
      return;
    }

    const customFriesItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: 'Custom Build Your Fries',
      price: calculateTotal(),
      image: OriginalFries,
      customizations: {
        size: customization.size,
        style: customization.style,
        flavors: customization.flavors,
      },
      type: 'custom' as const,
    };

    addItem(customFriesItem);
    
    // Reset customization after adding to cart
    setCustomization({
      size: '',
      style: '',
      flavors: [],
    });
  };

  const handleAddMenuItemToCart = (item: MenuItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: parseInt(item.price.replace('₹', '')),
      image: item.image,
      type: 'regular' as const,
    };
    
    addItem(cartItem);
  };

  const calculateTotal = () => {
    let total = 0;
    
    // Add size price
    const selectedSize = sizes.find(s => s.name === customization.size);
    if (selectedSize) total += selectedSize.price;
    
    // Add style additional price
    const selectedStyle = fryStyles.find(s => s.name === customization.style);
    if (selectedStyle?.additionalPrice) total += selectedStyle.additionalPrice;
    
    // Add flavors additional price
    customization.flavors.forEach(flavorName => {
      const flavor = flavors.find(f => f.name === flavorName);
      if (flavor?.additionalPrice) total += flavor.additionalPrice;
    });
    
    // Add extra charge for mixing flavors if more than one
    if (customization.flavors.length > 1) {
      total += 10; // +₹10 for mixing 2 flavors
    }
    
    return total;
  };

  const friesMenu: MenuItem[] = [
    {
      id: 'build-your-own',
      name: '🧾 BUILD YOUR FRIES',
      description: 'Create your perfect fries with your choice of size, style, and flavor!',
      price: `₹${calculateTotal()}`,
      image: OriginalFries,
      buildYourOwn: true,
    },
    {
      id: 'classic-fries',
      name: 'Classic Fries',
      description: 'Hand-cut golden fries with our signature seasoning',
      price: '₹99',
      image: OriginalFries,
      vegetarian: true,
      popular: true,
    },
    {
      id: 'sweet-potato-fries',
      name: 'Sweet Potato Fries',
      description: 'Crispy sweet potato fries with a hint of cinnamon',
      price: '₹119',
      image: CrispyKrinkle,
      vegetarian: true,
    },
    {
      id: 'curly-fries',
      name: 'Spicy Curly Fries',
      description: 'Fun spiral-cut fries seasoned with our signature blend of Cajun spices and herbs. A customer favorite!',
      price: '₹99',
      image: CurlyFries,
      spicy: true,
      popular: true,
      vegetarian: true,
    },
    {
      id: 'waffle-fries',
      name: 'Belgian Waffle Fries',
      description: 'Unique waffle-shaped fries with extra surface area for maximum dipping pleasure. Crispy edges, soft center.',
      price: '₹99',
      image: WaffleFries,
      vegetarian: true,
    },
    {
      id: 'tater-tots',
      name: 'Golden Tater Tots',
      description: 'Crispy, golden-brown potato tots that are crunchy outside and soft inside. The perfect comfort food.',
      price: '₹99',
      image: TaterTots,
      popular: true,
      vegetarian: true,
    },
  ];

  const specialtyMenu: MenuItem[] = [
    {
      id: 'masala-fries',
      name: 'Masala Fries',
      description: 'Crispy fries tossed in our special Indian spice blend with onions, coriander, and a squeeze of lemon.',
      price: '₹129',
      image: OriginalFries,
      spicy: true,
      popular: true,
      vegetarian: true
    },
    {
      id: 'paneer-tikka-fries',
      name: 'Paneer Tikka Fries',
      description: 'Golden fries topped with spicy paneer tikka, mint chutney, and sev for extra crunch.',
      price: '₹159',
      image: CrispyKrinkle,
      vegetarian: true,
      popular: true
    },
    {
      id: 'chicken-tandoori-fries',
      name: 'Chicken Tandoori Fries',
      description: 'A delicious combination of tender tandoori chicken pieces on a bed of crispy fries, drizzled with mint yogurt.',
      price: '₹179',
      image: CurlyFries,
      spicy: true
    },
    {
      id: 'mexican-loaded-fries',
      name: 'Mexican Loaded Fries',
      description: 'Crispy fries loaded with spicy beans, corn, jalapeños, cheese, and a dollop of sour cream.',
      price: '₹169',
      image: WaffleFries,
      vegetarian: true,
      popular: true
    },
    // Combo items
    {
      id: 'mini-combo',
      name: 'Mini Combo',
      description: 'Mini fries + 1 dip + 1 can of soda',
      price: '₹149',
      image: TaterTots,
      combo: true,
      vegetarian: true
    },
    {
      id: 'regular-combo',
      name: 'Regular Combo',
      description: 'Regular fries + 1 dip + 1 can of soda',
      price: '₹189',
      image: OriginalFries,
      combo: true,
      vegetarian: true,
      popular: true
    },
    {
      id: 'jumbo-combo',
      name: 'Jumbo Combo',
      description: 'Jumbo fries + 2 dips + 1 large soda',
      price: '₹249',
      image: CurlyFries,
      combo: true,
      vegetarian: true
    },
  ];

  const dipsMenu: MenuItem[] = [
    {
      id: 'cheese-dip',
      name: 'Cheese Dip',
      description: 'Creamy, melted cheese sauce with a hint of garlic',
      price: '₹25',
      image: OriginalFries,
      vegetarian: true
    },
    {
      id: 'garlic-mayo',
      name: 'Garlic Mayo',
      description: 'Creamy mayonnaise with roasted garlic and herbs',
      price: '₹20',
      image: CrispyKrinkle,
      vegetarian: true
    },
    {
      id: 'mint-chutney',
      name: 'Mint Chutney',
      description: 'Fresh mint and coriander chutney with a touch of spice',
      price: '₹15',
      image: CurlyFries,
      vegetarian: true,
      popular: true
    },
    {
      id: 'sweet-chili',
      name: 'Sweet Chili',
      description: 'Sweet and spicy chili sauce with a tangy finish',
      price: '₹20',
      image: WaffleFries,
      vegetarian: true
    },
    {
      id: 'bbq-sauce',
      name: 'BBQ Sauce',
      description: 'Smoky and sweet barbecue sauce',
      price: '₹20',
      image: TaterTots,
      vegetarian: true
    },
    {
      id: 'sriracha-mayo',
      name: 'Sriracha Mayo',
      description: 'Creamy mayo with a spicy sriracha kick',
      price: '₹25',
      image: OriginalFries,
      spicy: true,
      vegetarian: true
    },
  ];

  const drinksMenu: MenuItem[] = [
    {
      id: 'coke',
      name: 'Coca-Cola',
      description: 'Classic Coca-Cola',
      price: '₹40',
      image: OriginalFries,
      vegetarian: true
    },
    {
      id: 'sprite',
      name: 'Sprite',
      description: 'Crisp, refreshing lemon-lime soda',
      price: '₹40',
      image: CrispyKrinkle,
      vegetarian: true
    },
    {
      id: 'mango-lassi',
      name: 'Mango Lassi',
      description: 'Creamy yogurt drink with sweet mango',
      price: '₹60',
      image: CurlyFries,
      vegetarian: true,
      popular: true
    },
    {
      id: 'masala-chai',
      name: 'Masala Chai',
      description: 'Spiced Indian tea with milk',
      price: '₹50',
      image: WaffleFries,
      vegetarian: true
    },
    {
      id: 'iced-tea',
      name: 'Iced Tea',
      description: 'Refreshing iced tea with lemon',
      price: '₹45',
      image: TaterTots,
      vegetarian: true
    },
    {
      id: 'mineral-water',
      name: 'Mineral Water',
      description: '500ml bottled water',
      price: '₹30',
      image: OriginalFries,
      vegetarian: true
    },
  ];

  const renderBuildYourOwnFries = () => {
    const isSizeSelected = !!customization.size;
    const isStyleSelected = !!customization.style;
    const isFlavorSelected = customization.flavors.length > 0;
    
    return (
      <div className={`${styles.menuItem} ${styles.buildYourOwn}`}>
        {/* Progress Indicator */}
        <div className={styles.progressIndicator}>
          <div className={`${styles.progressStep} ${isSizeSelected ? styles.completed : styles.active}`}>
            <div className={styles.progressStepNumber}>1</div>
            <div className={styles.progressStepLabel}>Size</div>
          </div>
          <div className={`${styles.progressConnector} ${isSizeSelected ? styles.completed : ''}`}></div>
          <div className={`${styles.progressStep} ${isStyleSelected ? styles.completed : (isSizeSelected ? styles.active : '')}`}>
            <div className={styles.progressStepNumber}>2</div>
            <div className={styles.progressStepLabel}>Style</div>
          </div>
          <div className={`${styles.progressConnector} ${isStyleSelected ? styles.completed : ''}`}></div>
          <div className={`${styles.progressStep} ${isFlavorSelected ? styles.completed : (isStyleSelected ? styles.active : '')}`}>
            <div className={styles.progressStepNumber}>3</div>
            <div className={styles.progressStepLabel}>Flavor</div>
          </div>
        </div>
        
        <div className={styles.buildYourOwnContent}>
          <p className={styles.buildYourOwnSubtitle}>Create your perfect fries with your choice of size, style, and flavor!</p>
      
      <div className={`${styles.buildSection} ${isSizeSelected ? styles.completed : ''}`}>
        <h3 className={styles.sectionTitle}>PICK YOUR SIZE</h3>
        <div className={styles.optionGroup}>
          {sizes.map(size => (
            <button
              key={size.name}
              className={`${styles.optionButton} ${customization.size === size.name ? styles.selected : ''}`}
              onClick={() => handleSizeSelect(size.name)}
            >
              <img className={styles.optionImage} src={sizeImages[size.name] ?? OriginalFries} alt={size.name} />
              <span className={styles.optionName}>{size.name}</span>
              <span className={styles.optionPrice}>₹{size.price}</span>
              {size.name.includes('Best Seller') && <span className={styles.bestSellerBadge}>BEST SELLER</span>}
            </button>
          ))}
        </div>
      </div>

      <div className={`${styles.buildSection} ${isStyleSelected ? styles.completed : ''}`}>
        <h3 className={styles.sectionTitle}>PICK YOUR STYLE</h3>
        <div className={styles.optionGroup}>
          {fryStyles.map(style => (
            <button
              key={style.name}
              className={`${styles.optionButton} ${customization.style === style.name ? styles.selected : ''}`}
              onClick={() => handleStyleSelect(style.name)}
            >
              <img className={styles.optionImage} src={styleImages[style.name] ?? OriginalFries} alt={style.name} />
              <span className={styles.optionName}>{style.name}</span>
              {style.additionalPrice && (
                <span className={styles.additionalPrice}>+₹{style.additionalPrice}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={`${styles.buildSection} ${isFlavorSelected ? styles.completed : ''}`}>
        <h3 className={styles.sectionTitle}>PICK YOUR FLAVOR</h3>
        
        <div className={styles.flavorCategory}>
          <h4 className={styles.flavorCategoryTitle}>Dry Masala Flavors</h4>
          <div className={styles.optionGroup}>
            {flavors
              .filter(f => f.category === 'dry')
              .map(flavor => (
                <button
                  key={flavor.name}
                  className={`${styles.optionButton} ${customization.flavors.includes(flavor.name) ? styles.selected : ''}`}
                  onClick={() => handleFlavorToggle(flavor.name)}
                >
                  {flavor.name}
                  {flavor.additionalPrice && (
                    <span className={styles.flavorPrice}>+₹{flavor.additionalPrice}</span>
                  )}
                </button>
              ))}
          </div>
        </div>

        <div className={styles.flavorCategory}>
          <div className={styles.flavorCategoryHeader}>
            <h4 className={styles.flavorCategoryTitle}>Premium Flavors</h4>
            <span className={styles.premiumBadge}>+₹10</span>
          </div>
          <div className={styles.optionGroup}>
            {flavors
              .filter(f => f.category === 'premium')
              .map(flavor => (
                <button
                  key={flavor.name}
                  className={`${styles.optionButton} ${customization.flavors.includes(flavor.name) ? styles.selected : ''}`}
                  onClick={() => handleFlavorToggle(flavor.name)}
                >
                  {flavor.name}
                  <span className={styles.flavorPrice}>+₹{flavor.additionalPrice}</span>
                </button>
              ))}
          </div>
        </div>

        <div className={styles.flavorCategory}>
          <h4 className={styles.flavorCategoryTitle}>Sweet Option</h4>
          <div className={styles.optionGroup}>
            {flavors
              .filter(f => f.category === 'sweet')
              .map(flavor => (
                <button
                  key={flavor.name}
                  className={`${styles.optionButton} ${customization.flavors.includes(flavor.name) ? styles.selected : ''}`}
                  onClick={() => handleFlavorToggle(flavor.name)}
                >
                  {flavor.name}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className={styles.buildFooter}>
        <p className={styles.mixFlavors}>
          <span className={styles.infoIcon}>ℹ️</span> Mix 2 flavors for +₹10 extra
        </p>
        
        <div className={styles.totalPrice}>
          <span className={styles.totalLabel}>Total:</span>
          <span className={`${styles.totalAmount} ${styles.updating}`}>₹{calculateTotal()}</span>
        </div>
        
        <button 
          className={styles.addToCartButton}
          disabled={!customization.size || !customization.style || customization.flavors.length === 0}
          onClick={handleAddToCart}
        >
          Add to Cart - ₹{calculateTotal()}
        </button>
      </div>
        </div>
      </div>
    );
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => (
      <div key={item.id} className={styles.menuItem}>
        <div className={styles.itemImage}>
          <img src={item.image} alt={item.name} />
          {item.popular && <span className={styles.popularBadge}>Popular</span>}
        </div>
        <div className={styles.itemDetails}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <div className={styles.itemFooter}>
            <span className={styles.price}>{item.price}</span>
            <button className={styles.addToCart} onClick={() => handleAddMenuItemToCart(item)}>Add to Cart</button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.menuContent}>
        {activeTab === 'classic' && (
          <>
            <h2 className={styles.sectionHeader}>Classic Fries</h2>
            <div className={styles.menuGrid}>
              {renderMenuItems(friesMenu.filter(item => !item.buildYourOwn))}
            </div>
          </>
        )}

        {activeTab === 'build-your-fries' && (
          <>
            <h2 className={styles.sectionHeader}>Build Your Fries</h2>
            {renderBuildYourOwnFries()}
          </>
        )}

        {activeTab === 'specialty' && (
          <>
            <h2 className={styles.sectionHeader}>Specialty Fries</h2>
            <div className={styles.menuGrid}>
              {renderMenuItems(specialtyMenu.filter(item => !item.combo))}
            </div>

            <h2 className={styles.sectionHeader}>Combos</h2>
            <div className={styles.menuGrid}>
              {renderMenuItems(specialtyMenu.filter(item => item.combo))}
            </div>
          </>
        )}

        {activeTab === 'dips' && (
          <div className={styles.menuGrid}>
            {renderMenuItems(dipsMenu)}
          </div>
        )}

        {activeTab === 'beverages' && (
          <div className={styles.menuGrid}>
            {renderMenuItems(drinksMenu)}
          </div>
        )}
      </div>
    </div>
  );
}
