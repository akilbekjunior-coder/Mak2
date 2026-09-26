import React from 'react';
import { Building2, Phone, Mail, MapPin, Send, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { DISTRICTS } from '../data/mockProperties';

interface FooterProps {
  language: Language;
  onSelectDistrict: (district: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onSelectDistrict }) => {
  const t = translations[language];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <Building2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white font-sans">
                  Makler<span className="text-amber-400">im</span>
                </span>
                <p className="text-xs text-slate-400 -mt-1 font-medium">
                  Qoraqalpog'iston ko'chmas mulk portali
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Nukus shahri va Qoraqalpog'iston tumanlarida uylar, kvartiralar va tijoriy binolarni xarid qilish, ijaraga olish yoki sotish bo'yicha eng yirik va qulay platforma.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#229ED9] hover:text-white flex items-center justify-center transition-colors text-slate-300"
                title="Telegram kanalimiz"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href="tel:+998612220000" 
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors text-slate-300"
                title="Qo'ng'iroq"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="mailto:info@maklerim.uz" 
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors text-slate-300"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Districts Col */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Ommabop hududlar
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {DISTRICTS.slice(1, 6).map((d) => (
                <li key={d}>
                  <button
                    onClick={() => {
                      onSelectDistrict(d);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {d}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Xizmatlar
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-amber-400 cursor-pointer">Ipoteka krediti hisoblagich</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Yangi binolar katalogi</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Kunlik ijaraga uylar</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Rieltorlar reytingi</span></li>
              <li><span className="hover:text-amber-400 cursor-pointer">Ko'chmas mulk baholash</span></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Aloqa markazi
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Nukus shahri, Berdaq shoh ko'chasi, 24-uy</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+998 (61) 222-00-00</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>info@maklerim.uz</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                  <ShieldCheck className="w-3 h-3" />
                  Ish vaqti: 09:00 - 20:00 (Har kuni)
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Maklerim. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Foydalanish shartlari</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Maxfiylik siyosati</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Xavfsizlik</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
