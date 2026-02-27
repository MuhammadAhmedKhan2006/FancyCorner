/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  MoreHorizontal
} from 'lucide-react';
import { Category, Product, Screen } from './types';

// --- Components ---

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
        return prev + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background-light flex flex-col items-center justify-center p-4">
      <div className="flex items-center p-4 pb-2 justify-end absolute top-0 right-0">
        <MoreHorizontal className="text-primary" />
      </div>
      
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="relative w-full aspect-square bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center overflow-hidden rounded-xl border-4 border-primary/20 glow-effect mb-12"
             style={{ backgroundImage: `linear-gradient(rgba(248, 247, 246, 0.8), rgba(248, 247, 246, 0.8)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCfwdcFarv7OCOa77ST-NrPwwECW-WvbeVgbkFtfp3r4XAwiUXGilEX0k1Q2-oUQBZX6TiPy6uFnn3DMTAsBqTGlc7QYYOkI2L570b0n37etKJ5KVgS-CMt3aLH5boTOXOqATAPe3Cs5bWn9toWXUId_TRDLaY776ug_EccLu3W4cABLXrnIi1bMnj-Kp2iM1j3gEFMqbIdmnhwmpQftu_eQASuBJauHQwQTZHPOKRTmh2-dhAkUfbeRVruIAK-Int4lORWLm2dIvVy")` }}>
          <div className="flex flex-col items-center text-center p-8">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-6 shadow-lg">
              <span className="material-symbols-outlined text-background-light text-5xl">diamond</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-slate-900 text-3xl font-bold font-urdu" dir="rtl">
                شمیم پلاسٹک ہاؤس
              </h1>
              <h1 className="text-slate-900 text-xl font-bold tracking-tight">
                Shamim Plastic House
              </h1>
              <div className="h-px w-24 bg-primary mx-auto my-2"></div>
              <p className="text-primary font-medium tracking-widest uppercase text-xs">& Fancy Corner</p>
            </div>
          </div>
        </div>

        <div className="w-full px-8">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-slate-900 text-lg font-semibold leading-tight">Crafting Elegance</p>
              <p className="text-slate-500 text-sm font-normal">
                {progress < 100 ? 'Loading luxury collection...' : 'Luxury collection ready...'}
              </p>
            </div>
            <p className="text-primary text-lg font-bold">{progress}%</p>
          </div>
          <div className="rounded-full bg-primary/10 h-3 overflow-hidden">
            <motion.div 
              className="h-full rounded-full bg-primary" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-slate-500 text-sm font-normal leading-normal pt-6 text-center italic">
            "Quality & Elegance in every corner of your home"
          </p>
        </div>
      </div>
    </div>
  );
};

