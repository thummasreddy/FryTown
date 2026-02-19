import { useState } from 'react';
import styles from '../styles/SearchFilter.module.css';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  priceFilter: 'all' | 'low' | 'medium' | 'high';
  onPriceFilterChange: (filter: 'all' | 'low' | 'medium' | 'high') => void;
  onClearFilters: () => void;
  resultCount: number;
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
  onClearFilters,
  resultCount
}: SearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = searchTerm || priceFilter !== 'all';

  return (
    <div className={styles.searchFilterSection}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
        <button 
          className={styles.filterToggle}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters {showFilters ? '▲' : '▼'}
        </button>
      </div>
      
      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.filterGroup}>
            <label>Price Range:</label>
            <select 
              value={priceFilter} 
              onChange={(e) => onPriceFilterChange(e.target.value as any)}
              className={styles.priceFilter}
            >
              <option value="all">All Prices</option>
              <option value="low">Under $1</option>
              <option value="medium">$1 - $5</option>
              <option value="high">$5 and above</option>
            </select>
          </div>
          
          {hasActiveFilters && (
            <button className={styles.clearFilters} onClick={onClearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      )}
      
      {resultCount === 0 && (
        <div className={styles.noResults}>
          <h3>No items found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
