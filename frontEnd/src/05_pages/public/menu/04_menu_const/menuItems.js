// Auto-generated from the source files in this folder:
//   - Real_Menu_Items.xlsx            -> names (EN/RU/AR), prices, categories, AR descriptions
//   - Menu Items By Categories/**     -> short + long descriptions (EN/RU)
//   Long descriptions live in public/locales/{lng}/MenuItems.json, keyed by
//   item id - ~95 KB across three languages, rendered only in the dish
//   detail, so bundling all three here made every page pay for them.
//   AR long descriptions were written from the EN source (they previously
//   duplicated the AR short description on all 70 items)., ingredients, nutrition
//   - menuItems/menuItemExports.js    -> thumbnail (100x100) and full (1200x900) photos
//
// Prices are in AED. 70 active items across 13 categories.
//
// `slug` is the URL segment for /{lang}/menu/{slug}. One per language so a
// Russian reader gets /ru/menu/pelmeni-s-myasom rather than an English path.
// Arabic slugs are Latin transliterations, not Arabic script: these links get
// pasted into WhatsApp, where percent-encoded Arabic renders as garbage.

import {
  scrambledEggsCard,
  scrambledEggsCard2x,
  scrambledEggsFull,
  omeletteCard,
  omeletteCard2x,
  omeletteFull,
  pancakesWithCondensedMilkCard,
  pancakesWithCondensedMilkCard2x,
  pancakesWithCondensedMilkFull,
  pancakesWithJamCard,
  pancakesWithJamCard2x,
  pancakesWithJamFull,
  ryeBreadJamCard,
  ryeBreadJamCard2x,
  ryeBreadJamFull,
  ricePorridgeCard,
  ricePorridgeCard2x,
  ricePorridgeFull,
  buckwheatPorridgeCard,
  buckwheatPorridgeCard2x,
  buckwheatPorridgeFull,
  oatmealPorridgeCard,
  oatmealPorridgeCard2x,
  oatmealPorridgeFull,
  assortedPicklesCard,
  assortedPicklesCard2x,
  assortedPicklesFull,
  holodecCard,
  holodecCard2x,
  holodecFull,
  eggplantRollsCard,
  eggplantRollsCard2x,
  eggplantRollsFull,
  russianBorschtCard,
  russianBorschtCard2x,
  russianBorschtFull,
  chickenNoodlesSoupCard,
  chickenNoodlesSoupCard2x,
  chickenNoodlesSoupFull,
  meatballSoupCard,
  meatballSoupCard2x,
  meatballSoupFull,
  okroshkaCard,
  okroshkaCard2x,
  okroshkaFull,
  solyankaCard,
  solyankaCard2x,
  solyankaFull,
  russianOlivierSaladCard,
  russianOlivierSaladCard2x,
  russianOlivierSaladFull,
  vinegretCard,
  vinegretCard2x,
  vinegretFull,
  russianHerringSaladShubaCard,
  russianHerringSaladShubaCard2x,
  russianHerringSaladShubaFull,
  shakarobCard,
  shakarobCard2x,
  shakarobFull,
  uzbekAchichukCard,
  uzbekAchichukCard2x,
  uzbekAchichukFull,
  carrotSaladCard,
  carrotSaladCard2x,
  carrotSaladFull,
  greekSaladCard,
  greekSaladCard2x,
  greekSaladFull,
  spicySteakSaladCard,
  spicySteakSaladCard2x,
  spicySteakSaladFull,
  bakedRussianPieWithCabbageCard,
  bakedRussianPieWithCabbageCard2x,
  bakedRussianPieWithCabbageFull,
  beetrootSaladCard,
  beetrootSaladCard2x,
  beetrootSaladFull,
  bakedRussianPieWithPotatoAndMushroomCard,
  bakedRussianPieWithPotatoAndMushroomCard2x,
  bakedRussianPieWithPotatoAndMushroomFull,
  samsaWithMeatCard,
  samsaWithMeatCard2x,
  samsaWithMeatFull,
  bunsWithJamCard,
  bunsWithJamCard2x,
  bunsWithJamFull,
  bakedHotDogCard,
  bakedHotDogCard2x,
  bakedHotDogFull,
  vatrushkaCard,
  vatrushkaCard2x,
  vatrushkaFull,
  russianPancakesWithBeefCard,
  russianPancakesWithBeefCard2x,
  russianPancakesWithBeefFull,
  russianPancakesWithMushroomCard,
  russianPancakesWithMushroomCard2x,
  russianPancakesWithMushroomFull,
  varenikiWithPotatoCard,
  varenikiWithPotatoCard2x,
  varenikiWithPotatoFull,
  pelmeniWithMeatCard,
  pelmeniWithMeatCard2x,
  pelmeniWithMeatFull,
  dranikiCard,
  dranikiCard2x,
  dranikiFull,
  mantiWithMeatCard,
  mantiWithMeatCard2x,
  mantiWithMeatFull,
  cheburekWithMeatCard,
  cheburekWithMeatCard2x,
  cheburekWithMeatFull,
  beefCutletsCard,
  beefCutletsCard2x,
  beefCutletsFull,
  chickenCutletsCard,
  chickenCutletsCard2x,
  chickenCutletsFull,
  uzbekBeefPlovCard,
  uzbekBeefPlovCard2x,
  uzbekBeefPlovFull,
  cabbageRollsWithRiceAndMincedMeatCard,
  cabbageRollsWithRiceAndMincedMeatCard2x,
  cabbageRollsWithRiceAndMincedMeatFull,
  hotPanCard,
  hotPanCard2x,
  hotPanFull,
  beefStroganoffCard,
  beefStroganoffCard2x,
  beefStroganoffFull,
  chickenKievCard,
  chickenKievCard2x,
  chickenKievFull,
  napoleonCard,
  napoleonCard2x,
  napoleonFull,
  honeyCakeCard,
  honeyCakeCard2x,
  honeyCakeFull,
  russianPancakesWithCottageCheeseCard,
  russianPancakesWithCottageCheeseCard2x,
  russianPancakesWithCottageCheeseFull,
  syrnikiCard,
  syrnikiCard2x,
  syrnikiFull,
  chickenSkewerCard,
  chickenSkewerCard2x,
  chickenSkewerFull,
  beefSkewerCard,
  beefSkewerCard2x,
  beefSkewerFull,
  lambSkewerCard,
  lambSkewerCard2x,
  lambSkewerFull,
  // mixedGrillFull,
  buckwheatCard,
  buckwheatCard2x,
  buckwheatFull,
  lyulyaKebabCard,
  lyulyaKebabCard2x,
  lyulyaKebabFull,
  // lambChopsFull,
  boiledRiceCard,
  boiledRiceCard2x,
  boiledRiceFull,
  grilledVegetableCard,
  grilledVegetableCard2x,
  grilledVegetableFull,
  sweetPotatoFriesCard,
  sweetPotatoFriesCard2x,
  sweetPotatoFriesFull,
  mashedPotatoesCard,
  mashedPotatoesCard2x,
  mashedPotatoesFull,
  frenchFriesCard,
  frenchFriesCard2x,
  frenchFriesFull,
  homeStylePotatoWithMushroomCard,
  homeStylePotatoWithMushroomCard2x,
  homeStylePotatoWithMushroomFull,
  uzbekFlatbreadCard,
  uzbekFlatbreadCard2x,
  uzbekFlatbreadFull,
  adjikaSauceCard,
  adjikaSauceCard2x,
  adjikaSauceFull,
  houseSpecialSauceCard,
  houseSpecialSauceCard2x,
  houseSpecialSauceFull,
  mustardSauceCard,
  mustardSauceCard2x,
  mustardSauceFull,
  tomatoGarlicSauceCard,
  tomatoGarlicSauceCard2x,
  tomatoGarlicSauceFull,
  raspberryMorsCard,
  raspberryMorsCard2x,
  raspberryMorsFull,
  cranberyMorsCard,
  cranberyMorsCard2x,
  cranberyMorsFull,
} from "../../../../01_assets/_assets.index.js";

export const ScrambledEggs = {
  id: 1,
  slug: {
    en: "scrambled-eggs",
    ru: "yaichnitsa",
    ar: "bayd-makhfuq",
  },
  name: {
    en: "Scrambled Eggs",
    ar: "بيض مخفوق",
    ru: "Яичница",
  },
  categories: [{ en: "Breakfast", ar: "الفطور", ru: "Завтраки" }],
  description: {
    short: {
      en: "Creamy scrambled eggs on rye toast.",
      ar: "بيض مخفوق هش على خبز الجاودار الشهي.",
      ru: "Нежная яичница-скрэмбл на ржаном тосте.",
    },
  },
  price: 33,
  images: {
    card: scrambledEggsCard,
    card2x: scrambledEggsCard2x,
    full: scrambledEggsFull,
  },
  nutrition: {
    calories: 320,
    protein: 14,
    fat: 23,
    carbs: 18,
  },
  ingredients: [
    "Egg",
    "Cooking cream",
    "Unsalted butter",
    "Salt (Est.)",
    "Black pepper (Est.)",
    "Rye bread slice",
  ],
};

export const Omelette = {
  id: 2,
  slug: {
    en: "omelette",
    ru: "omlet",
    ar: "omlet",
  },
  name: {
    en: "Omelette",
    ar: "أومليت",
    ru: "Омлет",
  },
  categories: [{ en: "Breakfast", ar: "الفطور", ru: "Завтраки" }],
  description: {
    short: {
      en: "Fluffy omelette with tomato & onion.",
      ar: "أومليت خفيف مع البصل والطماطم.",
      ru: "Пышный омлет с томатом и луком.",
    },
  },
  price: 33,
  images: {
    card: omeletteCard,
    card2x: omeletteCard2x,
    full: omeletteFull,
  },
  nutrition: {
    calories: 345,
    protein: 16,
    fat: 23,
    carbs: 20,
  },
  ingredients: [
    "Egg",
    "Cooking cream",
    "Tomato, diced",
    "Onion, diced",
    "Unsalted butter",
    "Salt (Est.)",
    "Black pepper (Est.)",
    "Rye bread slice",
  ],
};

export const PancakesWithCondensedMilk = {
  id: 3,
  slug: {
    en: "pancakes-with-condensed-milk",
    ru: "bliny-so-sgushchenkoy",
    ar: "fatair-bil-halib-al-mukathaf",
  },
  name: {
    en: "Pancakes with Condensed Milk",
    ar: "فطائر بالحليب المكثف",
    ru: "Блины со сгущенкой",
  },
  categories: [{ en: "Breakfast", ar: "الفطور", ru: "Завтраки" }],
  description: {
    short: {
      en: "Thin crêpes with condensed milk.",
      ar: "ثلاث فطائر مع حليب مكثف محلى.",
      ru: "Тонкие блины со сгущёнкой.",
    },
  },
  price: 27,
  images: {
    card: pancakesWithCondensedMilkCard,
    card2x: pancakesWithCondensedMilkCard2x,
    full: pancakesWithCondensedMilkFull,
  },
  nutrition: {
    calories: 710,
    protein: 25,
    fat: 27,
    carbs: 94,
  },
  ingredients: [
    "All-purpose flour",
    "Whole milk",
    "Egg",
    "Sunflower oil",
    "Unsalted butter",
    "Salt (Est.)",
    "Sweetened condensed milk",
  ],
};

export const PancakesWithJam = {
  id: 4,
  slug: {
    en: "pancakes-with-jam",
    ru: "bliny-s-dzhemom",
    ar: "fatair-bil-murabba",
  },
  name: {
    en: "Pancakes with Jam",
    ar: "فطائر بالمربى",
    ru: "Блины с джемом",
  },
  categories: [{ en: "Breakfast", ar: "الفطور", ru: "Завтраки" }],
  description: {
    short: {
      en: "Thin crêpes with berry jam.",
      ar: "ثلاث فطائر مع مربى حلو.",
      ru: "Тонкие блины с ягодным джемом.",
    },
  },
  price: 29,
  images: {
    card: pancakesWithJamCard,
    card2x: pancakesWithJamCard2x,
    full: pancakesWithJamFull,
  },
  nutrition: {
    calories: 680,
    protein: 20,
    fat: 22,
    carbs: 98,
  },
  ingredients: ["Pancakes (3 pcs)", "Berry jam"],
};

