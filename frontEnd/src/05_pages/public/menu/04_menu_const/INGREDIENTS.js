// Ingredient names in en / ru / ar, keyed by the exact string used in
// menuItems.js. Generated once from the 251 distinct strings in that file.
//
// Two things this layer fixes:
//   1. menuItems.js stores ingredients as a flat English array, so ru/ar
//      customers were reading an English list under a translated heading.
//   2. The source spreadsheet's provenance notes - "(Est.)", "(Estimated)",
//      "(Scaled)", "(Estimated absorbed)" - marked quantities the kitchen
//      estimated. They were never meant for customers, so the `en` value
//      here is the cleaned display name rather than the raw key.
//
// Anything not listed falls back to the raw string, so a new dish can never
// crash the modal - it just shows the untranslated name until added here.

const INGREDIENT_NAMES = {
  "All-purpose flour": {
    en: "All-purpose flour",
    ru: "Пшеничная мука",
    ar: "دقيق متعدد الاستخدامات",
  },
  "All-purpose flour (Est.)": {
    en: "All-purpose flour",
    ru: "Пшеничная мука",
    ar: "دقيق متعدد الاستخدامات",
  },
  "Baking powder": {
    en: "Baking powder",
    ru: "Разрыхлитель",
    ar: "بيكنج باودر",
  },
  "Baking soda": {
    en: "Baking soda",
    ru: "Пищевая сода",
    ar: "بيكربونات الصوديوم",
  },
  "Bay leaf": { en: "Bay leaf", ru: "Лавровый лист", ar: "ورق الغار" },
  "Beef broth (Est.)": {
    en: "Beef broth",
    ru: "Говяжий бульон",
    ar: "مرق اللحم البقري",
  },
  "Beef chuck, cubes": {
    en: "Beef chuck, cubed",
    ru: "Говяжья лопатка, кубиками",
    ar: "لحم بقري (كتف) مكعبات",
  },
  "Beef cubes": {
    en: "Beef, cubed",
    ru: "Говядина, кубиками",
    ar: "مكعبات لحم بقري",
  },
  "Beef meatballs (Est.)": {
    en: "Beef meatballs",
    ru: "Говяжьи фрикадельки",
    ar: "كرات اللحم البقري",
  },
  "Beef skewer": {
    en: "Beef skewer",
    ru: "Шашлык из говядины",
    ar: "سيخ لحم بقري",
  },
  "Beef steak, cooked": {
    en: "Beef steak, cooked",
    ru: "Говяжий стейк, готовый",
    ar: "شريحة لحم بقري مطهوة",
  },
  "Beef stock (Est.)": {
    en: "Beef stock",
    ru: "Говяжий бульон",
    ar: "مرق اللحم البقري",
  },
  "Beef tenderloin, cubed": {
    en: "Beef tenderloin, cubed",
    ru: "Говяжья вырезка, кубиками",
    ar: "خاصرة بقري مكعبات",
  },
  "Beef tenderloin, sliced": {
    en: "Beef tenderloin, sliced",
    ru: "Говяжья вырезка, ломтиками",
    ar: "خاصرة بقري شرائح",
  },
  "Beef tenderloin, strips": {
    en: "Beef tenderloin, strips",
    ru: "Говяжья вырезка, соломкой",
    ar: "خاصرة بقري شرائح رفيعة",
  },
  "Beef tongue": { en: "Beef tongue", ru: "Говяжий язык", ar: "لسان بقري" },
  "Beef topside": {
    en: "Beef topside",
    ru: "Говяжий огузок",
    ar: "لحم بقري (فخذ)",
  },
  "Beef/veg stock (Est.)": {
    en: "Beef or vegetable stock",
    ru: "Говяжий или овощной бульон",
    ar: "مرق لحم أو خضار",
  },
  Beetroot: { en: "Beetroot", ru: "Свёкла", ar: "شمندر" },
  "Beetroot, grated": {
    en: "Beetroot, grated",
    ru: "Свёкла, тёртая",
    ar: "شمندر مبشور",
  },
  "Bell pepper": { en: "Bell pepper", ru: "Болгарский перец", ar: "فلفل رومي" },
  "Bell pepper, diced": {
    en: "Bell pepper, diced",
    ru: "Болгарский перец, кубиками",
    ar: "فلفل رومي مكعبات",
  },
  "Berry jam": { en: "Berry jam", ru: "Ягодный джем", ar: "مربى التوت" },
  "Black olives": { en: "Black olives", ru: "Чёрные оливки", ar: "زيتون أسود" },
  "Black pepper": { en: "Black pepper", ru: "Чёрный перец", ar: "فلفل أسود" },
  "Black pepper (Est.)": {
    en: "Black pepper",
    ru: "Чёрный перец",
    ar: "فلفل أسود",
  },
  "Black pepper (Estimated)": {
    en: "Black pepper",
    ru: "Чёрный перец",
    ar: "فلفل أسود",
  },
  "Black pepper (Optional)": {
    en: "Black pepper (optional)",
    ru: "Чёрный перец (по желанию)",
    ar: "فلفل أسود (اختياري)",
  },
  "Black peppercorns": {
    en: "Black peppercorns",
    ru: "Чёрный перец горошком",
    ar: "حبات الفلفل الأسود",
  },
  "Boiled beetroot": {
    en: "Boiled beetroot",
    ru: "Отварная свёкла",
    ar: "شمندر مسلوق",
  },
  "Boiled beetroot, diced": {
    en: "Boiled beetroot, diced",
    ru: "Отварная свёкла, кубиками",
    ar: "شمندر مسلوق مكعبات",
  },
  "Boiled carrot": {
    en: "Boiled carrot",
    ru: "Отварная морковь",
    ar: "جزر مسلوق",
  },
  "Boiled carrot, diced": {
    en: "Boiled carrot, diced",
    ru: "Отварная морковь, кубиками",
    ar: "جزر مسلوق مكعبات",
  },
  "Boiled egg": { en: "Boiled egg", ru: "Варёное яйцо", ar: "بيض مسلوق" },
  "Boiled egg, chopped": {
    en: "Boiled egg, chopped",
    ru: "Варёное яйцо, рубленое",
    ar: "بيض مسلوق مفروم",
  },
  "Boiled potato": {
    en: "Boiled potato",
    ru: "Отварной картофель",
    ar: "بطاطس مسلوقة",
  },
  "Boiled potato, diced": {
    en: "Boiled potato, diced",
    ru: "Отварной картофель, кубиками",
    ar: "بطاطس مسلوقة مكعبات",
  },
  "Boiling water (Estimated)": {
    en: "Boiling water",
    ru: "Кипяток",
    ar: "ماء مغلي",
  },
  Breadcrumbs: { en: "Breadcrumbs", ru: "Панировочные сухари", ar: "بقسماط" },
  "Brown sugar": { en: "Brown sugar", ru: "Коричневый сахар", ar: "سكر بني" },
  "Buckwheat groats": {
    en: "Buckwheat groats",
    ru: "Гречневая крупа",
    ar: "حبوب الحنطة السوداء",
  },
  Butter: { en: "Butter", ru: "Сливочное масло", ar: "زبدة" },
  "Butter (for serving)": {
    en: "Butter, to serve",
    ru: "Сливочное масло к подаче",
    ar: "زبدة للتقديم",
  },
  "Butter (Opt.)": {
    en: "Butter (optional)",
    ru: "Сливочное масло (по желанию)",
    ar: "زبدة (اختياري)",
  },
  "Butter, for frying (Est.)": {
    en: "Butter, for frying",
    ru: "Сливочное масло для жарки",
    ar: "زبدة للقلي",
  },
  "Butter, melted": {
    en: "Butter, melted",
    ru: "Растопленное сливочное масло",
    ar: "زبدة مذابة",
  },
  "Button mushrooms": {
    en: "Button mushrooms",
    ru: "Шампиньоны",
    ar: "فطر شامبينيون",
  },
  "Cabbage leaves (Est.)": {
    en: "Cabbage leaves",
    ru: "Капустные листья",
    ar: "أوراق ملفوف",
  },
  "Cabbage, shredded": {
    en: "Cabbage, shredded",
    ru: "Капуста, шинкованная",
    ar: "ملفوف مبشور",
  },
  Carrot: { en: "Carrot", ru: "Морковь", ar: "جزر" },
  "Carrot, chopped": {
    en: "Carrot, chopped",
    ru: "Морковь, нарезанная",
    ar: "جزر مقطّع",
  },
  "Carrot, diced": {
    en: "Carrot, diced",
    ru: "Морковь, кубиками",
    ar: "جزر مكعبات",
  },
  "Carrot, grated": {
    en: "Carrot, grated",
    ru: "Морковь, тёртая",
    ar: "جزر مبشور",
  },
  "Carrot, julienned": {
    en: "Carrot, julienned",
    ru: "Морковь, соломкой",
    ar: "جزر شرائح رفيعة",
  },
  "Carrots, grated": {
    en: "Carrot, grated",
    ru: "Морковь, тёртая",
    ar: "جزر مبشور",
  },
  Celery: { en: "Celery", ru: "Сельдерей", ar: "كرفس" },
  "Chicken breast, cubed": {
    en: "Chicken breast, cubed",
    ru: "Куриная грудка, кубиками",
    ar: "صدر دجاج مكعبات",
  },
  "Chicken breast, thin": {
    en: "Chicken breast, thinly sliced",
    ru: "Куриная грудка, тонкими пластами",
    ar: "صدر دجاج شرائح رفيعة",
  },
  "Chicken broth (Est.)": {
    en: "Chicken broth",
    ru: "Куриный бульон",
    ar: "مرق دجاج",
  },
  "Chicken frank sausage": {
    en: "Chicken frankfurter",
    ru: "Куриная сосиска",
    ar: "نقانق دجاج",
  },
  "Chicken skewer": {
    en: "Chicken skewer",
    ru: "Шашлык из курицы",
    ar: "سيخ دجاج",
  },
  "Chickpeas, cooked": {
    en: "Chickpeas, cooked",
    ru: "Нут, отварной",
    ar: "حمص مسلوق",
  },
  "Cilantro / dill": {
    en: "Cilantro or dill",
    ru: "Кинза или укроп",
    ar: "كزبرة أو شبت",
  },
  "Cooked beef": {
    en: "Cooked beef",
    ru: "Отварная говядина",
    ar: "لحم بقري مطهو",
  },
  "Cooked beef, diced (Est.)": {
    en: "Cooked beef, diced",
    ru: "Отварная говядина, кубиками",
    ar: "لحم بقري مطهو مكعبات",
  },
  "Cooked beetroot": {
    en: "Cooked beetroot",
    ru: "Отварная свёкла",
    ar: "شمندر مطهو",
  },
  "Cooked chicken, shredded": {
    en: "Cooked chicken, shredded",
    ru: "Отварная курица, разобранная",
    ar: "دجاج مطهو مفتّت",
  },
  "Cooked mushroom (Est.)": {
    en: "Cooked mushrooms",
    ru: "Готовые грибы",
    ar: "فطر مطهو",
  },
  "Cooked mushrooms": {
    en: "Cooked mushrooms",
    ru: "Готовые грибы",
    ar: "فطر مطهو",
  },
  "Cooked potato": {
    en: "Cooked potato",
    ru: "Отварной картофель",
    ar: "بطاطس مطهوة",
  },
  "Cooking cream": {
    en: "Cooking cream",
    ru: "Сливки для готовки",
    ar: "كريمة طبخ",
  },
  "Cooking cream (20 % fat)": {
    en: "Cooking cream (20% fat)",
    ru: "Сливки 20 %",
    ar: "كريمة طبخ 20٪",
  },
  "Cooking cream (30 % fat)": {
    en: "Cooking cream (30% fat)",
    ru: "Сливки 30 %",
    ar: "كريمة طبخ 30٪",
  },
  "Cooking cream (Est.)": {
    en: "Cooking cream",
    ru: "Сливки для готовки",
    ar: "كريمة طبخ",
  },
  "Cooking oil": { en: "Cooking oil", ru: "Растительное масло", ar: "زيت طهي" },
  "Cooking oil (Est.)": {
    en: "Cooking oil",
    ru: "Растительное масло",
    ar: "زيت طهي",
  },
  "Cottage cheese": { en: "Cottage cheese", ru: "Творог", ar: "جبن قريش" },
  "Cottage cheese (Est.)": {
    en: "Cottage cheese",
    ru: "Творог",
    ar: "جبن قريش",
  },
  "Crushed tomato": {
    en: "Crushed tomato",
    ru: "Томаты, протёртые",
    ar: "طماطم مهروسة",
  },
  Cucumber: { en: "Cucumber", ru: "Огурец", ar: "خيار" },
  "Cucumber, diced": {
    en: "Cucumber, diced",
    ru: "Огурец, кубиками",
    ar: "خيار مكعبات",
  },
  "Cucumber, sliced": {
    en: "Cucumber, sliced",
    ru: "Огурец, ломтиками",
    ar: "خيار شرائح",
  },
  "Cumin seeds": { en: "Cumin seeds", ru: "Семена зиры", ar: "بذور الكمون" },
  "Dijon mustard": {
    en: "Dijon mustard",
    ru: "Дижонская горчица",
    ar: "خردل ديجون",
  },
  "Dried oregano": {
    en: "Dried oregano",
    ru: "Сушёный орегано",
    ar: "أوريغانو مجفف",
  },
  "Dried oregano/thyme (Optional)": {
    en: "Dried oregano or thyme (optional)",
    ru: "Сушёный орегано или тимьян (по желанию)",
    ar: "أوريغانو أو زعتر مجفف (اختياري)",
  },
  "Dry yeast": { en: "Dry yeast", ru: "Сухие дрожжи", ar: "خميرة جافة" },
  Egg: { en: "Egg", ru: "Яйцо", ar: "بيض" },
  "Egg (dough + wash)": {
    en: "Egg (dough and glaze)",
    ru: "Яйцо (в тесто и для смазки)",
    ar: "بيض (للعجين والدهن)",
  },
  "Egg (Est.)": { en: "Egg", ru: "Яйцо", ar: "بيض" },
  "Egg noodles (dry)": {
    en: "Egg noodles (dry)",
    ru: "Яичная лапша (сухая)",
    ar: "معكرونة بيض (جافة)",
  },
  "Egg wash": { en: "Egg glaze", ru: "Яйцо для смазки", ar: "بيض للدهن" },
  "Egg yolk (filling + wash)": {
    en: "Egg yolk (filling and glaze)",
    ru: "Яичный желток (в начинку и для смазки)",
    ar: "صفار بيض (للحشوة والدهن)",
  },
  "Egg, beaten": { en: "Egg, beaten", ru: "Яйцо, взбитое", ar: "بيض مخفوق" },
  "Egg, beaten (glaze)": {
    en: "Egg, beaten (glaze)",
    ru: "Яйцо, взбитое (для смазки)",
    ar: "بيض مخفوق (للدهن)",
  },
  Eggplant: { en: "Eggplant", ru: "Баклажан", ar: "باذنجان" },
  "Feta cheese": { en: "Feta cheese", ru: "Сыр фета", ar: "جبن فيتا" },
  "Fresh chili, rings": {
    en: "Fresh chili, rings",
    ru: "Свежий чили, кольцами",
    ar: "فلفل حار طازج حلقات",
  },
  "Fresh dill": { en: "Fresh dill", ru: "Свежий укроп", ar: "شبت طازج" },
  "Fresh dill (Est.)": { en: "Fresh dill", ru: "Свежий укроп", ar: "شبت طازج" },
  "Fresh dill (Estimated)": {
    en: "Fresh dill",
    ru: "Свежий укроп",
    ar: "شبت طازج",
  },
  "Frozen cranberries (Est.)": {
    en: "Frozen cranberries",
    ru: "Замороженная клюква",
    ar: "توت بري مجمد",
  },
  "Frozen raspberries (Est.)": {
    en: "Frozen raspberries",
    ru: "Замороженная малина",
    ar: "توت العليق مجمد",
  },
  "Frying oil (absorbed) (Est.)": {
    en: "Frying oil",
    ru: "Масло для жарки",
    ar: "زيت القلي",
  },
  Garlic: { en: "Garlic", ru: "Чеснок", ar: "ثوم" },
  "Garlic (Estimated)": { en: "Garlic", ru: "Чеснок", ar: "ثوم" },
  "Garlic, minced": {
    en: "Garlic, minced",
    ru: "Чеснок, измельчённый",
    ar: "ثوم مفروم",
  },
  "Gelatin (Estimated)": { en: "Gelatin", ru: "Желатин", ar: "جيلاتين" },
  Gherkins: { en: "Gherkins", ru: "Корнишоны", ar: "خيار مخلل صغير" },
  "Gherkins, diced": {
    en: "Gherkins, diced",
    ru: "Корнишоны, кубиками",
    ar: "خيار مخلل صغير مكعبات",
  },
  "Green apple": { en: "Green apple", ru: "Зелёное яблоко", ar: "تفاح أخضر" },
  "Green bell pepper": {
    en: "Green bell pepper",
    ru: "Зелёный болгарский перец",
    ar: "فلفل رومي أخضر",
  },
  "Green peas": { en: "Green peas", ru: "Зелёный горошек", ar: "بازلاء خضراء" },
  "Ground beef": {
    en: "Ground beef",
    ru: "Говяжий фарш",
    ar: "لحم بقري مفروم",
  },
  "Ground beef (85 % lean)": {
    en: "Ground beef (85% lean)",
    ru: "Говяжий фарш (85 % постный)",
    ar: "لحم بقري مفروم (85٪ خالٍ من الدهن)",
  },
  "Ground coriander": {
    en: "Ground coriander",
    ru: "Молотый кориандр",
    ar: "كزبرة مطحونة",
  },
  "Ground coriander (Est.)": {
    en: "Ground coriander",
    ru: "Молотый кориандр",
    ar: "كزبرة مطحونة",
  },
  "Ground cumin": { en: "Ground cumin", ru: "Молотая зира", ar: "كمون مطحون" },
  "Ground cumin (Est.)": {
    en: "Ground cumin",
    ru: "Молотая зира",
    ar: "كمون مطحون",
  },
  "Ground cumin (Estimated)": {
    en: "Ground cumin",
    ru: "Молотая зира",
    ar: "كمون مطحون",
  },
  "Ground cumin (Scaled)": {
    en: "Ground cumin",
    ru: "Молотая зира",
    ar: "كمون مطحون",
  },
  "Herring fillet": {
    en: "Herring fillet",
    ru: "Филе сельди",
    ar: "فيليه رنجة",
  },
  Honey: { en: "Honey", ru: "Мёд", ar: "عسل" },
  "Honey glaze (Est.)": {
    en: "Honey glaze",
    ru: "Медовая глазурь",
    ar: "صلصة العسل",
  },
  "Hot chili": { en: "Hot chili", ru: "Острый перец чили", ar: "فلفل حار" },
  "Icing sugar": { en: "Icing sugar", ru: "Сахарная пудра", ar: "سكر بودرة" },
  "Icing sugar (opt.)": {
    en: "Icing sugar (optional)",
    ru: "Сахарная пудра (по желанию)",
    ar: "سكر بودرة (اختياري)",
  },
  "Jam / condensed milk (Opt., Est.)": {
    en: "Jam or condensed milk (optional)",
    ru: "Джем или сгущённое молоко (по желанию)",
    ar: "مربى أو حليب مكثف (اختياري)",
  },
  Ketchup: { en: "Ketchup", ru: "Кетчуп", ar: "كاتشب" },
  "Laban (yogurt)": {
    en: "Laban (yogurt)",
    ru: "Лабан (кисломолочный напиток)",
    ar: "لبن",
  },
  "Lamb chop": { en: "Lamb chop", ru: "Бараньи рёбрышки", ar: "ريش غنم" },
  "Lamb chops (raw)": {
    en: "Lamb chops",
    ru: "Бараньи рёбрышки",
    ar: "ريش غنم",
  },
  "Lamb skewer": {
    en: "Lamb skewer",
    ru: "Шашлык из баранины",
    ar: "سيخ لحم غنم",
  },
  "Lamb tenderloin, cubed": {
    en: "Lamb tenderloin, cubed",
    ru: "Баранья вырезка, кубиками",
    ar: "خاصرة غنم مكعبات",
  },
  "Lemon juice": { en: "Lemon juice", ru: "Лимонный сок", ar: "عصير ليمون" },
  "Lemon slice": { en: "Lemon slice", ru: "Долька лимона", ar: "شريحة ليمون" },
  "Lime juice": { en: "Lime juice", ru: "Сок лайма", ar: "عصير ليمون أخضر" },
  "Long-grain rice, dry": {
    en: "Long-grain rice (dry)",
    ru: "Длиннозёрный рис (сухой)",
    ar: "أرز طويل الحبة (جاف)",
  },
  "Long-grain rice, soaked": {
    en: "Long-grain rice, soaked",
    ru: "Длиннозёрный рис, замоченный",
    ar: "أرز طويل الحبة منقوع",
  },
  "Lyulya kebab": { en: "Lyulya kebab", ru: "Люля-кебаб", ar: "لولا كباب" },
  Mayonnaise: { en: "Mayonnaise", ru: "Майонез", ar: "مايونيز" },
  "Melted butter (Est.)": {
    en: "Butter, melted",
    ru: "Растопленное сливочное масло",
    ar: "زبدة مذابة",
  },
  Milk: { en: "Milk", ru: "Молоко", ar: "حليب" },
  "Minced beef topside (Est.)": {
    en: "Minced beef",
    ru: "Говяжий фарш",
    ar: "لحم بقري مفروم",
  },
  "Minced chicken": {
    en: "Minced chicken",
    ru: "Куриный фарш",
    ar: "دجاج مفروم",
  },
  "Minced chicken breast (Est.)": {
    en: "Minced chicken breast",
    ru: "Фарш из куриной грудки",
    ar: "صدر دجاج مفروم",
  },
  "Minced topside beef": {
    en: "Minced beef",
    ru: "Говяжий фарш",
    ar: "لحم بقري مفروم",
  },
  "Minced topside beef (Est.)": {
    en: "Minced beef",
    ru: "Говяжий фарш",
    ar: "لحم بقري مفروم",
  },
  "Minced topside beef (Estimated)": {
    en: "Minced beef",
    ru: "Говяжий фарш",
    ar: "لحم بقري مفروم",
  },
  "Mushrooms, sliced": {
    en: "Mushrooms, sliced",
    ru: "Грибы, ломтиками",
    ar: "فطر شرائح",
  },
  "Mushrooms, sliced (Est.)": {
    en: "Mushrooms, sliced",
    ru: "Грибы, ломтиками",
    ar: "فطر شرائح",
  },
  "Olive oil": { en: "Olive oil", ru: "Оливковое масло", ar: "زيت زيتون" },
  "Olives, pitted": {
    en: "Olives, pitted",
    ru: "Оливки без косточек",
    ar: "زيتون منزوع النوى",
  },
  Onion: { en: "Onion", ru: "Лук", ar: "بصل" },
  "Onion, chopped": {
    en: "Onion, chopped",
    ru: "Лук, нарезанный",
    ar: "بصل مقطّع",
  },
  "Onion, diced": { en: "Onion, diced", ru: "Лук, кубиками", ar: "بصل مكعبات" },
  "Onion, finely chopped": {
    en: "Onion, finely chopped",
    ru: "Лук, мелко нарезанный",
    ar: "بصل مفروم ناعم",
  },
  "Onion, finely chopped (Est.)": {
    en: "Onion, finely chopped",
    ru: "Лук, мелко нарезанный",
    ar: "بصل مفروم ناعم",
  },
  "Onion, finely chopped (Estimated)": {
    en: "Onion, finely chopped",
    ru: "Лук, мелко нарезанный",
    ar: "بصل مفروم ناعم",
  },
  "Onion, grated": { en: "Onion, grated", ru: "Лук, тёртый", ar: "بصل مبشور" },
  "Onion, grated (Est.)": {
    en: "Onion, grated",
    ru: "Лук, тёртый",
    ar: "بصل مبشور",
  },
  "Onion, sautéed": {
    en: "Onion, sautéed",
    ru: "Лук, пассерованный",
    ar: "بصل مقلي",
  },
  "Onion, sliced": {
    en: "Onion, sliced",
    ru: "Лук, кольцами",
    ar: "بصل شرائح",
  },
  "Pancakes (3 pcs)": {
    en: "Pancakes (3 pcs)",
    ru: "Блины (3 шт.)",
    ar: "فطائر (3 قطع)",
  },
  Parsley: { en: "Parsley", ru: "Петрушка", ar: "بقدونس" },
  Peppercorns: { en: "Peppercorns", ru: "Перец горошком", ar: "حبات فلفل" },
  "Pickled cucumber": {
    en: "Pickled cucumber",
    ru: "Солёный огурец",
    ar: "خيار مخلل",
  },
  "Pie-dough (see above)": {
    en: "Pie dough",
    ru: "Тесто для пирога",
    ar: "عجينة الفطيرة",
  },
  "Pie-dough round": {
    en: "Pie dough round",
    ru: "Круг теста для пирога",
    ar: "قرص عجينة الفطيرة",
  },
  "Pomegranate molasses (Estimated)": {
    en: "Pomegranate molasses",
    ru: "Гранатовый соус",
    ar: "دبس الرمان",
  },
  "Potato, diced": {
    en: "Potato, diced",
    ru: "Картофель, кубиками",
    ar: "بطاطس مكعبات",
  },
  "Potato, diced (Scaled)": {
    en: "Potato, diced",
    ru: "Картофель, кубиками",
    ar: "بطاطس مكعبات",
  },
  "Potato, grated": {
    en: "Potato, grated",
    ru: "Картофель, тёртый",
    ar: "بطاطس مبشورة",
  },
  "Potato, raw sticks": {
    en: "Potato, cut into sticks",
    ru: "Картофель, брусочками",
    ar: "بطاطس أصابع",
  },
  "Potatoes, boiled, diced": {
    en: "Potatoes, boiled and diced",
    ru: "Картофель отварной, кубиками",
    ar: "بطاطس مسلوقة مكعبات",
  },
  "Potatoes, diced": {
    en: "Potato, diced",
    ru: "Картофель, кубиками",
    ar: "بطاطس مكعبات",
  },
  "Potatoes, peeled": {
    en: "Potatoes, peeled",
    ru: "Картофель, очищенный",
    ar: "بطاطس مقشرة",
  },
  "Prunes, diced": {
    en: "Prunes, diced",
    ru: "Чернослив, кубиками",
    ar: "برقوق مجفف مكعبات",
  },
  "Prunes, pitted": {
    en: "Prunes, pitted",
    ru: "Чернослив без косточек",
    ar: "برقوق مجفف منزوع النوى",
  },
  "Puff-pastry sheets (Est.)": {
    en: "Puff pastry sheets",
    ru: "Слоёное тесто, пласты",
    ar: "رقائق عجين مورق",
  },
  "Red bell pepper": {
    en: "Red bell pepper",
    ru: "Красный болгарский перец",
    ar: "فلفل رومي أحمر",
  },
  "Red cabbage": {
    en: "Red cabbage",
    ru: "Краснокочанная капуста",
    ar: "ملفوف أحمر",
  },
  "Red onion": { en: "Red onion", ru: "Красный лук", ar: "بصل أحمر" },
  "Red onion (Estimated)": {
    en: "Red onion",
    ru: "Красный лук",
    ar: "بصل أحمر",
  },
  "Rice, rinsed": { en: "Rice, rinsed", ru: "Рис, промытый", ar: "أرز مغسول" },
  "Rolled oats": { en: "Rolled oats", ru: "Овсяные хлопья", ar: "شوفان" },
  "Rye bread": { en: "Rye bread", ru: "Ржаной хлеб", ar: "خبز الجاودار" },
  "Rye bread slice": {
    en: "Rye bread slice",
    ru: "Ломтик ржаного хлеба",
    ar: "شريحة خبز الجاودار",
  },
  Salt: { en: "Salt", ru: "Соль", ar: "ملح" },
  "Salt (Est.)": { en: "Salt", ru: "Соль", ar: "ملح" },
  "Salt (Estimated)": { en: "Salt", ru: "Соль", ar: "ملح" },
  "Salt & pepper": {
    en: "Salt and pepper",
    ru: "Соль и перец",
    ar: "ملح وفلفل",
  },
  "Salt & pepper (Est.)": {
    en: "Salt and pepper",
    ru: "Соль и перец",
    ar: "ملح وفلفل",
  },
  "Self-raising flour": {
    en: "Self-raising flour",
    ru: "Мука с разрыхлителем",
    ar: "دقيق ذاتي التخمير",
  },
  "Sesame seeds": { en: "Sesame seeds", ru: "Кунжут", ar: "بذور السمسم" },
  "Smoked beef sausage": {
    en: "Smoked beef sausage",
    ru: "Копчёная говяжья колбаса",
    ar: "نقانق لحم بقري مدخنة",
  },
  "Smoked chicken sausage": {
    en: "Smoked chicken sausage",
    ru: "Копчёная куриная колбаса",
    ar: "نقانق دجاج مدخنة",
  },
  "Smoked paprika (Optional)": {
    en: "Smoked paprika (optional)",
    ru: "Копчёная паприка (по желанию)",
    ar: "بابريكا مدخنة (اختياري)",
  },
  "Soda water": { en: "Soda water", ru: "Газированная вода", ar: "مياه غازية" },
  "Sour cream": { en: "Sour cream", ru: "Сметана", ar: "قشدة حامضة" },
  "Sour cream (Est.)": { en: "Sour cream", ru: "Сметана", ar: "قشدة حامضة" },
  "Sour cream (Opt.)": {
    en: "Sour cream (optional)",
    ru: "Сметана (по желанию)",
    ar: "قشدة حامضة (اختياري)",
  },
  "Sour cream, serving (Est.)": {
    en: "Sour cream, to serve",
    ru: "Сметана к подаче",
    ar: "قشدة حامضة للتقديم",
  },
  "Sour cream, serving (Opt., Est.)": {
    en: "Sour cream, to serve (optional)",
    ru: "Сметана к подаче (по желанию)",
    ar: "قشدة حامضة للتقديم (اختياري)",
  },
  "Soy sauce": { en: "Soy sauce", ru: "Соевый соус", ar: "صلصة الصويا" },
  "Spring onion": { en: "Spring onion", ru: "Зелёный лук", ar: "بصل أخضر" },
  "Spring onion (Est.)": {
    en: "Spring onion",
    ru: "Зелёный лук",
    ar: "بصل أخضر",
  },
  Sugar: { en: "Sugar", ru: "Сахар", ar: "سكر" },
  "Sugar (Est.)": { en: "Sugar", ru: "Сахар", ar: "سكر" },
  "Sugar (Opt.)": {
    en: "Sugar (optional)",
    ru: "Сахар (по желанию)",
    ar: "سكر (اختياري)",
  },
  "Sunflower oil": {
    en: "Sunflower oil",
    ru: "Подсолнечное масло",
    ar: "زيت عباد الشمس",
  },
  "Sunflower oil (Est.)": {
    en: "Sunflower oil",
    ru: "Подсолнечное масло",
    ar: "زيت عباد الشمس",
  },
  "Sunflower oil (in dough)": {
    en: "Sunflower oil (in the dough)",
    ru: "Подсолнечное масло (в тесто)",
    ar: "زيت عباد الشمس (في العجين)",
  },
  "Sunflower oil, absorbed (Est.)": {
    en: "Sunflower oil",
    ru: "Подсолнечное масло",
    ar: "زيت عباد الشمس",
  },
  "Sweet paprika": {
    en: "Sweet paprika",
    ru: "Сладкая паприка",
    ar: "بابريكا حلوة",
  },
  "Sweet potato, raw sticks": {
    en: "Sweet potato, cut into sticks",
    ru: "Батат, брусочками",
    ar: "بطاطا حلوة أصابع",
  },
  "Sweet-chili sauce": {
    en: "Sweet chili sauce",
    ru: "Соус сладкий чили",
    ar: "صلصة الفلفل الحلو الحار",
  },
  "Sweetened condensed milk": {
    en: "Sweetened condensed milk",
    ru: "Сгущённое молоко",
    ar: "حليب مكثف محلى",
  },
  Tomato: { en: "Tomato", ru: "Помидор", ar: "طماطم" },
  "Tomato paste": {
    en: "Tomato paste",
    ru: "Томатная паста",
    ar: "معجون طماطم",
  },
  "Tomato, diced": {
    en: "Tomato, diced",
    ru: "Помидор, кубиками",
    ar: "طماطم مكعبات",
  },
  "Tomato, sliced": {
    en: "Tomato, sliced",
    ru: "Помидор, ломтиками",
    ar: "طماطم شرائح",
  },
  "Unsalted butter": {
    en: "Unsalted butter",
    ru: "Несолёное сливочное масло",
    ar: "زبدة غير مملحة",
  },
  "Vanilla essence (Est.)": {
    en: "Vanilla essence",
    ru: "Ванильная эссенция",
    ar: "خلاصة الفانيليا",
  },
  "Vegetable oil": {
    en: "Vegetable oil",
    ru: "Растительное масло",
    ar: "زيت نباتي",
  },
  "Vegetable oil (Est.)": {
    en: "Vegetable oil",
    ru: "Растительное масло",
    ar: "زيت نباتي",
  },
  "Vegetable oil (Estimated absorbed)": {
    en: "Vegetable oil",
    ru: "Растительное масло",
    ar: "زيت نباتي",
  },
  "Vegetable oil (Estimated)": {
    en: "Vegetable oil",
    ru: "Растительное масло",
    ar: "زيت نباتي",
  },
  "Vegetable oil, absorbed (Est.)": {
    en: "Vegetable oil",
    ru: "Растительное масло",
    ar: "زيت نباتي",
  },
  "Vegetable oil, brushing (Est.)": {
    en: "Vegetable oil, for brushing",
    ru: "Растительное масло для смазки",
    ar: "زيت نباتي للدهن",
  },
  Vinegar: { en: "Vinegar", ru: "Уксус", ar: "خل" },
  "Vinegar 6 %": { en: "Vinegar (6%)", ru: "Уксус 6 %", ar: "خل 6٪" },
  Walnuts: { en: "Walnuts", ru: "Грецкие орехи", ar: "جوز" },
  "Walnuts, chopped": {
    en: "Walnuts, chopped",
    ru: "Грецкие орехи, рубленые",
    ar: "جوز مفروم",
  },
  "Walnuts, crushed (Estimated)": {
    en: "Walnuts, crushed",
    ru: "Грецкие орехи, дроблёные",
    ar: "جوز مجروش",
  },
  "Warm milk": { en: "Warm milk", ru: "Тёплое молоко", ar: "حليب دافئ" },
  "Warm water (Estimated)": {
    en: "Warm water",
    ru: "Тёплая вода",
    ar: "ماء دافئ",
  },
  Water: { en: "Water", ru: "Вода", ar: "ماء" },
  "Water (Est.)": { en: "Water", ru: "Вода", ar: "ماء" },
  "Water (Estimated)": { en: "Water", ru: "Вода", ar: "ماء" },
  "White cabbage": {
    en: "White cabbage",
    ru: "Белокочанная капуста",
    ar: "ملفوف أبيض",
  },
  "White cabbage, chopped": {
    en: "White cabbage, chopped",
    ru: "Белокочанная капуста, шинкованная",
    ar: "ملفوف أبيض مقطّع",
  },
  "White onion": { en: "White onion", ru: "Белый лук", ar: "بصل أبيض" },
  "White rice, dry": {
    en: "White rice (dry)",
    ru: "Белый рис (сухой)",
    ar: "أرز أبيض (جاف)",
  },
  "White vinegar": { en: "White vinegar", ru: "Белый уксус", ar: "خل أبيض" },
  "White-cabbage pickle (sauerkraut)": {
    en: "Sauerkraut",
    ru: "Квашеная капуста",
    ar: "ملفوف مخلل",
  },
  "Whole garlic": {
    en: "Whole garlic cloves",
    ru: "Чеснок, целые зубчики",
    ar: "فصوص ثوم كاملة",
  },
  "Whole milk": {
    en: "Whole milk",
    ru: "Цельное молоко",
    ar: "حليب كامل الدسم",
  },
  "Whole milk (Est.)": {
    en: "Whole milk",
    ru: "Цельное молоко",
    ar: "حليب كامل الدسم",
  },
  "Yellow bell pepper": {
    en: "Yellow bell pepper",
    ru: "Жёлтый болгарский перец",
    ar: "فلفل رومي أصفر",
  },
};

