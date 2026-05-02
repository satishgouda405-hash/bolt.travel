import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import type { AdventureImage } from '../lib/types';

interface Props {
  images: AdventureImage[];
}

export default function AdventureGallery({ images }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (images.length === 0) return null;

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () => setLightbox(lightbox !== null ? (lightbox - 1 + images.length) % images.length : null);
  const next = () => setLightbox(lightbox !== null ? (lightbox + 1) % images.length : null);

  return (
    <>
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Camera className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-lg">Adventure Gallery</h3>
          <span className="text-sm text-gray-500">({images.length} photos)</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => open(i)}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto md:min-h-[320px]' : 'aspect-square'
              }`}
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-4 py-2 bg-white/90 rounded-lg text-sm font-medium text-slate-900">View</span>
              </div>
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs">{img.caption}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={close}>
          <button onClick={close} className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10">
            <X className="w-8 h-8" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors z-10">
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors z-10">
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="max-w-5xl max-h-[85vh] px-16" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightbox].url}
              alt={images[lightbox].caption}
              className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg"
            />
            {images[lightbox].caption && (
              <p className="text-center text-white/70 text-sm mt-4">{images[lightbox].caption}</p>
            )}
            <p className="text-center text-white/40 text-xs mt-2">{lightbox + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
