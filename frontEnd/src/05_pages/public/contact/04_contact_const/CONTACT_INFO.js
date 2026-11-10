import { Phone, Mail, MessageCircle } from "lucide-react";
import {
  PUBLIC_EMAIL,
  PUBLIC_PHONE,
} from "./publicIdentity.js";

const CONTACT_INFO = [
  {
    name: "phone",
    icon: Phone,
    label: PUBLIC_PHONE,
    link: `tel:${PUBLIC_PHONE.replace(/\s/g, "")}`,
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    label: PUBLIC_PHONE,
    link: `https://wa.me/${PUBLIC_PHONE.replace(/\D/g, "")}`,
  },
  {
    name: "email",
    icon: Mail,
    label: PUBLIC_EMAIL,
    link: `mailto:${PUBLIC_EMAIL}`,
  },
];

export { CONTACT_INFO };