export const RyeBreadJam = {
  id: 5,
  slug: {
    en: "rye-bread-jam",
    ru: "rzhanoy-khleb-s-dzhemom",
    ar: "khubz-al-jawdar-bil-murabba",
  },
  name: {
    en: "Rye Bread Jam",
    ar: "خبز الجاودار بالمربى",
    ru: "Ржаной хлеб с джемом",
  },
  categories: [{ en: "Breakfast", ar: "الفطور", ru: "Завтраки" }],
  description: {
    short: {
      en: "Toasted rye with berry jam.",
      ar: "خبز الجاودار مع مربى التوت الأزرق محلي الصنع.",
      ru: "Ржаной тост с ягодным джемом.",
    },
  },
  price: 21,
  images: {
    card: ryeBreadJamCard,
    card2x: ryeBreadJamCard2x,
    full: ryeBreadJamFull,
  },
  nutrition: {
    calories: 255,
    protein: 6,
    fat: 3,
    carbs: 56,
  },
  ingredients: ["Rye bread", "Berry jam", "Butter (Opt.)"],
};

export const RicePorridge = {
  id: 6,
  slug: {
    en: "rice-porridge",
    ru: "risovaya-kasha",
    ar: "asidat-al-aruz",
  },
  name: {
    en: "Rice Porridge",
    ar: "عصيدة الأرز",
    ru: "Рисовая каша",
  },
  categories: [{ en: "Breakfast", ar: "الفطور", ru: "Завтраки" }],
  description: {
    short: {
      en: "Warm creamy rice porridge with honey & walnuts.",
      ar: "عصيدة أرز كريمية مع الجوز، مع اختيارك من الحليب المكثف المحلى أو العسل.",
      ru: "Тёплая рисовая каша с мёдом и орехами.",
    },
  },
  price: 26,
  images: {
    card: ricePorridgeCard,
    card2x: ricePorridgeCard2x,
    full: ricePorridgeFull,
  },
  nutrition: {
    calories: 690,
    protein: 16,
    fat: 28,
    carbs: 102,
  },
  ingredients: ["Milk", "Water (Est.)", "Rice, rinsed", "Honey", "Walnuts"],
};

export const BuckwheatPorridge = {
  id: 7,
  slug: {
    en: "buckwheat-porridge",
    ru: "grechnevaya-kasha",
    ar: "asidat-al-hinta-al-sawda",
  },
  name: {
    en: "Buckwheat Porridge",
    ar: "عصيدة الحنطة السوداء",
    ru: "Гречневая каша",
  },
  categories: [{ en: "Breakfast", ar: "الفطور", ru: "Завтраки" }],
  description: {
    short: {
      en: "Creamy buckwheat porridge with honey & nuts.",
      ar: "عصيدة حنطة سوداء شهية مع الجوز، مع اختيارك من الحليب المكثف المحلى أو العسل.",
      ru: "Кремовая гречневая каша с мёдом и орехами.",
    },
  },
  price: 27,
  images: {
    card: buckwheatPorridgeCard,
    card2x: buckwheatPorridgeCard2x,
    full: buckwheatPorridgeFull,
  },
  nutrition: {
    calories: 660,
    protein: 17,
    fat: 29,
    carbs: 86,
  },
  ingredients: [
    "Buckwheat groats",
    "Whole milk",
    "Water (Estimated)",
    "Honey",
    "Walnuts, chopped",
    "Salt (Estimated)",
  ],
};

export const OatmealPorridge = {
  id: 8,
  slug: {
    en: "oatmeal-porridge",
    ru: "ovsyanaya-kasha",
    ar: "asidat-al-shufan",
  },
  name: {
    en: "Oatmeal Porridge",
    ar: "عصيدة الشوفان",
    ru: "Овсяная каша",
  },
  categories: [{ en: "Breakfast", ar: "الفطور", ru: "Завтраки" }],
  description: {
    short: {
      en: "Creamy honey-walnut oatmeal porridge.",
      ar: "عصيدة شوفان ناعمة مع الجوز، مع اختيارك من الحليب المكثف المحلى أو العسل.",
      ru: "Овсяная каша с мёдом и орехами.",
    },
  },
  price: 34,
  images: {
    card: oatmealPorridgeCard,
    card2x: oatmealPorridgeCard2x,
    full: oatmealPorridgeFull,
  },
  nutrition: {
    calories: 710,
    protein: 22,
    fat: 31,
    carbs: 95,
  },
  ingredients: [
    "Rolled oats",
    "Whole milk",
    "Water (Est.)",
    "Honey",
    "Walnuts, chopped",
  ],
};

// Off the menu temporarily (expected back within the year). Commented out
// rather than deleted so its translated copy in MenuItems.json stays valid -
// same treatment as MixedGrill and LambChops below.
// export const BeefTongue = {
//   id: 9,
//   slug: {
//     en: "beef-tongue",
//     ru: "govyazhi-yazyk",
//     ar: "lisan-baqari",
//   },
//   name: {
//     en: "Beef Tongue",
//     ar: "لسان بقري",
//     ru: "Говяжьи язык",
//   },
//   categories: [
//     { en: "Cold Appetizers", ar: "المقبلات الباردة", ru: "Холодные Закуски" },
//   ],
//   description: {
//     short: {
//       en: "Tender chilled slices of beef tongue with mustard sauce on the side.",
//       ar: "لسان بقري مقطع مع صلصة الخردل الروسي.",
//       ru: "Нежные ломтики говяжьего языка с горчичным соусом.",
//     },
//   },
//   price: 38,
//   images: {
//     full: beefTongueFull,
//   },
//   nutrition: {
//     calories: 450,
//     protein: 30,
//     fat: 35,
//     carbs: 0,
//   },
//   ingredients: [
//     "Beef tongue",
//     "Onion",
//     "Garlic",
//     "Bay leaf",
//     "Black peppercorns",
//     "Carrot",
//     "Celery",
//     "Salt (Estimated)",
//     "Water (Estimated)",
//   ],
// };

export const AssortedPickles = {
  id: 10,
  slug: {
    en: "assorted-pickles",
    ru: "assorti-iz-soleniy",
    ar: "mukhallalat-mutanawwia",
  },
  name: {
    en: "Assorted Pickles",
    ar: "مخللات متنوعة",
    ru: "Ассорти из солений",
  },
  categories: [
    { en: "Cold Appetizers", ar: "المقبلات الباردة", ru: "Холодные Закуски" },
  ],
  description: {
    short: {
      en: "Plate of authentic Russian pickles.",
      ar: "ملفوف أبيض وأحمر مخلل، خيار وطماطم.",
      ru: "Ассорти хрустящих домашних солений.",
    },
  },
  price: 42,
  images: {
    card: assortedPicklesCard,
    card2x: assortedPicklesCard2x,
    full: assortedPicklesFull,
  },
  nutrition: {
    calories: 376,
    protein: 9,
    fat: 1,
    carbs: 78,
  },
  ingredients: [
    "Green apple",
    "Cucumber",
    "White cabbage",
    "Carrot",
    "Beetroot",
    "Tomato",
    "Red cabbage",
    "Water",
    "White vinegar",
    "Salt",
    "Sugar",
    "Garlic",
    "Peppercorns",
    "Fresh dill",
  ],
};

export const Holodec = {
  id: 11,
  slug: {
    en: "holodec",
    ru: "kholodets",
    ar: "holodek",
  },
  name: {
    en: "Holodec",
    ar: "هولوديك",
    ru: "Холодец",
  },
  categories: [
    { en: "Cold Appetizers", ar: "المقبلات الباردة", ru: "Холодные Закуски" },
  ],
  description: {
    short: {
      en: "Classic beef holodec in savoury meat jelly.",
      ar: "مرق لحم، فيليه بقري، بيض مسلوق وجزر مسلوق.",
      ru: "Классический говяжий холодец.",
    },
  },
  price: 42,
  images: {
    card: holodecCard,
    card2x: holodecCard2x,
    full: holodecFull,
  },
  nutrition: {
    calories: 300,
    protein: 33,
    fat: 18,
    carbs: 2,
  },
  ingredients: [
    "Beef topside",
    "Onion",
    "Carrot",
    "Garlic",
    "Bay leaf",
    "Salt (Estimated)",
    "Black pepper (Estimated)",
    "Water",
    "Gelatin (Estimated)",
  ],
};

export const EggplantRolls = {
  id: 12,
  slug: {
    en: "eggplant-rolls",
    ru: "rulety-iz-baklazhana",
    ar: "lafaif-badhinjan",
  },
  name: {
    en: "Eggplant Rolls",
    ar: "لفائف باذنجان",
    ru: "Рулеты из баклажана",
  },
  categories: [
    { en: "Cold Appetizers", ar: "المقبلات الباردة", ru: "Холодные Закуски" },
  ],
  description: {
    short: {
      en: "Smoky eggplant rolls with creamy garlic filling.",
      ar: "خمس قطع محشوة بالطماطم، البقدونس، مايونيز الثوم، صلصة الرمان والجوز.",
      ru: "Рулеты из баклажана с чесночным кремом.",
    },
  },
  price: 40,
  images: {
    card: eggplantRollsCard,
    card2x: eggplantRollsCard2x,
    full: eggplantRollsFull,
  },
  nutrition: {
    calories: 340,
    protein: 5,
    fat: 30,
    carbs: 16,
  },
  ingredients: [
    "Eggplant",
    "Garlic",
    "Mayonnaise",
    "Tomato",
    "Fresh dill (Estimated)",
    "Salt (Estimated)",
    "Black pepper (Estimated)",
    "Vegetable oil (Estimated absorbed)",
    "Pomegranate molasses (Estimated)",
    "Walnuts, crushed (Estimated)",
  ],
};

export const RussianBorscht = {
  id: 13,
  slug: {
    en: "russian-borscht",
    ru: "borshch",
    ar: "borsh-rusi",
  },
  name: {
    en: "Russian Borscht",
    ar: "بورش روسي",
    ru: "Борщ",
  },
  categories: [{ en: "Soup", ar: "الشوربات", ru: "Домашние Супы" }],
  description: {
    short: {
      en: "Hearty beef & beet borscht with dill.",
      ar: "بورش غني بلحم البقر والشمندر مع الشبت.",
      ru: "Сытный борщ с говядиной и свёклой.",
    },
  },
  price: 41,
  images: {
    card: russianBorschtCard,
    card2x: russianBorschtCard2x,
    full: russianBorschtFull,
  },
  nutrition: {
    calories: 355,
    protein: 17,
    fat: 16,
    carbs: 39,
  },
  ingredients: [
    "Beef cubes",
    "Beetroot, grated",
    "Onion, chopped",
    "Carrot, grated",
    "Potato, diced",
    "Cabbage, shredded",
    "Garlic, minced",
    "Tomato paste",
    "Water (Estimated)",
    "Bay leaf",
    "White vinegar",
    "Vegetable oil",
    "Salt (Est.)",
    "Black pepper (Est.)",
    "Fresh dill",
    "Sour cream (Opt.)",
  ],
};

