import { useState, useEffect } from 'react';
import { Menu, X, Mountain } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'Adventures', href: '#adventures' },
    { label: 'Safety', href: '#safety' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#hero" className="flex items-center gap-2 group">
            <Mountain className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            <span className="text-xl font-bold text-white tracking-tight">
              Summit<span className="text-emerald-400">Trails</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-gray-300 hover:text-emerald-400 transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#adventures" className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-lg transition-colors">
              Book Now
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 text-gray-300 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#adventures" onClick={() => setOpen(false)} className="block px-4 py-3 text-center bg-emerald-500 text-white font-semibold rounded-lg mt-2">
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