const HomeScreen = ({ onCategorySelect, onAdminClick }: { onCategorySelect: (c: Category) => void, onAdminClick: () => void }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className="min-h-screen bg-background-light pb-24">
      <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Store className="text-primary w-8 h-8" />
            <div>
              <h1 className="text-lg font-bold leading-none">Shamim Plastic House</h1>
              <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Fancy Corner</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-primary/10 transition-colors">
              <Bell className="text-slate-700 w-6 h-6" />
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </button>
            <button 
              onClick={onAdminClick}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-tight">Admin</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <section className="relative h-[500px] overflow-hidden group">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
               style={{ backgroundImage: `linear-gradient(to bottom, rgba(34, 29, 16, 0.4), rgba(34, 29, 16, 0.85)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAffQK9ctGwVU4uo7J_Ak_ic-JK5mq4RmvcgnKl56irlENQvTeL8n73CXj4GhsQODEH0YQgx7pVv6_GP06mrmJLcpZRwJIXy-p3_g199Eq3Rciyl81MFr97u2JM-q1bn3btPQNbsasCp4EdJm8HOpuGiz1AQiCR_n1Ow9Kg0fAT4n8b5ev9rD23PUZPql-8EkFAsvKxlgIlTclW0e53srP82eXGA1vDSut8LeMVg1UrFcJDL6INLrjeFJaK73FSxAhBRr4gwp_PGWIZ')` }}>
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-white text-4xl md:text-6xl font-black mb-4 tracking-tight font-urdu" dir="rtl">
              شمیم پلاسٹک ہاؤس اینڈ فینسی کارنر
            </h2>
            <h3 className="text-primary text-lg md:text-xl font-bold mb-6 tracking-wide uppercase">
              Premium Home Decor & Fancy Essentials
            </h3>
            <div className="flex items-center gap-2 text-slate-200 mb-8 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="text-primary w-4 h-4" />
              <span className="text-sm font-medium">Hyderi Farhan Market, Karachi</span>
            </div>
            <button className="px-8 py-4 bg-primary text-background-dark rounded-xl font-extrabold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
              Explore Our Collection
            </button>
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Shop by Category</span>
              <h2 className="text-3xl font-black mt-1">Our Exquisite Ranges</h2>
            </div>
            <div className="h-1 w-24 bg-primary rounded-full hidden md:block mb-3"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <div 
                key={category.id}
                onClick={() => onCategorySelect(category)}
                className="group relative h-[350px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <img src={category.image_url} alt={category.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-primary text-sm font-bold tracking-tighter uppercase mb-1">{category.tag}</p>
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary/5 py-12 px-4 mb-12 rounded-3xl mx-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-black">Visit Our Store</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Discover the finest collection of plastic housewares and fancy corner items in the heart of Karachi. Quality products, competitive pricing, and exceptional service.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-background-dark">
                    <MapPin />
                  </div>
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p className="text-sm text-slate-500">Hyderi Farhan Market, North Nazimabad, Karachi</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-background-dark">
                    <Clock />
                  </div>
                  <div>
                    <h4 className="font-bold">Working Hours</h4>
                    <p className="text-sm text-slate-500">Mon - Sat: 11:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-80 rounded-2xl bg-slate-200 overflow-hidden relative border-4 border-white shadow-2xl">
              <div className="absolute inset-0 grayscale opacity-70 bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4Ox2yV5C8oWLIiJRMauOgJTFYcdd_8TdODYnS9DUWSm-5ln8hY9oatEoVN4oGIbBeMykbEWBrH5Mp73U6aY0p1jkpSuN5YgfUHZ5sbgue1DYSMza44XNmRKnH9Qz9bxF69jPt2MPfLFmZH1vAGop8we315PF0rTdBQngrY6Br74ksIiMEEgKRp927K5ytTDZup99TE2ed8vqT1F-vsz_WOdOC32kne7RDBCHBMRjDjkJ9SBbu6PXPJ06g0IwCRQQp35Y9o7RnzL8d')` }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary p-3 rounded-full animate-bounce">
                  <MapPin className="text-background-dark font-bold" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-light border-t border-slate-200 px-6 py-4 md:hidden">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-primary">
            <Store className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <Package className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Shop</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <Megaphone className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Offers</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <Settings className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

const ProductListScreen = ({ category, onBack }: { category: Category, onBack: () => void }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`/api/products?category_slug=${category.slug}`)
      .then(res => res.json())
      .then(setProducts);
  }, [category.slug]);

  return (
    <div className="min-h-screen bg-background-light pb-24">
      <header className="sticky top-0 z-40 bg-background-light/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center p-4 justify-between max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-lg font-bold leading-tight tracking-tight">{category.name}</h2>
              <p className="text-xs text-slate-500">Shamim Plastic House</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
              <Search className="w-6 h-6" />
            </button>
            <button className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex border-b border-primary/10 px-4 gap-8 overflow-x-auto no-scrollbar max-w-5xl mx-auto w-full">
          {['All Collection', 'Cotton Mix', 'Silk Satin', 'Premium Linen'].map((tab, i) => (
            <button 
              key={tab}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-4 whitespace-nowrap transition-colors ${i === 0 ? 'border-primary text-slate-900' : 'border-transparent text-slate-500 hover:text-primary'}`}
            >
              <span className={`text-sm ${i === 0 ? 'font-bold' : 'font-medium'}`}>{tab}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-primary/5">
              <div className="relative w-full aspect-[4/5] bg-slate-200 overflow-hidden">
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.discount_tag && (
                  <div className="absolute top-2 left-2 bg-primary text-slate-900 text-[10px] font-bold px-2 py-1 rounded-full">
                    {product.discount_tag}
                  </div>
                )}
                {product.is_new && (
                  <div className="absolute top-2 left-2 bg-primary text-slate-900 text-[10px] font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-slate-900 text-sm font-semibold truncate">{product.name}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-primary text-base font-bold">Rs. {product.price.toLocaleString()}</p>
                  {product.old_price && (
                    <p className="text-slate-400 text-xs line-through">Rs. {product.old_price.toLocaleString()}</p>
                  )}
                </div>
                <button 
                  onClick={() => setShowModal(true)}
                  className="mt-3 w-full bg-primary hover:bg-primary/90 text-slate-900 text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Phone className="text-primary w-5 h-5" />
            Quick Contact
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[1, 2].map(i => (
              <button key={i} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-primary/10 group hover:border-primary transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-500">Representative {i}</p>
                    <p className="font-bold">0333-31501{i === 1 ? '9' : '8'}</p>
                  </div>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-xl font-bold">Contact Options</h4>
                  <p className="text-sm text-slate-600">Choose how to place your order</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <a href="tel:0333315019" className="flex items-center gap-4 p-4 rounded-2xl bg-primary text-slate-900 hover:scale-[1.02] transition-transform">
                  <Phone className="w-6 h-6" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">Direct Call</p>
                    <p className="font-bold">0333-315019</p>
                  </div>
                </a>
                <button className="flex items-center gap-4 p-4 rounded-2xl bg-green-500 text-white hover:scale-[1.02] transition-transform w-full">
                  <MessageCircle className="w-6 h-6" />
                  <div className="flex-1 text-left">
                    <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">WhatsApp</p>
                    <p className="font-bold">Chat with Sales</p>
                  </div>
                </button>
                <a href="mailto:info@shamimplastic.com" className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 hover:scale-[1.02] transition-transform">
                  <Mail className="w-6 h-6" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold opacity-80 uppercase tracking-wider">Email Inquiry</p>
                    <p className="font-bold">Send Gmail</p>
                  </div>
                </a>
              </div>
              <p className="mt-6 text-center text-[10px] text-slate-500 uppercase tracking-[2px] font-bold">Shamim Plastic House</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminLoginScreen = ({ onLogin, onBack }: { onLogin: (user: any) => void, onBack: () => void }) => {
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
    <div className="min-h-screen bg-background-light flex flex-col">
      <nav className="flex items-center bg-background-light/80 backdrop-blur-md p-4 sticky top-0 z-50 justify-between border-b border-primary/10">
        <button 
          onClick={onBack}
          className="text-slate-900 flex w-10 h-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-slate-900 text-sm font-bold tracking-tight">SHAMIM PLASTIC HOUSE</h2>
          <span className="text-[10px] text-primary font-medium tracking-[0.2em] uppercase leading-none">& Fancy Corner</span>
        </div>
        <div className="w-10"></div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="w-full max-w-md z-10">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 p-1">
              <div className="w-full h-full rounded-full bg-primary/40 flex items-center justify-center overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDur3lqrv1Ekbq1uW3SlRLC3IEf7vX_F8_KjzbCoLjvU4KLMZUDHcX-U4Wy4xEfC9RyJvzUDLTeo2sFlb6Y3DmY3XBZjlA65h1K7jL1wzbHt0F06jJlrWq2NubQu6ie1g_UyCVq1ze9VNA7jMpeLy6-EjmCthhSLYYsozHOpDp3G845Giic-3jRDwZc_ocBJMyjIGCaH2ldP1ezXd5BQcPeTui-MUZGDATk6i8HnyiiaOJWQO91mNW2ohMlsdeHTGBGHEDEEqDbZHLP" alt="Logo" className="w-16 h-16 object-contain" />
              </div>
            </div>
            <h1 className="text-slate-900 text-3xl font-bold tracking-tight mb-2">Admin Access</h1>
            <p className="text-slate-600 text-base">Secure management portal for authorized personnel</p>
          </div>

          <div className="glass-card rounded-xl p-8 shadow-2xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShieldCheck className="text-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold leading-none">Login</h3>
                <p className="text-slate-500 text-sm mt-1">Please enter your credentials</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Store className="w-4 h-4" />
                  </span>
                  <input 
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-primary/20 bg-white/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="admin_shamim"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Password</label>
                  <button type="button" className="text-xs font-medium text-primary hover:underline">Forgot?</button>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-primary/20 bg-white/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-lg shadow-lg shadow-primary/40 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2">
                <span>ACCESS DASHBOARD</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>
          <p className="text-center mt-8 text-slate-400 text-sm">
            Authorized access only. All activity is logged and monitored.
          </p>
        </div>
      </main>

      <footer className="p-6 text-center border-t border-primary/10 bg-background-light">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
          © 2024 Shamim Plastic House & Fancy Corner
        </p>
      </footer>
    </div>
  );
};

const AdminDashboardScreen = ({ user }: { user: any }) => {
  return (
    <div className="min-h-screen bg-background-light pb-32">
      <header className="sticky top-0 z-40 bg-background-light/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center p-4 justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="text-primary flex w-10 h-10 shrink-0 items-center justify-center bg-primary/10 rounded-lg">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">Shamim Plastic House <span className="text-primary">Admin</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="text-slate-600 w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background-light"></span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-8 border-b border-primary/10">
            {['Dashboard', 'Products', 'Sales', 'Requests'].map((tab, i) => (
              <button key={tab} className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-4 ${i === 0 ? 'border-primary text-slate-900' : 'border-transparent text-slate-500 hover:text-primary'}`}>
                <p className="text-sm font-bold">{tab}</p>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-primary/5 border border-primary/10">
            <div className="flex justify-between items-start">
              <p className="text-slate-600 text-sm font-medium">Total Products</p>
              <Package className="text-primary w-5 h-5" />
            </div>
            <p className="text-3xl font-bold leading-tight">1,240</p>
            <p className="text-green-600 text-sm font-medium flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> +5.2%
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-primary/5 border border-primary/10">
            <div className="flex justify-between items-start">
              <p className="text-slate-600 text-sm font-medium">Active Sales</p>
              <Megaphone className="text-primary w-5 h-5" />
            </div>
            <p className="text-3xl font-bold leading-tight">3</p>
            <p className="text-slate-500 text-sm font-medium">Currently running</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-6 bg-primary/5 border border-primary/10">
            <div className="flex justify-between items-start">
              <p className="text-slate-600 text-sm font-medium">Design Requests</p>
              <ClipboardList className="text-primary w-5 h-5" />
            </div>
            <p className="text-3xl font-bold leading-tight">12</p>
            <p className="text-red-500 text-sm font-medium flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Awaiting review
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold px-1">Manage Content</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Plus />, title: 'Upload Product', desc: 'Add new plastic items' },
                { icon: <TrendingUp />, title: 'Create Sale', desc: 'Launch a new event' },
                { icon: <Bell />, title: 'Send Toast', desc: 'Alert all users' },
                { icon: <Package />, title: 'Bulk Actions', desc: 'Manage large inventory' },
              ].map(action => (
                <button key={action.title} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-primary/10 hover:border-primary transition-all group">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 text-primary">
                    {action.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-bold">{action.title}</p>
                    <p className="text-xs text-slate-500">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl font-bold">New Design Requests</h2>
              <button className="text-primary text-sm font-bold">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Eco-Poly Container', user: 'Designer Jane', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGsQdnke3CKnPfUMiENIHWPMYZslN9KuUtLCcilYJc2ZsBqNiqK5CvKEYc_G36ha745j1ka230m5fC5eq6SS0b1PGoJjG5hM7Xb8qFYVGUdIwqSExaM41DZ-DU_Jd5L-KDbu9G0YjXNMwn8n4x2sTT8zJ6KNpw1wjzdqZBXojPNd-KSq4-FSFtIdnAUQRRwtirr69_gnWKKZQ0Gc_99t5_GsNS0yKRLqG_ZCs1y3yIFVyVjQj1gInoOhCdVsc6DLSTBmsQiwhEV3mF' },
                { title: 'Heavy-Duty Bucket', user: 'Vendor Alpha', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoK5JJ5yEW7lkiYTL_29CvUJag18erKN4ve-I1lRC0Nm2fTG-22a3gWCz7L72_-Br6ecu0G2hA_DfYl9eTrw9TpVF-M2JQyoUHKDfgcDEyjAmS4FPV4JPHLkt8qFjwt2Y1aLK8vUz8DYVdTq6z3Hw5LhZP5nUytishKS1AKcZV0KNRwkbh3U9-mywmrCmicTlm2Hf0wkJFDC4PxRpK6GxlCTegquv6OABYpAyCtq7dlRx84f4jDmextEGukcX0psMSahFPGOxJ6mUx' }
              ].map(req => (
                <div key={req.title} className="p-4 bg-white rounded-xl border border-primary/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden">
                      <img src={req.img} alt={req.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold">{req.title}</p>
                      <p className="text-xs text-slate-500">Requested by {req.user}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-3 max-w-sm w-full">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-slate-900 text-white rounded-xl p-4 shadow-xl border border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-full">
                <Bell className="text-slate-900 w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold">New Designs Added</p>
                <p className="text-xs text-slate-400">Inventory updated with 50+ new items</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background-light border-t border-primary/10 px-4 pb-6 pt-2">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <button className="flex flex-1 flex-col items-center justify-center gap-1 text-primary">
            <LayoutDashboard className="w-6 h-6" />
            <p className="text-[10px] font-medium leading-none">Home</p>
          </button>
          <button className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500">
            <Package className="w-6 h-6" />
            <p className="text-[10px] font-medium leading-none">Inventory</p>
          </button>
          <div className="flex flex-1 flex-col items-center -mt-8">
            <button className="bg-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-slate-900 border-4 border-background-light">
              <Plus className="w-8 h-8 font-bold" />
            </button>
            <p className="text-[10px] font-medium leading-none mt-1">Upload</p>
          </div>
          <button className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500">
            <Calendar className="w-6 h-6" />
            <p className="text-[10px] font-medium leading-none">Events</p>
          </button>
          <button className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500">
            <Settings className="w-6 h-6" />
            <p className="text-[10px] font-medium leading-none">Settings</p>
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

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setScreen('products');
  };

  const handleAdminLogin = (user: any) => {
    setAdminUser(user);
    setScreen('admin-dashboard');
  };

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SplashScreen onComplete={() => setScreen('home')} />
          </motion.div>
        )}
        {screen === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomeScreen 
              onCategorySelect={handleCategorySelect} 
              onAdminClick={() => setScreen('admin-login')} 
            />
          </motion.div>
        )}
        {screen === 'products' && selectedCategory && (
          <motion.div key="products" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
            <ProductListScreen 
              category={selectedCategory} 
              onBack={() => setScreen('home')} 
            />
          </motion.div>
        )}
        {screen === 'admin-login' && (
          <motion.div key="admin-login" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}>
            <AdminLoginScreen 
              onLogin={handleAdminLogin} 
              onBack={() => setScreen('home')} 
            />
          </motion.div>
        )}
        {screen === 'admin-dashboard' && adminUser && (
          <motion.div key="admin-dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminDashboardScreen user={adminUser} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
