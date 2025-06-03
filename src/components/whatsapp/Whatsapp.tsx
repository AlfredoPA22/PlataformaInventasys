// components/WhatsAppBubble.tsx
import { MessageCircle } from "lucide-react";

const WhatsAppBubble = () => {
  const phoneNumber = "59169040342"; // cambia esto por tu número real
  const message = "Hola, quiero más información sobre Inventasys.";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
      title="Chatea con nosotros por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppBubble;
