import { Phone, Mail, MessageCircle } from "lucide-react";

// Source: context/Details - Copy.xlsx ("Socials" sheet).
const PHONE_NUMBER = "+971 52 102 5674";
const EMAIL_ADDRESS = "info@vkusno.ae";

const CONTACT_INFO = [
  {
    name: "phone",
    icon: Phone,
    label: PHONE_NUMBER,
    link: `tel:${PHONE_NUMBER.replace(/\s/g, "")}`,
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    label: PHONE_NUMBER,
    link: `https://wa.me/${PHONE_NUMBER.replace(/\D/g, "")}`,
  },
  {
    name: "email",
    icon: Mail,
    label: EMAIL_ADDRESS,
    link: `mailto:${EMAIL_ADDRESS}`,
  },
];

export { CONTACT_INFO };