export const ChickenNoodlesSoup = {
  id: 14,
  slug: {
    en: "chicken-noodles-soup",
    ru: "kurinyy-sup-s-lapshoy",
    ar: "shurbat-al-dajaj-bil-shairiya",
  },
  name: {
    en: "Chicken Noodles Soup",
    ar: "شوربة الدجاج بالشعيرية",
    ru: "Куриный суп с лапшой",
  },
  categories: [{ en: "Soup", ar: "الشوربات", ru: "Домашние Супы" }],
  description: {
    short: {
      en: "Homestyle chicken-noodle soup with dill.",
      ar: "شوربة دجاج منزلية بالشعيرية والشبت.",
      ru: "Домашний куриный суп с лапшой и укропом.",
    },
  },
  price: 37,
  images: {
    card: chickenNoodlesSoupCard,
    card2x: chickenNoodlesSoupCard2x,
    full: chickenNoodlesSoupFull,
  },
  nutrition: {
    calories: 480,
    protein: 23,
    fat: 15,
    carbs: 62,
  },
  ingredients: [
    "Name",
    "Cooking oil",
    "Onion, diced",
    "Carrot, diced",
    "Bell pepper, diced",
    "Cooked chicken, shredded",
    "Egg noodles (dry)",
    "Chicken broth (Est.)",
    "Salt (Est.)",
    "Black pepper (Est.)",
    "Fresh dill (Est.)",
  ],
};

export const MeatballSoup = {
  id: 15,
  slug: {
    en: "meatball-soup",
    ru: "sup-s-frikadelkami",
    ar: "shurbat-kurat-al-lahm",
  },
  name: {
    en: "Meatball Soup",
    ar: "شوربة كرات اللحم",
    ru: "Суп с фрикадельками",
  },
  categories: [{ en: "Soup", ar: "الشوربات", ru: "Домашние Супы" }],
  description: {
    short: {
      en: "Comforting meatball soup with vegetables & dill.",
      ar: "شوربة دافئة بكرات اللحم مع الخضار والشبت.",
      ru: "Домашний суп с фрикадельками, овощами и укропом.",
    },
  },
  price: 41,
  images: {
    card: meatballSoupCard,
    card2x: meatballSoupCard2x,
    full: meatballSoupFull,
  },
  nutrition: {
    calories: 420,
    protein: 21,
    fat: 18,
    carbs: 40,
  },
  ingredients: [
    "Cooking oil",
    "Onion, diced",
    "Carrot, diced",
    "Bell pepper, diced",
    "Potatoes, diced",
    "Beef meatballs (Est.)",
    "Beef broth (Est.)",
    "Salt (Est.)",
    "Black pepper (Est.)",
    "Fresh dill (Est.)",
  ],
};

export const Okroshka = {
  id: 16,
  slug: {
    en: "okroshka",
    ru: "okroshka",
    ar: "okroshka",
  },
  name: {
    en: "Okroshka",
    ar: "أوكروشكا",
    ru: "Окрошка",
  },
  categories: [{ en: "Soup", ar: "الشوربات", ru: "Домашние Супы" }],
  description: {
    short: {
      en: "Refreshing chilled yogurt soup with beef & dill.",
      ar: "شوربة زبادي باردة ومنعشة مع لحم البقر والشبت.",
      ru: "Освежающая окрошка с говядиной и укропом.",
    },
  },
  price: 37,
  images: {
    card: okroshkaCard,
    card2x: okroshkaCard2x,
    full: okroshkaFull,
  },
  nutrition: {
    calories: 420,
    protein: 22,
    fat: 28,
    carbs: 22,
  },
  ingredients: [
    "Potatoes, boiled, diced",
    "Boiled egg, chopped",
    "Cooked beef, diced (Est.)",
    "Cucumber, diced",
    "Fresh dill",
    "Laban (yogurt)",
    "Soda water",
    "Sour cream",
    "Salt (Est.)",
    "Black pepper (Est.)",
  ],
};

export const Solyanka = {
  id: 17,
  slug: {
    en: "solyanka",
    ru: "solyanka",
    ar: "solyanka",
  },
  name: {
    en: "Solyanka",
    ar: "سوليانكا",
    ru: "Солянка",
  },
  categories: [{ en: "Soup", ar: "الشوربات", ru: "Домашние Супы" }],
  description: {
    short: {
      en: "Tangy beef & pickle solyanka soup.",
      ar: "شوربة سوليانكا حامضة بلحم البقر والمخللات.",
      ru: "Кисло-пряная солянка с мясом и огурцами.",
    },
  },
  price: 48,
  images: {
    card: solyankaCard,
    card2x: solyankaCard2x,
    full: solyankaFull,
  },
  nutrition: {
    calories: 295,
    protein: 18,
    fat: 18,
    carbs: 14,
  },
  ingredients: [
    "Beef chuck, cubes",
    "Smoked beef sausage",
    "Smoked chicken sausage",
    "Onion, diced",
    "Pickled cucumber",
    "Olives, pitted",
    "Tomato paste",
    "Ketchup",
    "Beef stock (Est.)",
    "Fresh dill",
    "Salt (Est.)",
    "Black pepper (Est.)",
    "Lemon slice",
  ],
};

export const RussianOlivierSalad = {
  id: 18,
  slug: {
    en: "russian-olivier-salad",
    ru: "olive",
    ar: "salatat-olivye-al-rusiya",
  },
  name: {
    en: "Russian Olivier Salad",
    ar: "سلطة أوليفييه الروسية",
    ru: "Оливье",
  },
  categories: [{ en: "Salads", ar: "السلطات", ru: "Салаты" }],
  description: {
    short: {
      en: "Creamy Russian Olivier salad with beef & vegetables.",
      ar: "سلطة روسية تقليدية مع لحم، بيض مسلوق، بطاطا مسلوقة، بازلاء، مخلل، ومايونيز.",
      ru: "Классический Оливье с говядиной и овощами.",
    },
  },
  price: 38,
  images: {
    card: russianOlivierSaladCard,
    card2x: russianOlivierSaladCard2x,
    full: russianOlivierSaladFull,
  },
  nutrition: {
    calories: 540,
    protein: 28,
    fat: 38,
    carbs: 31,
  },
  ingredients: [
    "Boiled potato",
    "Boiled carrot",
    "Green peas",
    "Gherkins",
    "Cooked beef",
    "Boiled egg",
    "Mayonnaise",
    "Salt (Est.)",
    "Black pepper (Est.)",
  ],
};

export const Vinegret = {
  id: 19,
  slug: {
    en: "vinegret",
    ru: "vinegret",
    ar: "salatat-vinegret",
  },
  name: {
    en: "Vinegret",
    ar: "سلطة فينيغريت",
    ru: "Винегрет",
  },
  categories: [{ en: "Salads", ar: "السلطات", ru: "Салаты" }],
  description: {
    short: {
      en: "Colourful beet-potato vinegret with pickles.",
      ar: "سلطة روسية كلاسيكية مع شمندر مشوي وزيت دوار الشمس.",
      ru: "Яркий винегрет с овощами и соленьями.",
    },
  },
  price: 35,
  images: {
    card: vinegretCard,
    card2x: vinegretCard2x,
    full: vinegretFull,
  },
  nutrition: {
    calories: 320,
    protein: 5,
    fat: 20,
    carbs: 42,
  },
  ingredients: [
    "Boiled potato, diced",
    "Boiled carrot, diced",
    "Boiled beetroot, diced",
    "Gherkins, diced",
    "White-cabbage pickle (sauerkraut)",
    "Sunflower oil",
    "White vinegar",
    "Fresh dill (Estimated)",
    "Salt (Estimated)",
    "Black pepper (Estimated)",
  ],
};

export const RussianHerringSaladShuba = {
  id: 20,
  slug: {
    en: "russian-herring-salad-shuba",
    ru: "seld-pod-shuboy",
    ar: "salatat-al-ringa-shuba",
  },
  name: {
    en: "Russian Herring Salad - Shuba",
    ar: "سلطة الرنجة الروسية - شوبا",
    ru: "Сельдь под шубой",
  },
  categories: [{ en: "Salads", ar: "السلطات", ru: "Салаты" }],
  description: {
    short: {
      en: "Layered herring salad “Shuba” with beet & mayo.",
      ar: "شرائح رنجة مخللة، بصل مفروم ناعماً، شمندر، جزر، بطاطا، وصلصة مايونيز.",
      ru: "Слоёная «Сельдь под шубой» с майонезом.",
    },
  },
  price: 42,
  images: {
    card: russianHerringSaladShubaCard,
    card2x: russianHerringSaladShubaCard2x,
    full: russianHerringSaladShubaFull,
  },
  nutrition: {
    calories: 500,
    protein: 23,
    fat: 34,
    carbs: 32,
  },
  ingredients: [
    "Herring fillet",
    "Boiled potato",
    "Boiled beetroot",
    "Boiled carrot",
    "Boiled egg",
    "Mayonnaise",
    "Salt",
  ],
};

export const Shakarob = {
  id: 21,
  slug: {
    en: "shakarob",
    ru: "shakarob",
    ar: "shakarob",
  },
  name: {
    en: "Shakarob",
    ar: "شاكاروب",
    ru: "Шакароб",
  },
  categories: [{ en: "Salads", ar: "السلطات", ru: "Салаты" }],
  description: {
    short: {
      en: "Refreshing Uzbek shakarob of cucumber, tomato & onion.",
      ar: "طماطم، خيار، بصل، وأعشاب طازجة.",
      ru: "Освежающий узбекский Шакароб из огурцов, помидоров и лука.",
    },
  },
  price: 27,
  images: {
    card: shakarobCard,
    card2x: shakarobCard2x,
    full: shakarobFull,
  },
  nutrition: {
    calories: 345,
    protein: 3,
    fat: 30,
    carbs: 18,
  },
  ingredients: [
    "Cucumber",
    "Tomato",
    "Onion",
    "Fresh dill",
    "Olive oil",
    "White vinegar",
    "Salt (Estimated)",
    "Black pepper (Estimated)",
  ],
};

export const UzbekAchichuk = {
  id: 22,
  slug: {
    en: "uzbek-achichuk",
    ru: "achichuk",
    ar: "achichuk-uzbaki",
  },
  name: {
    en: "Uzbek Achichuk",
    ar: "أتشيتشوك الأوزبكي",
    ru: "Ачичук",
  },
  categories: [{ en: "Salads", ar: "السلطات", ru: "Салаты" }],
  description: {
    short: {
      en: "Spicy Uzbek tomato-cucumber salad.",
      ar: "بصل وطماطم.",
      ru: "Острый узбекский салат из томатов и огурцов.",
    },
  },
  price: 28,
  images: {
    card: uzbekAchichukCard,
    card2x: uzbekAchichukCard2x,
    full: uzbekAchichukFull,
  },
  nutrition: {
    calories: 55,
    protein: 2,
    fat: 0,
    carbs: 12,
  },
  ingredients: [
    "Tomato, sliced",
    "Cucumber, sliced",
    "Onion, sliced",
    "Fresh chili, rings",
    "Salt (Estimated)",
  ],
};

export const CarrotSalad = {
  id: 23,
  slug: {
    en: "carrot-salad",
    ru: "salat-iz-morkovi",
    ar: "salatat-al-jazar",
  },
  name: {
    en: "Carrot Salad",
    ar: "سلطة الجزر",
    ru: "Салат из моркови",
  },
  categories: [{ en: "Salads", ar: "السلطات", ru: "Салаты" }],
  description: {
    short: {
      en: "Crisp carrot salad with coriander & vinegar.",
      ar: "سلطة جزر متبلة حارة.",
      ru: "Хрустящий морковный салат с кориандром.",
    },
  },
  price: 26,
  images: {
    card: carrotSaladCard,
    card2x: carrotSaladCard2x,
    full: carrotSaladFull,
  },
  nutrition: {
    calories: 275,
    protein: 2,
    fat: 20,
    carbs: 22,
  },
  ingredients: [
    "Carrots, grated",
    "Onion",
    "Sunflower oil",
    "White vinegar",
    "Ground coriander",
    "Salt (Estimated)",
    "Black pepper (Estimated)",
  ],
};

