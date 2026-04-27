"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const REVIEWS = [
  {
    text: "Absolutely mind-blowing. The depth of flavor in the Green Mango is something I never thought possible from a premix.",
    author: "Elena R.",
    role: "Mixologist"
  },
  {
    text: "The easiest way to impress guests. The Virgin Mojito tastes like it was just muddled at a high-end bar.",
    author: "James T.",
    role: "Event Host"
  },
  {
    text: "I love the complex botanical notes. Blue Lagoon is not just a drink, it's an entire mood.",
    author: "Sarah L.",
    role: "Lifestyle Blogger"
  }
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{name: string, price: string, img: string, quantity: number}[]>([]);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview(prev => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (item: {name: string, price: string, img: string}) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (name: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.name === name) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const getItemQuantity = (name: string) => {
    return cartItems.find(i => i.name === name)?.quantity || 0;
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-4">
        <button onClick={() => setIsCartOpen(!isCartOpen)} className="glass-panel bg-white/40 backdrop-blur-2xl text-emerald-950 px-3.5 py-3.5 rounded-full font-extrabold tracking-tight shadow-2xl hover:bg-white/60 active:scale-95 transform transition-all duration-300 flex items-center gap-2 border border-white/50 relative">
          <span className="material-symbols-outlined text-xl" data-icon="shopping_bag">shopping_bag</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{totalItems}</span>
          )}
        </button>
        <div className="relative">
          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="glass-panel bg-white/40 backdrop-blur-2xl text-emerald-950 px-3.5 py-3.5 rounded-full font-extrabold tracking-tight shadow-2xl hover:bg-white/60 active:scale-95 transform transition-all duration-300 flex items-center gap-2 border border-white/50"
          >
            <span className="material-symbols-outlined text-xl" data-icon="person">person</span>
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-4 w-44 bg-white rounded-3xl shadow-2xl border border-emerald-900/5 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-200 z-100">
              <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50 transition-colors group">
                <span className="material-symbols-outlined text-[18px] text-emerald-900/40 group-hover:text-emerald-900 transition-colors">account_circle</span>
                <span className="font-bold text-[13px] tracking-tight text-emerald-950">Profile</span>
              </Link>
              <Link href="/track-order" className="flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50 transition-colors group text-left">
                <span className="material-symbols-outlined text-[18px] text-emerald-900/40 group-hover:text-emerald-900 transition-colors">local_shipping</span>
                <span className="font-bold text-[13px] tracking-tight text-emerald-950">Track Order</span>
              </Link>
              <div className="mx-4 my-1 h-px bg-emerald-900/5"></div>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors group text-left">
                <span className="material-symbols-outlined text-[18px] text-red-600/40 group-hover:text-red-600 transition-colors">logout</span>
                <span className="font-bold text-[13px] tracking-tight text-red-600">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
<main>
{/**/}
<section className="relative h-[200vh] w-full">
  <div className="font-limelight sticky top-0 h-[120vh] w-full flex flex-col justify-start items-center pt-10 px-6 md:px-12 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero.png')" }}>
    
    <div className="relative w-full h-[300px] md:h-[400px] flex justify-center items-start mt-10 z-10">
      <h1 
        className="absolute top-0 text-6xl md:text-8xl lg:text-9xl font-black text-white text-center tracking-tighter drop-shadow-2xl uppercase"
        style={{
          opacity: Math.max(0, 1 - scrollY / 300),
          transform: `translateY(${-Math.min(scrollY, 300) * 0.5}px)`,
          transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
        }}
      >
        Mocktail Premix Powder
      </h1>

      <h1 
        className="absolute top-15 text-6xl md:text-8xl lg:text-9xl font-black text-white text-center tracking-tighter drop-shadow-2xl uppercase"
        style={{
          opacity: scrollY < 300 ? 0 : Math.min(1, (scrollY - 300) / 300),
          transform: `translateY(${scrollY < 300 ? 100 : Math.max(0, 100 - ((scrollY - 300) / 300) * 100)}px)`,
          transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
        }}
      >
        NINJIRO✧
      </h1>
    </div>

    <button 
      className="font-poppins bg-gray-900 text-white px-8 py-3 rounded-full text-base font-bold tracking-widest shadow-lg hover:bg-gray-800 active:scale-95 transform transition-all duration-300 z-10 -mt-10 md:-mt-30 md:-mr-10"
    >
      Buy Now
    </button>
  </div>
