import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Store,
  Bell,
  ShieldCheck,
  MapPin,
  Clock,
  ChevronRight,
  ArrowLeft,
  Search,
  ShoppingCart,
  ShoppingBag,
  Phone,
  MessageCircle,
  Mail,
  X,
  LayoutDashboard,
  Package,
  Plus,
  Calendar,
  Settings,
  TrendingUp,
  Megaphone,
  ClipboardList,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Upload,
  LogOut
} from 'lucide-react';
import { Category, Product, Screen } from './types';

// --- Constants ---
const PRIMARY_COLOR = "#eebd2b";
const BACKGROUND_LIGHT = "#f8f7f6";
const BACKGROUND_DARK = "#221d10";

// --- Components ---

const Header = ({ onAdminClick, onHomeClick, notifications, onNotificationClick }: { onAdminClick: () => void, onHomeClick: () => void, notifications: Product[], onNotificationClick: () => void }) => (
  <header className="sticky top-0 z-50 bg-[#f8f7f6]/80 dark:bg-[#221d10]/80 backdrop-blur-md border-b border-[#eebd2b]/10">
    <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={onHomeClick}>
        <span className="material-symbols-outlined text-[#eebd2b] text-2xl md:text-3xl">storefront</span>
        <div>
          <h1 className="text-sm md:text-lg font-bold leading-none">Shamim Plastic House</h1>
          <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-[#eebd2b] font-bold">Fancy Corner</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onNotificationClick}
          className="relative p-2 rounded-full hover:bg-[#eebd2b]/10 transition-colors"
        >
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-300 text-2xl">notifications</span>
          {notifications.length > 0 && (
            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          )}
        </button>
        <button
          onClick={onAdminClick}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eebd2b]/20 border border-[#eebd2b]/30 hover:bg-[#eebd2b]/30 transition-all font-display"
        >
          <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
          <span className="text-sm font-bold uppercase tracking-tight">Admin</span>
        </button>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-[#221d10] text-[#f8f7f6] pt-16 pb-8 px-4">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-[#eebd2b] text-4xl">storefront</span>
          <div>
            <h1 className="text-xl font-bold leading-none">Shamim Plastic House</h1>
            <p className="text-xs uppercase tracking-widest text-[#eebd2b] font-bold">Fancy Corner</p>
          </div>
        </div>
        <p className="text-slate-400 max-w-md leading-relaxed mb-6">
          Your premier destination for high-quality plastic housewares and luxurious home decor in Karachi. We bring elegance and utility to every corner of your home.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#eebd2b] hover:text-[#221d10] transition-all">
            <span className="material-symbols-outlined text-lg">facebook</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#eebd2b] hover:text-[#221d10] transition-all">
            <span className="material-symbols-outlined text-lg">public</span>
          </a>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
        <ul className="space-y-4 text-slate-400">
          <li><a href="#" className="hover:text-[#eebd2b] transition-colors">Home</a></li>
          <li><a href="#" className="hover:text-[#eebd2b] transition-colors">Our Categories</a></li>
          <li><a href="#" className="hover:text-[#eebd2b] transition-colors">New Arrivals</a></li>
          <li><a href="#" className="hover:text-[#eebd2b] transition-colors">About Us</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-6">Store Info</h4>
        <ul className="space-y-4 text-slate-400 text-sm">
          <li className="flex gap-3">
            <span className="material-symbols-outlined text-[#eebd2b] text-base">location_on</span>
            <span>Hyderi Farhan Market, North Nazimabad, Karachi</span>
          </li>
          <li className="flex gap-3">
            <span className="material-symbols-outlined text-[#eebd2b] text-base">phone</span>
            <div>
              <p>Shamim Plastic House (Shop 67): 0333-3152019</p>
              <p>Fancy Corner (Shop 30): 0333-3152018</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="material-symbols-outlined text-[#eebd2b] text-base">schedule</span>
            <span>Mon - Sat: 1:00 PM - 11:00 PM</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
      <p uppercase tracking-widest>© 2026 SHAMIM PLASTIC HOUSE & FANCY CORNER</p>
      <p>PRIME QUALITY • PREMIUM SELECTION • BEST PRICES</p>
    </div>
  </footer>
);

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#f8f7f6] flex flex-col items-center justify-center p-4 z-[100]">
      <div className="w-24 h-24 bg-[#eebd2b] rounded-full flex items-center justify-center mb-8 shadow-2xl">
        <span className="material-symbols-outlined text-[#221d10] text-5xl">diamond</span>
      </div>
      <h1 className="text-3xl font-black mb-2 urdu-text" dir="rtl">شمیم پلاسٹک ہاؤس</h1>
      <h2 className="text-xl font-bold tracking-tight mb-8">Shamim Plastic House</h2>
      <div className="w-full max-w-xs bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#eebd2b]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-slate-400 text-sm font-medium uppercase tracking-[0.2em]">{progress}% Loading Luxury</p>
    </div>
  );
};

