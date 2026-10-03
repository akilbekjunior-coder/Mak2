import React from 'react';
import { 
  Building, 
  Home, 
  MapPin, 
  RotateCcw, 
  Search,
  BadgePercent,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { FilterState, Language, Currency } from '../types';
import { translations } from '../data/translations';
import { DISTRICTS } from '../data/mockProperties';

interface HeroFilterProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  language: Language;
  currency: Currency;
  onResetFilters: () => void;
  totalResults: number;
}

export const HeroFilter: React.FC<HeroFilterProps> = ({
  filter,
  setFilter,
  language,
  currency,
  onResetFilters,
  totalResults
}) => {
  const t = translations[language];

  return (
    <div className="relative pt-6 pb-8 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-slate-100/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Asosiy sarlavha (Tepada) */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            {t.heroTitle}
          </h1>

          {/* Qidiruv inputi (Sarlavhaning tagiga o'tkazildi) */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder={language === 'uz' ? "Manzil yoki ID bo'yicha qidirish..." : "Поиск по адресу или ID..."}
              value={filter.searchQuery || ''}
              onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full bg-white border border-slate-300 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-3 shadow-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 2. Asosiy Filtrlar kartochkasi */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-4 sm:p-6 transition-all">
          
          {/* Deal Type Switcher Tabs (Sotib olish / Ijaraga olish / Kunlik) */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-2 bg-slate-100/90 p-1 rounded-xl">
              <button
                onClick={() => setFilter(prev => ({ ...prev, dealType: 'sale' }))}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  filter.dealType === 'sale'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'uz' ? "Sotib olish" : "Купить"}
              </button>
              <button
                onClick={() => setFilter(prev => ({ ...prev, dealType: 'rent' }))}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  filter.dealType === 'rent'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'uz' ? "Ijaraga olish" : "Арендовать"}
              </button>
              <button
                onClick={() => setFilter(prev => ({ ...prev, dealType: 'daily' }))}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  filter.dealType === 'daily'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'uz' ? "Kunlik" : "Посуточно"}
              </button>
            </div>

            {/* Quick reset button */}
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-600 transition-colors font-medium px-2 py-1 rounded-md hover:bg-amber-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.reset}</span>
            </button>
          </div>

          {/* Filter Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Mulk toifasi */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {language === 'uz' ? 'Mulk toifasi' : 'Тип недвижимости'}
              </label>
              <div className="relative">
                <select
                  value={filter.propertyType}
                  onChange={(e) => setFilter(prev => ({ ...prev, propertyType: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="">{language === 'uz' ? "Barcha toifalar" : "Все категории"}</option>
                  <option value="apartment">{language === 'uz' ? "Kvartira" : "Квартира"}</option>
                  <option value="house">{language === 'uz' ? "Hovli uy / Yer" : "Дом / Участок"}</option>
                  <option value="cottage">{language === 'uz' ? "Kottej" : "Коттедж"}</option>
                  <option value="commercial">{language === 'uz' ? "Tijorat" : "Коммерция"}</option>
                </select>
                <Building className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Tuman / Hudud */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {language === 'uz' ? 'Hudud / Tuman' : 'Район / Город'}
              </label>
              <div className="relative">
                <select
                  value={filter.district}
                  onChange={(e) => setFilter(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white focus:outline-none appearance-none cursor-pointer"
                >
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d === 'Barchasi' ? '' : d}>
                      {d === 'Barchasi' ? (language === 'uz' ? "Barcha hududlar" : "Все районы") : d}
                    </option>
                  ))}
                </select>
                <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Xonalar */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {language === 'uz' ? 'Xonalar' : 'Комнаты'}
              </label>
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 p-1 rounded-xl">
                {['', '1', '2', '3', '4+'].map((r) => {
                  const isSelected = filter.rooms === r;
                  return (
                    <button
                      key={r || 'all'}
                      type="button"
                      onClick={() => setFilter(prev => ({ ...prev, rooms: r }))}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        isSelected 
                          ? 'bg-amber-500 text-slate-900 shadow-xs' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                    >
                      {r === '' ? (language === 'uz' ? 'Barchasi' : 'Все') : r}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Narx */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {language === 'uz' ? `Maks. narx (${currency})` : `Макс. цена (${currency})`}
              </label>
              <input
                type="number"
                placeholder={currency === 'UZS' ? "300 000 000" : "25000"}
                value={filter.priceMax}
                onChange={(e) => setFilter(prev => ({ ...prev, priceMax: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white focus:outline-none"
              />
            </div>

          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFilter(prev => ({ ...prev, hasMortgageOnly: !prev.hasMortgageOnly }))}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  filter.hasMortgageOnly
                    ? 'bg-amber-500 text-slate-900 border-amber-500 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                💳 {language === 'uz' ? "Ipoteka" : "Ипотека"}
              </button>

              <button
                onClick={() => setFilter(prev => ({ ...prev, verifiedOnly: !prev.verifiedOnly }))}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  filter.verifiedOnly
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                ✓ {language === 'uz' ? "Tasdiqlangan" : "Проверенные"}
              </button>
            </div>

            <div className="text-xs font-medium text-slate-500">
              <span className="font-bold text-amber-600">{totalResults}</span> {t.resultsCount}
            </div>
          </div>

        </div>

        {/* 3. Pastga tushirilgan ishonch bloki (Badge, Subtitle, Features) */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Nukus ko'chmas mulkining ishonchli portali</span>
          </div>

          <p className="text-sm text-slate-600 font-normal">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 pt-2 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Tekshirilgan hujjatlar</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
              <BadgePercent className="w-4 h-4 text-amber-600" />
              <span>Ipoteka hisoblash imkoni</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>To'g'ridan-to'g'ri mulkdor bilan</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};