export const GreekSalad = {
  id: 24,
  slug: {
    en: "greek-salad",
    ru: "grecheskiy-salat",
    ar: "salata-yunaniya",
  },
  name: {
    en: "Greek Salad",
    ar: "سلطة يونانية",
    ru: "Греческий салат",
  },
  categories: [{ en: "Salads", ar: "السلطات", ru: "Салаты" }],
  description: {
    short: {
      en: "Classic Greek salad with feta & olives.",
      ar: "فلفل رومي، خيار، طماطم، بصل، وجبنة فيتا مع ليمون وزيت زيتون.",
      ru: "Классический греческий салат с фетой и оливками.",
    },
  },
  price: 32,
  images: {
    card: greekSaladCard,
    card2x: greekSaladCard2x,
    full: greekSaladFull,
  },
  nutrition: {
    calories: 290,
    protein: 8,
    fat: 20,
    carbs: 17,
  },
  ingredients: [
    "Tomato",
    "Cucumber",
    "Bell pepper",
    "Red onion (Estimated)",
    "Feta cheese",
    "Black olives",
    "Olive oil",
    "Lemon juice",
    "Dried oregano",
    "Salt (Estimated)",
    "Black pepper (Estimated)",
  ],
};

export const SpicySteakSalad = {
  id: 25,
  slug: {
    en: "spicy-steak-salad",
    ru: "ostryy-steyk-salat",
    ar: "salatat-sharaih-al-lahm-al-harra",
  },
  name: {
    en: "Spicy Steak Salad",
    ar: "سلطة شرائح اللحم الحارة",
    ru: "Острый стейк-салат",
  },
  categories: [{ en: "Salads", ar: "السلطات", ru: "Салаты" }],
  description: {
    short: {
      en: "Zesty steak salad with crisp veggies.",
      ar: "قطع خضراوات طازجة، شرائح فيليه مشوية، وصلصة الشيف.",
      ru: "Остро-пряный салат со стейком.",
    },
  },
  price: 50,
  images: {
    card: spicySteakSaladCard,
    card2x: spicySteakSaladCard2x,
    full: spicySteakSaladFull,
  },
  nutrition: {
    calories: 320,
    protein: 26,
    fat: 16,
    carbs: 22,
  },
  ingredients: [
    "Beef steak, cooked",
    "Cucumber",
    "Red bell pepper",
    "Tomato",
    "White onion",
    "Spring onion",
    "Soy sauce",
    "Sweet-chili sauce",
    "Lime juice",
    "Vegetable oil",
    "Salt (Est.)",
    "Black pepper (Est.)",
  ],
};

export const BakedRussianPieWithCabbage = {
  id: 26,
  slug: {
    en: "baked-russian-pie-with-cabbage",
    ru: "pirozhki-s-kapustoy",
    ar: "fatira-rusiya-bil-malfuf",
  },
  name: {
    en: "Baked Russian Pie With Cabbage",
    ar: "فطيرة روسية مخبوزة مع ملفوف",
    ru: "Пирожки с капустой",
  },
  categories: [{ en: "Baked Goods", ar: "المخبوزات", ru: "Выпечка" }],
  description: {
    short: {
      en: "Golden hand-pie stuffed with sweet cabbage.",
      ar: "قطعة واحدة",
      ru: "Золотистый пирожок с капустой.",
    },
  },
  price: 14,
  images: {
    card: bakedRussianPieWithCabbageCard,
    card2x: bakedRussianPieWithCabbageCard2x,
    full: bakedRussianPieWithCabbageFull,
  },
  nutrition: {
    calories: 585,
    protein: 14,
    fat: 25,
    carbs: 78,
  },
  ingredients: [
    "All-purpose flour",
    "Sugar",
    "Salt",
    "Dry yeast",
    "Baking powder",
    "Milk",
    "Vegetable oil",
    "Butter",
    "Egg",
    "White cabbage, chopped",
    "Carrot, chopped",
    "Fresh dill",
  ],
};

export const BeetrootSalad = {
  id: 27,
  slug: {
    en: "beetroot-salad",
    ru: "svekolnyy-salat",
    ar: "salatat-al-shamandar",
  },
  name: {
    en: "Beetroot Salad",
    ar: "سلطة الشمندر",
    ru: "Свекольный салат",
  },
  categories: [{ en: "Salads", ar: "السلطات", ru: "Салаты" }],
  description: {
    short: {
      en: "Vibrant beetroot salad with feta & walnuts.",
      ar: "ثوم، مايونيز، شمندر، برقوق مجفف، وجبنة فيتا.",
      ru: "Яркий свекольный салат с фетой и орехами.",
    },
  },
  price: 31,
  images: {
    card: beetrootSaladCard,
    card2x: beetrootSaladCard2x,
    full: beetrootSaladFull,
  },
  nutrition: {
    calories: 630,
    protein: 10,
    fat: 53,
    carbs: 30,
  },
  ingredients: [
    "Cooked beetroot",
    "Mayonnaise",
    "Prunes, pitted",
    "Feta cheese",
    "Walnuts, chopped",
    "Salt (Estimated)",
    "Black pepper (Estimated)",
  ],
};

export const BakedRussianPieWithPotatoAndMushroom = {
  id: 28,
  slug: {
    en: "baked-russian-pie-with-potato-and-mushroom",
    ru: "pirozhki-s-kartoshkoy-i-gribami",
    ar: "fatira-rusiya-bil-batata-wal-fitr",
  },
  name: {
    en: "Baked Russian Pie With Potato And Mushroom",
    ar: "فطيرة روسية مخبوزة مع بطاطا وفطر",
    ru: "Пирожки с картошкой и грибами",
  },
  categories: [{ en: "Baked Goods", ar: "المخبوزات", ru: "Выпечка" }],
  description: {
    short: {
      en: "Fluffy potato-mushroom hand-pie.",
      ar: "قطعة واحدة",
      ru: "Пирожок с картофелем и грибами.",
    },
  },
  price: 15,
  images: {
    card: bakedRussianPieWithPotatoAndMushroomCard,
    card2x: bakedRussianPieWithPotatoAndMushroomCard2x,
    full: bakedRussianPieWithPotatoAndMushroomFull,
  },
  nutrition: {
    calories: 380,
    protein: 9,
    fat: 14,
    carbs: 52,
  },
  ingredients: [
    "All-purpose flour",
    "Sugar",
    "Salt",
    "Dry yeast",
    "Baking powder",
    "Milk",
    "Vegetable oil",
    "Butter",
    "Egg",
    "Boiled potato, diced",
    "Cooked mushroom (Est.)",
    "Fresh dill",
  ],
};

export const SamsaWithMeat = {
  id: 29,
  slug: {
    en: "samsa-with-meat",
    ru: "samsa-iz-govyadiny",
    ar: "sambusa-bil-lahm",
  },
  name: {
    en: "Samsa With Meat",
    ar: "سمبوسة باللحم",
    ru: "Самса из говядины",
  },
  categories: [{ en: "Baked Goods", ar: "المخبوزات", ru: "Выпечка" }],
  description: {
    short: {
      en: "Flaky triangle samsa with spiced beef.",
      ar: "قطعة واحدة",
      ru: "Слоёная самса с пряной говядиной.",
    },
  },
  price: 17,
  images: {
    card: samsaWithMeatCard,
    card2x: samsaWithMeatCard2x,
    full: samsaWithMeatFull,
  },
  nutrition: {
    calories: 560,
    protein: 22,
    fat: 32,
    carbs: 49,
  },
  ingredients: [
    "All-purpose flour (Est.)",
    "Salt (Est.)",
    "Melted butter (Est.)",
    "Water (Est.)",
    "Egg, beaten (glaze)",
    "Ground beef",
    "Onion, finely chopped",
    "Ground cumin",
    "Black pepper",
  ],
};

export const BunsWithJam = {
  id: 30,
  slug: {
    en: "buns-with-jam",
    ru: "bulochka-s-dzhemom",
    ar: "khubz-bil-murabba",
  },
  name: {
    en: "Buns With Jam",
    ar: "خبز مع مربى",
    ru: "Булочка с джемом",
  },
  categories: [{ en: "Baked Goods", ar: "المخبوزات", ru: "Выпечка" }],
  description: {
    short: {
      en: "Crescent bun filled with berry jam.",
      ar: "قطعة واحدة",
      ru: "Рогалик с ягодным джемом.",
    },
  },
  price: 11,
  images: {
    card: bunsWithJamCard,
    card2x: bunsWithJamCard2x,
    full: bunsWithJamFull,
  },
  nutrition: {
    calories: 375,
    protein: 9,
    fat: 13,
    carbs: 58,
  },
  ingredients: ["Pie-dough (see above)", "Berry jam", "Egg wash"],
};

export const BakedHotDog = {
  id: 31,
  slug: {
    en: "baked-hot-dog",
    ru: "khot-dog",
    ar: "hot-dog-makhbuz",
  },
  name: {
    en: "Baked Hot Dog",
    ar: "هوت دوغ مخبوز",
    ru: "Хот-дог",
  },
  categories: [{ en: "Baked Goods", ar: "المخبوزات", ru: "Выпечка" }],
  description: {
    short: {
      en: "Soft milk-dough hot-dog roll.",
      ar: "قطعة واحدة",
      ru: "Хот-дог в мягком дрожжевом тесте.",
    },
  },
  price: 11,
  images: {
    card: bakedHotDogCard,
    card2x: bakedHotDogCard2x,
    full: bakedHotDogFull,
  },
  nutrition: {
    calories: 430,
    protein: 14,
    fat: 22,
    carbs: 45,
  },
  ingredients: [
    "All-purpose flour",
    "Sugar",
    "Salt",
    "Dry yeast",
    "Baking powder",
    "Warm milk",
    "Vegetable oil",
    "Butter, melted",
    "Egg (dough + wash)",
    "Chicken frank sausage",
  ],
};

export const Vatrushka = {
  id: 32,
  slug: {
    en: "vatrushka",
    ru: "vatrushka",
    ar: "vatrushka",
  },
  name: {
    en: "Vatrushka",
    ar: "فاتروشكا",
    ru: "Ватрушка",
  },
  categories: [{ en: "Baked Goods", ar: "المخبوزات", ru: "Выпечка" }],
  description: {
    short: {
      en: "Sweet cottage-cheese vatrushka bun.",
      ar: "قطعة واحدة",
      ru: "Сладкая ватрушка с творогом.",
    },
  },
  price: 13,
  images: {
    card: vatrushkaCard,
    card2x: vatrushkaCard2x,
    full: vatrushkaFull,
  },
  nutrition: {
    calories: 410,
    protein: 13,
    fat: 12,
    carbs: 64,
  },
  ingredients: [
    "Pie-dough round",
    "Cottage cheese",
    "Sugar",
    "Egg yolk (filling + wash)",
    "Icing sugar (opt.)",
  ],
};

export const RussianPancakesWithBeef = {
  id: 33,
  slug: {
    en: "russian-pancakes-with-beef",
    ru: "bliny-s-govyadinoy",
    ar: "fatair-rusiya-bil-lahm-al-baqari",
  },
  name: {
    en: "Russian Pancakes with Beef",
    ar: "فطائر روسية باللحم البقري",
    ru: "Блины с говядиной",
  },
  categories: [
    { en: "Hot Appetizers", ar: "المقبلات الساخنة", ru: "Горячие Закуски" },
  ],
  description: {
    short: {
      en: "Beef-filled Russian crêpes with sour cream.",
      ar: "ثلاث قطع من لحم البقر المفروم الطري، مع التوابل والبصل الذهبي.",
      ru: "Блины с говяжьей начинкой и сметаной.",
    },
  },
  price: 37,
  images: {
    card: russianPancakesWithBeefCard,
    card2x: russianPancakesWithBeefCard2x,
    full: russianPancakesWithBeefFull,
  },
  nutrition: {
    calories: 820,
    protein: 48,
    fat: 46,
    carbs: 71,
  },
  ingredients: [
    "Cooked beef",
    "All-purpose flour (Est.)",
    "Whole milk (Est.)",
    "Egg (Est.)",
    "Sunflower oil (Est.)",
    "Sugar (Est.)",
    "Salt (Est.)",
    "Butter, for frying (Est.)",
    "Sour cream, serving (Est.)",
  ],
};

