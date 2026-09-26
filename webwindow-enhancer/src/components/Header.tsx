import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Heart, 
  Plus, 
  Calculator, 
  Globe, 
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { Currency, Language, DealType } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenAddListing: () => void;
  onOpenCalculator: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeDealType: DealType;
  setActiveDealType: (deal: DealType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  currency,
  setCurrency,
  favoritesCount,
  onOpenFavorites,
  onOpenAddListing,
  onOpenCalculator,
  searchQuery,
  setSearchQuery,
  activeDealType,
  setActiveDealType,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top micro bar for announcements & hotline */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Nukus va butun Qoraqalpog'iston bo'yicha #1 ko'chmas mulk maydonchasi
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Kuniga 50+ yangi uy-joy e'lonlari</span>
          </div>
          <div className="flex items-center gap-5">
            <a 
              href="tel:+998612220000" 
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>Aloqa markazi: (61) 222-00-00</span>
            </a>
            <span className="text-slate-600">|</span>
            <button 
              onClick={onOpenCalculator}
              className="flex items-center gap-1 text-slate-300 hover:text-amber-300 transition-colors"
            >
              <Calculator className="w-3 h-3" />
              <span>Ipoteka kalkulyatori</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  Makler<span className="text-amber-500">im</span>
                </span>
                  </div>
              <p className="text-[10px] text-slate-500 -mt-1 hidden lg:block font-medium">
                Ko'chmas mulk e'lonlari
              </p>
            </div>
          </div>

          {/* Quick Search in Header (matching user's screenshot) */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-9 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-amber-500/50 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Nav Categories */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-slate-700">
            <button
              onClick={() => setActiveDealType('sale')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeDealType === 'sale'
                  ? 'text-amber-700 bg-amber-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.buy}
            </button>
            <button
              onClick={() => setActiveDealType('rent')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeDealType === 'rent'
                  ? 'text-amber-700 bg-amber-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.rent}
            </button>
            <button
              onClick={() => setActiveDealType('daily')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeDealType === 'daily'
                  ? 'text-amber-700 bg-amber-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.daily}
            </button>
            <a
              href="#agentlar"
              onClick={(e) => {
                e.preventDefault();
                alert(language === 'uz' ? "Agentlar katalogi: Nukus bo'yicha 25+ tasdiqlangan rieltorlar faoliyat yuritmoqda." : "Каталог агентов: в Нукусе работают более 25 проверенных риелторов.");
              }}
              className="px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {t.agents}
            </a>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Currency & Language selector button & dropdown (like UZ / UZS ▾ in screenshot) */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all shadow-2xs"
                title="Valyuta va til sozlamalari"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {language.toUpperCase()} / {currency}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Til / Язык
                    </div>
                    <button
                      onClick={() => { setLanguage('uz'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${language === 'uz' ? 'text-amber-600 font-bold bg-amber-50/50' : 'text-slate-700'}`}
                    >
                      <span>O'zbekcha (UZ)</span>
                      {language === 'uz' && <span className="text-amber-600">✓</span>}
                    </button>
                    <button
                      onClick={() => { setLanguage('ru'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${language === 'ru' ? 'text-amber-600 font-bold bg-amber-50/50' : 'text-slate-700'}`}
                    >
                      <span>Русский (RU)</span>
                      {language === 'ru' && <span className="text-amber-600">✓</span>}
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Valyuta / Валюта
                    </div>
                    <button
                      onClick={() => { setCurrency('UZS'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${currency === 'UZS' ? 'text-amber-600 font-bold bg-amber-50/50' : 'text-slate-700'}`}
                    >
                      <span>UZS (So'm / Сум)</span>
                      {currency === 'UZS' && <span className="text-amber-600">✓</span>}
                    </button>
                    <button
                      onClick={() => { setCurrency('USD'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${currency === 'USD' ? 'text-amber-600 font-bold bg-amber-50/50' : 'text-slate-700'}`}
                    >
                      <span>USD (AQSH Dollari / $)</span>
                      {currency === 'USD' && <span className="text-amber-600">✓</span>}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Saved Favorites Button */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-red-500 hover:bg-slate-50 transition-colors"
              title={t.saved}
            >
              <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* CTA + E'lon qo'shish Button (Yellow/Gold as in user's screenshot) */}
            <button
              onClick={onOpenAddListing}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="whitespace-nowrap">{t.addListing}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile drawer navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-100 py-3 lg:hidden flex flex-col gap-2 animate-in slide-in-from-top duration-150">
            <div className="flex gap-2">
              <button
                onClick={() => { setActiveDealType('sale'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg ${activeDealType === 'sale' ? 'bg-amber-500 text-slate-900 font-bold' : 'bg-slate-100 text-slate-700'}`}
              >
                {t.buy}
              </button>
              <button
                onClick={() => { setActiveDealType('rent'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg ${activeDealType === 'rent' ? 'bg-amber-500 text-slate-900 font-bold' : 'bg-slate-100 text-slate-700'}`}
              >
                {t.rent}
              </button>
              <button
                onClick={() => { setActiveDealType('daily'); setMobileMenuOpen(false); }}
                className={`flex-1 py-2 text-center text-xs font-semibold rounded-lg ${activeDealType === 'daily' ? 'bg-amber-500 text-slate-900 font-bold' : 'bg-slate-100 text-slate-700'}`}
              >
                {t.daily}
              </button>
            </div>
            <button
              onClick={() => { onOpenCalculator(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg text-left"
            >
              <Calculator className="w-4 h-4 text-amber-500" />
              <span>{t.mortgageCalc}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
