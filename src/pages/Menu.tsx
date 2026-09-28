import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  menuCategories,
  OFFICIAL_ORDER_URL,
  DietaryType,
  MenuCategory,
  MenuItem,
} from '../data/menuData';
import './Menu.css';

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'name-asc';

export interface FilterState {
  dietary: DietaryType[];
  sortBy: SortOption;
}

const initialFilters: FilterState = {
  dietary: [],
  sortBy: 'recommended',
};

/* --------------------------------------------------------------------------
 * 1. Menu Hero Section (1:1 Arlington Heights Architecture)
 * -------------------------------------------------------------------------- */
const MenuHero: React.FC = () => {
  return (
    <div className="cc-menu-hero">
      <div className="cc-menu-eyebrow-wrapper">
        <span className="cc-menu-eyebrow-star" aria-hidden="true">
          ✦
        </span>
        <span className="label-editorial cc-menu-eyebrow">OUR MENU</span>
        <span className="cc-menu-eyebrow-star" aria-hidden="true">
          ✦
        </span>
      </div>

      <h1 className="cc-menu-title font-display">South Indian Menu</h1>

      <p className="cc-menu-subtitle">The flavors of Chennai Central</p>

      <div className="cc-menu-location-wrapper">
        <div
          className="cc-menu-location-pill"
          style={{ cursor: 'default' }}
          aria-label="Location: Warrenville"
        >
          <span className="cc-menu-location-icon" aria-hidden="true">
            📍
          </span>
          <span className="cc-menu-location-text font-body">
            Location: <strong>Warrenville</strong>
          </span>
        </div>
      </div>

      <p className="cc-menu-description font-body">
        Authentic South Indian dishes in Warrenville, IL. A carefully curated selection of traditional specialties, prepared with heritage recipes, aromatic spices, and fresh ingredients.
      </p>
    </div>
  );
};

/* --------------------------------------------------------------------------
 * 2. Sticky Search & Category Navigation Bar
 * -------------------------------------------------------------------------- */
interface MenuSearchAndNavProps {
  categories: MenuCategory[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  matchCount?: number;
  isSearching: boolean;
  activeFilterCount: number;
  onOpenMobileFilters: () => void;
}

const MenuSearchAndNav: React.FC<MenuSearchAndNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  matchCount = 0,
  isSearching,
  activeFilterCount,
  onOpenMobileFilters,
}) => {
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navScrollRef.current) return;
    const activeEl = navScrollRef.current.querySelector<HTMLElement>(
      `[data-category-id="${activeCategoryId}"]`
    );
    if (activeEl) {
      const container = navScrollRef.current;
      const elOffset = activeEl.offsetLeft;
      const elWidth = activeEl.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = elOffset - containerWidth / 2 + elWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeCategoryId]);

  return (
    <div className="cc-menu-sticky-header">
      <div className="cc-menu-sticky-inner">
        <div className="cc-menu-search-row">
          <div className="cc-menu-search-input-wrapper">
            <span className="cc-menu-search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for dishes, ingredients..."
              className="cc-menu-search-input font-body"
              aria-label="Search dishes and ingredients"
            />
            {searchQuery && (
              <button
                type="button"
                className="cc-menu-search-clear-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            className="cc-menu-mobile-filter-btn"
            onClick={onOpenMobileFilters}
            aria-label="Open filter options"
          >
            <SlidersHorizontal size={15} className="cc-menu-filter-btn-icon" aria-hidden="true" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="cc-menu-filter-btn-badge">{activeFilterCount}</span>
            )}
          </button>
        </div>

        {isSearching && (
          <div className="cc-menu-search-feedback">
            <p className="cc-menu-search-count font-body">
              {matchCount === 0
                ? `No dishes found matching "${searchQuery}"`
                : `${matchCount} ${matchCount === 1 ? 'dish' : 'dishes'} found for "${searchQuery}"`}
            </p>
          </div>
        )}

        <nav className="cc-menu-category-nav" ref={navScrollRef} aria-label="Menu categories">
          <div className="cc-menu-category-nav-list">
            <button
              type="button"
              data-category-id="all"
              className={`cc-menu-category-pill ${activeCategoryId === 'all' ? 'cc-menu-category-pill--active' : ''}`}
              onClick={() => onSelectCategory('all')}
              aria-current={activeCategoryId === 'all' ? 'true' : undefined}
            >
              ALL
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                data-category-id={category.id}
                className={`cc-menu-category-pill ${activeCategoryId === category.id ? 'cc-menu-category-pill--active' : ''}`}
                onClick={() => onSelectCategory(category.id)}
                aria-current={activeCategoryId === category.id ? 'true' : undefined}
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------------------
 * 3. Desktop & Mobile Filters Component
 * -------------------------------------------------------------------------- */
interface MenuFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearAll: () => void;
  activeFilterCount: number;
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
}