export const RussianPancakesWithMushroom = {
  id: 34,
  slug: {
    en: "russian-pancakes-with-mushroom",
    ru: "bliny-s-gribami",
    ar: "fatair-rusiya-bil-fitr",
  },
  name: {
    en: "Russian Pancakes with Mushroom",
    ar: "فطائر روسية بالفطر",
    ru: "Блины с грибами",
  },
  categories: [
    { en: "Hot Appetizers", ar: "المقبلات الساخنة", ru: "Горячие Закуски" },
  ],
  description: {
    short: {
      en: "Mushroom-filled Russian crêpes with sour cream.",
      ar: "ثلاث قطع.",
      ru: "Блины с грибной начинкой и сметаной.",
    },
  },
  price: 37,
  images: {
    card: russianPancakesWithMushroomCard,
    card2x: russianPancakesWithMushroomCard2x,
    full: russianPancakesWithMushroomFull,
  },
  nutrition: {
    calories: 700,
    protein: 22,
    fat: 30,
    carbs: 75,
  },
  ingredients: [
    "Cooked mushrooms",
    "All-purpose flour (Est.)",
    "Whole milk (Est.)",
    "Egg (Est.)",
    "Sunflower oil (Est.)",
    "Sugar (Est.)",
    "Salt (Est.)",
    "Butter, for frying (Est.)",
    "Sour cream, serving (Est.)",
  ],
};

export const VarenikiWithPotato = {
  id: 35,
  slug: {
    en: "vareniki-with-potato",
    ru: "vareniki",
    ar: "vareniki-bil-batata",
  },
  name: {
    en: "Vareniki With Potato",
    ar: "فارينيكي بالبطاطا",
    ru: "Вареники",
  },
  categories: [
    { en: "Hot Appetizers", ar: "المقبلات الساخنة", ru: "Горячие Закуски" },
  ],
  description: {
    short: {
      en: "Soft potato vareniki with butter & sour cream.",
      ar: "عشر قطع من الزلابية المحشوة بالبطاطا.",
      ru: "Нежные вареники с картофелем и сметаной.",
    },
  },
  price: 40,
  images: {
    card: varenikiWithPotatoCard,
    card2x: varenikiWithPotatoCard2x,
    full: varenikiWithPotatoFull,
  },
  nutrition: {
    calories: 1000,
    protein: 22,
    fat: 49,
    carbs: 112,
  },
  ingredients: [
    "All-purpose flour",
    "Egg",
    "Water (Est.)",
    "Salt",
    "Sunflower oil",
    "Cooked potato",
    "Onion, sautéed",
    "Butter",
    "Black pepper",
    "Fresh dill",
    "Sour cream (Est.)",
  ],
};

export const PelmeniWithMeat = {
  id: 36,
  slug: {
    en: "pelmeni-with-meat",
    ru: "pelmeni",
    ar: "pelmeni-bil-lahm",
  },
  name: {
    en: "Pelmeni with meat",
    ar: "بيلميني باللحم",
    ru: "Пельмени",
  },
  categories: [
    { en: "Hot Appetizers", ar: "المقبلات الساخنة", ru: "Горячие Закуски" },
  ],
  description: {
    short: {
      en: "Tender beef pelmeni with sour cream.",
      ar: "اثنا عشر قطعة من الزلابية الروسية التقليدية المحشوة باللحم، مع الزبدة والقشدة الحامضة.",
      ru: "Нежные пельмени с говядиной и сметаной.",
    },
  },
  price: 45,
  images: {
    card: pelmeniWithMeatCard,
    card2x: pelmeniWithMeatCard2x,
    full: pelmeniWithMeatFull,
  },
  nutrition: {
    calories: 925,
    protein: 58,
    fat: 38,
    carbs: 84,
  },
  ingredients: [
    "All-purpose flour",
    "Egg",
    "Water (Estimated)",
    "Salt",
    "Sunflower oil",
    "Minced topside beef (Estimated)",
    "Onion, finely chopped (Estimated)",
    "Garlic (Estimated)",
    "Ground cumin (Estimated)",
    "Black pepper",
  ],
};

export const Draniki = {
  id: 37,
  slug: {
    en: "draniki",
    ru: "draniki",
    ar: "draniki",
  },
  name: {
    en: "Draniki",
    ar: "درانيكي",
    ru: "Драники",
  },
  categories: [
    { en: "Hot Appetizers", ar: "المقبلات الساخنة", ru: "Горячие Закуски" },
  ],
  description: {
    short: {
      en: "Crispy Belarusian potato pancakes with sour cream.",
      ar: "فطائر البطاطا المقلية.",
      ru: "Хрустящие белорусские драники со сметаной.",
    },
  },
  price: 34,
  images: {
    card: dranikiCard,
    card2x: dranikiCard2x,
    full: dranikiFull,
  },
  nutrition: {
    calories: 560,
    protein: 14,
    fat: 26,
    carbs: 68,
  },
  ingredients: [
    "Potato, grated",
    "Onion, grated",
    "Egg",
    "All-purpose flour",
    "Salt (Estimated)",
    "Black pepper (Estimated)",
    "Sunflower oil, absorbed (Est.)",
    "Sour cream",
  ],
};

export const MantiWithMeat = {
  id: 38,
  slug: {
    en: "manti-with-meat",
    ru: "manty-iz-govyadiny",
    ar: "manti-bil-lahm",
  },
  name: {
    en: "Manti With Meat",
    ar: "مانتي باللحم",
    ru: "Манты из говядины",
  },
  categories: [
    { en: "Hot Appetizers", ar: "المقبلات الساخنة", ru: "Горячие Закуски" },
  ],
  description: {
    short: {
      en: "Steamed beef manti with sour-cream dip.",
      ar: "خمس قطع من الزلابية الأوزبكية المحشوة باللحم المتبل.",
      ru: "Паровые манты с говядиной и сметаной.",
    },
  },
  price: 46,
  images: {
    card: mantiWithMeatCard,
    card2x: mantiWithMeatCard2x,
    full: mantiWithMeatFull,
  },
  nutrition: {
    calories: 1250,
    protein: 57,
    fat: 67,
    carbs: 85,
  },
  ingredients: [
    "All-purpose flour",
    "Egg",
    "Water (Estimated)",
    "Salt",
    "Minced topside beef",
    "Onion, finely chopped",
    "Ground cumin",
    "Black pepper",
    "Butter (for serving)",
  ],
};

export const CheburekWithMeat = {
  id: 39,
  slug: {
    en: "cheburek-with-meat",
    ru: "cheburek-iz-govyadiny",
    ar: "cheburek-bil-lahm",
  },
  name: {
    en: "Cheburek With Meat",
    ar: "تشيبوريك باللحم",
    ru: "Чебурек из говядины",
  },
  categories: [
    { en: "Hot Appetizers", ar: "المقبلات الساخنة", ru: "Горячие Закуски" },
  ],
  description: {
    short: {
      en: "Crispy beef cheburek, golden-fried turnover.",
      ar: "لحم بقري مفروم وبصل.",
      ru: "Хрустящий говяжий чебурек.",
    },
  },
  price: 26,
  images: {
    card: cheburekWithMeatCard,
    card2x: cheburekWithMeatCard2x,
    full: cheburekWithMeatFull,
  },
  nutrition: {
    calories: 550,
    protein: 34,
    fat: 25,
    carbs: 58,
  },
  ingredients: [
    "All-purpose flour",
    "Boiling water (Estimated)",
    "Butter",
    "Sunflower oil (in dough)",
    "Salt",
    "Sugar",
    "Minced topside beef",
    "Onion, finely chopped (Est.)",
    "Cumin seeds",
    "Black pepper (Estimated)",
  ],
};

export const BeefCutlets = {
  id: 40,
  slug: {
    en: "beef-cutlets",
    ru: "govyazhi-kotlety",
    ar: "sharaih-lahm-baqari",
  },
  name: {
    en: "Beef Cutlets",
    ar: "شرائح لحم بقري",
    ru: "Говяжьи котлеты",
  },
  categories: [
    { en: "Main Courses", ar: "الأطباق الرئيسية", ru: "Основные Блюда" },
  ],
  description: {
    short: {
      en: "Juicy beef cutlets with creamy spice.",
      ar: "شريحة لحم بقري على الطريقة الروسية التقليدية مع اختيارك من الأطباق الجانبية.",
      ru: "Сочные говяжьи котлеты со специями.",
    },
  },
  price: 53,
  images: {
    card: beefCutletsCard,
    card2x: beefCutletsCard2x,
    full: beefCutletsFull,
  },
  nutrition: {
    calories: 700,
    protein: 39,
    fat: 47,
    carbs: 31,
  },
  ingredients: [
    "Minced topside beef (Est.)",
    "Onion, finely chopped (Est.)",
    "Egg (Est.)",
    "Cooking cream (Est.)",
    "Ground cumin (Est.)",
    "Ground coriander (Est.)",
    "Salt (Est.)",
    "Black pepper (Est.)",
    "Vegetable oil, absorbed (Est.)",
  ],
};

export const ChickenCutlets = {
  id: 41,
  slug: {
    en: "chicken-cutlets",
    ru: "kurinye-kotlety",
    ar: "sharaih-dajaj",
  },
  name: {
    en: "Chicken Cutlets",
    ar: "شرائح دجاج",
    ru: "Куриные котлеты",
  },
  categories: [
    { en: "Main Courses", ar: "الأطباق الرئيسية", ru: "Основные Блюда" },
  ],
  description: {
    short: {
      en: "Juicy chicken cutlets with warm spices.",
      ar: "قطعتان من شرائح الدجاج المطهوة على البخار، مع اختيارك من الأطباق الجانبية.",
      ru: "Сочные куриные котлеты со специями.",
    },
  },
  price: 49,
  images: {
    card: chickenCutletsCard,
    card2x: chickenCutletsCard2x,
    full: chickenCutletsFull,
  },
  nutrition: {
    calories: 515,
    protein: 38,
    fat: 27,
    carbs: 30,
  },
  ingredients: [
    "Minced chicken",
    "Onion, finely chopped (Est.)",
    "Egg (Est.)",
    "Cooking cream (Est.)",
    "Ground cumin (Est.)",
    "Ground coriander (Est.)",
    "Salt (Est.)",
    "Black pepper (Est.)",
    "Vegetable oil, absorbed (Est.)",
  ],
};

export const UzbekBeefPlov = {
  id: 42,
  slug: {
    en: "uzbek-beef-plov",
    ru: "uzbekskiy-plov",
    ar: "plov-lahm-baqari-uzbaki",
  },
  name: {
    en: "Uzbek Beef Plov",
    ar: "بلوف لحم بقري أوزبكي",
    ru: "Узбекский плов",
  },
  categories: [
    { en: "Main Courses", ar: "الأطباق الرئيسية", ru: "Основные Блюда" },
  ],
  description: {
    short: {
      en: "Fragrant Uzbek beef plov with carrots & garlic.",
      ar: "أرز، لحم بقري، جزر، وتوابل.",
      ru: "Ароматный узбекский плов с говядиной.",
    },
  },
  price: 50,
  images: {
    card: uzbekBeefPlovCard,
    card2x: uzbekBeefPlovCard2x,
    full: uzbekBeefPlovFull,
  },
  nutrition: {
    calories: 860,
    protein: 35,
    fat: 46,
    carbs: 83,
  },
  ingredients: [
    "Beef chuck, cubes",
    "Vegetable oil",
    "Onion, chopped",
    "Carrot, julienned",
    "Long-grain rice, soaked",
    "Beef stock (Est.)",
    "Chickpeas, cooked",
    "Whole garlic",
    "Ground cumin (Scaled)",
    "Salt (Est.)",
    "Black pepper (Est.)",
  ],
};

