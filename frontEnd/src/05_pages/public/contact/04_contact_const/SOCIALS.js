import {
  Instagram_logo,
  Facebook_logo,
  linkedIn_logo,
} from "../../../../01_assets/_assets.index.js";
import { PUBLIC_FACEBOOK, PUBLIC_INSTAGRAM } from "./publicIdentity.js";

const SOCIALS = [
  {
    name: "Instagram",
    logo: Instagram_logo,
    link: PUBLIC_INSTAGRAM,
  },
  {
    name: "Facebook",
    logo: Facebook_logo,
    link: PUBLIC_FACEBOOK,
  },
  {
    name: "LinkedIn",
    logo: linkedIn_logo,
    link: "https://www.linkedin.com/company/vkusnorussiankitchen/?viewAsMember=true",
  },
];

export { SOCIALS };
