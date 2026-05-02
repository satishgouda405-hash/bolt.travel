import { MessageCircle } from 'lucide-react';

interface Props {
  phoneNumber: string;
  adventureTitle?: string;
}

export default function WhatsAppButton({ phoneNumber, adventureTitle }: Props) {
  const message = adventureTitle
    ? `Hi! I'm interested in the ${adventureTitle}. Can you share more details?`
    : 'Hi! I want to book an adventure.';

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="font-semibold text-sm hidden sm:inline">Quick Chat</span>
    </a>
  );
}