export const CabbageRollsWithRiceAndMincedMeat = {
  id: 43,
  slug: {
    en: "cabbage-rolls-with-rice-and-minced-meat",
    ru: "golubtsy",
    ar: "malfuf-mahshi-bil-aruz-wal-lahm",
  },
  name: {
    en: "Cabbage Rolls With Rice And Minced Meat",
    ar: "ملفوف محشو بالأرز واللحم المفروم",
    ru: "Голубцы",
  },
  categories: [
    { en: "Main Courses", ar: "الأطباق الرئيسية", ru: "Основные Блюда" },
  ],
  description: {
    short: {
      en: "Hearty cabbage rolls with beef & rice.",
      ar: "ثلاث قطع من أوراق الكرنب مع لحم بقري وأرز.",
      ru: "Сытные голубцы с говядиной и рисом.",
    },
  },
  price: 52,
  images: {
    card: cabbageRollsWithRiceAndMincedMeatCard,
    card2x: cabbageRollsWithRiceAndMincedMeatCard2x,
    full: cabbageRollsWithRiceAndMincedMeatFull,
  },
  nutrition: {
    calories: 610,
    protein: 50,
    fat: 30,
    carbs: 35,
  },
  ingredients: [
    "Ground beef (85 % lean)",
    "Long-grain rice, dry",
    "Onion, chopped",
    "Salt",
    "Black pepper",
    "Cabbage leaves (Est.)",
    "Crushed tomato",
    "Beef/veg stock (Est.)",
  ],
};

export const HotPan = {
  id: 44,
  slug: {
    en: "hot-pan",
    ru: "zharkoe-iz-govyadiny",
    ar: "miqla-sakhina",
  },
  name: {
    en: "Hot Pan",
    ar: "مقلاة ساخنة",
    ru: "Жаркое из Говядины",
  },
  categories: [
    { en: "Main Courses", ar: "الأطباق الرئيسية", ru: "Основные Блюда" },
  ],
  description: {
    short: {
      en: "Sizzling beef-potato hot-pan.",
      ar: "لحم بقري، بطاطا، فطر، وبصل.",
      ru: "Жаркое из говядины и картофеля.",
    },
  },
  price: 54,
  images: {
    card: hotPanCard,
    card2x: hotPanCard2x,
    full: hotPanFull,
  },
  nutrition: {
    calories: 580,
    protein: 32,
    fat: 28,
    carbs: 32,
  },
  ingredients: [
    "Beef tenderloin, strips",
    "Vegetable oil (Est.)",
    "Potato, diced (Scaled)",
    "Mushrooms, sliced (Est.)",
    "Onion, sliced",
    "Spring onion (Est.)",
    "Fresh dill",
    "Salt (Est.)",
    "Black pepper (Est.)",
  ],
};

export const BeefStroganoff = {
  id: 45,
  slug: {
    en: "beef-stroganoff",
    ru: "befstroganov",
    ar: "stroganoff-lahm-baqari",
  },
  name: {
    en: "Beef Stroganoff",
    ar: "ستروجانوف لحم بقري",
    ru: "Бефстроганов",
  },
  categories: [
    { en: "Main Courses", ar: "الأطباق الرئيسية", ru: "Основные Блюда" },
  ],
  description: {
    short: {
      en: "Classic creamy beef stroganoff.",
      ar: "شريحة لحم بقري طرية سوتيه تقدم مع صلصة كريمة وبطاطا مهروسة.",
      ru: "Классический бефстроганов.",
    },
  },
  price: 67,
  images: {
    card: beefStroganoffCard,
    card2x: beefStroganoffCard2x,
    full: beefStroganoffFull,
  },
  nutrition: {
    calories: 870,
    protein: 57,
    fat: 60,
    carbs: 35,
  },
  ingredients: [
    "Beef tenderloin, sliced",
    "Vegetable oil",
    "Onion, sliced",
    "Mushrooms, sliced",
    "Cooking cream (30 % fat)",
    "Salt & pepper",
  ],
};

export const ChickenKiev = {
  id: 46,
  slug: {
    en: "chicken-kiev",
    ru: "kotleta-po-po-kievski",
    ar: "dajaj-kiev",
  },
  name: {
    en: "Chicken Kiev",
    ar: "دجاج كييف",
    ru: "Котлета по по-киевски",
  },
  categories: [
    { en: "Main Courses", ar: "الأطباق الرئيسية", ru: "Основные Блюда" },
  ],
  description: {
    short: {
      en: "Golden, butter-filled Chicken Kiev.",
      ar: "دجاج منزوع العظم مغطى بصلصة زبدة البقدونس الكريمية المتبلة. يقدم مع اختيارك من الأطباق الجانبية.",
      ru: "Золотистая котлета по-киевски.",
    },
  },
  price: 54,
  images: {
    card: chickenKievCard,
    card2x: chickenKievCard2x,
    full: chickenKievFull,
  },
  nutrition: {
    calories: 1090,
    protein: 51,
    fat: 59,
    carbs: 90,
  },
  ingredients: [
    "Chicken breast, thin",
    "Unsalted butter",
    "Fresh dill",
    "Salt & pepper (Est.)",
    "All-purpose flour",
    "Egg, beaten",
    "Breadcrumbs",
    "Vegetable oil, absorbed (Est.)",
  ],
};

export const Napoleon = {
  id: 47,
  slug: {
    en: "napoleon",
    ru: "napoleon",
    ar: "napoleon",
  },
  name: {
    en: "Napoleon",
    ar: "نابليون",
    ru: "Наполеон",
  },
  categories: [{ en: "Desserts", ar: "الحلويات", ru: "Десерты" }],
  description: {
    short: {
      en: "Flaky walnut-caramel Napoleon slice.",
      ar: "معجنات روسية رقيقة وهشة محشوة بالكريمة.",
      ru: "Слойка «Наполеон» с ореховым кремом.",
    },
  },
  price: 32,
  images: {
    card: napoleonCard,
    card2x: napoleonCard2x,
    full: napoleonFull,
  },
  nutrition: {
    calories: 1025,
    protein: 14,
    fat: 72,
    carbs: 81,
  },
  ingredients: [
    "Puff-pastry sheets (Est.)",
    "Sweetened condensed milk",
    "Butter",
    "Walnuts, chopped",
    "Vanilla essence (Est.)",
  ],
};

export const HoneyCake = {
  id: 48,
  slug: {
    en: "honey-cake",
    ru: "medovik",
    ar: "kaakat-al-asal",
  },
  name: {
    en: "Honey Cake",
    ar: "كعكة العسل",
    ru: "Медовик",
  },
  categories: [{ en: "Desserts", ar: "الحلويات", ru: "Десерты" }],
  description: {
    short: {
      en: "Rich honey sponge with a light caramel glaze.",
      ar: "عسل، كريمة، وتوت طازج.",
      ru: "Нежный медовый бисквит с карамельной глазурью.",
    },
  },
  price: 26,
  images: {
    card: honeyCakeCard,
    card2x: honeyCakeCard2x,
    full: honeyCakeFull,
  },
  nutrition: {
    calories: 605,
    protein: 6,
    fat: 48,
    carbs: 47,
  },
  ingredients: [
    "Butter",
    "Honey",
    "Brown sugar",
    "Icing sugar",
    "Egg",
    "Self-raising flour",
    "Baking powder",
    "Baking soda",
    "White vinegar",
    "Cooking cream",
    "Sour cream",
    "Prunes, diced",
    "Honey glaze (Est.)",
  ],
};

export const RussianPancakesWithCottageCheese = {
  id: 49,
  slug: {
    en: "russian-pancakes-with-cottage-cheese",
    ru: "bliny-s-tvorogom",
    ar: "fatair-rusiya-bil-jibn",
  },
  name: {
    en: "Russian Pancakes with cottage cheese",
    ar: "فطائر روسية مع جبن قريش",
    ru: "Блины с творогом",
  },
  categories: [{ en: "Desserts", ar: "الحلويات", ru: "Десерты" }],
  description: {
    short: {
      en: "Cottage-cheese crêpes with jam.",
      ar: "٣ قطع.",
      ru: "Блины c творожной начинкой и вареньем.",
    },
  },
  price: 42,
  images: {
    card: russianPancakesWithCottageCheeseCard,
    card2x: russianPancakesWithCottageCheeseCard2x,
    full: russianPancakesWithCottageCheeseFull,
  },
  nutrition: {
    calories: 620,
    protein: 26,
    fat: 26,
    carbs: 60,
  },
  ingredients: [
    "Cottage cheese",
    "All-purpose flour (Est.)",
    "Whole milk (Est.)",
    "Egg (Est.)",
    "Sunflower oil (Est.)",
    "Sugar (Est.)",
    "Salt (Est.)",
    "Butter, for frying (Est.)",
    "Jam / condensed milk (Opt., Est.)",
  ],
};

export const Syrniki = {
  id: 50,
  slug: {
    en: "syrniki",
    ru: "syrniki",
    ar: "syrniki",
  },
  name: {
    en: "Syrniki",
    ar: "سيرنيكي",
    ru: "Сырники",
  },
  categories: [{ en: "Desserts", ar: "الحلويات", ru: "Десерты" }],
  description: {
    short: {
      en: "Sweet cottage-cheese syrniki, pan-fried till golden.",
      ar: "٣ قطع من فطائر الجبن القريش التقليدية من شرق أوروبا مع اختيارك من الصلصة.",
      ru: "Сладкие сырники, обжаренные до золотистой корочки.",
    },
  },
  price: 42,
  images: {
    card: syrnikiCard,
    card2x: syrnikiCard2x,
    full: syrnikiFull,
  },
  nutrition: {
    calories: 280,
    protein: 15,
    fat: 12,
    carbs: 28,
  },
  ingredients: [
    "Cottage cheese (Est.)",
    "Egg (Est.)",
    "Sugar (Est.)",
    "Vanilla essence (Est.)",
    "All-purpose flour (Est.)",
    "Salt (Est.)",
    "Sunflower oil, absorbed (Est.)",
    "Sour cream, serving (Opt., Est.)",
  ],
};

export const ChickenSkewer = {
  id: 51,
  slug: {
    en: "chicken-skewer",
    ru: "kurinyy-shashlyk",
    ar: "sikh-dajaj",
  },
  name: {
    en: "Chicken Skewer",
    ar: "سيخ دجاج",
    ru: "Куриный шашлык",
  },
  categories: [{ en: "Mix Grill", ar: "المشاوي", ru: "Шашлыки" }],
  description: {
    short: {
      en: "Zesty coriander chicken skewer, flame-grilled.",
      ar: "مكعبات صدور دجاج متبلة مشوية. تقدم مع بطاطا مقلية.",
      ru: "Куриный шашлык с кориандром и лимоном.",
    },
  },
  price: 53,
  images: {
    card: chickenSkewerCard,
    card2x: chickenSkewerCard2x,
    full: chickenSkewerFull,
  },
  nutrition: {
    calories: 520,
    protein: 46,
    fat: 35,
    carbs: 3,
  },
  ingredients: [
    "Chicken breast, cubed",
    "Mayonnaise",
    "Dijon mustard",
    "Lemon juice",
    "Ground coriander",
    "Salt (Est.)",
    "Black pepper (Est.)",
  ],
};