</section>
{/**/}
<section className="py-24 px-6 md:px-12 bg-white" id="flavors">
<div className="max-w-screen-2xl mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
<div className="space-y-4">
<h2 className="text-5xl md:text-7xl font-black italic uppercase text-black tracking-tighter leading-none">SELECT YOUR FREQUENCY</h2>
<p className="text-black/70 text-lg md:text-xl font-medium max-w-xl">Four signature profiles designed to shift your state without the hangover.</p>
</div>
<div className="flex gap-2">

</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
{/**/}
<div className="group flex flex-col rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl bg-white font-poppins">
  <div className="bg-[#00485c] relative h-72 p-6 flex justify-center items-center">
    <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-xl" data-alt="blue tropical drink" src="/blulagoonbox.png"/>
  </div>
  <div className="bg-[#006884] p-6 flex flex-col justify-between text-white grow">
    <div>
      <h3 className="text-2xl font-black italic uppercase mb-2 tracking-widest">Blue Lagoon</h3>
      <p className="text-xs text-white/90 leading-tight">Natural blueberry extracts, sparkling spring water, and a hint of wild lavender.</p>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <span className="text-xl font-bold tracking-wider">₹666/-</span>
      {getItemQuantity('Blue Lagoon') > 0 ? (
        <div className="bg-white text-[#006884] h-10 rounded-full flex items-center shadow-md overflow-hidden">
          <button onClick={() => updateQuantity('Blue Lagoon', -1)} className="w-8 h-full flex items-center justify-center hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="remove">remove</span>
          </button>
          <span className="w-6 text-center font-bold text-sm">{getItemQuantity('Blue Lagoon')}</span>
          <button onClick={() => updateQuantity('Blue Lagoon', 1)} className="w-8 h-full flex items-center justify-center hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
          </button>
        </div>
      ) : (
        <button onClick={() => addToCart({name: 'Blue Lagoon', price: '₹666/-', img: '/blulagoonbox.png'})} className="bg-white text-[#006884] w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95 transform shadow-md">
          <span className="material-symbols-outlined text-[20px]" data-icon="shopping_cart">shopping_cart</span>
        </button>
      )}
    </div>
  </div>
</div>
{/**/}
<div className="group flex flex-col rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl bg-white font-poppins">
  <div className="bg-[#004930] relative h-72 p-6 flex justify-center items-center">
    <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-xl" data-alt="green mango drink" src="/greentangbox.png"/>
  </div>
  <div className="bg-[#00704a] p-6 flex flex-col justify-between text-white grow">
    <div>
      <h3 className="text-2xl font-black italic uppercase mb-2 tracking-widest">Green Mango</h3>
      <p className="text-xs text-white/90 leading-tight">Real citrus pulp, unripe mango nectar, and a whisper of Himalayan salt.</p>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <span className="text-xl font-bold tracking-wider">₹666/-</span>
      {getItemQuantity('Green Mango') > 0 ? (
        <div className="bg-white text-[#00704a] h-10 rounded-full flex items-center shadow-md overflow-hidden">
          <button onClick={() => updateQuantity('Green Mango', -1)} className="w-8 h-full flex items-center justify-center hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="remove">remove</span>
          </button>
          <span className="w-6 text-center font-bold text-sm">{getItemQuantity('Green Mango')}</span>
          <button onClick={() => updateQuantity('Green Mango', 1)} className="w-8 h-full flex items-center justify-center hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
          </button>
        </div>
      ) : (
        <button onClick={() => addToCart({name: 'Green Mango', price: '₹666/-', img: '/greentangbox.png'})} className="bg-white text-[#00704a] w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95 transform shadow-md">
          <span className="material-symbols-outlined text-[20px]" data-icon="shopping_cart">shopping_cart</span>
        </button>
      )}
    </div>
  </div>
</div>
{/**/}
<div className="group flex flex-col rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl bg-white font-poppins">
  <div className="bg-[#ff9500] relative h-72 p-6 flex justify-center items-center">
    <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-xl" data-alt="orange tang drink" src="/orangetangbox.png"/>
  </div>
  <div className="bg-[#e87903] p-6 flex flex-col justify-between text-white grow">
    <div>
      <h3 className="text-2xl font-black italic uppercase mb-2 tracking-widest">Orange Tang</h3>
      <p className="text-xs text-white/90 leading-tight">Blood orange concentrate, cold-pressed ginger, and sparkling tangerine water.</p>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <span className="text-xl font-bold tracking-wider">₹666/-</span>
      {getItemQuantity('Orange Tang') > 0 ? (
        <div className="bg-white text-[#ff9500] h-10 rounded-full flex items-center shadow-md overflow-hidden">
          <button onClick={() => updateQuantity('Orange Tang', -1)} className="w-8 h-full flex items-center justify-center hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="remove">remove</span>
          </button>
          <span className="w-6 text-center font-bold text-sm">{getItemQuantity('Orange Tang')}</span>
          <button onClick={() => updateQuantity('Orange Tang', 1)} className="w-8 h-full flex items-center justify-center hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
          </button>
        </div>
      ) : (
        <button onClick={() => addToCart({name: 'Orange Tang', price: '₹666/-', img: '/orangetangbox.png'})} className="bg-white text-[#ff9500] w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95 transform shadow-md">
          <span className="material-symbols-outlined text-[20px]" data-icon="shopping_cart">shopping_cart</span>
        </button>
      )}
    </div>
  </div>
