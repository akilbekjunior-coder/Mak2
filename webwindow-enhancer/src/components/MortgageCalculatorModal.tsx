import React, { useState } from 'react';
import { X, Calculator, Percent, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';
import { Currency, Language } from '../types';
import { translations } from '../data/translations';

interface MortgageCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  language: Language;
}

export const MortgageCalculatorModal: React.FC<MortgageCalculatorModalProps> = ({
  isOpen,
  onClose,
  currency,
  language,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const [propertyPrice, setPropertyPrice] = useState(250000000); // 250 mln UZS
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(17.5);
  const [years, setYears] = useState(15);

  const downPayment = Math.round(propertyPrice * (downPaymentPercent / 100));
  const loanAmount = propertyPrice - downPayment;
  const monthlyRate = (interestRate / 100) / 12;
  const months = years * 12;

  const monthlyPayment = Math.round(
    loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
    (Math.pow(1 + monthlyRate, months) - 1)
  );

  const totalPayment = Math.round(monthlyPayment * months);
  const totalInterest = totalPayment - loanAmount;

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-amber-500/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">
                {t.mortgageCalc}
              </h2>
              <p className="text-xs text-slate-500">
                Nukus va O'zbekiston banklari ipoteka dasturlari uchun
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">
                Uyning to'liq narxi
              </label>
              <span className="text-xs font-black text-amber-700">
                {formatNumber(propertyPrice)} so'm
              </span>
            </div>
            <input
              type="range"
              min="50000000"
              max="1500000000"
              step="10000000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">
                {t.downPayment}: {downPaymentPercent}%
              </label>
              <span className="text-xs font-bold text-slate-900">
                {formatNumber(downPayment)} so'm
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="60"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          {/* Term & Rate */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  {t.loanTerm}
                </label>
                <span className="text-xs font-bold text-slate-900">
                  {years} {t.years}
                </span>
              </div>
              <select
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20"
              >
                <option value={5}>5 yil (60 oy)</option>
                <option value={10}>10 yil (120 oy)</option>
                <option value={15}>15 yil (180 oy)</option>
                <option value={20}>20 yil (240 oy)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Yillik stavka
                </label>
                <span className="text-xs font-bold text-slate-900">
                  {interestRate}%
                </span>
              </div>
              <select
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20"
              >
                <option value={14}>14.0% (Davlat subsidiyasi bilan)</option>
                <option value={16.5}>16.5% (Ijtimoiy ipoteka)</option>
                <option value={17.5}>17.5% (Standart bank ipotekasi)</option>
                <option value={21}>21.0% (Birlamchi bozor)</option>
              </select>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-400 font-medium">Oylik to'lov miqdori:</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400">
                {formatNumber(monthlyPayment)} so'm
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <span className="text-slate-400 block text-[11px]">Kredit summasi:</span>
                <span className="font-bold text-slate-200">{formatNumber(loanAmount)} so'm</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Jami to'lov miqdori:</span>
                <span className="font-bold text-slate-200">{formatNumber(totalPayment)} so'm</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Hisob-kitob taxminiy bo'lib, bank komissiyalari va sug'urtaga qarab o'zgarishi mumkin.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-colors"
          >
            Yopish
          </button>

        </div>

      </div>
    </div>
  );
};
