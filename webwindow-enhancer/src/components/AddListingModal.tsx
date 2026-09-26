import React, { useState } from 'react';
import { X, Upload, Plus, Building, Home, CheckCircle2 } from 'lucide-react';
import { Property, Language, PropertyType, DealType } from '../types';
import { translations } from '../data/translations';
import { DISTRICTS } from '../data/mockProperties';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (newProp: Property) => void;
  language: Language;
}

export const AddListingModal: React.FC<AddListingModalProps> = ({
  isOpen,
  onClose,
  onAddProperty,
  language,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const [title, setTitle] = useState('');
  const [dealType, setDealType] = useState<DealType>('sale');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [priceUZS, setPriceUZS] = useState('');
  const [rooms, setRooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('1');
  const [floor, setFloor] = useState('2');
  const [totalFloors, setTotalFloors] = useState('5');
  const [area, setArea] = useState('65');
  const [district, setDistrict] = useState(DISTRICTS[1] || 'Nukus shahri, Markaz');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [hasMortgage, setHasMortgage] = useState(true);
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('+998 90 ');
  const [imageUrl, setImageUrl] = useState('');
  const [successToast, setSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    const numPrice = Number(priceUZS.replace(/\s+/g, '')) || 180000000;
    const numUSD = Math.round(numPrice / 12700);

    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      code: randomId,
      title: title || `${rooms} xonali shinam ${propertyType === 'apartment' ? 'kvartira' : 'uy'}`,
      dealType,
      propertyType,
      priceUZS: numPrice,
      priceUSD: numUSD,
      rooms: Number(rooms) || 3,
      bathrooms: Number(bathrooms) || 1,
      floor: Number(floor) || 1,
      totalFloors: Number(totalFloors) || 5,
      area: Number(area) || 60,
      address: address || "Do'stlik ko'chasi, 12",
      district: district || "Nukus shahri, Markaz",
      images: imageUrl 
        ? [imageUrl, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&auto=format&fit=crop&q=80']
        : [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1000&auto=format&fit=crop&q=80'
          ],
      isNew: true,
      hasMortgage,
      renovation: 'Evroremont',
      description: description || "Barcha qulayliklarga ega, hujjatlari to'liq tayyorlangan ko'chmas mulk.",
      amenities: ["Avtonom isitish", "Gaz, suv, elektr", "Konditsioner", "Wi-Fi"],
      owner: {
        name: ownerName || "Foydalanuvchi",
        type: "Mulkdor",
        phone: ownerPhone || "+998 90 123 45 67",
        telegram: "maklerim_user",
        verified: true,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
      },
      createdAt: "Hozirgina"
    };

    onAddProperty(newProperty);
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-slate-50">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              {t.postModalTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.postModalSubtitle}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
          
          {/* Deal type & Property type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Bitim turi
              </label>
              <select
                value={dealType}
                onChange={(e) => setDealType(e.target.value as DealType)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              >
                <option value="sale">Sotuv (Sotish)</option>
                <option value="rent">Uzoq muddatli ijara</option>
                <option value="daily">Kunlik ijara</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Mulk toifasi
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              >
                <option value="apartment">Kvartira</option>
                <option value="house">Hovli uy</option>
                <option value="cottage">Kottej</option>
                <option value="commercial">Tijoriy bino</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              E'lon sarlavhasi
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: Markazda shinam 3 xonali kvartira"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            />
          </div>

          {/* Price & Area */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Narxi (so'mda)
              </label>
              <input
                type="number"
                required
                placeholder="180 000 000"
                value={priceUZS}
                onChange={(e) => setPriceUZS(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Maydoni (м²)
              </label>
              <input
                type="number"
                required
                placeholder="75"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Rooms, Floor, Total Floors */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Xonalar soni
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Joylashgan qavati
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Bino qavatliligi
              </label>
              <input
                type="number"
                min="1"
                max="25"
                value={totalFloors}
                onChange={(e) => setTotalFloors(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
          </div>

          {/* District & Address */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Hudud / Tuman
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              >
                {DISTRICTS.filter(d => d !== 'Barchasi').map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Ko'cha va uy raqami
              </label>
              <input
                type="text"
                placeholder="Amir Temur ko'chasi, 45"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Rasm havolasi (ixtiyoriy)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Batafsil ma'lumot
            </label>
            <textarea
              rows={3}
              placeholder="Uy haqida qo'shimcha ma'lumotlar, qo'shnilar, transport, remont..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
            />
          </div>

          {/* Mortgage checkbox */}
          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={hasMortgage}
              onChange={(e) => setHasMortgage(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 accent-amber-500"
            />
            <span className="text-xs font-semibold text-slate-700">
              Ipoteka krediti orqali sotishga roziman
            </span>
          </label>

          {/* Contact phone & name */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Ismingiz
              </label>
              <input
                type="text"
                required
                placeholder="Rustam"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Telefon raqamingiz
              </label>
              <input
                type="tel"
                required
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-sm py-3 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {successToast ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-800" />
                  <span>E'lon muvaffaqiyatli qo'shildi!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>E'lonni chop etish</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