const ContactPopup = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors">
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#eebd2b] rounded-2xl mx-auto mb-4 flex items-center justify-center text-[#221d10] shadow-lg">
              <Phone className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black mb-1">Contact to Order</h4>
            <p className="text-slate-600 font-medium text-sm">1:00 PM - 11:00 PM (Daily)</p>
          </div>

          <div className="space-y-4">
            {/* Shamim Plastic House */}
            <div className="p-4 rounded-2xl bg-[#f8f7f6] border border-[#eebd2b]/10">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-[#eebd2b] mb-3">Shamim Plastic House (Shop No. 67)</h5>
              <div className="flex gap-3">
                <a href="https://wa.me/923333152019" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-green-500/20">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href="tel:03333152019" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#221d10] text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>

            {/* Fancy Corner */}
            <div className="p-4 rounded-2xl bg-[#f8f7f6] border border-[#eebd2b]/10">
              <h5 className="text-[10px] font-black uppercase tracking-widest text-[#eebd2b] mb-3">Fancy Corner (Shop No. 30)</h5>
              <div className="flex gap-3">
                <a href="https://wa.me/923333152018" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-green-500/20">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href="tel:03333152018" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#221d10] text-white rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-[8px] text-slate-400 uppercase tracking-[0.3em] font-bold">Shamim Plastic House & Fancy Corner</p>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const NotificationPopup = ({ isOpen, onClose, items }: { isOpen: boolean, onClose: () => void, items: Product[] }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-start justify-end p-4 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="w-full max-w-sm bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100 mt-20 pointer-events-auto overflow-hidden"
        >
          <div className="p-6 bg-[#221d10] text-white flex justify-between items-center">
            <div>
              <h4 className="text-lg font-black uppercase tracking-tighter leading-none">New Arrivals</h4>
              <p className="text-[10px] text-[#eebd2b] font-bold uppercase tracking-widest mt-1">Recently Added items</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="max-h-[400px] overflow-y-auto p-4 space-y-3 no-scrollbar">
            {items.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Bell className="w-12 h-12 mx-auto opacity-20 mb-3" />
                <p className="text-xs font-bold uppercase tracking-widest">No New Notifications</p>
              </div>
            ) : (
              items.map(item => (
                <div key={item._id} className="flex gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#eebd2b]/30 transition-all">
                  <img src={item.imageUrl} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-[#eebd2b] uppercase tracking-widest leading-none mb-1">{item.category}</p>
                    <h5 className="text-sm font-bold truncate leading-tight mb-1">{item.name}</h5>
                    <p className="text-[#221d10] font-black text-sm">Rs. {item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <button onClick={onClose} className="w-full py-3 bg-[#eebd2b] text-[#221d10] rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#eebd2b]/10">Dismiss All</button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const HomeScreen = ({ categories, onCategoryClick }: { categories: Category[], onCategoryClick: (c: Category) => void }) => (
  <main className="max-w-7xl mx-auto">
    {/* Hero Section */}
    <section className="relative h-[600px] overflow-hidden group">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(34, 29, 16, 0.4), rgba(34, 29, 16, 0.85)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAffQK9ctGwVU4uo7J_Ak_ic-JK5mq4RmvcgnKl56irlENQvTeL8n73CXj4GhsQODEH0YQgx7pVv6_GP06mrmJLcpZRwJIXy-p3_g199Eq3Rciyl81MFr97u2JM-q1bn3btPQNbsasCp4EdJm8HOpuGiz1AQiCR_n1Ow9Kg0fAT4n8b5ev9rD23PUZPql-8EkFAsvKxlgIlTclW0e53srP82eXGA1vDSut8LeMVg1UrFcJDL6INLrjeFJaK73FSxAhBRr4gwp_PGWIZ')` }}>
      </div>
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-white text-5xl md:text-7xl font-black mb-4 tracking-tight urdu-text leading-tight" dir="rtl">
          شمیم پلاسٹک ہاؤس <br className="md:hidden" /> اینڈ فینسی کارنر
        </h2>
        <h3 className="text-[#eebd2b] text-xl md:text-2xl font-bold mb-6 tracking-wide uppercase">
          Premium Home Decor & Fancy Essentials
        </h3>
        <div className="flex items-center gap-2 text-slate-200 mb-8 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="material-symbols-outlined text-[#eebd2b]">location_on</span>
          <span className="text-sm md:text-base font-medium">Hyderi Farhan Market, Karachi</span>
        </div>
        <button className="px-8 py-4 bg-[#eebd2b] text-[#221d10] rounded-xl font-extrabold text-lg shadow-xl shadow-[#eebd2b]/20 hover:shadow-[#eebd2b]/40 hover:-translate-y-1 transition-all">
          Explore Our Collection
        </button>
      </div>
    </section>

    {/* Category Grid */}
    <section id="categories" className="px-4 py-16 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[#eebd2b] font-bold tracking-widest uppercase text-sm">Shop by Category</span>
          <h2 className="text-3xl md:text-4xl font-black mt-1">Our Exquisite Ranges</h2>
        </div>
        <div className="h-1 w-24 bg-[#eebd2b] rounded-full hidden md:block mb-3"></div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            onClick={() => onCategoryClick(cat)}
            className="group relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
          >
            <img src={cat.imageUrl} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#221d10]/90 via-[#221d10]/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <p className="text-[#eebd2b] text-[10px] md:text-sm font-bold tracking-tighter uppercase mb-1">{cat.tag}</p>
              <h3 className="text-white text-xl md:text-3xl font-black">{cat.name}</h3>
              <div className="w-0 group-hover:w-16 h-1 bg-[#eebd2b] mt-4 transition-all duration-500"></div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Location/Info Section */}
    <section className="bg-[#eebd2b]/5 py-12 px-4 mb-20 rounded-3xl mx-4 overflow-hidden border border-[#eebd2b]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-black">Visit Our Store</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            Discover the finest collection of plastic housewares and fancy corner items in the heart of Karachi. Quality products, competitive pricing, and exceptional service to make your home beautiful.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 group">
              <div className="size-12 rounded-xl bg-[#eebd2b] flex items-center justify-center text-[#221d10] shadow-lg group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined font-bold">map</span>
              </div>
              <div>
                <h4 className="font-bold">Location</h4>
                <p className="text-sm text-slate-500">Hyderi Farhan Market, North Nazimabad, Karachi</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="size-12 rounded-xl bg-[#eebd2b] flex items-center justify-center text-[#221d10] shadow-lg group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined font-bold">schedule</span>
              </div>
              <div>
                <h4 className="font-bold">Working Hours</h4>
                <p className="text-sm text-slate-500">Mon - Sat: 1:00 PM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-80 rounded-2xl bg-slate-200 overflow-hidden relative border-4 border-white shadow-2xl">
          <div className="absolute inset-0 grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100 cursor-crosshair bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4Ox2yV5C8oWLIiJRMauOgJTFYcdd_8TdODYnS9DUWSm-5ln8hY9oatEoVN4oGIbBeMykbEWBrH5Mp73U6aY0p1jkpSuN5YgfUHZ5sbgue1DYSMza44XNmRKnH9Qz9bxF69jPt2MPfLFmZH1vAGop8we315PF0rTdBQngrY6Br74ksIiMEEgKRp927K5ytTDZup99TE2ed8vqT1F-vsz_WOdOC32kne7RDBCHBMRjDjkJ9SBbu6PXPJ06g0IwCRQQp35Y9o7RnzL8d')` }}></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-[#eebd2b] p-3 rounded-full animate-bounce shadow-xl">
              <span className="material-symbols-outlined text-[#221d10] font-bold">location_on</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);

const ProductScreen = ({ category, onBack, onContactClick }: { category: Category, onBack: () => void, onContactClick: () => void }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?category_slug=${category.slug}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, [category.slug]);

  return (
    <div className="min-h-screen bg-[#f8f7f6]">
      <header className="sticky top-0 z-40 bg-[#f8f7f6]/80 backdrop-blur-md border-b border-[#eebd2b]/10">
        <div className="flex items-center p-4 justify-between max-w-7xl mx-auto w-full">
          <button onClick={onBack} className="flex items-center gap-2 group">
            <div className="size-10 rounded-full border border-[#eebd2b]/30 flex items-center justify-center group-hover:bg-[#eebd2b] group-hover:text-[#221d10] transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm uppercase tracking-widest hidden sm:inline">Back</span>
          </button>
          <div className="text-center flex-1">
            <h2 className="text-xl font-black uppercase tracking-tighter">{category.name}</h2>
            <p className="text-[10px] text-[#eebd2b] font-bold uppercase tracking-[0.3em]">{category.tag}</p>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-[#eebd2b]/20 border-t-[#eebd2b] rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest">Loading Collection</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <ShoppingBag className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold">No products found for this category</h3>
            <p className="text-slate-500 mt-2">New arrivals coming soon!</p>
            <button onClick={onBack} className="mt-8 px-6 py-3 bg-[#eebd2b] text-[#221d10] rounded-xl font-bold shadow-lg">Back to Home</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100"
              >
                <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {product.discountTag && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                      {product.discountTag}
                    </div>
                  )}
                  {product.isNewItem && (
                    <div className="absolute top-4 right-4 bg-[#eebd2b] text-[#221d10] text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                      NEW
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                    <button
                      onClick={onContactClick}
                      className="w-full py-4 bg-white text-[#221d10] rounded-xl font-black text-sm flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl"
                    >
                      <Phone className="w-4 h-4" />
                      CONTACT TO ORDER
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{category.name}</p>
                  <h3 className="text-slate-900 font-bold text-lg leading-tight mb-4 group-hover:text-[#eebd2b] transition-colors line-clamp-2">{product.name}</h3>
                  <div className="flex items-end justify-between">
                    <div>
                      {product.salePrice && (
                        <p className="text-slate-400 text-xs line-through font-bold mb-0.5">Rs. {product.salePrice.toLocaleString()}</p>
                      )}
                      <p className="text-[#221d10] text-xl font-black">Rs. {product.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={onContactClick}
                      className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#eebd2b] group-hover:text-[#221d10] transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const AdminLogin = ({ onLogin, onBack }: { onLogin: (user: any) => void, onBack: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      onLogin(data.user);
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f6] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#eebd2b] rounded-3xl mx-auto mb-6 flex items-center justify-center text-[#221d10] shadow-xl rotate-3">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Admin Portal</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Secure Management Access</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#eebd2b]"></div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1"></label>
              <div className="relative">
                <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#eebd2b] transition-all font-bold"
                  placeholder=""
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Passkey</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#eebd2b] transition-all font-bold"
                  placeholder="••••••••"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
            <button className="w-full py-4 bg-[#221d10] text-[#f8f7f6] rounded-2xl font-black shadow-xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-1 transition-all">
              ACCESS DASHBOARD
            </button>
          </form>
        </div>
        <button onClick={onBack} className="mt-8 text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] hover:text-[#eebd2b] transition-colors w-full text-center">
          ← Back to Main Store
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const [config, setConfig] = useState<any>(null);

  // New product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: 0,
    salePrice: 0,
    imageUrl: '',
    discountTag: '',
    isNewItem: false
  });

  const fetchData = async () => {
    try {
      const [pRes, cRes, confRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/config')
      ]);
      const [pData, cData, confData] = await Promise.all([pRes.json(), cRes.json(), confRes.json()]);
      setProducts(pData);
      setCategories(cData);
      setConfig(confData);
      if (cData.length > 0 && !newProduct.category) {
        setNewProduct(prev => ({ ...prev, category: cData[0].slug }));
      }
    } catch (err) {
      console.error("Fetch inventory error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openUploadWidget = () => {
    if (!config) return;
    // @ts-ignore
    window.cloudinary.openUploadWidget({
      cloudName: config.cloudinaryCloudName,
      uploadPreset: config.cloudinaryUploadPreset,
      sources: ['local', 'url', 'camera'],
      multiple: false,
      clientAllowedFormats: ["png", "jpg", "jpeg"]
    }, (error: any, result: any) => {
      if (!error && result && result.event === "success") {
        setNewProduct(prev => ({ ...prev, imageUrl: result.info.secure_url }));
      }
    });
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.imageUrl) {
      alert("Please upload an image first!");
      return;
    }
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    });
    if (res.ok) {
      alert("Product added successfully!");
      setNewProduct({
        name: '',
        category: categories[0]?.slug || '',
        price: 0,
        salePrice: 0,
        imageUrl: '',
        discountTag: '',
        isNewItem: false
      });
      fetchData();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#eebd2b] rounded-xl flex items-center justify-center text-[#221d10]">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black leading-none uppercase tracking-tighter">Admin Dashboard</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Management Console</p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-bold text-sm">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 space-y-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'products' ? 'bg-[#eebd2b]/10 text-[#221d10]' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Package className="w-5 h-5" />
            <span>Inventory</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === 'upload' ? 'bg-[#eebd2b]/10 text-[#221d10]' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Plus className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-black uppercase tracking-tight">Active Inventory ({products.length})</h2>
                <div className="flex gap-2">
                  <button onClick={() => setActiveTab('upload')} className="px-5 py-2.5 bg-[#eebd2b] text-[#221d10] rounded-xl font-bold text-sm shadow-lg shadow-[#eebd2b]/20 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add New
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                  <div key={p._id} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm">
                    <img src={p.imageUrl} alt={p.name} className="w-16 h-16 rounded-2xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 font-bold truncate">{p.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.category}</p>
                      <p className="text-[#eebd2b] font-black mt-1">Rs. {p.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      disabled={isDeleting === p._id}
                      className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <XCircle className={`w-6 h-6 ${isDeleting === p._id ? 'animate-pulse' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="max-w-2xl bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#eebd2b]"></div>
              <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">Add New Product</h2>
              <form onSubmit={handleCreateProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Product Title</label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#eebd2b] font-bold"
                      placeholder="Luxury King Bed Sheet Set"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={e => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#eebd2b] font-bold appearance-none cursor-pointer"
                    >
                      {categories.map(c => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Price (PKR)</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={e => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#eebd2b] font-bold"
                      placeholder="2500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Original Price (optional)</label>
                    <input
                      type="number"
                      value={newProduct.salePrice}
                      onChange={e => setNewProduct(prev => ({ ...prev, salePrice: Number(e.target.value) }))}
                      className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#eebd2b] font-bold text-slate-400"
                      placeholder="3500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Badge Tag (25% OFF)</label>
                    <input
                      type="text"
                      value={newProduct.discountTag}
                      onChange={e => setNewProduct(prev => ({ ...prev, discountTag: e.target.value }))}
                      className="w-full px-5 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#eebd2b] font-bold"
                      placeholder="15% OFF"
                    />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl col-span-1 md:col-span-2">
                    <input
                      type="checkbox"
                      checked={newProduct.isNewItem}
                      onChange={e => setNewProduct(prev => ({ ...prev, isNewItem: e.target.checked }))}
                      className="size-6 text-[#eebd2b] rounded-lg border-2 border-slate-200 focus:ring-[#eebd2b]"
                    />
                    <span className="font-bold text-slate-700">Mark as "NEW ARRIVAL"</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Product Media</label>
                  {newProduct.imageUrl ? (
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-inner border-2 border-dashed border-[#eebd2b]/20">
                      <img src={newProduct.imageUrl} className="w-full h-full object-cover" />
                      <button
                        onClick={() => setNewProduct(prev => ({ ...prev, imageUrl: '' }))}
                        className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-xl shadow-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={openUploadWidget}
                      className="w-full aspect-video rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-2 hover:bg-slate-100 hover:border-[#eebd2b]/30 transition-all group"
                    >
                      <div className="size-16 rounded-full bg-white flex items-center justify-center text-[#eebd2b] shadow-sm group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8" />
                      </div>
                      <p className="font-black text-slate-500 mt-2">Upload via Cloudinary</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Supports JPG, PNG (Max 5MB)</p>
                    </button>
                  )}
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full py-5 bg-[#221d10] text-[#f8f7f6] rounded-2xl font-black text-lg shadow-2xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-1 transition-all">
                    SAVE PRODUCT TO INVENTORY
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation (Admin) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-6 py-4 md:hidden">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'products' ? 'text-[#eebd2b]' : 'text-slate-400'}`}
          >
            <Package className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase tracking-widest">Inventory</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'upload' ? 'text-[#eebd2b]' : 'text-slate-400'}`}
          >
            <Plus className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase tracking-widest">Add New</span>
          </button>
          <button
            onClick={onLogout}
            className="flex flex-col items-center gap-1 text-slate-400"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<Product[]>([]);
  const [lastViewedCount, setLastViewedCount] = useState(0);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  const fetchNewArrivals = async () => {
    try {
      const res = await fetch('/api/products');
      const data: Product[] = await res.json();
      const newItems = data.filter(p => p.isNewItem).slice(0, 5);
      setNotifications(newItems);
    } catch (err) {
      console.error("Fetch notifications error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNewArrivals();
    const interval = setInterval(fetchNewArrivals, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setScreen('products');
    window.scrollTo(0, 0);
  };

  const handleAdminLogin = (user: any) => {
    setAdminUser(user);
    setScreen('admin-dashboard');
  };

  const handleHomeClick = () => {
    setScreen('home');
    setSelectedCategory(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f6] dark:bg-[#221d10] font-sans text-slate-900 dark:text-[#f8f7f6]">
      {screen !== 'splash' && screen !== 'admin-login' && screen !== 'admin-dashboard' && (
        <Header
          onAdminClick={() => setScreen('admin-login')}
          onHomeClick={handleHomeClick}
          notifications={notifications}
          onNotificationClick={() => {
            setIsNotificationOpen(true);
            setLastViewedCount(notifications.length);
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {screen === 'splash' && <SplashScreen onComplete={() => setScreen('home')} />}
        {screen === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomeScreen categories={categories} onCategoryClick={handleCategorySelect} />
            <Footer />
          </motion.div>
        )}
        {screen === 'products' && selectedCategory && (
          <motion.div key="products" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <ProductScreen category={selectedCategory} onBack={handleHomeClick} onContactClick={() => setIsContactOpen(true)} />
            <Footer />
          </motion.div>
        )}
        {screen === 'admin-login' && (
          <motion.div key="admin-login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminLogin onLogin={handleAdminLogin} onBack={handleHomeClick} />
          </motion.div>
        )}
        {screen === 'admin-dashboard' && adminUser && (
          <motion.div key="admin-dashboard" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}>
            <AdminDashboard onLogout={() => { setAdminUser(null); setScreen('home'); }} />
          </motion.div>
        )}
      </AnimatePresence>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <NotificationPopup
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        items={notifications}
      />
    </div>
  );
}
