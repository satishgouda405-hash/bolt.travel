import { ChevronDown, Mountain, Car, Waves } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Himalayan adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-300 text-sm font-medium">Live Availability Open for 2026 Season</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
          Your Next
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            Adventure Starts Here
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Trek through the Himalayas, conquer off-road trails, or ride the rapids.
          Professional guides, real-time availability, and instant booking.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#adventures" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/25 text-lg">
            Explore Adventures
          </a>
          <a href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20book%20an%20adventure" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all text-lg backdrop-blur-sm">
            Chat on WhatsApp
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto">
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Mountain className="w-6 h-6 text-emerald-400" />
            <span className="text-white font-bold text-lg sm:text-2xl">6+</span>
            <span className="text-gray-400 text-xs sm:text-sm">Treks</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Car className="w-6 h-6 text-amber-400" />
            <span className="text-white font-bold text-lg sm:text-2xl">2</span>
            <span className="text-gray-400 text-xs sm:text-sm">Safaris</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Waves className="w-6 h-6 text-sky-400" />
            <span className="text-white font-bold text-lg sm:text-2xl">2</span>
            <span className="text-gray-400 text-xs sm:text-sm">Rafting</span>
          </div>
        </div>
      </div>

      <a href="#adventures" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/60" />
      </a>
    </section>
  );
}
