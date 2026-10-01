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
  Sparkles,
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      
      {/* =====================================================
          DESKTOP TOP BAR
      ====================================================== */}
      <div className="hidden md:block bg-slate-900 text-slate-300 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Nukus va butun Qoraqalpog'iston bo'yicha ko'chmas mulk maydonchasi
              </span>

              <span className="text-slate-600">•</span>

              <span className="text-slate-400">
                Kuniga 50+ yangi uy-joy e'lonlari
              </span>
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
      </div>


      {/* =====================================================
          MAIN HEADER
      ====================================================== */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        <div className="h-16 sm:h-[72px] flex items-center gap-2 sm:gap-4">

          {/* =================================================
              LOGO
          ================================================== */}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className="flex items-center gap-2 sm:gap-3 shrink-0"
          >
            <div
              className="
                w-9 h-9
                sm:w-10 sm:h-10
                rounded-xl
                bg-gradient-to-tr from-amber-500 to-amber-400
                flex items-center justify-center
                text-white
                shadow-md shadow-amber-500/20
              "
            >
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>

            <div className="text-left">
              <div className="flex items-center">
                <span
                  className="
                    text-[21px]
                    sm:text-2xl
                    font-black
                    tracking-tight
                    text-slate-900
                    leading-none
                  "
                >
                  Makler
                  <span className="text-amber-500">im</span>
                </span>
              </div>

              <p className="hidden lg:block text-[9px] text-slate-500 font-medium mt-0.5">
                Ko'chmas mulk e'lonlari
              </p>
            </div>
          </button>


          {/* =================================================
              DESKTOP SEARCH
          ================================================== */}
          <div className="hidden md:block flex-1 max-w-md">
            <div className="relative">

              <Search
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  w-4
                  h-4
                  text-slate-400
                "
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="
                  w-full
                  pl-10
                  pr-9
                  py-2.5
                  text-sm
                  bg-slate-100
                  border
                  border-transparent
                  focus:border-amber-400
                  focus:bg-white
                  rounded-full
                  text-slate-800
                  placeholder-slate-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-amber-500/20
                  transition-all
                "
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    hover:text-slate-700
                  "
                >
                  <X className="w-4 h-4" />
                </button>
              )}

            </div>
          </div>


          {/* =================================================
              DESKTOP NAV
          ================================================== */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">

            <button
              type="button"
              onClick={() => setActiveDealType('sale')}
              className={`
                px-3 py-2 rounded-lg transition-colors
                ${
                  activeDealType === 'sale'
                    ? 'text-amber-700 bg-amber-50 font-bold'
                    : 'hover:bg-slate-100'
                }
              `}
            >
              {t.buy}
            </button>

            <button
              type="button"
              onClick={() => setActiveDealType('rent')}
              className={`
                px-3 py-2 rounded-lg transition-colors
                ${
                  activeDealType === 'rent'
                    ? 'text-amber-700 bg-amber-50 font-bold'
                    : 'hover:bg-slate-100'
                }
              `}
            >
              {t.rent}
            </button>

            <button
              type="button"
              onClick={() => setActiveDealType('daily')}
              className={`
                px-3 py-2 rounded-lg transition-colors
                ${
                  activeDealType === 'daily'
                    ? 'text-amber-700 bg-amber-50 font-bold'
                    : 'hover:bg-slate-100'
                }
              `}
            >
              {t.daily}
            </button>

            <button
              type="button"
              onClick={() => {
                alert(
                  language === 'uz'
                    ? "Agentlar katalogi: Nukus bo'yicha 25+ tasdiqlangan rieltorlar faoliyat yuritmoqda."
                    : "Каталог агентов: в Нукусе работают более 25 проверенных риелторов."
                );
              }}
              className="
                px-3 py-2
                rounded-lg
                hover:bg-slate-100
                transition-colors
              "
            >
              {t.agents}
            </button>

          </nav>


          {/* =================================================
              RIGHT ACTIONS
          ================================================== */}
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">

            {/* ===============================================
                LANGUAGE
            ================================================ */}
            <div className="relative">

              <button
                type="button"
                onClick={() => setLangDropdownOpen((prev) => !prev)}
                className="
                  h-10
                  flex
                  items-center
                  gap-1
                  px-2.5
                  sm:px-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  hover:bg-slate-50
                  text-slate-700
                  text-xs
                  sm:text-sm
                  font-semibold
                  transition-all
                  whitespace-nowrap
                "
                aria-label="Tilni tanlash"
              >
                <Globe className="w-4 h-4 text-slate-500" />

                <span>
                  {language.toUpperCase()}
                </span>

                <ChevronDown
                  className={`
                    w-3.5 h-3.5 text-slate-400
                    transition-transform
                    ${langDropdownOpen ? 'rotate-180' : ''}
                  `}
                />
              </button>


              {/* LANGUAGE DROPDOWN */}
              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangDropdownOpen(false)}
                  />

                  <div
                    className="
                      absolute
                      right-0
                      top-full
                      mt-2
                      w-48
                      bg-white
                      rounded-xl
                      shadow-xl
                      border
                      border-slate-200
                      py-2
                      z-50
                    "
                  >

                    <div
                      className="
                        px-3
                        py-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-400
                      "
                    >
                      Til / Язык
                    </div>


                    {/* UZ */}
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('uz');
                        setLangDropdownOpen(false);
                      }}
                      className={`
                        w-full
                        px-3
                        py-2
                        text-left
                        text-sm
                        flex
                        items-center
                        justify-between
                        hover:bg-slate-50
                        ${
                          language === 'uz'
                            ? 'text-amber-600 font-bold bg-amber-50'
                            : 'text-slate-700'
                        }
                      `}
                    >
                      <span>O'zbekcha</span>

                      {language === 'uz' && (
                        <span className="text-amber-500 font-bold">
                          ✓
                        </span>
                      )}
                    </button>


                    {/* RU */}
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('ru');
                        setLangDropdownOpen(false);
                      }}
                      className={`
                        w-full
                        px-3
                        py-2
                        text-left
                        text-sm
                        flex
                        items-center
                        justify-between
                        hover:bg-slate-50
                        ${
                          language === 'ru'
                            ? 'text-amber-600 font-bold bg-amber-50'
                            : 'text-slate-700'
                        }
                      `}
                    >
                      <span>Русский</span>

                      {language === 'ru' && (
                        <span className="text-amber-500 font-bold">
                          ✓
                        </span>
                      )}
                    </button>

                  </div>
                </>
              )}

            </div>


            {/* ===============================================
                FAVORITES
            ================================================ */}
            <button
              type="button"
              onClick={onOpenFavorites}
              className="
                relative
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                hover:bg-slate-50
                transition-colors
              "
              title={t.saved}
            >
              <Heart
                className={`
                  w-5
                  h-5
                  ${
                    favoritesCount > 0
                      ? 'fill-red-500 text-red-500'
                      : 'text-slate-600'
                  }
                `}
              />

              {favoritesCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1.5
                    -right-1.5
                    w-4
                    h-4
                    rounded-full
                    bg-red-500
                    text-white
                    text-[9px]
                    font-bold
                    flex
                    items-center
                    justify-center
                  "
                >
                  {favoritesCount}
                </span>
              )}
            </button>


            {/* ===============================================
                ADD LISTING
            ================================================ */}
            <button
              type="button"
              onClick={onOpenAddListing}
              className="
                h-10
                flex
                items-center
                justify-center
                gap-1
                px-3
                sm:px-4
                rounded-xl
                bg-gradient-to-r
                from-amber-400
                to-amber-500
                hover:from-amber-500
                hover:to-amber-600
                text-slate-950
                font-black
                text-xs
                sm:text-sm
                shadow-sm
                hover:shadow-md
                active:scale-95
                transition-all
                whitespace-nowrap
              "
            >
              <Plus className="w-5 h-5 stroke-[2.8]" />

              <span>
                E'lon
              </span>
            </button>


            {/* ===============================================
                MOBILE MENU
            ================================================ */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="
                lg:hidden
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-xl
                text-slate-700
                hover:bg-slate-100
                transition-colors
              "
              aria-label="Menyu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

          </div>

        </div>


        {/* =================================================
            MOBILE SEARCH
        ================================================== */}
        <div className="pb-3 md:hidden">

          <div className="relative">

            <Search
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                w-5
                h-5
                text-slate-400
              "
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="
                w-full
                h-11
                pl-11
                pr-10
                text-sm
                bg-slate-100
                border
                border-slate-200
                rounded-xl
                text-slate-800
                placeholder-slate-400
                focus:outline-none
                focus:border-amber-400
                focus:ring-2
                focus:ring-amber-500/20
              "
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  hover:text-slate-700
                "
              >
                <X className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>


        {/* =================================================
            MOBILE MENU
        ================================================== */}
        {mobileMenuOpen && (
          <div
            className="
              lg:hidden
              border-t
              border-slate-100
              py-3
              space-y-2
            "
          >

            {/* Deal types */}
            <div className="grid grid-cols-3 gap-2">

              <button
                type="button"
                onClick={() => {
                  setActiveDealType('sale');
                  setMobileMenuOpen(false);
                }}
                className={`
                  py-2.5
                  rounded-xl
                  text-xs
                  font-bold
                  ${
                    activeDealType === 'sale'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-100 text-slate-700'
                  }
                `}
              >
                {t.buy}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveDealType('rent');
                  setMobileMenuOpen(false);
                }}
                className={`
                  py-2.5
                  rounded-xl
                  text-xs
                  font-bold
                  ${
                    activeDealType === 'rent'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-100 text-slate-700'
                  }
                `}
              >
                {t.rent}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveDealType('daily');
                  setMobileMenuOpen(false);
                }}
                className={`
                  py-2.5
                  rounded-xl
                  text-xs
                  font-bold
                  ${
                    activeDealType === 'daily'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-100 text-slate-700'
                  }
                `}
              >
                {t.daily}
              </button>

            </div>


            {/* Mortgage */}
            <button
              type="button"
              onClick={() => {
                onOpenCalculator();
                setMobileMenuOpen(false);
              }}
              className="
                w-full
                flex
                items-center
                gap-3
                px-3
                py-3
                rounded-xl
                bg-slate-50
                hover:bg-slate-100
                text-left
                text-sm
                font-semibold
                text-slate-700
              "
            >
              <Calculator className="w-5 h-5 text-amber-500" />

              <span>
                {t.mortgageCalc}
              </span>
            </button>

          </div>
        )}

      </div>
    </header>
  );
};