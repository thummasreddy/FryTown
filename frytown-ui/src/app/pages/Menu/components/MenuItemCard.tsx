import styles from '../styles/MenuItemCard.module.css';
import type { MenuItem } from '../data/menuData';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  return (
    <div className={styles.menuItem}>
      <div className={styles.itemImage}>
        <img src={item.image} alt={item.name} />
        <div className={styles.itemImageOverlay}></div>
        <div className={styles.itemBadges}>
          {item.popular && <span className={`${styles.badge} ${styles.popular}`}>Popular</span>}
          {item.spicy && <span className={`${styles.badge} ${styles.spicy}`}>Spicy</span>}
          {item.vegetarian && <span className={`${styles.badge} ${styles.vegetarian}`}>Veg</span>}
          {item.glutenFree && <span className={`${styles.badge} ${styles.glutenFree}`}>GF</span>}
        </div>
      </div>
      <div className={styles.itemDetails}>
        <h3>{item.name}</h3>
        <div className={styles.itemMeta}>
          {item.calories && (
            <span className={styles.calories}>{item.calories} cal</span>
          )}
        </div>
        <p>{item.description}</p>
        {item.ingredients && item.ingredients.length > 0 && (
          <div className={styles.ingredients}>
            {item.ingredients.slice(0, 3).map((ingredient, index) => (
              <span key={index} className={styles.ingredientTag}>{ingredient}</span>
            ))}
            {item.ingredients.length > 3 && (
              <span className={styles.ingredientTag}>+{item.ingredients.length - 3}</span>
            )}
          </div>
        )}
        <div className={styles.itemFooter}>
          <span className={styles.price}>{item.price}</span>
          <button className={styles.addToCart} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
