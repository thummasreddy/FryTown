import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';
import { frytownApi } from '../../api/frytownApi';
import type { ApiMenuCategory, ApiMenuItem } from '../../api/frytownApi';
import { useCart } from '../../context/useCart';

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
import CheeseDip from '../../assets/Cheese Dip.png';
import GarlicMayo from '../../assets/Garlic Mayo.png';
import MintChutney from '../../assets/Mint Chutney.png';
import SweetChili from '../../assets/Sweet Chili.png';
import BBQSauce from '../../assets/BBQ Sauce.png';
import SrirachaMayo from '../../assets/Sriracha Mayo.png';
import CocaCola from '../../assets/Coca-Cola.png';
import Sprite from '../../assets/Sprite.png';
import MangoLassi from '../../assets/Mango Lassi.png';
import MasalaChai from '../../assets/Masala Chai.png';
import IcedTea from '../../assets/Iced Tea.png';
import Lemonade from '../../assets/lemonade.png';
import MangoLemonade from '../../assets/Mango_lemonade.png';
import StrawberryLemonade from '../../assets/Strawberry_lemonade.png';
import WatermelonLemonade from '../../assets/Watermelon_lemonade.png';
import Buttermilk from '../../assets/buttermilk.png';

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
  menuItemId?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  combo?: boolean;
}

interface MenuProps {
  initialTab?: MenuTab;
}

const MENU_TABS: { id: MenuTab; label: string }[] = [
  { id: 'classic', label: 'Classic Fries' },
  { id: 'specialty', label: 'Specialty Fries' },
  { id: 'build-your-fries', label: 'Build Your Fries' },
  { id: 'dips', label: 'Dipping Sauces' },
  { id: 'beverages', label: 'Beverages' },
];

type ApiMenuBuckets = {
  classic: MenuItem[];
  specialty: MenuItem[];
  combos: MenuItem[];
  dips: MenuItem[];
  beverages: MenuItem[];
  buildItemId?: string;
};

const MENU_IMAGE_BY_FILE: Record<string, string> = {
  'Original_French_Fries.png': OriginalFries,
  'Crispy_Crinkles_Fries.png': CrispyKrinkle,
  'Curly_Fries.png': CurlyFries,
  'Waffle French Fries.png': WaffleFries,
  'Tater Tots.png': TaterTots,
  'FryTown_Classic_Fries.png': FryTownClassicFries,
  'FryTown_Crinkle_Fries.png': FryTownCrinkleFries,
  'FryTown_Curly_Fries.png': FryTownCurlyFries,
  'FryTown_Potato_Wedges.png': FryTownPotatoWedges,
  'FryTown_Sweet_Potato_Fries.png': FryTownSweetPotatoFries,
  'FryTown_Tater_tots.png': FryTownTaterTots,
  'FryTown_Waffle_Fries.png': FryTownWaffleFries,
  'Cheese Dip.png': CheeseDip,
  'Garlic Mayo.png': GarlicMayo,
  'Mint Chutney.png': MintChutney,
  'Sweet Chili.png': SweetChili,
  'BBQ Sauce.png': BBQSauce,
  'Sriracha Mayo.png': SrirachaMayo,
  'Coca-Cola.png': CocaCola,
  'Sprite.png': Sprite,
  'Mango Lassi.png': MangoLassi,
  'Masala Chai.png': MasalaChai,
  'Iced Tea.png': IcedTea,
  'lemonade.png': Lemonade,
  'Mango_lemonade.png': MangoLemonade,
  'Strawberry_lemonade.png': StrawberryLemonade,
  'Watermelon_lemonade.png': WatermelonLemonade,
  'buttermilk.png': Buttermilk,
};

const normalizeLabel = (value: string) => value.trim().toLowerCase();

const createApiMenuBuckets = (): ApiMenuBuckets => ({
  classic: [],
  specialty: [],
  combos: [],
  dips: [],
  beverages: [],
});

const hasApiMenuItems = (menu: ApiMenuBuckets) =>
  menu.classic.length > 0 ||
  menu.specialty.length > 0 ||
  menu.combos.length > 0 ||
  menu.dips.length > 0 ||
  menu.beverages.length > 0;

