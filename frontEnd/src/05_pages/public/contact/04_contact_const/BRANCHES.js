import {
  Talabat_Logo,
  Careem_Logo,
  Deliveroo_Logo,
  Noon_Logo,
  Keeta_Logo,
} from "../../../../01_assets/_assets.index.js";
import { KITCHEN_SLUG } from "../../kitchens/04_kitchens_const/KITCHEN_SLUG.js";

// Each kitchen carries two Google links:
// - googleMapsLink: the map pin the "Directions" buttons open.
// - googleListingLink: the kitchen's own "Vkusno Russian Kitchen" listing on
//   Google. No button uses it. Only the hidden business record reads it
//   (04_hlprs/jsonLd.js), so Google can tell that the kitchen page and the
//   listing are the same place. The number after cid= is the listing's own
//   id and stays the same when the listing's details change. Arjan, Marina
//   and SOL Avenue show an address there; Cuisinette and DSO are
//   delivery-only listings, so Google hides theirs.
const BRANCHES = [
  {
    id: "arjan",
    slug: KITCHEN_SLUG.arjan,
    name: {
      en: "Arjan",
      ru: "Арджан",
      ar: "أرجان",
    },
    location: {
      address: {
        en: "Rose Palace Residences, Arjan, Shop 19",
        ru: "Rose Palace Residences, Арджан, магазин 19",
        ar: "روز بالاس ريزيدنسز، أرجان، محل 19",
      },
      googleMapsLink: "https://maps.app.goo.gl/FC3oBdAUzxtjvCGGA",
      googleListingLink: "https://www.google.com/maps?cid=6431851529121558702",
      coordinates: {
        latitude: 25.0675273075463,
        longitude: 55.233676605285098,
      },
    },
    timing: {
      is24Hours: true,
      openTime: null,
      closeTime: null,
    },
    aggregators: [
      {
        name: "Talabat",
        logo: Talabat_Logo,
        link: "https://www.talabat.com/uae/vkusno-russian-kitchen",
      },
      {
        name: "Careem",
        logo: Careem_Logo,
        link: "https://link.careem.com/hGNRxUDIQGDqX",
      },
      {
        name: "Deliveroo",
        logo: Deliveroo_Logo,
        link: "https://deliveroo.ae/menu/dubai/south-barsha-arjan/vkusno-russian-kitchen-dubai-south-barsha?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share",
      },
      {
        name: "Noon",
        logo: Noon_Logo,
        link: "https://food.noon.com/en-ae/outlet/VKSNRSV1FH",
      },
      {
        name: "Keeta",
        logo: Keeta_Logo,
        link: "https://url-eu.mykeeta.com/ehRjhhxz",
      },
    ],
  },
  {
    id: "marina",
    slug: KITCHEN_SLUG.marina,
    name: {
      en: "Dubai Marina",
      ru: "Дубай Марина",
      ar: "دبي مارينا",
    },
    location: {
      address: {
        en: "Marsa Dubai - Dubai Marina - Dubai",
        ru: "Марса Дубай - Дубай Марина - Дубай",
        ar: "مرسى دبي - دبي مارينا - دبي",
      },
      googleMapsLink: "https://maps.app.goo.gl/9cureScPsEri3YWS6",
      googleListingLink: "https://www.google.com/maps?cid=16493697892326585397",
      coordinates: {
        latitude: 25.0793896378215,
        longitude: 55.142703638096002,
      },
    },
    timing: {
      is24Hours: true,
      openTime: null,
      closeTime: null,
    },
    aggregators: [
      {
        name: "Talabat",
        logo: Talabat_Logo,
        link: "https://www.talabat.com/uae/vkusno-russian-kitchen",
      },
      {
        name: "Careem",
        logo: Careem_Logo,
        link: "https://link.careem.com/c6GwllBNioQiL",
      },
      {
        name: "Deliveroo",
        logo: Deliveroo_Logo,
        link: "https://deliveroo.ae/menu/dubai/marina/vkusno-russian-kitchen-dubai-marina?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share",
      },
      {
        name: "Noon",
        logo: Noon_Logo,
        link: "https://food.noon.com/en-ae/outlet/VKSNRSUPWK",
      },
      {
        name: "Keeta",
        logo: Keeta_Logo,
        link: "https://url-eu.mykeeta.com/oVkSlSkz",
      },
    ],
  },
  {
    id: "bbSolAvenue",
    slug: KITCHEN_SLUG.bbSolAvenue,
    name: {
      en: "Business Bay - SOL Avenue",
      ru: "Бизнес-Бэй - Sol Avenue",
      ar: "بيزنس باي - سول أفينيو",
    },
    location: {
      address: {
        en: "Sol Avenue - Business Bay - Dubai",
        ru: "Sol Avenue - Бизнес-Бэй - Дубай",
        ar: "سول أفينيو - بيزنس باي - دبي",
      },
      googleMapsLink: "https://maps.app.goo.gl/qzprpsttPoS2EAQH8",
      googleListingLink: "https://www.google.com/maps?cid=14670895118951301114",
      coordinates: {
        latitude: 25.179827838664799,
        longitude: 55.274647248169302,
      },
    },
    timing: {
      is24Hours: false,
      openTime: "07:00",
      closeTime: "23:00",
    },
    aggregators: [
      {
        name: "Talabat",
        logo: Talabat_Logo,
        link: "https://www.talabat.com/uae/vkusno-russian-kitchendh-kitchensol-business-bay",
      },
    ],
  },
  {
    id: "bbCuisinette",
    slug: KITCHEN_SLUG.bbCuisinette,
    name: {
      en: "Business Bay - Cuisinette",
      ru: "Бизнес-Бэй - Cuisinette",
      ar: "بيزنس باي - كويزينيت",
    },
    location: {
      address: {
        en: "Marasi Dr - Business Bay - Dubai",
        ru: "Мараси Драйв - Бизнес-Бэй - Дубай",
        ar: "شارع مراسي - بيزنس باي - دبي",
      },
      googleMapsLink: "https://maps.app.goo.gl/HhooNnxAnfo2pFMj7",
      googleListingLink: "https://www.google.com/maps?cid=11368663613142301572",
      coordinates: {
        latitude: 25.1892761497006,
        longitude: 55.269606593921999,
      },
    },
    timing: {
      is24Hours: true,
      openTime: null,
      closeTime: null,
    },
    aggregators: [
      {
        name: "Careem",
        logo: Careem_Logo,
        link: "https://link.careem.com/DZuSNM9UDT7Fc",
      },
      {
        name: "Deliveroo",
        logo: Deliveroo_Logo,
        link: "https://deliveroo.ae/menu/dubai/dubai-business-bay/vkusno-russian-kitchen-business-bay?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share",
      },
      {
        name: "Noon",
        logo: Noon_Logo,
        link: "https://food.noon.com/en-ae/outlet/VKSNRSS182",
      },
      {
        name: "Keeta",
        logo: Keeta_Logo,
        link: "https://url-eu.mykeeta.com/0SVGJ78z",
      },
    ],
  },
  {
    id: "dso",
    slug: KITCHEN_SLUG.dso,
    name: {
      en: "Dubai Silicon Oasis (DSO)",
      ru: "Дубай Силикон Оазис (DSO)",
      ar: "واحة دبي للسيليكون (DSO)",
    },
    location: {
      address: {
        en: "Nadd Hessa - Dubai Silicon Oasis - Dubai",
        ru: "Надд Хесса - Дубай Силикон Оазис - Дубай",
        ar: "ند حصة - واحة دبي للسيليكون - دبي",
      },
      googleMapsLink: "https://maps.app.goo.gl/QmCkv4KTTSAMV9mN6",
      googleListingLink: "https://www.google.com/maps?cid=6720279363841937002",
      coordinates: {
        latitude: 25.128185885366602,
        longitude: 55.392207824603503,
      },
    },
    timing: {
      is24Hours: false,
      openTime: "07:00",
      closeTime: "23:00",
    },
    aggregators: [
      {
        name: "Talabat",
        logo: Talabat_Logo,
        link: "https://www.talabat.com/uae/vkusno-russian-kitchen",
      },
      {
        name: "Careem",
        logo: Careem_Logo,
        link: "https://link.careem.com/cMrAPjOuWPyeD",
      },
      {
        name: "Deliveroo",
        logo: Deliveroo_Logo,
        link: "https://deliveroo.ae/menu/dubai/silicon-oasis/vkusno-russian-kitchen-dubai-silicon-oasis?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share",
      },
      {
        name: "Noon",
        logo: Noon_Logo,
        link: "https://food.noon.com/en-ae/outlet/VKSNRS0PYF",
      },
      {
        name: "Keeta",
        logo: Keeta_Logo,
        link: "https://url-eu.mykeeta.com/xFE7lMPz",
      },
    ],
  },
];

export { BRANCHES };
