import { MapPin, Navigation, Car, Brain as Train, Plane } from 'lucide-react';

interface Props {
  location: string;
  latitude: number | null;
  longitude: number | null;
}

export default function MapSection({ location, latitude, longitude }: Props) {
  const googleMapsUrl = latitude && longitude
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-emerald-600" />
        <h3 className="font-bold text-slate-900 text-lg">How to Reach</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 min-h-[300px] flex items-center justify-center">
          {latitude && longitude ? (
            <iframe
              src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=12&output=embed`}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
              className="w-full h-[300px]"
            />
          ) : (
            <div className="text-center text-gray-500 p-8">
              <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Map loading...</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-emerald-600" />
              </span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Meeting Point</p>
                <p className="text-gray-500 text-sm">{location}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                <Navigation className="w-4 h-4 text-sky-600" />
              </span>
              <p className="font-semibold text-slate-800 text-sm">Getting There</p>
            </div>
            <div className="space-y-2 ml-11">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Car className="w-4 h-4 text-gray-400" />
                <span>Drive from nearest city (directions shared on booking)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Train className="w-4 h-4 text-gray-400" />
                <span>Nearest railway station details provided</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Plane className="w-4 h-4 text-gray-400" />
                <span>Nearest airport info included in booking confirmation</span>
              </div>
            </div>
          </div>

          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors text-sm"
            >
              <Navigation className="w-4 h-4" />
              Get Directions on Google Maps
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
