import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  BedDouble, 
  Bath, 
  Layers, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Phone,
  ShieldCheck
} from 'lucide-react';
import { Property, Currency, Language } from '../types';
import { formatPrice, formatPricePerM2 } from '../utils/formatters';
import { translations } from '../data/translations';

interface PropertyCardProps {
  property: Property;
  currency: Currency;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  currency,
  language,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const t = translations[language];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(property.owner.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div 
      onClick={() => onSelectProperty(property)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400/80 shadow-xs hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Card Image Container with Carousel Controls */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={property.images[currentImageIndex] || property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient scrim for top badges */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

        {/* ID & Status Badges (exact style from user's screenshot) */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          {property.isFeatured ? (
            <span className="bg-amber-400 text-slate-950 font-extrabold text-[11px] px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wide">
              FEATURED (ID: {property.code})
            </span>
          ) : (
            <span className="bg-slate-900/85 backdrop-blur-xs text-white font-bold text-[11px] px-2.5 py-1 rounded-md shadow-xs tracking-wide">
              NEW (ID: {property.code})
            </span>
          )}

          {property.hasMortgage && (
            <span className="bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              IPOTEKA
            </span>
          )}
        </div>

        {/* Heart Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 ${
            isFavorite 
              ? 'bg-white text-red-500 shadow-md' 
              : 'bg-black/35 hover:bg-black/55 text-white'
          }`}
          title="Saqlab qo'yish"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Carousel Prev/Next Buttons on hover */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Indicator dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
              {property.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? 'w-4 bg-amber-400' : 'w-1.5 bg-white/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        {/* Specs Row: 3 xona • 1 van • 2-qavat (exactly matching user's layout) */}
        <div>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 mb-3 pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5" title="Xonalar soni">
              <BedDouble className="w-4 h-4 text-slate-400" />
              <span>{property.rooms} xona</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5" title="Vanna / Hammom">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.bathrooms} van</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5" title="Qavat">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>{property.floor}-qavat</span>
            </div>
          </div>

          {/* Price (Large bold) */}
          <div className="mb-1">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {formatPrice(property.priceUZS, property.priceUSD, currency)}
            </div>
          </div>

          {/* Sub-price: e.g. 2 656 652 сум/м² */}
          <div className="text-xs font-medium text-slate-500 mb-1.5">
            {formatPricePerM2(property.priceUZS, property.area, currency)}
          </div>

          {/* Area & Details: 1/1 кв. • 66.29 м² */}
          <div className="text-xs text-slate-600 font-medium flex items-center gap-2 mb-3">
            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px] font-semibold text-slate-700">
              {property.floor}/{property.totalFloors} qav.
            </span>
            <span>•</span>
            <span className="font-bold text-slate-800">{property.area} м²</span>
            <span>•</span>
            <span className="text-slate-500 truncate">{property.renovation}</span>
          </div>

          {/* Location with Pin */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">{property.district}</span>
          </div>
        </div>

        {/* Card Actions Footer: "Batafsil" button + Heart icon button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onSelectProperty(property)}
            className="flex-1 py-2 px-3 text-center text-xs font-bold rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-800 transition-colors"
          >
            {t.details}
          </button>

          {/* Quick Call / Phone button */}
          <button
            type="button"
            onClick={handleCall}
            className="p-2 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors"
            title={`${property.owner.name}: ${property.owner.phone}`}
          >
            {copiedPhone ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Phone className="w-4 h-4" />
            )}
          </button>

          {/* Heart button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className="p-2 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

      </div>
    </div>
  );
};
