import {
  Talabat_Logo,
  Careem_Logo,
  Deliveroo_Logo,
  Noon_Logo,
  Keeta_Logo,
} from "../../../../01_assets/_assets.index.js";

// Source: context/Details - Copy.xlsx ("Branches" sheet).
// ru/ar branch names are a first draft translation — flagged for the
// client to confirm/correct, per the plan.
//
// aggregators: only aggregators actually offered at a branch are listed.
// "http://localhost:5173" is a placeholder for storefront URLs that
// haven't been provided yet — swap in the real link when available.
const BRANCHES = [
  {
    id: "arjan",
    name: {
      en: "Arjan",
      ru: "Арджан",
      ar: "أرجان",
    },
    location: {
      address: "Rose Palace Residences, Arjan, Shop 19",
      googleMapsLink: "https://maps.app.goo.gl/FC3oBdAUzxtjvCGGA",
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
      { name: "Careem", logo: Careem_Logo, link: "http://localhost:5173" },
      { name: "Deliveroo", logo: Deliveroo_Logo, link: "http://localhost:5173" },
      { name: "Noon", logo: Noon_Logo, link: "http://localhost:5173" },
      { name: "Keeta", logo: Keeta_Logo, link: "http://localhost:5173" },
    ],
  },
  {
    id: "marina",
    name: {
      en: "Dubai Marina",
      ru: "Дубай Марина",
      ar: "دبي مارينا",
    },
    location: {
      address: "Marsa Dubai - Dubai Marina - Dubai",
      googleMapsLink: "https://maps.app.goo.gl/9cureScPsEri3YWS6",
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
      { name: "Careem", logo: Careem_Logo, link: "http://localhost:5173" },
      { name: "Deliveroo", logo: Deliveroo_Logo, link: "http://localhost:5173" },
      { name: "Noon", logo: Noon_Logo, link: "http://localhost:5173" },
      { name: "Keeta", logo: Keeta_Logo, link: "http://localhost:5173" },
    ],
  },
  {
    id: "bbSolAvenue",
    name: {
      en: "Business Bay — SOL Avenue",
      ru: "Бизнес-Бэй — Sol Avenue",
      ar: "بيزنس باي - سول أفينيو",
    },
    location: {
      address: "Sol Avenue - Business Bay - Dubai",
      googleMapsLink: "https://maps.app.goo.gl/qzprpsttPoS2EAQH8",
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
    name: {
      en: "Business Bay — Cuisinette",
      ru: "Бизнес-Бэй — Cuisinette",
      ar: "بيزنس باي - كويزينيت",
    },
    location: {
      address: "Marasi Dr - Business Bay - Dubai",
      googleMapsLink: "https://maps.app.goo.gl/HhooNnxAnfo2pFMj7",
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
      { name: "Careem", logo: Careem_Logo, link: "http://localhost:5173" },
      { name: "Deliveroo", logo: Deliveroo_Logo, link: "http://localhost:5173" },
      { name: "Noon", logo: Noon_Logo, link: "http://localhost:5173" },
      { name: "Keeta", logo: Keeta_Logo, link: "http://localhost:5173" },
    ],
  },
  {
    id: "dso",
    name: {
      en: "Dubai Silicon Oasis (DSO)",
      ru: "Дубай Силикон Оазис (DSO)",
      ar: "واحة دبي للسيليكون (DSO)",
    },
    location: {
      address: "Nadd Hessa - Dubai Silicon Oasis - Dubai",
      googleMapsLink: "https://maps.app.goo.gl/QmCkv4KTTSAMV9mN6",
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
      { name: "Careem", logo: Careem_Logo, link: "http://localhost:5173" },
      { name: "Deliveroo", logo: Deliveroo_Logo, link: "http://localhost:5173" },
      { name: "Noon", logo: Noon_Logo, link: "http://localhost:5173" },
      { name: "Keeta", logo: Keeta_Logo, link: "http://localhost:5173" },
    ],
  },
];

export { BRANCHES };