</div>
{/**/}
<div className="group flex flex-col rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl bg-white font-poppins">
  <div className="bg-[#1b8858] relative h-72 p-6 flex justify-center items-center">
    <img className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-xl" data-alt="virgin mojito drink" src="/virginmojitobox.png"/>
  </div>
  <div className="bg-[#25b07a] p-6 flex flex-col justify-between text-white grow">
    <div>
      <h3 className="text-2xl font-black italic uppercase mb-2 tracking-widest">Virgin Mojito</h3>
      <p className="text-xs text-white/90 leading-tight">Fresh garden mint, hand-squeezed lime, and artisanal agave nectar syrup.</p>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <span className="text-xl font-bold tracking-wider">₹666/-</span>
      {getItemQuantity('Virgin Mojito') > 0 ? (
        <div className="bg-white text-[#2fd696] h-10 rounded-full flex items-center shadow-md overflow-hidden">
          <button onClick={() => updateQuantity('Virgin Mojito', -1)} className="w-8 h-full flex items-center justify-center hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="remove">remove</span>
          </button>
          <span className="w-6 text-center font-bold text-sm">{getItemQuantity('Virgin Mojito')}</span>
          <button onClick={() => updateQuantity('Virgin Mojito', 1)} className="w-8 h-full flex items-center justify-center hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
          </button>
        </div>
      ) : (
        <button onClick={() => addToCart({name: 'Virgin Mojito', price: '₹666/-', img: '/virginmojitobox.png'})} className="bg-white text-[#2fd696] w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95 transform shadow-md">
          <span className="material-symbols-outlined text-[20px]" data-icon="shopping_cart">shopping_cart</span>
        </button>
      )}
    </div>
  </div>