// Spreadsheet header rows that leaked into the data and must never render.
const INGREDIENT_BLOCKLIST = new Set(["Name"]);

export const isRenderableIngredient = (raw) =>
  Boolean(raw) && !INGREDIENT_BLOCKLIST.has(raw.trim());

export const pickIngredient = (raw, lang) => {
  if (!raw) return "";
  const entry = INGREDIENT_NAMES[raw.trim()];
  if (!entry) return raw;
  return entry[lang] || entry.en || raw;
};

export { INGREDIENT_NAMES };

// Deduped ingredient list for the menu filter, keyed by the canonical English
// display name. Several raw spreadsheet strings collapse to one entry once the
// "(Est.)" provenance notes are stripped, so the filter shows ~210 real
// ingredients rather than 250 near-duplicates.
export const INGREDIENT_OPTIONS = (() => {
  const byEn = new Map();
  for (const entry of Object.values(INGREDIENT_NAMES)) {
    if (!byEn.has(entry.en)) byEn.set(entry.en, { id: entry.en, ...entry });
  }
  return [...byEn.values()].sort((a, b) => a.en.localeCompare(b.en));
})();

// Canonical ingredient id for a raw menuItems.js string, or null if the
// string is a leaked spreadsheet header rather than a real ingredient.
export const ingredientId = (raw) => {
  if (!isRenderableIngredient(raw)) return null;
  return INGREDIENT_NAMES[raw.trim()]?.en ?? raw;
};

// Does this dish contain ANY of the given ingredient ids?
//
// ANY rather than ALL, for both filters. For "without" it is the only sane
// reading - excluding nuts AND dairy means dropping anything with either.
// For "contains" it matches how faceted filters behave everywhere else:
// ticking Beef and Chicken means "show me either", not "show me dishes
// containing both".
export const itemHasAnyIngredient = (item, ingredientIds) => {
  if (!ingredientIds?.length) return false;
  const wanted = new Set(ingredientIds);
  return (item.ingredients ?? []).some((raw) => {
    const id = ingredientId(raw);
    return id !== null && wanted.has(id);
  });
};