const MenuFilters: React.FC<MenuFiltersProps> = ({
  filters,
  onFilterChange,
  onClearAll,
  activeFilterCount,
  isOpenOnMobile = false,
  onCloseMobile,
}) => {
  const toggleDietary = (type: DietaryType) => {
    const nextDietary = filters.dietary.includes(type)
      ? filters.dietary.filter((d) => d !== type)
      : [...filters.dietary, type];
    onFilterChange({ ...filters, dietary: nextDietary });
  };

  const setSortBy = (sortBy: SortOption) => {
    onFilterChange({ ...filters, sortBy });
  };

  const filterContent = (
    <div className="cc-menu-filters-inner">
      <div className="cc-menu-filters-header">
        <div className="cc-menu-filters-header-title">
          <span className="cc-menu-filters-icon" aria-hidden="true">
            🎛
          </span>
          <span className="label-editorial cc-menu-filters-heading">FILTERS</span>
          {activeFilterCount > 0 && (
            <span className="cc-menu-filters-count-badge">{activeFilterCount}</span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button type="button" className="cc-menu-filters-clear-btn" onClick={onClearAll}>
            Clear all
          </button>
        )}
      </div>

      <div className="cc-menu-filter-group">
        <h4 className="cc-menu-filter-group-title label-editorial">DIETARY PREFERENCE</h4>
        <div className="cc-menu-filter-options">
          <label className="cc-menu-filter-checkbox-label">
            <input
              type="checkbox"
              checked={filters.dietary.includes('veg')}
              onChange={() => toggleDietary('veg')}
              className="cc-menu-filter-checkbox"
            />
            <span className="cc-menu-checkbox-custom" aria-hidden="true" />
            <span className="cc-dietary-badge cc-dietary-badge--veg" aria-hidden="true">
              <span className="cc-dietary-icon" />
            </span>
            <span className="cc-menu-filter-option-text">Vegetarian</span>
          </label>

          <label className="cc-menu-filter-checkbox-label">
            <input
              type="checkbox"
              checked={filters.dietary.includes('non-veg')}
              onChange={() => toggleDietary('non-veg')}
              className="cc-menu-filter-checkbox"
            />
            <span className="cc-menu-checkbox-custom" aria-hidden="true" />
            <span className="cc-dietary-badge cc-dietary-badge--non-veg" aria-hidden="true">
              <span className="cc-dietary-icon" />
            </span>
            <span className="cc-menu-filter-option-text">Non-Vegetarian</span>
          </label>

          <label className="cc-menu-filter-checkbox-label">
            <input
              type="checkbox"
              checked={filters.dietary.includes('egg')}
              onChange={() => toggleDietary('egg')}
              className="cc-menu-filter-checkbox"
            />
            <span className="cc-menu-checkbox-custom" aria-hidden="true" />
            <span className="cc-dietary-badge cc-dietary-badge--egg" aria-hidden="true">
              <span className="cc-dietary-icon" />
            </span>
            <span className="cc-menu-filter-option-text">Contains Egg</span>
          </label>
        </div>
      </div>

      <div className="cc-menu-filter-group">
        <h4 className="cc-menu-filter-group-title label-editorial">SORT BY</h4>
        <div className="cc-menu-filter-radios">
          <label className="cc-menu-filter-radio-label">
            <input
              type="radio"
              name="sort-option"
              value="recommended"
              checked={filters.sortBy === 'recommended'}
              onChange={() => setSortBy('recommended')}
              className="cc-menu-filter-radio"
            />
            <span className="cc-menu-radio-custom" aria-hidden="true" />
            <span className="cc-menu-filter-option-text">Recommended</span>
          </label>

          <label className="cc-menu-filter-radio-label">
            <input
              type="radio"
              name="sort-option"
              value="price-asc"
              checked={filters.sortBy === 'price-asc'}
              onChange={() => setSortBy('price-asc')}
              className="cc-menu-filter-radio"
            />
            <span className="cc-menu-radio-custom" aria-hidden="true" />
            <span className="cc-menu-filter-option-text">Price: Low to High</span>
          </label>

          <label className="cc-menu-filter-radio-label">
            <input
              type="radio"
              name="sort-option"
              value="price-desc"
              checked={filters.sortBy === 'price-desc'}
              onChange={() => setSortBy('price-desc')}
              className="cc-menu-filter-radio"
            />
            <span className="cc-menu-radio-custom" aria-hidden="true" />
            <span className="cc-menu-filter-option-text">Price: High to Low</span>
          </label>

          <label className="cc-menu-filter-radio-label">
            <input
              type="radio"
              name="sort-option"
              value="name-asc"
              checked={filters.sortBy === 'name-asc'}
              onChange={() => setSortBy('name-asc')}
              className="cc-menu-filter-radio"
            />
            <span className="cc-menu-radio-custom" aria-hidden="true" />
            <span className="cc-menu-filter-option-text">Name: A to Z</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="cc-menu-filters-sidebar" aria-label="Menu Filters">
        {filterContent}
      </aside>

      <div
        className={`cc-menu-filters-mobile-drawer ${isOpenOnMobile ? 'cc-menu-filters-mobile-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Filter Menu Options"
      >
        <div className="cc-menu-filters-backdrop" onClick={onCloseMobile} aria-hidden="true" />
        <div className="cc-menu-filters-sheet">
          <div className="cc-menu-filters-sheet-header">
            <h3 className="label-editorial cc-menu-filters-sheet-title">Filters</h3>
            <button
              type="button"
              className="cc-menu-filters-sheet-close"
              onClick={onCloseMobile}
              aria-label="Close filters"
            >
              ✕
            </button>
          </div>
          <div className="cc-menu-filters-sheet-body">{filterContent}</div>
          <div className="cc-menu-filters-sheet-footer">
            <button type="button" className="cc-menu-filters-sheet-clear" onClick={onClearAll}>
              Clear All
            </button>
            <button
              type="button"
              className="cc-menu-filters-sheet-apply"
              onClick={onCloseMobile}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* --------------------------------------------------------------------------
 * 4. Dish Cards (Standard & Featured)
 * -------------------------------------------------------------------------- */
interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const isOrderEnabled = Boolean(OFFICIAL_ORDER_URL && OFFICIAL_ORDER_URL.trim() !== '');

  const handleOrderClick = (e: React.MouseEvent) => {
    if (!isOrderEnabled) {
      e.preventDefault();
      return;
    }
    window.open(OFFICIAL_ORDER_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="cc-menu-item-card" id={`item-${item.id}`}>
      <div className="cc-menu-item-content">
        <div className="cc-menu-item-header">
          <div className="cc-menu-item-title-group">
            {item.dietary && (
              <span
                className={`cc-dietary-badge cc-dietary-badge--${item.dietary}`}
                title={
                  item.dietary === 'veg'
                    ? 'Vegetarian'
                    : item.dietary === 'non-veg'
                      ? 'Non-Vegetarian'
                      : 'Contains Egg'
                }
                aria-label={
                  item.dietary === 'veg'
                    ? 'Vegetarian'
                    : item.dietary === 'non-veg'
                      ? 'Non-Vegetarian'
                      : 'Contains Egg'
                }
              >
                <span className="cc-dietary-icon" aria-hidden="true" />
              </span>
            )}
            <h3 className="cc-menu-item-name font-display">{item.name}</h3>
          </div>
          <span className="cc-menu-item-price font-display">{item.price}</span>
        </div>

        {item.description && <p className="cc-menu-item-desc font-body">{item.description}</p>}

        <div className="cc-menu-item-footer">
          {isOrderEnabled ? (
            <a
              href={OFFICIAL_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cc-menu-item-order-btn"
              aria-label={`Order ${item.name} online (opens in new tab)`}
            >
              <span>ORDER</span>
              <span className="cc-order-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              onClick={handleOrderClick}
              className="cc-menu-item-order-btn"
              aria-label={`Order ${item.name} online`}
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            >
              <span>ORDER</span>
              <span className="cc-order-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

const FeaturedDishCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const isOrderEnabled = Boolean(OFFICIAL_ORDER_URL && OFFICIAL_ORDER_URL.trim() !== '');

  const handleOrderClick = (e: React.MouseEvent) => {
    if (!isOrderEnabled) {
      e.preventDefault();
      return;
    }
    window.open(OFFICIAL_ORDER_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="cc-featured-card" id={`featured-${item.id}`}>
      <div className="cc-featured-image-wrapper">
        <span className="cc-featured-badge">FEATURED</span>
        {item.image && (
          <picture>
            {item.imageSm && (
              <source
                type="image/webp"
                srcSet={`${item.imageSm} 400w, ${item.image} 800w`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
              />
            )}
            <img
              src={item.image}
              alt={`${item.name} — South Indian specialty at Chennai Central Warrenville`}
              width="400"
              height="280"
              loading="lazy"
              decoding="async"
              className="cc-featured-img"
            />
          </picture>
        )}
      </div>

      <div className="cc-featured-content">
        <div className="cc-featured-header">
          <div className="cc-featured-title-group">
            {item.dietary && (
              <span
                className={`cc-dietary-badge cc-dietary-badge--${item.dietary}`}
                title={
                  item.dietary === 'veg'
                    ? 'Vegetarian'
                    : item.dietary === 'non-veg'
                      ? 'Non-Vegetarian'
                      : 'Contains Egg'
                }
              >
                <span className="cc-dietary-icon" aria-hidden="true" />
              </span>
            )}
            <h3 className="cc-featured-name font-display">{item.name}</h3>
          </div>
          <span className="cc-featured-price font-display">{item.price}</span>
        </div>

        {item.description && <p className="cc-featured-desc font-body">{item.description}</p>}

        <div className="cc-featured-footer">
          {isOrderEnabled ? (
            <a
              href={OFFICIAL_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cc-featured-order-btn"
              aria-label={`Order ${item.name} online (opens in new tab)`}
            >
              <span>ORDER</span>
              <span className="cc-order-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              onClick={handleOrderClick}
              className="cc-featured-order-btn"
              aria-label={`Order ${item.name} online`}
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            >
              <span>ORDER</span>
              <span className="cc-order-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

/* --------------------------------------------------------------------------
 * 5. Menu Category Section Component
 * -------------------------------------------------------------------------- */
interface MenuCategorySectionProps {
  category: MenuCategory;
  filteredItems?: MenuItem[];
}

const MenuCategorySection: React.FC<MenuCategorySectionProps> = ({
  category,
  filteredItems,
}) => {
  const itemsToRender = filteredItems ?? category.items;

  if (itemsToRender.length === 0) {
    return null;
  }

  const featuredItems = itemsToRender.filter((item) => item.featured && item.image);
  const standardItems = itemsToRender.filter((item) => !item.featured || !item.image);

  return (
    <section
      id={category.id}
      className="cc-menu-category-section"
      aria-labelledby={`heading-${category.id}`}
    >
      <div className="cc-menu-category-header">
        <h2 id={`heading-${category.id}`} className="cc-menu-category-title font-display">
          <span>{category.name}</span>
          <span className="cc-menu-category-star" aria-hidden="true">
            ✦
          </span>
        </h2>
        {category.description && (
          <p className="cc-menu-category-desc font-body">{category.description}</p>
        )}
      </div>

      {featuredItems.length > 0 && (
        <div className="cc-menu-featured-grid">
          {featuredItems.map((item) => (
            <FeaturedDishCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {standardItems.length > 0 && (
        <div className="cc-menu-items-grid">
          {standardItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

/* --------------------------------------------------------------------------
 * 6. Mobile Sticky Order CTA Component
 * -------------------------------------------------------------------------- */
const MobileStickyOrderCTA: React.FC = () => {
  const isOrderEnabled = Boolean(OFFICIAL_ORDER_URL && OFFICIAL_ORDER_URL.trim() !== '');

  return (
    <div className="cc-menu-mobile-sticky-cta" aria-label="Mobile quick ordering action">
      {isOrderEnabled ? (
        <a
          href={OFFICIAL_ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cc-menu-mobile-order-btn font-body"
          aria-label="Order online from Chennai Central Warrenville (opens in new tab)"
        >
          <span>ORDER ONLINE</span>
          <span className="cc-menu-mobile-order-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="cc-menu-mobile-order-btn font-body"
          aria-label="Order online from Chennai Central Warrenville"
          style={{ opacity: 0.6, cursor: 'not-allowed' }}
        >
          <span>ORDER ONLINE</span>
          <span className="cc-menu-mobile-order-arrow" aria-hidden="true">
            ↗
          </span>
        </button>
      )}
    </div>
  );
};

/* --------------------------------------------------------------------------
 * 7. Main Menu Page Export (1:1 Arlington Implementation for Warrenville)
 * -------------------------------------------------------------------------- */
export const Menu: React.FC = () => {
  usePageMeta({
    title: 'Chennai Central Warrenville Menu | South Indian Restaurant',
    description:
      'Explore the Chennai Central Warrenville menu featuring authentic South Indian dishes, biryani, dosa, curries, vegetarian favorites, and more.',
    canonicalPath: '/menu',
  });

  const location = useLocation();

  const initialCategory = useMemo(() => {
    if (location.hash) {
      const hashId = location.hash.replace('#', '');
      const matched = menuCategories.find((c) => c.id === hashId);
      if (matched) return matched.id;
    }
    return 'all';
  }, [location.hash]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategory);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = filters.dietary.length;
    if (filters.sortBy !== 'recommended') count += 1;
    return count;
  }, [filters]);

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileFilterOpen) {
        setIsMobileFilterOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  useEffect(() => {
    if (location.hash) {
      const hashId = location.hash.replace('#', '');
      const el = document.getElementById(hashId);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]);

  const parsePrice = (priceStr: string): number => {
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };

  const filteredCategoryData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return menuCategories.map((category) => {
      let items = category.items;

      if (query) {
        items = items.filter((item) => {
          const matchName = item.name.toLowerCase().includes(query);
          const matchDesc = item.description?.toLowerCase().includes(query) ?? false;
          const matchCat = category.name.toLowerCase().includes(query);
          return matchName || matchDesc || matchCat;
        });
      }

      if (filters.dietary.length > 0) {
        items = items.filter((item) => {
          if (!item.dietary) return false;
          return filters.dietary.includes(item.dietary);
        });
      }

      if (filters.sortBy !== 'recommended') {
        items = [...items].sort((a, b) => {
          if (filters.sortBy === 'price-asc') {
            return parsePrice(a.price) - parsePrice(b.price);
          }
          if (filters.sortBy === 'price-desc') {
            return parsePrice(b.price) - parsePrice(a.price);
          }
          if (filters.sortBy === 'name-asc') {
            return a.name.localeCompare(b.name);
          }
          return 0;
        });
      }

      return {
        ...category,
        filteredItems: items,
      };
    });
  }, [searchQuery, filters]);

  const totalMatchCount = useMemo(() => {
    return filteredCategoryData.reduce((acc, cat) => acc + cat.filteredItems.length, 0);
  }, [filteredCategoryData]);

  const handleSelectCategory = useCallback((catId: string) => {
    setActiveCategoryId(catId);
    if (catId === 'all') {
      const heroEl = document.querySelector('.cc-menu-hero');
      const heroHeight = heroEl ? heroEl.getBoundingClientRect().height : 380;
      window.scrollTo({ top: heroHeight - 80, behavior: 'smooth' });
    } else {
      const el = document.getElementById(catId);
      if (el) {
        const offset = 140;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const activeCategoryRef = useRef(activeCategoryId);
  useEffect(() => {
    activeCategoryRef.current = activeCategoryId;
  }, [activeCategoryId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.target.id &&
            activeCategoryRef.current !== entry.target.id
          ) {
            setActiveCategoryId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-140px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    menuCategories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredCategoryData]);

  const handleClearAllFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="page-menu-foundation cc-menu-page-wrapper">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: '/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Menu',
                item: '/menu',
              },
            ],
          }),
        }}
      />

      <MenuHero />

      <MenuSearchAndNav
        categories={menuCategories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        matchCount={totalMatchCount}
        isSearching={isSearching}
        activeFilterCount={activeFilterCount}
        onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
      />

      <div className="cc-menu-layout-container">
        <MenuFilters
          filters={filters}
          onFilterChange={setFilters}
          onClearAll={handleClearAllFilters}
          activeFilterCount={activeFilterCount}
          isOpenOnMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        <main className="cc-menu-content-area" id="menu-content">
          {totalMatchCount === 0 ? (
            <div className="cc-menu-empty-state">
              <span className="cc-menu-empty-icon" aria-hidden="true">
                🍃
              </span>
              <h3 className="cc-menu-empty-title font-display">No dishes found</h3>
              <p className="cc-menu-empty-text font-body">
                We couldn't find any dishes matching your current search or filter criteria.
              </p>
              <button
                type="button"
                className="cc-menu-empty-reset-btn font-body"
                onClick={handleClearAllFilters}
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredCategoryData.map((category) => {
              if (category.filteredItems.length === 0) return null;
              return (
                <MenuCategorySection
                  key={category.id}
                  category={category}
                  filteredItems={category.filteredItems}
                />
              );
            })
          )}
        </main>
      </div>

      <MobileStickyOrderCTA />

      <Footer />
    </div>
  );
};

export default Menu;