</div>
</div>
</div>
</section>
{/**/}
<section className="py-40 px-6 md:px-12 relative overflow-hidden bg-emerald-50/50">
  {/* Sophisticated Ambient Background */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-200/20 rounded-full blur-[150px] pointer-events-none"></div>
  
  <div className="max-w-screen-2xl mx-auto relative z-10">
    <div className="flex flex-col items-center text-center space-y-6 mb-24">
      <h2 className="font-limelight text-6xl md:text-8xl text-emerald-950 tracking-tighter uppercase leading-none">
        Botanical<br/><span className="text-emerald-600 italic">Mastery</span>
      </h2>
      <p className="text-emerald-900/60 font-black tracking-[0.3em] uppercase text-xs">The science of the perfect sip</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Detail Card 1 */}
      <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
        <div className="glass-panel bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/60 shadow-xl hover:-rotate-2 transition-all duration-500 group">
          <div className="w-14 h-14 bg-emerald-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl">eco</span>
          </div>
          <h3 className="text-2xl font-black text-emerald-950 tracking-tight mb-4">Pure Essence</h3>
          <p className="text-sm font-medium text-emerald-900/60 leading-relaxed">
            Cold-pressed botanical extracts sourced from the world's most vibrant ecosystems. Zero synthetic additives.
          </p>
        </div>
      </div>

      {/* Hero Visual Card */}
      <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center py-12 lg:py-0">
        <div className="relative group">
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-[80px] group-hover:bg-emerald-400/30 transition-all duration-700 animate-pulse"></div>
          <div className="glass-panel bg-white/50 backdrop-blur-3xl p-12 md:p-20 rounded-[4rem] border border-white/80 shadow-2xl relative z-10 hover:scale-105 transition-transform duration-700 overflow-hidden">
    
            <img src="/blulagoonbox.png" alt="Mocktail Box" className="w-full max-w-[320px] h-auto drop-shadow-[0_20px_50px_rgba(6,78,59,0.3)] rotate-12 group-hover:rotate-0 transition-all duration-1000" />
            <div className="mt-12 text-center">
              <p className="font-black italic text-4xl text-emerald-950 tracking-tighter">NINJIRO✧</p>
              <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Cards 2 & 3 */}
      <div className="lg:col-span-3 space-y-8 order-3 lg:order-3">
        <div className="glass-panel bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/60 shadow-xl hover:rotate-2 transition-all duration-500 group">
          <div className="w-14 h-14 bg-cyan-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-600/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl">balance</span>
          </div>
          <h3 className="text-2xl font-black text-emerald-950 tracking-tight mb-4">Precision</h3>
          <p className="text-sm font-medium text-emerald-900/60 leading-relaxed">
            Meticulously calibrated acidity-to-sweetness ratios that replicate the complexity of elite bar craftsmanship.
          </p>
        </div>
        
        <div className="glass-panel bg-white/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/60 shadow-xl hover:-rotate-1 transition-all duration-500 group">
          <div className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl">bolt</span>
          </div>
          <h3 className="text-2xl font-black text-emerald-950 tracking-tight mb-4">Tempo</h3>
          <p className="text-sm font-medium text-emerald-900/60 leading-relaxed">
            Artistry in every shake. Transform standard water into a professional botanical experience in under 30 seconds.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
{/**/}
<section className="py-24 px-6 md:px-12 bg-linear-to-br from-[#f0fdf6] to-[#e0f2fe] relative overflow-hidden" id="reviews">
  {/* Background decorative elements */}
  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-300/40 blur-[100px] rounded-full pointer-events-none"></div>
  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-indigo-300/30 blur-[100px] rounded-full pointer-events-none"></div>

  <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
    <div className="text-amber-400 mb-12 flex gap-2 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">
      {[1, 2, 3, 4, 5].map(star => <span key={star} className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
    </div>
    
    <div className="grid grid-cols-1 grid-rows-1 w-full max-w-5xl place-items-center">
      {REVIEWS.map((review, index) => (
        <div 
          key={index}
          className={`col-start-1 row-start-1 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] w-full text-center flex flex-col items-center gap-8 ${
            index === currentReview ? 'opacity-100 translate-x-0 scale-100 z-10' : 
            index < currentReview ? 'opacity-0 -translate-x-32 scale-95 pointer-events-none -z-10' : 'opacity-0 translate-x-32 scale-95 pointer-events-none -z-10'
          }`}
        >
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black italic text-emerald-950 leading-tight tracking-tight px-4 drop-shadow-sm">
            "{review.text}"
          </h3>
          <div className="flex flex-col items-center gap-1 mt-4">
            <p className="text-emerald-700 font-black tracking-widest uppercase text-sm md:text-base">{review.author}</p>
            <p className="text-emerald-900/50 text-xs md:text-sm font-bold tracking-wider uppercase">{review.role}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center gap-6 mt-16">
      <button 
        onClick={() => setCurrentReview(prev => (prev === 0 ? REVIEWS.length - 1 : prev - 1))}
        className="w-14 h-14 rounded-full border border-emerald-900/10 flex items-center justify-center text-emerald-950 hover:bg-emerald-900/5 hover:border-emerald-900/20 transition-all active:scale-95 bg-white/50 backdrop-blur-md shadow-sm"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <div className="flex items-center gap-3 px-6 bg-white/50 backdrop-blur-md h-14 rounded-full border border-emerald-900/10 shadow-sm">
        {REVIEWS.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentReview(index)}
            className={`h-2.5 rounded-full transition-all duration-500 ${index === currentReview ? 'bg-emerald-500 w-8 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-emerald-900/10 hover:bg-emerald-900/30 w-2.5'}`}
          />
        ))}
      </div>
      <button 
        onClick={() => setCurrentReview(prev => (prev + 1) % REVIEWS.length)}
        className="w-14 h-14 rounded-full border border-emerald-900/10 flex items-center justify-center text-emerald-950 hover:bg-emerald-900/5 hover:border-emerald-900/20 transition-all active:scale-95 bg-white/50 backdrop-blur-md shadow-sm"
      >
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  </div>
</section>
</main>
{/**/}
<footer className="relative bg-emerald-950 pt-32 pb-12 overflow-hidden border-t-8 border-emerald-500 font-poppins">
  {/* Abstract Liquid background effects */}
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50"></div>
  <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-50"></div>

  <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
    <div className="flex flex-col lg:flex-row justify-between gap-16 border-b border-emerald-800/50 pb-16">
      
      {/* Brand & Newsletter */}
      <div className="lg:w-1/2 space-y-8">
        <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-none">
          STAY<br/>REFRESHED.
        </h2>

        <div className="flex w-full max-w-md bg-emerald-900/50 rounded-full p-2 border border-emerald-700/50 backdrop-blur-sm shadow-xl">
        
        </div>
      </div>

      {/* Links Grid */}
      <div className="lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-4">
        <div className="space-y-6">
          <h4 className="text-emerald-500 font-black tracking-widest uppercase text-xs">The Bar</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="text-emerald-100/70 hover:text-white transition-colors">Shop All</a></li>
            <li><a href="#" className="text-emerald-100/70 hover:text-white transition-colors">Ingredients</a></li>
            <li><a href="#" className="text-emerald-100/70 hover:text-white transition-colors">Recipes</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="text-emerald-500 font-black tracking-widest uppercase text-xs">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="text-emerald-100/70 hover:text-white transition-colors">Our Story</a></li>
            <li><a href="#" className="text-emerald-100/70 hover:text-white transition-colors">Wholesale</a></li>
            <li><a href="#" className="text-emerald-100/70 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="text-emerald-500 font-black tracking-widest uppercase text-xs">Socials</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center text-emerald-200 hover:bg-emerald-500 hover:text-emerald-950 transition-all shadow-lg border border-emerald-700/50">
              <span className="material-symbols-outlined text-[20px]" data-icon="photo_camera">photo_camera</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center text-emerald-200 hover:bg-emerald-500 hover:text-emerald-950 transition-all shadow-lg border border-emerald-700/50">
              <span className="material-symbols-outlined text-[20px]" data-icon="public">public</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-emerald-500/60 text-xs font-bold tracking-widest uppercase">
      <p>© 2026 NINJIRO✧. Crafted with care.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-emerald-300 transition-colors">Privacy</a>
        <a href="#" className="hover:text-emerald-300 transition-colors">Terms</a>
        <a href="#" className="hover:text-emerald-300 transition-colors">Shipping</a>
      </div>
    </div>
  </div>
</footer>

      {/* Cart Sidebar Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 transition-opacity duration-300"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white/95 backdrop-blur-3xl z-70 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col font-poppins border-l border-emerald-900/10 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-emerald-900/10 bg-emerald-50/50">
          <h2 className="text-2xl font-black italic uppercase text-emerald-950 tracking-widest">Your Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 rounded-full bg-emerald-900/5 flex items-center justify-center text-emerald-950 hover:bg-emerald-900 hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-xl" data-icon="close">close</span>
          </button>
        </div>

        <div className="grow p-6 overflow-y-auto space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-emerald-900/30 space-y-4">
              <span className="material-symbols-outlined text-6xl opacity-50" data-icon="shopping_basket">shopping_basket</span>
              <p className="text-lg font-bold">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-emerald-900/5 shadow-sm hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-xl bg-emerald-50 flex items-center justify-center overflow-hidden shrink-0">
                  <img src={item.img} alt={item.name} className="w-12 h-12 object-contain" />
                </div>
                <div className="grow">
                  <h4 className="text-emerald-950 font-bold tracking-wider text-sm">{item.name}</h4>
                  <p className="text-emerald-600 font-bold mt-1 text-xs">{item.price}</p>
                </div>
                <div className="flex items-center bg-emerald-50 rounded-full h-8 overflow-hidden shrink-0 border border-emerald-900/5">
                  <button onClick={() => updateQuantity(item.name, -1)} className="w-8 h-full flex items-center justify-center text-emerald-950 hover:bg-emerald-100 transition-colors">
                    <span className="material-symbols-outlined text-[16px]" data-icon="remove">remove</span>
                  </button>
                  <span className="w-6 text-center text-emerald-950 text-sm font-bold">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.name, 1)} className="w-8 h-full flex items-center justify-center text-emerald-950 hover:bg-emerald-100 transition-colors">
                    <span className="material-symbols-outlined text-[16px]" data-icon="add">add</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-emerald-900/10 bg-emerald-50/50 space-y-4">
            <div className="flex justify-between items-center text-emerald-900/70">
              <span className="font-medium">Subtotal</span>
              <span className="font-black text-emerald-950 text-xl tracking-tight">₹{cartItems.reduce((acc, item) => acc + (666 * item.quantity), 0)}</span>
            </div>
            <Link href="/checkout" className="block w-full py-4 rounded-2xl bg-emerald-900 text-white font-black tracking-widest uppercase text-center hover:bg-emerald-800 active:scale-[0.98] transition-all shadow-xl shadow-emerald-900/20">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
