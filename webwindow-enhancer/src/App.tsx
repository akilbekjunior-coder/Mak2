import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Grid3X3, 
  LayoutList, 
  ArrowUpDown, 
  SlidersHorizontal, 
  RotateCcw,
  Sparkles,
  MapPin,
  TrendingDown,
  Building,
  Home,
  CheckCircle2,
  Plus
} from 'lucide-react';

import { Property, FilterState, Currency, Language, DealType } from './types';
import { INITIAL_PROPERTIES } from './data/mockProperties';
import { translations } from './data/translations';

import { Header } from './components/Header';
import { HeroFilter } from './components/HeroFilter';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AddListingModal } from './components/AddListingModal';
import { MortgageCalculatorModal } from './components/MortgageCalculatorModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('maklerim_properties');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PROPERTIES;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('maklerim_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return ['prop-1']; // initial sample favorite
  });

  const [currency, setCurrency] = useState<Currency>('UZS');
  const [language, setLanguage] = useState<Language>('uz');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'area_desc'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [isMortgageCalcOpen, setIsMortgageCalcOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Filter state
  const [filter, setFilter] = useState<FilterState>({
    dealType: 'sale',
    propertyType: '',
    district: '',
    rooms: '',
    priceMin: '',
    priceMax: '',
    searchQuery: '',
    hasMortgageOnly: false,
    verifiedOnly: false,
  });

  const t = translations[language];

  // Backend serverdan e'lonlarni yuklab olish
useEffect(() => {
  fetch('http://localhost:5000/api/listings')
    .then((res) => res.json())
    .then((data) => {
      // Backend joylashuviga qarab data yoki data.data shaklida keladi
      const serverData = Array.isArray(data) ? data : data.data;
      if (serverData && serverData.length > 0) {
        setProperties(serverData);
      }
    })
    .catch((err) => {
      console.error("Backend'dan ma'lumot olishda xatolik:", err);
    });
}, []);

// Save to localStorage
useEffect(() => {
  localStorage.setItem('maklerim_properties', JSON.stringify(properties));
}, [properties]);

  useEffect(() => {
    localStorage.setItem('maklerim_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddProperty = async (newProp: Property) => {
  // 1. Ekran tezroq yangilanishi uchun frontend holatiga qo'shamiz
  setProperties(prev => [newProp, ...prev]);

  // 2. Backend'ga POST so'rovi yuboramiz
  try {
    await fetch('http://localhost:5000/api/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProp),
    });
  } catch (error) {
    console.error("Yangi e'lonni serverga saqlashda xatolik:", error);
  }
};

  const handleResetFilters = () => {
    setFilter({
      dealType: 'sale',
      propertyType: '',
      district: '',
      rooms: '',
      priceMin: '',
      priceMax: '',
      searchQuery: '',
      hasMortgageOnly: false,
      verifiedOnly: false,
    });
  };

  // Filter and sort listings
  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        // Deal type
        if (filter.dealType && prop.dealType !== filter.dealType) {
          return false;
        }
        // Property type
        if (filter.propertyType && prop.propertyType !== filter.propertyType) {
          return false;
        }
        // District
        if (filter.district && !prop.district.toLowerCase().includes(filter.district.toLowerCase())) {
          return false;
        }
        // Rooms
        if (filter.rooms) {
          if (filter.rooms === '4+') {
            if (prop.rooms < 4) return false;
          } else if (prop.rooms.toString() !== filter.rooms) {
            return false;
          }
        }
        // Mortgage
        if (filter.hasMortgageOnly && !prop.hasMortgage) {
          return false;
        }
        // Verified
        if (filter.verifiedOnly && !prop.owner.verified) {
          return false;
        }
        // Max Price
        if (filter.priceMax) {
          const max = Number(filter.priceMax);
          if (!isNaN(max) && max > 0) {
            if (currency === 'UZS' && prop.priceUZS > max) return false;
            if (currency === 'USD' && prop.priceUSD > max) return false;
          }
        }
        // Search Query (title, address, code ID, district)
        if (filter.searchQuery.trim()) {
          const q = filter.searchQuery.toLowerCase().trim();
          const matchCode = prop.code.toLowerCase().includes(q);
          const matchTitle = prop.title.toLowerCase().includes(q);
          const matchAddress = prop.address.toLowerCase().includes(q);
          const matchDistrict = prop.district.toLowerCase().includes(q);
          if (!matchCode && !matchTitle && !matchAddress && !matchDistrict) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') {
          return a.priceUZS - b.priceUZS;
        }
        if (sortBy === 'price_desc') {
          return b.priceUZS - a.priceUZS;
        }
        if (sortBy === 'area_desc') {
          return b.area - a.area;
        }
        // newest default
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      });
  }, [properties, filter, sortBy, currency]);

  const favoriteProperties = useMemo(() => {
    return properties.filter(p => favorites.includes(p.id));
  }, [properties, favorites]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 selection:bg-amber-400 selection:text-slate-950 font-sans antialiased text-slate-900">
      
      {/* Top Header Navigation */}
      <Header
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenAddListing={() => setIsAddListingOpen(true)}
        onOpenCalculator={() => setIsMortgageCalcOpen(true)}
        searchQuery={filter.searchQuery}
        setSearchQuery={(q) => setFilter(prev => ({ ...prev, searchQuery: q }))}
        activeDealType={filter.dealType}
        setActiveDealType={(deal) => setFilter(prev => ({ ...prev, dealType: deal }))}
      />

      {/* Hero & Search/Filter Section */}
      <HeroFilter
        filter={filter}
        setFilter={setFilter}
        language={language}
        currency={currency}
        onResetFilters={handleResetFilters}
        totalResults={filteredProperties.length}
      />

      {/* Main Content Area: Listings & Results */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Results Bar & Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-6 border-b border-slate-200/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {filter.dealType === 'sale' ? t.buy : filter.dealType === 'rent' ? t.rent : t.daily}
              {filter.district ? ` — ${filter.district}` : " — Nukus va Qoraqalpog'iston"}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Jami <span className="font-bold text-slate-900">{filteredProperties.length}</span> ta faol e'lon topildi
            </p>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-2xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline text-slate-400">{t.sortBy}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer font-bold text-slate-800"
              >
                <option value="newest">{t.sortNewest}</option>
                <option value="price_asc">{t.sortPriceAsc}</option>
                <option value="price_desc">{t.sortPriceDesc}</option>
                <option value="area_desc">{t.sortAreaDesc}</option>
              </select>
            </div>

            {/* View Mode Toggle (Grid / List) */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-slate-700'}`}
                title="Kataklar ko'rinishi"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-slate-700'}`}
                title="Ro'yxat ko'rinishi"
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                currency={currency}
                language={language}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={handleToggleFavorite}
                onSelectProperty={(prop) => setSelectedProperty(prop)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <Building className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              {t.noResults}
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Qidiruv so'zini o'zgartiring yoki filtrlarni tozalab, boshqa tuman va toifalarni ko'rib chiqing.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-600 transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetFilters}</span>
            </button>
          </div>
        )}

        {/* Quick CTA Banner for property owners */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-3 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Mulkdorlar va agentlar uchun
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              Uyingiz yoki tijorat binongizni tezroq soting
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Maklerim platformasida bepul e'lon bering va Nukus hamda butun respublika bo'ylab har kuni 5 000 dan ortiq xaridorlarga taklifingizni yetkazing.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={() => setIsAddListingOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg hover:shadow-amber-400/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>Bepul e'lon joylashtirish</span>
            </button>
          </div>

          {/* Decorative background circle */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
        </div>

      </main>

      {/* Footer */}
      <Footer
        language={language}
        onSelectDistrict={(dist) => setFilter(prev => ({ ...prev, district: dist }))}
      />

      {/* Modals & Drawers */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        currency={currency}
        language={language}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <AddListingModal
        isOpen={isAddListingOpen}
        onClose={() => setIsAddListingOpen(false)}
        onAddProperty={handleAddProperty}
        language={language}
      />

      <MortgageCalculatorModal
        isOpen={isMortgageCalcOpen}
        onClose={() => setIsMortgageCalcOpen(false)}
        currency={currency}
        language={language}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteProperties}
        onRemoveFavorite={handleToggleFavorite}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        currency={currency}
        language={language}
      />

    </div>
  );
}
