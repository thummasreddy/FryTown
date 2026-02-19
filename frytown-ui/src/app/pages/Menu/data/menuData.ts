import BrandLogo from '../../../assets/Brand_FryTown.png';
import OriginalFries from '../../../assets/Original_French_Fries.png';
import CrispyKrinkles from '../../../assets/Crispy_Crinkles_Fries.png';
import CurlyFries from '../../../assets/Curly_Fries.png';
import WaffleFries from '../../../assets/Waffle French Fries.png';
import TaterTots from '../../../assets/Tater Tots.png';

export type MenuTab = 'fries' | 'specialty' | 'dips' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  glutenFree?: boolean;
  calories?: string;
  ingredients?: string[];
}

export interface Tab {
  id: MenuTab;
  label: string;
}

export const tabs: Tab[] = [
  { id: 'fries', label: 'Classic Fries' },
  { id: 'specialty', label: 'Specialty Fries' },
  { id: 'dips', label: 'Dipping Sauces' },
  { id: 'drinks', label: 'Beverages' },
];

export const friesMenu: MenuItem[] = [
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

export const specialtyMenu: MenuItem[] = [
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

export const dipsMenu: MenuItem[] = [
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

export const drinksMenu: MenuItem[] = [
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

export const getMenuItems = (activeTab: MenuTab): MenuItem[] => {
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
