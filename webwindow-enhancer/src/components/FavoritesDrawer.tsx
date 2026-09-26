import React from 'react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { Property, Currency, Language } from '../types';
import { formatPrice } from '../utils/formatters';
import { translations } from '../data/translations';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  currency: Currency;
  language: Language;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectProperty,
  currency,
  language,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="text-base font-bold text-slate-900">
                {t.saved} ({favorites.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {favorites.length === 0 ? (
              <div className="text-center py-16 px-4 text-slate-400">
                <Heart className="w-12 h-12 stroke-[1.2] mx-auto mb-3 text-slate-300" />
                <p className="text-sm font-semibold text-slate-700 mb-1">
                  Saqlangan e'lonlar yo'q
                </p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Sizga yoqqan uylarning yurakcha belgisini bosib, ularni bu yerda qulay kuzatib boring.
                </p>
              </div>
            ) : (
              favorites.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProperty(item);
                    onClose();
                  }}
                  className="group flex gap-3 p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 transition-all cursor-pointer bg-white"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-slate-500">
                      ID: {item.code}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs font-black text-slate-900 mt-1">
                      {formatPrice(item.priceUZS, item.priceUSD, currency)}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.rooms} xona • {item.area} м² • {item.district}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(item.id);
                    }}
                    className="p-1.5 text-slate-300 hover:text-red-500 self-start rounded-md hover:bg-red-50 transition-colors"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {favorites.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Qidiruvga qaytish
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
