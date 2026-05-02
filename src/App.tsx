import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdventureList from './components/AdventureList';
import AdventureDetail from './components/AdventureDetail';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import { useAdventures, useAdventureBySlug } from './hooks/useAdventures';

function App() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const { adventures, loading } = useAdventures();
  const { adventure, loading: detailLoading } = useAdventureBySlug(selectedSlug || undefined);

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedSlug && adventure) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          <AdventureDetail adventure={adventure} onBack={handleBack} />
        </div>
        <WhatsAppButton phoneNumber={adventure.whatsapp_number || '919876543210'} adventureTitle={adventure.title} />
        <Footer />
      </div>
    );
  }

  if (selectedSlug && detailLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500">Loading adventure details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <AdventureList adventures={adventures} loading={loading} onSelect={handleSelect} />
      <Footer />
      <WhatsAppButton phoneNumber="919876543210" />
    </div>
  );
}

export default App;
