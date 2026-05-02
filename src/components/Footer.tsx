import { Mountain, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-7 h-7 text-emerald-400" />
              <span className="text-xl font-bold text-white">Summit<span className="text-emerald-400">Trails</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Professional outdoor adventures in the Indian Himalayas. Trekking, Jeep Safaris, and White Water Rafting with certified guides, live availability, and instant booking.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>info@summittrails.in</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Dehradun, Uttarakhand, India</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Adventures</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Kedarkantha Trek</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Valley of Flowers</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Spiti Valley Safari</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Ladakh Safari</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Rishikesh Rafting</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Zanskar Expedition</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Safety Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; 2026 SummitTrails. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Payments powered by Razorpay</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <span>SSL Secured</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