export const BeefSkewer = {
  id: 52,
  slug: {
    en: "beef-skewer",
    ru: "govyazhiy-shashlyk",
    ar: "sikh-lahm-baqari",
  },
  name: {
    en: "Beef Skewer",
    ar: "سيخ لحم بقري",
    ru: "Говяжий шашлык",
  },
  categories: [{ en: "Mix Grill", ar: "المشاوي", ru: "Шашлыки" }],
  description: {
    short: {
      en: "Juicy grilled beef skewer, pepper-marinated.",
      ar: "مكعبات لحم بقري طري مشوية. تقدم مع بطاطا مقلية.",
      ru: "Сочный говяжий шашлык на гриле.",
    },
  },
  price: 65,
  images: {
    card: beefSkewerCard,
    card2x: beefSkewerCard2x,
    full: beefSkewerFull,
  },
  nutrition: {
    calories: 530,
    protein: 48,
    fat: 28,
    carbs: 0,
  },
  ingredients: [
    "Beef tenderloin, cubed",
    "Cooking oil (Est.)",
    "Salt (Est.)",
    "Black pepper",
  ],
};

export const LambSkewer = {
  id: 53,
  slug: {
    en: "lamb-skewer",
    ru: "baraniy-shashlyk",
    ar: "sikh-lahm-dhan",
  },
  name: {
    en: "Lamb Skewer",
    ar: "سيخ لحم ضأن",
    ru: "Бараний шашлык",
  },
  categories: [{ en: "Mix Grill", ar: "المشاوي", ru: "Шашлыки" }],
  description: {
    short: {
      en: "Cumin-coriander lamb skewer, smoky & tender.",
      ar: "مكعبات لحم ضأن متبلة مشوية. تقدم مع بطاطا مقلية.",
      ru: "Пряный бараний шашлык с кумином.",
    },
  },
  price: 61,
  images: {
    card: lambSkewerCard,
    card2x: lambSkewerCard2x,
    full: lambSkewerFull,
  },
  nutrition: {
    calories: 700,
    protein: 42,
    fat: 55,
    carbs: 2,
  },
  ingredients: [
    "Lamb tenderloin, cubed",
    "Mayonnaise",
    "Dijon mustard",
    "Ground cumin",
    "Ground coriander",
    "Salt (Est.)",
    "Black pepper (Est.)",
  ],
};

// export const MixedGrill = {
//   id: 54,
//   slug: {
//     en: "mixed-grill",
//     ru: "assorti-iz-shashlykov",
//     ar: "mashwiyat-mushakkala",
//   },
//   name: {
//     en: "Mixed Grill",
//     ar: "مشويات مشكلة",
//     ru: "Ассорти из шашлыков",
//   },
//   categories: [{ en: "Mix Grill", ar: "المشاوي", ru: "Шашлыки" }],
//   description: {
//     short: {
//       en: "1 kg mixed grill: beef, chicken, lamb & lyulya.",
//       ar: "مشاوي مشكلة ١ كغ: لحم بقري ودجاج وضأن وكباب ليليا.",
//       ru: "Ассорти 1 кг: говядина, курица, баранина, люля.",
//     },
//   },
//   price: 214,
//   images: {
//     full: mixedGrillFull,
//   },
//   nutrition: {
//     calories: 2380,
//     protein: 199,
//     fat: 162,
//     carbs: 7,
//   },
//   ingredients: [
//     "Beef skewer",
//     "Chicken skewer",
//     "Lamb skewer",
//     "Lyulya kebab",
//     "Lamb chop",
//     "Cooking oil (Est.)",
//     "Salt (Est.)",
//     "Black pepper (Est.)",
//   ],
// };

export const Buckwheat = {
  id: 55,
  slug: {
    en: "buckwheat",
    ru: "grechka",
    ar: "hinta-sawda",
  },
  name: {
    en: "Buckwheat",
    ar: "الحنطة السوداء",
    ru: "Гречка",
  },
  categories: [{ en: "Side Dishes", ar: "الأطباق الجانبية", ru: "Гарниры" }],
  description: {
    short: {
      en: "Fluffy buttered buckwheat groats.",
      ar: "دقيق الحنطة السوداء، ماء وملح.",
      ru: "Рассыпчатая гречка с маслом.",
    },
  },
  price: 20,
  images: {
    card: buckwheatCard,
    card2x: buckwheatCard2x,
    full: buckwheatFull,
  },
  nutrition: {
    calories: 420,
    protein: 13,
    fat: 13,
    carbs: 72,
  },
  ingredients: ["Buckwheat groats", "Water", "Unsalted butter", "Salt (Est.)"],
};

export const LyulyaKebab = {
  id: 56,
  slug: {
    en: "lyulya-kebab",
    ru: "lyulya-kebab",
    ar: "lyulya-kebab",
  },
  name: {
    en: "Lyulya Kebab",
    ar: "كباب ليليا",
    ru: "Люля Кебаб",
  },
  categories: [{ en: "Mix Grill", ar: "المشاوي", ru: "Шашлыки" }],
  description: {
    short: {
      en: "Smoky mixed-meat lyulya kebab on skewer.",
      ar: "لحم بقري ولحم ضأن مفروم مشوي. يقدم مع بطاطا مقلية.",
      ru: "Ароматный люля-кебаб из говядины и курицы.",
    },
  },
  price: 57,
  images: {
    card: lyulyaKebabCard,
    card2x: lyulyaKebabCard2x,
    full: lyulyaKebabFull,
  },
  nutrition: {
    calories: 335,
    protein: 39,
    fat: 19,
    carbs: 2,
  },
  ingredients: [
    "Minced beef topside (Est.)",
    "Minced chicken breast (Est.)",
    "Onion, grated (Est.)",
    "Ground cumin",
    "Ground coriander",
    "Black pepper",
    "Salt (Est.)",
    "Vegetable oil, brushing (Est.)",
  ],
};

// export const LambChops = {
//   id: 57,
//   slug: {
//     en: "lamb-chops",
//     ru: "barani-otbivnye",
//     ar: "rish-dhan",
//   },
//   name: {
//     en: "Lamb Chops",
//     ar: "ريش ضأن",
//     ru: "Бараньи отбивные",
//   },
//   categories: [{ en: "Mix Grill", ar: "المشاوي", ru: "Шашлыки" }],
//   description: {
//     short: {
//       en: "Char-grilled lamb chops, simply seasoned.",
//       ar: "يقدم مع بطاطا مقلية.",
//       ru: "Сочные бараньи отбивные на гриле.",
//     },
//   },
//   price: 87,
//   images: {
//     full: lambChopsFull,
//   },
//   nutrition: {
//     calories: 930,
//     protein: 75,
//     fat: 80,
//     carbs: 0,
//   },
//   ingredients: [
//     "Lamb chops (raw)",
//     "Cooking oil",
//     "Salt (Est.)",
//     "Black pepper (Est.)",
//   ],
// };

export const BoiledRice = {
  id: 58,
  slug: {
    en: "boiled-rice",
    ru: "varenyy-ris",
    ar: "aruz-masluq",
  },
  name: {
    en: "Boiled Rice",
    ar: "الأرز المسلوق",
    ru: "Вареный рис",
  },
  categories: [{ en: "Side Dishes", ar: "الأطباق الجانبية", ru: "Гарниры" }],
  description: {
    short: {
      en: "Fluffy buttered boiled rice.",
      ar: "أرز أبيض مسلوق.",
      ru: "Рассыпчатый рис с маслом.",
    },
  },
  price: 20,
  images: {
    card: boiledRiceCard,
    card2x: boiledRiceCard2x,
    full: boiledRiceFull,
  },
  nutrition: {
    calories: 535,
    protein: 6,
    fat: 18,
    carbs: 90,
  },
  ingredients: [
    "White rice, dry",
    "Water (Estimated)",
    "Unsalted butter",
    "Salt (Estimated)",
  ],
};

export const GrilledVegetable = {
  id: 59,
  slug: {
    en: "grilled-vegetable",
    ru: "ovoshchi-na-grile",
    ar: "khudar-mashwiya",
  },
  name: {
    en: "Grilled Vegetable",
    ar: "خضار مشوية",
    ru: "Овощи на гриле",
  },
  categories: [{ en: "Side Dishes", ar: "الأطباق الجانبية", ru: "Гарниры" }],
  description: {
    short: {
      en: "Smoky mixed grilled vegetables with butter glaze.",
      ar: "تشكيلة من الخضراوات المشوية.",
      ru: "Овощное ассорти на гриле с масляной глазурью.",
    },
  },
  price: 24,
  images: {
    card: grilledVegetableCard,
    card2x: grilledVegetableCard2x,
    full: grilledVegetableFull,
  },
  nutrition: {
    calories: 305,
    protein: 5,
    fat: 22,
    carbs: 29,
  },
  ingredients: [
    "Red onion",
    "Red bell pepper",
    "Green bell pepper",
    "Yellow bell pepper",
    "Button mushrooms",
    "Tomato",
    "Vegetable oil",
    "Unsalted butter",
    "Salt (Est.)",
    "Black pepper (Est.)",
    "Dried oregano/thyme (Optional)",
  ],
};

export const SweetPotatoFries = {
  id: 60,
  slug: {
    en: "sweet-potato-fries",
    ru: "sladkiy-kartofel-fri",
    ar: "batata-hilwa-maqliya",
  },
  name: {
    en: "Sweet Potato Fries",
    ar: "بطاطس حلوة مقلية",
    ru: "Сладкий картофель фри",
  },
  categories: [{ en: "Side Dishes", ar: "الأطباق الجانبية", ru: "Гарниры" }],
  description: {
    short: {
      en: "Crispy oven-baked sweet-potato fries.",
      ar: "استمتعوا بالتوازن المثالي بين القرمشة والطراوة مع بطاطسنا الحلوة المقلية، المتبّلة بخبرة والمُحمّرة بلون ذهبي خفيف، لتُقدّم لكم تجربة شهية ستجعلكم تتوقون إلى حلاوتها اللذيذة مع كل قضمة.",
      ru: "Хрустящий батат-фри из духовки.",
    },
  },
  price: 24,
  images: {
    card: sweetPotatoFriesCard,
    card2x: sweetPotatoFriesCard2x,
    full: sweetPotatoFriesFull,
  },
  nutrition: {
    calories: 260,
    protein: 3,
    fat: 11,
    carbs: 40,
  },
  ingredients: [
    "Sweet potato, raw sticks",
    "Vegetable oil (Estimated)",
    "Salt (Estimated)",
    "Black pepper (Estimated)",
    "Smoked paprika (Optional)",
  ],
};

export const MashedPotatoes = {
  id: 61,
  slug: {
    en: "mashed-potatoes",
    ru: "kartofelnoe-pyure",
    ar: "batatis-mahrusa",
  },
  name: {
    en: "Mashed Potatoes",
    ar: "بطاطس مهروسة",
    ru: "Картофельное пюре",
  },
  categories: [{ en: "Side Dishes", ar: "الأطباق الجانبية", ru: "Гарниры" }],
  description: {
    short: {
      en: "Creamy mashed potatoes with butter.",
      ar: "جرّبوا بطاطسنا المهروسة، المصنوعة من بطاطس ناعمة وهشة، مخفوقة مع الزبدة الكريمية والحليب الغني، لتُشكّل طبقًا جانبيًا شهيًا يُكمّل أي وجبة.",
      ru: "Нежное картофельное пюре с маслом.",
    },
  },
  price: 20,
  images: {
    card: mashedPotatoesCard,
    card2x: mashedPotatoesCard2x,
    full: mashedPotatoesFull,
  },
  nutrition: {
    calories: 445,
    protein: 6,
    fat: 25,
    carbs: 48,
  },
  ingredients: [
    "Potatoes, peeled",
    "Unsalted butter",
    "Cooking cream (20 % fat)",
    "Salt (Est.)",
    "Black pepper (Est.)",
  ],
};

