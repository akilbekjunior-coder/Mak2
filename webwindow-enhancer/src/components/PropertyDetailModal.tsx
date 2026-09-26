import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Share2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Layers, 
  Maximize2, 
  Check, 
  Phone, 
  Send, 
  ShieldCheck, 
  Calculator, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { Property, Currency, Language } from '../types';
import { formatPrice, formatPricePerM2 } from '../utils/formatters';
import { translations } from '../data/translations';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  currency: Currency;
  language: Language;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  currency,
  language,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Mortgage interactive calculation inside detail view
  const [downPaymentPercent, setDownPaymentPercent] = useState(25); // 25% standard
  const [loanYears, setLoanYears] = useState(15);
  const interestRateAnnual = 0.175; // 17.5% in Uzbekistan standard mortgage

  const t = translations[language];

  const downPaymentUZS = Math.round(property.priceUZS * (downPaymentPercent / 100));
  const loanAmountUZS = property.priceUZS - downPaymentUZS;
  const monthlyInterestRate = interestRateAnnual / 12;
  const totalMonths = loanYears * 12;
  
  // Annuity formula: P * (r * (1+r)^n) / ((1+r)^n - 1)
  const monthlyPaymentUZS = Math.round(
    loanAmountUZS * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / 
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handlePhoneCopy = () => {
    navigator.clipboard.writeText(property.owner.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200/80 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 text-white font-bold text-xs px-2.5 py-1 rounded-md">
              ID: {property.code}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Joylashtirildi: {property.createdAt}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors"
              title="Ulashish"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 rounded-lg text-slate-600 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Saqlash"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-slate-100 shadow-inner">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % property.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail row */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{property.address}, {property.district}</span>
              </div>
            </div>

            <div className="text-left md:text-right">
              <div className="text-2xl sm:text-3xl font-black text-amber-600">
                {formatPrice(property.priceUZS, property.priceUSD, currency)}
              </div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">
                {formatPricePerM2(property.priceUZS, property.area, currency)}
              </div>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <BedDouble className="w-4 h-4 text-amber-500" />
                <span>Xonalar soni</span>
              </div>
              <div className="text-base font-bold text-slate-900">{property.rooms} xona</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Maximize2 className="w-4 h-4 text-amber-500" />
                <span>Umumiy maydon</span>
              </div>
              <div className="text-base font-bold text-slate-900">{property.area} м²</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Qavat</span>
              </div>
              <div className="text-base font-bold text-slate-900">{property.floor} / {property.totalFloors}</div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                <Bath className="w-4 h-4 text-amber-500" />
                <span>Ta'mir holati</span>
              </div>
              <div className="text-base font-bold text-slate-900 truncate">{property.renovation}</div>
            </div>
          </div>

          {/* Property Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              {t.description}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
              {property.description}
            </p>
          </div>

          {/* Amenities & Features */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t.amenities}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.amenities.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-amber-50/50 border border-amber-100 px-3 py-2 rounded-lg text-xs font-medium text-slate-800"
                >
                  <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mortgage Preview Widget */}
          {property.hasMortgage && (
            <div className="bg-gradient-to-br from-amber-500/10 via-slate-50 to-amber-500/5 rounded-2xl p-5 border border-amber-200/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    {t.mortgageCalc}
                  </h3>
                </div>
                <span className="text-[11px] font-bold bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded-full">
                  17.5% yillik stavka
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                    Boshlang'ich badal: {downPaymentPercent}%
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="text-xs font-semibold text-slate-800 mt-1">
                    {downPaymentUZS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} so'm
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                    Kredit muddati: {loanYears} yil
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="5"
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                  <div className="text-xs font-semibold text-slate-800 mt-1">
                    {loanYears * 12} oy
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-xs flex flex-col justify-center">
                  <span className="text-[11px] text-slate-500 font-medium">Oylik to'lov (taxminan):</span>
                  <span className="text-base font-black text-amber-600">
                    {monthlyPaymentUZS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} so'm/oy
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Owner / Realtor Contact Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={property.owner.avatar}
                alt={property.owner.name}
                className="w-13 h-13 rounded-full object-cover border-2 border-amber-400"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900 text-base">
                    {property.owner.name}
                  </h4>
                  {property.owner.verified && (
                    <span title="Tasdiqlangan">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {property.owner.type} • Nukus shahri
                </p>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {property.owner.phone}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                href={`tel:${property.owner.phone.replace(/\s+/g, '')}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Qo'ng'iroq qilish</span>
              </a>

              <a
                href={`https://t.me/${property.owner.telegram}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#229ED9] hover:bg-[#1e8bc0] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </a>

              <button
                onClick={handlePhoneCopy}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                title="Raqamni nusxalash"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Phone className="w-4 h-4 text-slate-500" />}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