const resolveApiImage = (image?: string | null) => {
  if (!image) {
    return OriginalFries;
  }

  if (/^(https?:|data:|\/)/i.test(image)) {
    return image;
  }

  const imageFile = image.split(/[\\/]/).pop() ?? image;
  const imageEntry = Object.entries(MENU_IMAGE_BY_FILE).find(
    ([fileName]) => normalizeLabel(fileName) === normalizeLabel(imageFile)
  );

  return imageEntry?.[1] ?? OriginalFries;
};

const mapApiMenuItem = (item: ApiMenuItem, categoryName: string): MenuItem => {
  const name = item.name || 'Menu Item';
  const normalizedName = normalizeLabel(name);
  const normalizedCategory = normalizeLabel(categoryName);

  return {
    id: String(item.id),
    menuItemId: String(item.id),
    name,
    description: item.description ?? '',
    price: item.price ?? item.basePrice ?? 0,
    image: resolveApiImage(item.image),
    popular:
      normalizedName.includes('classic') ||
      normalizedName.includes('combo') ||
      normalizedName.includes('mango'),
    spicy:
      normalizedName.includes('spicy') ||
      normalizedName.includes('masala') ||
      normalizedName.includes('tandoori') ||
      normalizedName.includes('sriracha'),
    vegetarian: !normalizedName.includes('chicken'),
    combo: normalizedCategory.includes('combo') || normalizedName.includes('combo'),
  };
};

