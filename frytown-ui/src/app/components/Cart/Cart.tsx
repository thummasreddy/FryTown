import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

export default function Cart() {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => `₹${price}`;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleClearCart = () => {
    clearCart();
    setIsOpen(false);
  };

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    alert('Checkout functionality coming soon!');
  };

  return (
    <div className={styles.cartContainer}>
      {/* Cart Toggle Button */}
      <button 
        className={styles.cartToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Cart with ${cart.itemCount} items`}
      >
        <svg 
          className={styles.cartIcon} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>
        {cart.itemCount > 0 && (
          <span className={styles.cartBadge}>{cart.itemCount}</span>
        )}
      </button>

      {/* Cart Sidebar */}
      <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>Your Cart</h2>
          <button 
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.cartContent}>
          {cart.items.length === 0 ? (
            <div className={styles.emptyCart}>
              <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>Your cart is empty</p>
              <p>Add some delicious fries to get started!</p>
            </div>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cart.items.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      {item.image && (
                        <img src={item.image} alt={item.name} />
                      )}
                    </div>
                    
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      
                      {item.customizations && (
                        <div className={styles.customizations}>
                          <p className={styles.customizationDetail}>
                            Size: {item.customizations.size}
                          </p>
                          <p className={styles.customizationDetail}>
                            Style: {item.customizations.style}
                          </p>
                          {item.customizations.flavors && item.customizations.flavors.length > 0 && (
                            <p className={styles.customizationDetail}>
                              Flavors: {item.customizations.flavors.join(', ')}
                            </p>
                          )}
                        </div>
                      )}
                      
                      <div className={styles.itemControls}>
                        <div className={styles.quantityControls}>
                          <button 
                            className={styles.quantityButton}
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className={styles.quantity}>{item.quantity}</span>
                          <button 
                            className={styles.quantityButton}
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className={styles.itemPrice}>
                          <p className={styles.price}>{formatPrice(item.price * item.quantity)}</p>
                          <p className={styles.unitPrice}>{formatPrice(item.price)} each</p>
                        </div>
                        
                        <button 
                          className={styles.removeButton}
                          onClick={() => handleRemoveItem(item.id)}
                          aria-label="Remove item"
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.cartFooter}>
                <div className={styles.cartSummary}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal ({cart.itemCount} items)</span>
                    <span>{formatPrice(Number(cart.total))}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Tax</span>
                    <span>{formatPrice(Math.round(Number(cart.total) * 0.18))}</span>
                  </div>
                  <div className={`${styles.summaryRow} ${styles.total}`}>
                    <span>Total</span>
                    <span>{formatPrice(Number(cart.total) + Math.round(Number(cart.total) * 0.18))}</span>
                  </div>
                </div>

                <div className={styles.cartActions}>
                  <button 
                    className={styles.clearButton}
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
                  <button 
                    className={styles.checkoutButton}
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