export const FrenchFries = {
  id: 62,
  slug: {
    en: "french-fries",
    ru: "kartofel-fri",
    ar: "batatis-maqliya",
  },
  name: {
    en: "French Fries",
    ar: "بطاطس مقلية عادية",
    ru: "Картофель фри",
  },
  categories: [{ en: "Side Dishes", ar: "الأطباق الجانبية", ru: "Гарниры" }],
  description: {
    short: {
      en: "Classic double-fried French fries.",
      ar: "مقلية حتى تصبح ذهبية مقرمشة ومتبلة بشكل مثالي، تُعدّ إضافة رائعة لأي وجبة.",
      ru: "Классический картофель фри.",
    },
  },
  price: 19,
  images: {
    card: frenchFriesCard,
    card2x: frenchFriesCard2x,
    full: frenchFriesFull,
  },
  nutrition: {
    calories: 440,
    protein: 4,
    fat: 20,
    carbs: 62,
  },
  ingredients: [
    "Potato, raw sticks",
    "Frying oil (absorbed) (Est.)",
    "Salt (Est.)",
    "Black pepper (Optional)",
  ],
};

export const HomeStylePotatoWithMushroom = {
  id: 63,
  slug: {
    en: "home-style-potato-with-mushroom",
    ru: "kartoshka-po-domashnemu-s-gribami",
    ar: "batatis-manziliya-bil-fitr",
  },
  name: {
    en: "Home Style Potato With Mushroom",
    ar: "بطاطس منزلية مع الفطر",
    ru: "Картошка по домашнему с грибами",
  },
  categories: [{ en: "Side Dishes", ar: "الأطباق الجانبية", ru: "Гарниры" }],
  description: {
    short: {
      en: "Rustic fried potatoes with mushrooms & dill.",
      ar: "فطر وبصل وبطاطا مقلية مع أعشاب طازجة.",
      ru: "Картошка по-домашнему с грибами и укропом.",
    },
  },
  price: 24,
  images: {
    card: homeStylePotatoWithMushroomCard,
    card2x: homeStylePotatoWithMushroomCard2x,
    full: homeStylePotatoWithMushroomFull,
  },
  nutrition: {
    calories: 640,
    protein: 13,
    fat: 30,
    carbs: 88,
  },
  ingredients: [
    "Vegetable oil",
    "Potato, diced",
    "Mushrooms, sliced",
    "Onion, sliced",
    "Spring onion",
    "Fresh dill",
    "Salt (Est.)",
    "Black pepper (Est.)",
  ],
};

export const UzbekFlatbread = {
  id: 64,
  slug: {
    en: "uzbek-flatbread",
    ru: "lepeshka",
    ar: "khubz-musattah-uzbaki",
  },
  name: {
    en: "Uzbek Flatbread",
    ar: "خبز مسطح أوزبكي",
    ru: "Лепешка",
  },
  categories: [{ en: "Bread", ar: "الخبز", ru: "Хлеб" }],
  description: {
    short: {
      en: "Uzbek-style sesame flatbread, warm & fluffy.",
      ar: "خبز مسطح",
      ru: "Узбекская лепёшка с кунжутом.",
    },
  },
  price: 8,
  images: {
    card: uzbekFlatbreadCard,
    card2x: uzbekFlatbreadCard2x,
    full: uzbekFlatbreadFull,
  },
  nutrition: {
    calories: 335,
    protein: 9,
    fat: 11,
    carbs: 54,
  },
  ingredients: [
    "All-purpose flour",
    "Whole milk",
    "Warm water (Estimated)",
    "Sunflower oil",
    "Sesame seeds",
    "Sugar",
    "Salt",
    "Dry yeast",
  ],
};

export const AdjikaSauce = {
  id: 65,
  slug: {
    en: "adjika-sauce",
    ru: "adzhika",
    ar: "salsat-adjika",
  },
  name: {
    en: "Adjika Sauce",
    ar: "صلصة أدجيكا",
    ru: "Аджика",
  },
  categories: [{ en: "Sauces", ar: "الصلصات", ru: "Соусы" }],
  description: {
    short: {
      en: "Fiery Georgian adjika.",
      ar: "صلصة أدجيكا جورجية حارة.",
      ru: "Острая аджика.",
    },
  },
  price: 9,
  images: {
    card: adjikaSauceCard,
    card2x: adjikaSauceCard2x,
    full: adjikaSauceFull,
  },
  nutrition: {
    calories: 75,
    protein: 2,
    fat: 3,
    carbs: 13,
  },
  ingredients: [
    "Red bell pepper",
    "Hot chili",
    "Tomato paste",
    "Garlic",
    "Cilantro / dill",
    "Vegetable oil",
    "Vinegar 6 %",
    "Salt",
    "Sugar (Opt.)",
  ],
};

export const HouseSpecialSauce = {
  id: 66,
  slug: {
    en: "house-special-sauce",
    ru: "firmennyy-sous",
    ar: "salsa-khassa",
  },
  name: {
    en: "House Special Sauce",
    ar: "صلصة خاصة بالمطعم",
    ru: "Фирменный соус",
  },
  categories: [{ en: "Sauces", ar: "الصلصات", ru: "Соусы" }],
  description: {
    short: {
      en: "Creamy ketchup-mayo “house” sauce.",
      ar: "صلصة البيت الكريمية بالكاتشب والمايونيز.",
      ru: "Кремовый фирменный соус.",
    },
  },
  price: 9,
  images: {
    card: houseSpecialSauceCard,
    card2x: houseSpecialSauceCard2x,
    full: houseSpecialSauceFull,
  },
  nutrition: {
    calories: 305,
    protein: 1,
    fat: 25,
    carbs: 20,
  },
  ingredients: [
    "Ketchup",
    "Mayonnaise",
    "Pickled cucumber",
    "Onion",
    "Sweet paprika",
    "Sugar",
    "Salt",
    "Black pepper",
  ],
};

export const MustardSauce = {
  id: 67,
  slug: {
    en: "mustard-sauce",
    ru: "gorchitsa",
    ar: "salsat-al-khardal",
  },
  name: {
    en: "Mustard Sauce",
    ar: "صلصة الخردل",
    ru: "Горчица",
  },
  categories: [{ en: "Sauces", ar: "الصلصات", ru: "Соусы" }],
  description: {
    short: {
      en: "Honey-mustard dipping sauce.",
      ar: "صلصة الخردل بالعسل للغمس.",
      ru: "Медово-горчичный соус.",
    },
  },
  price: 9,
  images: {
    card: mustardSauceCard,
    card2x: mustardSauceCard2x,
    full: mustardSauceFull,
  },
  nutrition: {
    calories: 340,
    protein: 2,
    fat: 28,
    carbs: 22,
  },
  ingredients: [
    "Dijon mustard",
    "Mayonnaise",
    "Honey",
    "Vinegar",
    "Water",
    "Salt (Est.)",
    "Black pepper",
  ],
};

export const TomatoGarlicSauce = {
  id: 68,
  slug: {
    en: "tomato-garlic-sauce",
    ru: "tomatno-chesnochnyy-sous",
    ar: "salsat-al-tamatim-wal-thum",
  },
  name: {
    en: "Tomato-Garlic Sauce",
    ar: "صلصة الطماطم والثوم",
    ru: "Томатно-чесночный соус",
  },
  categories: [{ en: "Sauces", ar: "الصلصات", ru: "Соусы" }],
  description: {
    short: {
      en: "Rich tomato-garlic dip.",
      ar: "صلصة غنية بالطماطم والثوم.",
      ru: "Насыщенный томатно-чесночный соус.",
    },
  },
  price: 9,
  images: {
    card: tomatoGarlicSauceCard,
    card2x: tomatoGarlicSauceCard2x,
    full: tomatoGarlicSauceFull,
  },
  nutrition: {
    calories: 105,
    protein: 2,
    fat: 1,
    carbs: 23,
  },
  ingredients: [
    "Ketchup",
    "Tomato paste",
    "Garlic",
    "Vinegar",
    "Sugar",
    "Water",
    "Salt",
    "Black pepper",
    "Parsley",
  ],
};

export const RaspberryMors = {
  id: 76,
  slug: {
    en: "raspberry-mors",
    ru: "malinovyy-mors",
    ar: "mors-al-tut",
  },
  name: {
    en: "Raspberry Mors",
    ar: "مورس التوت",
    ru: "Малиновый морс",
  },
  categories: [
    {
      en: "Fresh Juices and Soft Drinks",
      ar: "العصائر الطازجة والمشروبات الغازية",
      ru: "Напитки",
    },
  ],
  description: {
    short: {
      en: "Bright, tangy raspberry mors.",
      ar: "مورس التوت المنعش بطعم حامض خفيف.",
      ru: "Свежий малиновый морс.",
    },
  },
  price: 21,
  images: {
    card: raspberryMorsCard,
    card2x: raspberryMorsCard2x,
    full: raspberryMorsFull,
  },
  nutrition: {
    calories: 65,
    protein: 0,
    fat: 0,
    carbs: 16,
  },
  ingredients: ["Frozen raspberries (Est.)", "Water (Est.)", "Sugar (Est.)"],
};

export const CranberyMors = {
  id: 77,
  slug: {
    en: "cranbery-mors",
    ru: "klyukvennyy-mors",
    ar: "mors-al-tut-al-barri",
  },
  name: {
    en: "Cranbery Mors",
    ar: "مورس التوت البري",
    ru: "Клюквенный морс",
  },
  categories: [
    {
      en: "Fresh Juices and Soft Drinks",
      ar: "العصائر الطازجة والمشروبات الغازية",
      ru: "Напитки",
    },
  ],
  description: {
    short: {
      en: "Refreshing homemade cranberry mors.",
      ar: "مورس التوت البري المنزلي المنعش.",
      ru: "Домашний клюквенный морс.",
    },
  },
  price: 21,
  images: {
    card: cranberyMorsCard,
    card2x: cranberyMorsCard2x,
    full: cranberyMorsFull,
  },
  nutrition: {
    calories: 60,
    protein: 0,
    fat: 0,
    carbs: 15,
  },
  ingredients: ["Frozen cranberries (Est.)", "Water (Est.)", "Sugar (Est.)"],
};

export const MenuItems = [
  ScrambledEggs,
  Omelette,
  PancakesWithCondensedMilk,
  PancakesWithJam,
  RyeBreadJam,
  RicePorridge,
  BuckwheatPorridge,
  OatmealPorridge,
  AssortedPickles,
  Holodec,
  EggplantRolls,
  RussianBorscht,
  ChickenNoodlesSoup,
  MeatballSoup,
  Okroshka,
  Solyanka,
  RussianOlivierSalad,
  Vinegret,
  RussianHerringSaladShuba,
  Shakarob,
  UzbekAchichuk,
  CarrotSalad,
  GreekSalad,
  SpicySteakSalad,
  BakedRussianPieWithCabbage,
  BeetrootSalad,
  BakedRussianPieWithPotatoAndMushroom,
  SamsaWithMeat,
  BunsWithJam,
  BakedHotDog,
  Vatrushka,
  RussianPancakesWithBeef,
  RussianPancakesWithMushroom,
  VarenikiWithPotato,
  PelmeniWithMeat,
  Draniki,
  MantiWithMeat,
  CheburekWithMeat,
  BeefCutlets,
  ChickenCutlets,
  UzbekBeefPlov,
  CabbageRollsWithRiceAndMincedMeat,
  HotPan,
  BeefStroganoff,
  ChickenKiev,
  Napoleon,
  HoneyCake,
  RussianPancakesWithCottageCheese,
  Syrniki,
  ChickenSkewer,
  BeefSkewer,
  LambSkewer,
  // MixedGrill,
  Buckwheat,
  LyulyaKebab,
  // LambChops,
  BoiledRice,
  GrilledVegetable,
  SweetPotatoFries,
  MashedPotatoes,
  FrenchFries,
  HomeStylePotatoWithMushroom,
  UzbekFlatbread,
  AdjikaSauce,
  HouseSpecialSauce,
  MustardSauce,
  TomatoGarlicSauce,
  RaspberryMors,
  CranberyMors,
];

export default MenuItems;