const mapApiMenu = (categories: ApiMenuCategory[]) => {
  const menu = createApiMenuBuckets();

  categories.forEach((category) => {
    const categoryName = category.name ?? '';
    const normalizedCategory = normalizeLabel(categoryName);
    const items = (category.items ?? []).map((item) => mapApiMenuItem(item, categoryName));

    if (normalizedCategory.includes('build')) {
      menu.buildItemId = items[0]?.menuItemId;
      return;
    }

    if (normalizedCategory.includes('dip') || normalizedCategory.includes('sauce')) {
      menu.dips.push(...items);
      return;
    }

    if (normalizedCategory.includes('beverage') || normalizedCategory.includes('drink')) {
      menu.beverages.push(...items);
      return;
    }

    if (normalizedCategory.includes('combo')) {
      menu.combos.push(...items);
      return;
    }

    if (normalizedCategory.includes('specialty') || normalizedCategory.includes('loaded')) {
      menu.specialty.push(...items);
      return;
    }

    menu.classic.push(...items);
  });

  return menu;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

const getMenuTabFromPath = (pathname: string): MenuTab | null => {
  const slug = pathname.split('/').pop() ?? '';

  if (slug === 'fries') return 'classic';
  if (slug === 'drinks') return 'beverages';
  if (
    slug === 'classic' ||
    slug === 'build-your-fries' ||
    slug === 'specialty' ||
    slug === 'dips' ||
    slug === 'beverages'
  ) {
    return slug;
  }

  return null;
};

export default function Menu({ initialTab = 'classic' }: MenuProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const activeTab = getMenuTabFromPath(location.pathname) ?? initialTab;

  const [customization, setCustomization] = useState<FriesCustomization>({
    size: '',
    style: '',
    flavors: [],
  });
  const [apiMenu, setApiMenu] = useState<ApiMenuBuckets | null>(null);

  useEffect(() => {
    let isCurrent = true;

    frytownApi
      .getMenu()
      .then((categories) => {
        if (!isCurrent) return;

        const nextMenu = mapApiMenu(categories);
        setApiMenu(hasApiMenuItems(nextMenu) ? nextMenu : null);
      })
      .catch(() => {
        if (isCurrent) {
          setApiMenu(null);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const sizes: Size[] = [
    { name: 'Mini', price: 69 },
    { name: 'Regular (Best Seller)', price: 99 },
    { name: 'Jumbo', price: 139 },
  ];

  const sizeImages: Record<string, string> = {
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

  const styleImages: Record<string, string> = {
    'Classic Fries': FryTownClassicFries,
    'Crinkle Fries': FryTownCrinkleFries,
    'Curly Fries': FryTownCurlyFries,
    'Potato Wedges': FryTownPotatoWedges,
    'Sweet Potato Fries': FryTownSweetPotatoFries,
    'Tater Tots': FryTownTaterTots,
    'Waffle Fries': FryTownWaffleFries,
  };

  const flavors: Flavor[] = [
    { name: 'Classic Salted', category: 'dry' },
    { name: 'Peri Peri Masala', category: 'dry' },
    { name: 'Chaat Masala', category: 'dry' },
    { name: 'Mint & Coriander', category: 'dry' },
    { name: 'Curry Leaf Spice', category: 'dry' },
    { name: 'Garlic Pepper', category: 'dry' },
    { name: 'Butter Garlic', category: 'premium', additionalPrice: 10 },
    { name: 'Cheese & Jalapeno', category: 'premium', additionalPrice: 10 },
    { name: 'Lemon Pepper', category: 'premium', additionalPrice: 10 },
    { name: 'Smoky BBQ', category: 'premium', additionalPrice: 10 },
    { name: 'Cinnamon Sugar Fries', category: 'sweet' },
  ];

  const calculateTotal = () => {
    let total = 0;

    const selectedSize = sizes.find((size) => size.name === customization.size);
    if (selectedSize) total += selectedSize.price;

    const selectedStyle = fryStyles.find((style) => style.name === customization.style);
    if (selectedStyle?.additionalPrice) total += selectedStyle.additionalPrice;

    customization.flavors.forEach((flavorName) => {
      const flavor = flavors.find((entry) => entry.name === flavorName);
      if (flavor?.additionalPrice) total += flavor.additionalPrice;
    });

    if (customization.flavors.length > 1) {
      total += 10;
    }

    return total;
  };

  const friesMenu: MenuItem[] = [
    {
      id: 'classic-fries',
      name: 'Classic Fries',
      description: 'Hand-cut golden fries with house seasoning and a crisp finish.',
      price: 99,
      image: OriginalFries,
      vegetarian: true,
      popular: true,
    },
    {
      id: 'sweet-potato-fries',
      name: 'Sweet Potato Fries',
      description: 'Sweet potato fries with a gentle spice blend and caramelized edges.',
      price: 119,
      image: CrispyKrinkle,
      vegetarian: true,
    },
    {
      id: 'curly-fries',
      name: 'Spicy Curly Fries',
      description: 'Spiral fries with a bold seasoning blend and extra crunch.',
      price: 99,
      image: CurlyFries,
      spicy: true,
      popular: true,
      vegetarian: true,
    },
    {
      id: 'waffle-fries',
      name: 'Belgian Waffle Fries',
      description: 'Crisp waffle-cut fries made for maximum sauce coverage.',
      price: 99,
      image: WaffleFries,
      vegetarian: true,
    },
    {
      id: 'tater-tots',
      name: 'Golden Tater Tots',
      description: 'Crunchy outside, fluffy inside, and ideal for dipping.',
      price: 99,
      image: TaterTots,
      popular: true,
      vegetarian: true,
    },
  ];

  const specialtyMenu: MenuItem[] = [
    {
      id: 'masala-fries',
      name: 'Masala Fries',
      description: 'Classic fries tossed with Indian spices, onions, coriander, and lemon.',
      price: 129,
      image: OriginalFries,
      spicy: true,
      popular: true,
      vegetarian: true,
    },
    {
      id: 'paneer-tikka-fries',
      name: 'Paneer Tikka Fries',
      description: 'Loaded fries with paneer tikka, mint chutney, and crunchy sev.',
      price: 159,
      image: CrispyKrinkle,
      vegetarian: true,
      popular: true,
    },
    {
      id: 'chicken-tandoori-fries',
      name: 'Chicken Tandoori Fries',
      description: 'Crispy fries topped with tandoori chicken and mint yogurt.',
      price: 179,
      image: CurlyFries,
      spicy: true,
    },
    {
      id: 'mexican-loaded-fries',
      name: 'Mexican Loaded Fries',
      description: 'Beans, corn, jalapenos, cheese, and sour cream over crispy fries.',
      price: 169,
      image: WaffleFries,
      vegetarian: true,
      popular: true,
    },
    {
      id: 'mini-combo',
      name: 'Mini Combo',
      description: 'Mini fries, one dip, and one canned drink.',
      price: 149,
      image: TaterTots,
      combo: true,
      vegetarian: true,
    },
    {
      id: 'regular-combo',
      name: 'Regular Combo',
      description: 'Regular fries, one dip, and one canned drink.',
      price: 189,
      image: OriginalFries,
      combo: true,
      vegetarian: true,
      popular: true,
    },
    {
      id: 'jumbo-combo',
      name: 'Jumbo Combo',
      description: 'Jumbo fries, two dips, and one large drink.',
      price: 249,
      image: CurlyFries,
      combo: true,
      vegetarian: true,
    },
  ];

  const dipsMenu: MenuItem[] = [
    {
      id: 'cheese-dip',
      name: 'Cheese Dip',
      description: 'Creamy cheese sauce with a gentle garlic finish.',
      price: 25,
      image: CheeseDip,
      vegetarian: true,
    },
    {
      id: 'garlic-mayo',
      name: 'Garlic Mayo',
      description: 'Roasted garlic mayo for rich, mellow flavor.',
      price: 20,
      image: GarlicMayo,
      vegetarian: true,
    },
    {
      id: 'mint-chutney',
      name: 'Mint Chutney',
      description: 'Fresh mint and coriander chutney with bright acidity.',
      price: 15,
      image: MintChutney,
      vegetarian: true,
    },
    {
      id: 'sweet-chili',
      name: 'Sweet Chili',
      description: 'A sweet-spicy sauce with a clean finish.',
      price: 20,
      image: SweetChili,
      vegetarian: true,
    },
    {
      id: 'bbq-sauce',
      name: 'BBQ Sauce',
      description: 'Smoky barbecue sauce with rounded sweetness.',
      price: 20,
      image: BBQSauce,
      vegetarian: true,
    },
    {
      id: 'sriracha-mayo',
      name: 'Sriracha Mayo',
      description: 'Creamy mayo with a sharp chili kick.',
      price: 25,
      image: SrirachaMayo,
      spicy: true,
      vegetarian: true,
    },
  ];

  const drinksMenu: MenuItem[] = [
    { id: 'coke', name: 'Coca-Cola', description: 'Classic Coca-Cola.', price: 40, image: CocaCola, vegetarian: true },
    { id: 'sprite', name: 'Sprite', description: 'Refreshing lemon-lime soda.', price: 40, image: Sprite, vegetarian: true },
    { id: 'mango-lassi', name: 'Mango Lassi', description: 'Creamy yogurt drink with sweet mango.', price: 60, image: MangoLassi, vegetarian: true },
    { id: 'masala-chai', name: 'Masala Chai', description: 'Spiced Indian tea with milk.', price: 50, image: MasalaChai, vegetarian: true },
    { id: 'iced-tea', name: 'Iced Tea', description: 'Iced tea with lemon.', price: 45, image: IcedTea, vegetarian: true },
    { id: 'lemonade', name: 'Fresh Lemonade', description: 'Fresh-squeezed lemonade.', price: 35, image: Lemonade, vegetarian: true },
    { id: 'mango-lemonade', name: 'Mango Lemonade', description: 'Mango-infused lemonade.', price: 45, image: MangoLemonade, vegetarian: true, popular: true },
    { id: 'strawberry-lemonade', name: 'Strawberry Lemonade', description: 'Sweet strawberry lemonade blend.', price: 45, image: StrawberryLemonade, vegetarian: true },
    { id: 'watermelon-lemonade', name: 'Watermelon Lemonade', description: 'Cool watermelon lemonade.', price: 45, image: WatermelonLemonade, vegetarian: true },
    { id: 'buttermilk', name: 'Buttermilk', description: 'Traditional Indian buttermilk.', price: 30, image: Buttermilk, vegetarian: true },
  ];

  const activeFriesMenu = apiMenu?.classic.length ? apiMenu.classic : friesMenu;
  const activeSpecialtyMenu =
    apiMenu && (apiMenu.specialty.length > 0 || apiMenu.combos.length > 0)
      ? [...apiMenu.specialty, ...apiMenu.combos]
      : specialtyMenu;
  const activeDipsMenu = apiMenu?.dips.length ? apiMenu.dips : dipsMenu;
  const activeDrinksMenu = apiMenu?.beverages.length ? apiMenu.beverages : drinksMenu;

  const handleTabChange = (tab: MenuTab) => {
    navigate(`/menu/${tab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSizeSelect = (size: string) => {
    setCustomization((prev) => ({ ...prev, size }));
  };

  const handleStyleSelect = (style: string) => {
    setCustomization((prev) => ({ ...prev, style }));
  };

  const handleFlavorToggle = (flavor: string) => {
    setCustomization((prev) => {
      const nextFlavors = [...prev.flavors];
      const existingIndex = nextFlavors.indexOf(flavor);

      if (existingIndex > -1) {
        nextFlavors.splice(existingIndex, 1);
      } else if (nextFlavors.length < 2) {
        nextFlavors.push(flavor);
      } else {
        nextFlavors[1] = flavor;
      }

      return { ...prev, flavors: nextFlavors };
    });
  };

  const handleAddToCart = () => {
    if (!customization.size || !customization.style || customization.flavors.length === 0) {
      return;
    }

    addItem({
      id: `custom-${crypto.randomUUID()}`,
      ...(apiMenu?.buildItemId ? { menuItemId: apiMenu.buildItemId } : {}),
      name: 'Custom Build Your Fries',
      price: calculateTotal(),
      image: OriginalFries,
      customizations: {
        size: customization.size,
        style: customization.style,
        flavors: customization.flavors,
      },
      type: 'custom',
    });

    setCustomization({
      size: '',
      style: '',
      flavors: [],
    });
  };

  const handleAddMenuItemToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      ...(item.menuItemId ? { menuItemId: item.menuItemId } : {}),
      name: item.name,
      price: item.price,
      image: item.image,
      type: 'regular',
    });
  };

  const renderBuildYourOwnFries = () => {
    const totalPrice = calculateTotal();
    const isSizeSelected = !!customization.size;
    const isStyleSelected = !!customization.style;
    const isFlavorSelected = customization.flavors.length > 0;

    return (
      <div className={`${styles.menuItem} ${styles.buildYourOwn}`}>
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
          <p className={styles.buildYourOwnSubtitle}>
            Build your own box with one size, one fry style, and up to two flavors.
          </p>

          <div className={`${styles.buildSection} ${isSizeSelected ? styles.completed : ''}`}>
            <h3 className={styles.sectionTitle}>Pick Your Size</h3>
            <div className={styles.optionGroup}>
              {sizes.map((size) => (
                <button
                  key={size.name}
                  type="button"
                  className={`${styles.optionButton} ${customization.size === size.name ? styles.selected : ''}`}
                  onClick={() => handleSizeSelect(size.name)}
                >
                  <img
                    className={styles.optionImage}
                    src={sizeImages[size.name] ?? OriginalFries}
                    alt={size.name}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.optionName}>{size.name}</span>
                  <span className={styles.optionPrice}>{formatPrice(size.price)}</span>
                  {size.name.includes('Best Seller') && <span className={styles.bestSellerBadge}>Best Seller</span>}
                </button>
              ))}
            </div>
          </div>

          <div className={`${styles.buildSection} ${isStyleSelected ? styles.completed : ''}`}>
            <h3 className={styles.sectionTitle}>Pick Your Style</h3>
            <div className={styles.optionGroup}>
              {fryStyles.map((style) => (
                <button
                  key={style.name}
                  type="button"
                  className={`${styles.optionButton} ${customization.style === style.name ? styles.selected : ''}`}
                  onClick={() => handleStyleSelect(style.name)}
                >
                  <img
                    className={styles.optionImage}
                    src={styleImages[style.name] ?? OriginalFries}
                    alt={style.name}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.optionName}>{style.name}</span>
                  {style.additionalPrice && (
                    <span className={styles.additionalPrice}>+{formatPrice(style.additionalPrice)}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className={`${styles.buildSection} ${isFlavorSelected ? styles.completed : ''}`}>
            <h3 className={styles.sectionTitle}>Pick Your Flavor</h3>

            <div className={styles.flavorCategory}>
              <h4 className={styles.flavorCategoryTitle}>Dry Masala Flavors</h4>
              <div className={styles.optionGroup}>
                {flavors
                  .filter((flavor) => flavor.category === 'dry')
                  .map((flavor) => (
                    <button
                      key={flavor.name}
                      type="button"
                      className={`${styles.optionButton} ${customization.flavors.includes(flavor.name) ? styles.selected : ''}`}
                      onClick={() => handleFlavorToggle(flavor.name)}
                    >
                      {flavor.name}
                    </button>
                  ))}
              </div>
            </div>

            <div className={styles.flavorCategory}>
              <div className={styles.flavorCategoryHeader}>
                <h4 className={styles.flavorCategoryTitle}>Premium Flavors</h4>
                <span className={styles.premiumBadge}>+10</span>
              </div>
              <div className={styles.optionGroup}>
                {flavors
                  .filter((flavor) => flavor.category === 'premium')
                  .map((flavor) => (
                    <button
                      key={flavor.name}
                      type="button"
                      className={`${styles.optionButton} ${customization.flavors.includes(flavor.name) ? styles.selected : ''}`}
                      onClick={() => handleFlavorToggle(flavor.name)}
                    >
                      {flavor.name}
                      <span className={styles.flavorPrice}>+{formatPrice(flavor.additionalPrice ?? 0)}</span>
                    </button>
                  ))}
              </div>
            </div>

            <div className={styles.flavorCategory}>
              <h4 className={styles.flavorCategoryTitle}>Sweet Option</h4>
              <div className={styles.optionGroup}>
                {flavors
                  .filter((flavor) => flavor.category === 'sweet')
                  .map((flavor) => (
                    <button
                      key={flavor.name}
                      type="button"
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
            <p className={styles.mixFlavors}>Mix two flavors for an additional {formatPrice(10)}.</p>

            <div className={styles.totalPrice}>
              <span className={styles.totalLabel}>Total</span>
              <span className={`${styles.totalAmount} ${styles.updating}`}>{formatPrice(totalPrice)}</span>
            </div>

            <button
              type="button"
              className={styles.addToCartButton}
              disabled={!customization.size || !customization.style || customization.flavors.length === 0}
              onClick={handleAddToCart}
            >
              Add to Cart {totalPrice > 0 ? `- ${formatPrice(totalPrice)}` : ''}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMenuItems = (items: MenuItem[]) =>
    items.map((item) => (
      <div key={item.id} className={styles.menuItem}>
        <div className={styles.itemImage}>
          <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
          <div className={styles.badgesContainer}>
            {item.popular && <span className={`${styles.badge} ${styles.popular}`}>Popular</span>}
            {item.spicy && <span className={`${styles.badge} ${styles.spicy}`}>Spicy</span>}
            {item.vegetarian && <span className={`${styles.badge} ${styles.vegetarian}`}>Veg</span>}
          </div>
        </div>
        <div className={styles.itemDetails}>
          <div className={styles.itemHeader}>
            <h3>{item.name}</h3>
          </div>
          <p>{item.description}</p>
          <div className={styles.itemFooter}>
            <span className={styles.price}>{formatPrice(item.price)}</span>
            <button type="button" className={styles.addToCart} onClick={() => handleAddMenuItemToCart(item)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className={styles.menuContainer}>
      <div className={styles.tabs}>
        {MENU_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
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
            <div className={styles.menuGrid}>{renderMenuItems(activeFriesMenu)}</div>
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
              {renderMenuItems(activeSpecialtyMenu.filter((item) => !item.combo))}
            </div>

            <h2 className={styles.sectionHeader}>Combos</h2>
            <div className={styles.menuGrid}>
              {renderMenuItems(activeSpecialtyMenu.filter((item) => item.combo))}
            </div>
          </>
        )}

        {activeTab === 'dips' && <div className={styles.menuGrid}>{renderMenuItems(activeDipsMenu)}</div>}

        {activeTab === 'beverages' && <div className={styles.menuGrid}>{renderMenuItems(activeDrinksMenu)}</div>}
      </div>
    </div>
  );
}
