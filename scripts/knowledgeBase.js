(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CS2_KB = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // Katalog wszystkich broni
  const WEAPONS = {
    // Pistolety
    glock: {
      id: "glock",
      name: "Glock-18",
      side: "T",
      category: "pistol",
      categoryName: "Pistolet",
      price: 200,
      killReward: 300,
      damage: 30,
      headshotMultiplier: "4.0x",
      fireRate: 400,
      armorPen: 47,
      magCapacity: "20 / 120",
      recoilControl: "Wysoka",
      description: "Domyślny pistolet Terrorystów. Posiada duży magazynek (20 naboi) i tryb serii (burst-fire). Skuteczny w rundach pistoletowych na bliski dystans.",
      strengths: ["Duży magazynek", "Darmowy na start", "Wysoka celność w biegu"]
    },
    usp: {
      id: "usp",
      name: "USP-S",
      side: "CT",
      category: "pistol",
      categoryName: "Pistolet",
      price: 200,
      killReward: 300,
      damage: 35,
      headshotMultiplier: "4.0x",
      fireRate: 352,
      armorPen: 50.5,
      magCapacity: "12 / 24",
      recoilControl: "Bardzo wysoka",
      description: "Domyślny wyciszony pistolet Antyterrorystów. Bezwzględna precyzja pierwszego strzału, brak smug pocisków i śmiertelny 1-tap w głowę na cele bez hełmu.",
      strengths: ["Wyciszenie (brak radaru)", "Wyjątkowa celność pierwszego strzału", "Wysokie obrażenia w głowę"]
    },
    p2000: {
      id: "p2000",
      name: "P2000",
      side: "CT",
      category: "pistol",
      categoryName: "Pistolet",
      price: 200,
      killReward: 300,
      damage: 35,
      headshotMultiplier: "4.0x",
      fireRate: 352,
      armorPen: 50.5,
      magCapacity: "13 / 52",
      recoilControl: "Bardzo wysoka",
      description: "Alternatywny pistolet startowy CT. Nie posiada tłumika, lecz oferuje większy zapas amunicji rezerwowej (52 naboje) do odpierania zmasowanego rusha T.",
      strengths: ["Duży zapas amunicji", "Wybaczający spam", "Darmowy na start"]
    },
    dual_berettas: {
      id: "dual_berettas",
      name: "Dual Berettas",
      side: "BOTH",
      category: "pistol",
      categoryName: "Pistolet",
      price: 300,
      killReward: 300,
      damage: 38,
      headshotMultiplier: "4.0x",
      fireRate: 500,
      armorPen: 57.5,
      magCapacity: "30 / 120",
      recoilControl: "Średnia",
      description: "Dwa pistolety oferujące olbrzymi magazynek (30) i szybkostrzelność. Zabójcze na bliskim dystansie w wąskich gardłach przeciwko przeciwnikom bez pancerza.",
      strengths: ["Ogromny magazynek 30 naboi", "Wysoki DPS na bliski dystans", "Świetne na anty-rush"]
    },
    p250: {
      id: "p250",
      name: "P250",
      side: "BOTH",
      category: "pistol",
      categoryName: "Pistolet",
      price: 300,
      killReward: 300,
      damage: 38,
      headshotMultiplier: "4.0x",
      fireRate: 400,
      armorPen: 64,
      magCapacity: "13 / 26",
      recoilControl: "Średnia",
      description: "Niedrogi pistolet o przyzwoitej penetracji pancerza. Idealny wybór do rundy eco/force, gdy chcesz zachować budżet na granaty lub kamizelkę.",
      strengths: ["Tani ($300)", "Dobra penetracja pancerza", "Świetny jako broń boczna snajpera"]
    },
    fiveseven: {
      id: "fiveseven",
      name: "Five-SeveN",
      side: "CT",
      category: "pistol",
      categoryName: "Pistolet",
      price: 500,
      killReward: 300,
      damage: 32,
      headshotMultiplier: "4.0x",
      fireRate: 400,
      armorPen: 91.1,
      magCapacity: "20 / 100",
      recoilControl: "Wysoka",
      description: "Ekskluzywny pistolet CT. Posiada aż 91% penetracji pancerza i potrafi zlikwidować wroga jednym strzałem w głowę z bliska. Magazynek na 20 naboi.",
      strengths: ["Potężna penetracja pancerza (91%)", "1-tap w głowę z bliska", "Pojemny magazynek 20 naboi"]
    },
    tec9: {
      id: "tec9",
      name: "Tec-9",
      side: "T",
      category: "pistol",
      categoryName: "Pistolet",
      price: 500,
      killReward: 300,
      damage: 33,
      headshotMultiplier: "4.0x",
      fireRate: 500,
      armorPen: 90.6,
      magCapacity: "18 / 90",
      recoilControl: "Średnia",
      description: "Bojowy pistolet ofensywny Terrorystów. Niezrównana celność pierwszych strzałów w pełnym biegu (run-and-gun) oraz zabójczy 1-tap z bliska.",
      strengths: ["Ekstremalna celność w biegu", "1-tap w hełm z bliska", "Idealny do agresywnych wejść (entry)"]
    },
    cz75: {
      id: "cz75",
      name: "CZ75-Auto",
      side: "BOTH",
      category: "pistol",
      categoryName: "Pistolet",
      price: 500,
      killReward: 100,
      damage: 31,
      headshotMultiplier: "4.0x",
      fireRate: 600,
      armorPen: 77.6,
      magCapacity: "12 / 12",
      recoilControl: "Niska",
      description: "W pełni automatyczny pistolet kieszonkowy. Służy do zaczajenia się za rogiem, błyskawicznego powalenia przeciwnika z karabinem i przejęcia jego broni.",
      strengths: ["Tryb w pełni automatyczny", "Błyskawiczne Time-to-Kill na blisko", "Idealny do zasadzek (ambush)"]
    },
    deagle: {
      id: "deagle",
      name: "Desert Eagle",
      side: "BOTH",
      category: "pistol",
      categoryName: "Pistolet",
      price: 700,
      killReward: 300,
      damage: 53,
      headshotMultiplier: "3.9x",
      fireRate: 267,
      armorPen: 93.2,
      magCapacity: "7 / 35",
      recoilControl: "Bardzo niska",
      description: "Legendarny pistolet dużej mocy. Likwiduje jednym strzałem w głowę na każdym dystansie, nawet przez hełm. Wymaga nienagannego opanowania resetu celownika.",
      strengths: ["1-shot kill w głowę z dowolnego dystansu", "Wysokie obrażenia przez ściany (wallbang)", "Może sam wygrać rundę eco"]
    },
    r8: {
      id: "r8",
      name: "R8 Revolver",
      side: "BOTH",
      category: "pistol",
      categoryName: "Pistolet",
      price: 600,
      killReward: 300,
      damage: 86,
      headshotMultiplier: "3.9x",
      fireRate: 150,
      armorPen: 93.2,
      magCapacity: "8 / 8",
      recoilControl: "Niska",
      description: "Rewolwer zadający potężne 86 pkt obrażeń w korpus z opóźnionym naciągiem kurka. Niezwykle celny w marszu i groźny przy pre-fire w wąskie przejścia.",
      strengths: ["Drastyczne obrażenia w korpus (86 pkt)", "Wysoka celność w marszu", "Znakomity do team-taggingu i pre-fire"]
    },

    // SMG
    mac10: {
      id: "mac10",
      name: "MAC-10",
      side: "T",
      category: "smg",
      categoryName: "Pistolet Maszynowy",
      price: 1050,
      killReward: 600,
      damage: 29,
      headshotMultiplier: "4.0x",
      fireRate: 800,
      armorPen: 57.5,
      magCapacity: "30 / 100",
      recoilControl: "Średnia",
      description: "Niezwykle tani i zwinny PM strony T. Gwarantuje nagrodę $600 za zabójstwo i pozwala na bezustanny sprint ze strzelaniem prosto w cele wroga.",
      strengths: ["Brak spowolnienia w sprincie", "Podwójna nagroda ($600)", "Tani ($1050) – potęga ekonomiczna"]
    },
    mp9: {
      id: "mp9",
      name: "MP9",
      side: "CT",
      category: "smg",
      categoryName: "Pistolet Maszynowy",
      price: 1250,
      killReward: 600,
      damage: 26,
      headshotMultiplier: "4.0x",
      fireRate: 857,
      armorPen: 60,
      magCapacity: "30 / 120",
      recoilControl: "Średnia",
      description: "Broń CT o najwyższej szybkostrzelności (857 RPM). Fenomenalna celność w skoku i w biegu, doskonała do agresywnego zwiadu i odbijania bombsite'u.",
      strengths: ["Błyskawiczna szybkostrzelność", "Wysoka celność w skoku i biegu", "Nagroda $600 za fraga"]
    },
    mp7: {
      id: "mp7",
      name: "MP7",
      side: "BOTH",
      category: "smg",
      categoryName: "Pistolet Maszynowy",
      price: 1500,
      killReward: 600,
      damage: 29,
      headshotMultiplier: "4.0x",
      fireRate: 750,
      armorPen: 62.5,
      magCapacity: "30 / 120",
      recoilControl: "Wysoka",
      description: "Zbalansowany pistolet maszynowy o wysokiej celności na średnim dystansie i stabilnym odrzucie. Pewny wybór, gdy spodziewasz się walki na granicy zasięgu PM.",
      strengths: ["Stabilny odrzut", "Dobry zasięg efektywny jak na PM", "Uniwersalność dla obu frakcji"]
    },
    mp5sd: {
      id: "mp5sd",
      name: "MP5-SD",
      side: "BOTH",
      category: "smg",
      categoryName: "Pistolet Maszynowy",
      price: 1500,
      killReward: 600,
      damage: 27,
      headshotMultiplier: "4.0x",
      fireRate: 750,
      armorPen: 62.5,
      magCapacity: "30 / 120",
      recoilControl: "Wysoka",
      description: "Wyciszony wariant PM-a. Nie ujawnia pozycji na radarze i nie pozostawia smug pocisków przez dym, co czyni go wymarzoną bronią dla cichego lurkera.",
      strengths: ["Wbudowany tłumik", "Brak smug przez dymy", "Ukryta pozycja na minimapie"]
    },
    ump45: {
      id: "ump45",
      name: "UMP-45",
      side: "BOTH",
      category: "smg",
      categoryName: "Pistolet Maszynowy",
      price: 1200,
      killReward: 600,
      damage: 35,
      headshotMultiplier: "4.0x",
      fireRate: 666,
      armorPen: 65,
      magCapacity: "25 / 100",
      recoilControl: "Średnia",
      description: "PM o kalibrze .45 ACP o wysokich obrażeniach na strzał i dobrej penetracji pancerza. Działa niemal jak miniaturowy karabin na bliskim dystansie.",
      strengths: ["Wysokie obrażenia bazowe (35)", "Dobra penetracja pancerza", "Niska cena ($1200)"]
    },
    p90: {
      id: "p90",
      name: "P90",
      side: "BOTH",
      category: "smg",
      categoryName: "Pistolet Maszynowy",
      price: 2350,
      killReward: 300,
      damage: 26,
      headshotMultiplier: "4.0x",
      fireRate: 857,
      armorPen: 69,
      magCapacity: "50 / 100",
      recoilControl: "Bardzo wysoka",
      description: "Słynny 'pro90' z 50-nabojowym magazynkiem. Umożliwia nieprzerwany ostrzał w pełnym biegu, wybaczając pudła i niwelując błędy początkujących graczy.",
      strengths: ["Magazynek 50 naboi", "Ogromna łatwość run-and-gun", "Maksymalne wybaczanie błędów"]
    },
    bizon: {
      id: "bizon",
      name: "PP-Bizon",
      side: "BOTH",
      category: "smg",
      categoryName: "Pistolet Maszynowy",
      price: 1400,
      killReward: 600,
      damage: 27,
      headshotMultiplier: "4.0x",
      fireRate: 750,
      armorPen: 47.5,
      magCapacity: "64 / 120",
      recoilControl: "Bardzo wysoka",
      description: "Bębenkowy magazynek mieszczący aż 64 naboje. Idealna broń anty-eco na przeciwników bez kamizelek, pozwalająca na zasypanie ich niekończącym się gradem kul.",
      strengths: ["Rekordowy magazynek (64 naboje)", "Znakomity na wrogów bez pancerza", "Podwójna nagroda ($600)"]
    },

    // Karabiny
    galilar: {
      id: "galilar",
      name: "Galil AR",
      side: "T",
      category: "rifle",
      categoryName: "Karabin Szturmowy",
      price: 1800,
      killReward: 300,
      damage: 30,
      headshotMultiplier: "4.0x",
      fireRate: 666,
      armorPen: 77.5,
      magCapacity: "35 / 90",
      recoilControl: "Średnia",
      description: "Ekonomiczny karabin szturmowy Terrorystów. Posiada pojemny magazynek (35 naboi) i solidną siłę ognia przy cenie zaledwie $1800.",
      strengths: ["Cena tylko $1800", "Duży magazynek (35 naboi)", "Prawdziwy karabin w cenie PM-a"]
    },
    famas: {
      id: "famas",
      name: "FAMAS",
      side: "CT",
      category: "rifle",
      categoryName: "Karabin Szturmowy",
      price: 2050,
      killReward: 300,
      damage: 30,
      headshotMultiplier: "4.0x",
      fireRate: 666,
      armorPen: 70,
      magCapacity: "25 / 90",
      recoilControl: "Średnia",
      description: "Podstawowy karabin budżetowy CT. Posiada opcję strzelania serią 3 pocisków (burst-fire), przydatną do walki na daleki dystans.",
      strengths: ["Opcja burst-fire na dystans", "Najtańszy karabin CT ($2050)", "Lepsza penetracja niż PM-y"]
    },
    ak47: {
      id: "ak47",
      name: "AK-47",
      side: "T",
      category: "rifle",
      categoryName: "Karabin Szturmowy",
      price: 2700,
      killReward: 300,
      damage: 36,
      headshotMultiplier: "4.0x",
      fireRate: 600,
      armorPen: 77.5,
      magCapacity: "30 / 90",
      recoilControl: "Średnia",
      description: "Król karabinów w CS2. Likwiduje wroga jednym strzałem w głowę z dowolnego dystansu nawet przez hełm (1-tap). Podstawa wyposażenia każdego Terrorysty.",
      strengths: ["1-shot kill w głowę przez hełm", "Niezrównany stosunek ceny do jakości", "Uniwersalny na każdy dystans"]
    },
    m4a4: {
      id: "m4a4",
      name: "M4A4",
      side: "CT",
      category: "rifle",
      categoryName: "Karabin Szturmowy",
      price: 3000,
      killReward: 300,
      damage: 33,
      headshotMultiplier: "4.0x",
      fireRate: 666,
      armorPen: 70,
      magCapacity: "30 / 90",
      recoilControl: "Wysoka",
      description: "Klasyczny karabin CT z magazynkiem na 30 naboi. Wyższa szybkostrzelność i większa pojemność niż M4A1-S czynią go doskonałym do odpierania zmasowanego ataku i spray-transferów.",
      strengths: ["30 naboi w magazynku", "Wysoka szybkostrzelność", "Znakomity do wielocelowej obrony (anchor)"]
    },
    m4a1s: {
      id: "m4a1s",
      name: "M4A1-S",
      side: "CT",
      category: "rifle",
      categoryName: "Karabin Szturmowy",
      price: 2900,
      killReward: 300,
      damage: 38,
      headshotMultiplier: "4.0x",
      fireRate: 600,
      armorPen: 70,
      magCapacity: "20 / 80",
      recoilControl: "Bardzo wysoka",
      description: "Wyciszony karabin CT o minimalnym odrzucie, ogromnych obrażeniach bazowych (38) i laserowej celności. Niezwykle łatwy do opanowania dla początkujących.",
      strengths: ["Bardzo łatwy odrzut", "Wyciszenie i brak smug pocisków", "Wysokie obrażenia w korpus (4-shot kill)"]
    },
    sg553: {
      id: "sg553",
      name: "SG 553",
      side: "T",
      category: "rifle",
      categoryName: "Karabin z Celownikiem",
      price: 3000,
      killReward: 300,
      damage: 30,
      headshotMultiplier: "4.0x",
      fireRate: 545,
      armorPen: 100,
      magCapacity: "30 / 90",
      recoilControl: "Średnia",
      description: "Karabin T wyposażony w lunetę optyczną i 100% penetrację pancerza. Pozwala na bezbłędne trafianie w głowę z dużej odległości bez konieczności kupowania AWP.",
      strengths: ["Przybliżenie optyczne (Scope)", "100% penetracja pancerza", "1-tap w głowę na dalekie odległości"]
    },
    aug: {
      id: "aug",
      name: "AUG",
      side: "CT",
      category: "rifle",
      categoryName: "Karabin z Celownikiem",
      price: 3300,
      killReward: 300,
      damage: 28,
      headshotMultiplier: "4.0x",
      fireRate: 600,
      armorPen: 90,
      magCapacity: "30 / 90",
      recoilControl: "Wysoka",
      description: "Karabin CT z lunetą optyczną. Na bliskim dystansie posiada potencjał 1-tap w głowę, a zoom ułatwia zaryglowanie długich alei na bombsite.",
      strengths: ["Optyczny celownik ułatwiający celowanie", "Możliwy 1-tap w głowę z bliska", "Imponująca celność w obronie"]
    },

    // Snajperki
    ssg08: {
      id: "ssg08",
      name: "SSG 08",
      side: "BOTH",
      category: "sniper",
      categoryName: "Karabin Snajperski",
      price: 1700,
      killReward: 300,
      damage: 88,
      headshotMultiplier: "4.0x",
      fireRate: 48,
      armorPen: 85,
      magCapacity: "10 / 90",
      recoilControl: "Perfekcyjna",
      description: "Lekka snajperka ('Scout') o wysokiej mobilności. Umożliwia precyzyjny strzał na szczycie skoku (jump-shot) i zabija w głowę jednym trafieniem.",
      strengths: ["Zabójstwo w głowę za $1700", "Pełna prędkość biegu", "Perfekcyjna celność na szczycie skoku"]
    },
    awp: {
      id: "awp",
      name: "AWP",
      side: "BOTH",
      category: "sniper",
      categoryName: "Karabin Snajperski",
      price: 4750,
      killReward: 100,
      damage: 115,
      headshotMultiplier: "4.0x",
      fireRate: 41,
      armorPen: 97.5,
      magCapacity: "5 / 30",
      recoilControl: "Perfekcyjna",
      description: "Najpotężniejsza broń dystansowa w CS2. Likwiduje jednym strzałem w klatkę piersiową lub głowę. Decyduje o losach całego meczu.",
      strengths: ["1-shot kill w korpus i głowę", "Absolutna kontrola długich alei", "Maksymalny respekt przeciwnika"]
    },
    g3sg1: {
      id: "g3sg1",
      name: "G3SG1",
      side: "T",
      category: "sniper",
      categoryName: "Auto-Snajperka",
      price: 5000,
      killReward: 300,
      damage: 80,
      headshotMultiplier: "4.0x",
      fireRate: 240,
      armorPen: 82.5,
      magCapacity: "20 / 90",
      recoilControl: "Średnia",
      description: "Samopowtarzalny karabin snajperski Terrorystów z 20-nabojowym magazynkiem. Zapewnia niszczycielski spam z lunetą na dalekich pozycjach.",
      strengths: ["Automatyczny ogień z lunetą", "20 naboi bez przeładowania", "Psychologiczna dominacja na długich alejach"]
    },
    scar20: {
      id: "scar20",
      name: "SCAR-20",
      side: "CT",
      category: "sniper",
      categoryName: "Auto-Snajperka",
      price: 5000,
      killReward: 300,
      damage: 80,
      headshotMultiplier: "4.0x",
      fireRate: 240,
      armorPen: 82.5,
      magCapacity: "20 / 90",
      recoilControl: "Średnia",
      description: "Auto-snajperka Antyterrorystów. Bezlitosna broń defensywna zatrzymująca każdy rush w wąskich korytarzach dzięki szybkiej sekwencji dwóch trafień w korpus.",
      strengths: ["Błyskawiczne 2-shot kill w korpus", "Ciągły ogień zasilany lunetą", "Całkowite zablokowanie przejść"]
    },

    // Ciężkie i strzelby
    nova: {
      id: "nova",
      name: "Nova",
      side: "BOTH",
      category: "heavy",
      categoryName: "Strzelba",
      price: 1050,
      killReward: 900,
      damage: 240,
      headshotMultiplier: "4.0x",
      fireRate: 68,
      armorPen: 50,
      magCapacity: "8 / 32",
      recoilControl: "Losowa",
      description: "Tania strzelba powtarzalna o zwartym skupieniu śrutu. Gwarantuje potrójną nagrodę ($900) za zabójstwo i potrafi zaskoczyć precyzyjnym strzałem w głowę.",
      strengths: ["Ogromna nagroda $900 za zabójstwo", "Tania ($1050)", "Dobre skupienie śrutu na średnio-bliski dystans"]
    },
    xm1014: {
      id: "xm1014",
      name: "XM1014",
      side: "BOTH",
      category: "heavy",
      categoryName: "Strzelba",
      price: 2000,
      killReward: 900,
      damage: 240,
      headshotMultiplier: "4.0x",
      fireRate: 171,
      armorPen: 80,
      magCapacity: "7 / 32",
      recoilControl: "Losowa",
      description: "Automatyczna strzelba bojowa. Posiada aż 80% penetracji pancerza i pozwala na nieprzerwany ostrzał bez konieczności przeładowywania po każdym strzale.",
      strengths: ["Automatyczny ogień śrutowy", "Wysoka penetracja pancerza (80%)", "Nagroda $900 za każdego fraga"]
    },
    mag7: {
      id: "mag7",
      name: "MAG-7",
      side: "CT",
      category: "heavy",
      categoryName: "Strzelba",
      price: 1300,
      killReward: 900,
      damage: 240,
      headshotMultiplier: "4.0x",
      fireRate: 71,
      armorPen: 75,
      magCapacity: "5 / 30",
      recoilControl: "Losowa",
      description: "Ekskluzywna strzelba CT przeładowywana magazynkiem pudełkowym. Doskonała celność w wyskoku zza osłony (jump-shot w apartamentach Mirage lub na Bananie).",
      strengths: ["Śmiertelna z bliska (1-shot)", "Precyzja w wyskoku", "Szybkie przeładowanie z magazynka"]
    },
    sawedoff: {
      id: "sawedoff",
      name: "Sawed-Off",
      side: "T",
      category: "heavy",
      categoryName: "Strzelba",
      price: 1100,
      killReward: 900,
      damage: 256,
      headshotMultiplier: "4.0x",
      fireRate: 71,
      armorPen: 75,
      magCapacity: "7 / 32",
      recoilControl: "Losowa",
      description: "Skrócona strzelba Terrorystów o potężnej sile niszczącej z zerowej odległości. Broń do czyszczenia ciasnych zakamarków przy wejściu na bombsite.",
      strengths: ["Maksymalne zniszczenie w kontakcie bezpośrednim", "Tania ($1100)", "Nagroda $900 za zabójstwo"]
    },
    m249: {
      id: "m249",
      name: "M249",
      side: "BOTH",
      category: "heavy",
      categoryName: "Ciężki Karabin Maszynowy",
      price: 5200,
      killReward: 300,
      damage: 32,
      headshotMultiplier: "4.0x",
      fireRate: 750,
      armorPen: 80,
      magCapacity: "100 / 200",
      recoilControl: "Niska",
      description: "Ciężki karabin maszynowy z taśmą 100 naboi. Broń prestiżowa na radosne rundy z nadmiarem gotówki, służąca do nieprzerwanego prucia przez ściany i osłony.",
      strengths: ["Taśma 100 naboi", "Wysokie obrażenia i szybkostrzelność", "Efekt psychologiczny i penetracja ścian"]
    },
    negev: {
      id: "negev",
      name: "Negev",
      side: "BOTH",
      category: "heavy",
      categoryName: "Ciężki Karabin Maszynowy",
      price: 1700,
      killReward: 300,
      damage: 35,
      headshotMultiplier: "4.0x",
      fireRate: 800,
      armorPen: 71,
      magCapacity: "150 / 300",
      recoilControl: "Wysoka",
      description: "Tani CKM ($1700) o niesamowitej cesze: po oddaniu pierwszych 10 pocisków staje się absolutnym 'laserem' o zerowym rozrzucie, blokując korytarz na 15 sekund.",
      strengths: ["Tani ($1700)", "Niezrównany laser zaporowy po krótkiej serii", "150 naboi ciągłego ognia zaporowego"]
    }
  };


  // Schemat faktów w pamięci roboczej
  const FACT_DEFINITIONS = {
    side: {
      label: "Frakcja gracza",
      options: {
        T: "Terroryści (T)",
        CT: "Antyterroryści (CT)"
      }
    },
    round_economy: {
      label: "Budżet na rundę",
      options: {
        eco: "Eco (<$1500) - twarde oszczędzanie / pistolety",
        force: "Force ($1500–$2400) - ryzykowny zakup pistolet/PM/strzelba",
        semi: "Semi ($2400–$3700) - pół-zakup / PM / tani karabin",
        full: "Full Buy ($3700–$5000) - główne karabiny / AWP",
        rich: "Duży budżet (>$5000) - nadmiar funduszy / najcięższa broń"
      }
    },
    tactical_role: {
      label: "Rola taktyczna w rundzie",
      options: {
        entry: "Entry Fragger / Agresywne wejście (pierwsza linia natarcia)",
        anchor: "Anchor / Obrona bombsite'u (utrzymanie pozycji i zaryglowanie kątów)",
        lurk: "Lurker / Cichy zwiad (flankowanie, ciche podejście, gra z dymów)",
        sniper_support: "Snajper / Wsparcie dystansowe (kontrola długich stref, eliminacja 1 strzałem)",
        anti_rush: "Anty-rush / Zabezpieczenie przejść (zatrzymanie zmasowanego natarcia)"
      }
    },
    engagement_distance: {
      label: "Planowany dystans starć",
      options: {
        close: "Bliski (CQB / ciasne korytarze / wjazdy)",
        medium: "Średni (standardowe starcia na bombsite)",
        long: "Daleki (długie aleje / pojedynki z dystansu)"
      }
    },
    weapon_feature: {
      label: "Cechy konstrukcyjne broni",
      options: {
        standard: "Standardowa konstrukcja (maksymalna mobilność i siła ognia)",
        silencer: "Tłumik dźwięku (cichy strzał, ukrycie na radarze, brak smug)",
        scope: "Luneta / celownik optyczny (dodatkowy zoom na odległość)",
        high_capacity: "Powiększony magazynek (dużo amunicji, zaporowy ogień)"
      }
    },
    playstyle: {
      label: "Styl walki i strzelania",
      options: {
        precision: "Precyzja (1-tap w głowę, precyzyjne serie)",
        run_and_gun: "Strzelanie w biegu (agresywne natarcie w ruchu)",
        spray_defense: "Kontrola odrzutu / ogień zaporowy (obrona pozycji)"
      }
    }
  };

  // Reguły dla wszystkcich broni
  const RULES = [
    // 1. Eco
    {
      id: "R_GLOCK",
      name: "Glock-18",
      conditions: { side: "T", round_economy: "eco", playstyle: "run_and_gun" },
      conclusion: { primaryWeaponId: "glock" },
      rationale: "Darmowy pistolet Terrorystów na rundę eco. Duży magazynek i celność w biegu."
    },
    {
      id: "R_USP",
      name: "USP-S",
      conditions: { side: "CT", round_economy: "eco", weapon_feature: "silencer" },
      conclusion: { primaryWeaponId: "usp" },
      rationale: "Domyślny pistolet CT z tłumikiem do precyzyjnych strzałów w głowę i cichego lurku."
    },
    {
      id: "R_P2000",
      name: "P2000",
      conditions: { side: "CT", round_economy: "eco", weapon_feature: "standard" },
      conclusion: { primaryWeaponId: "p2000" },
      rationale: "Alternatywny pistolet CT z powiększoną rezerwą amunicji."
    },
    {
      id: "R_DUAL_BERETTAS",
      name: "Dual Berettas",
      conditions: { round_economy: "eco", weapon_feature: "high_capacity" },
      conclusion: { primaryWeaponId: "dual_berettas" },
      rationale: "Podwójne, niezbyt celne pistolety do zasypania przeciwnika gradem kul z bliska."
    },
    {
      id: "R_P250",
      name: "P250",
      conditions: { round_economy: "eco", playstyle: "precision" },
      conclusion: { primaryWeaponId: "p250" },
      rationale: "Niedrogi pistolet o przyzwoitej penetracji pancerza i dobrej celności."
    },

    // 2. Force
    {
      id: "R_TEC9",
      name: "Tec-9",
      conditions: { side: "T", round_economy: "force", tactical_role: "entry", playstyle: "run_and_gun" },
      conclusion: { primaryWeaponId: "tec9" },
      rationale: "Ofensywny pistolet T do agresywnego natarcia i strzelania w pełnym biegu."
    },
    {
      id: "R_FIVESEVEN",
      name: "Five-SeveN",
      conditions: { side: "CT", round_economy: "force", tactical_role: "anchor", weapon_feature: "high_capacity" },
      conclusion: { primaryWeaponId: "fiveseven" },
      rationale: "Pistolet CT z dużym magazynkiem, ekstremalnie śmiertelny na krótkim dystansie."
    },
    {
      id: "R_DEAGLE",
      name: "Desert Eagle",
      conditions: { round_economy: "force", tactical_role: "sniper_support", engagement_distance: "long" },
      conclusion: { primaryWeaponId: "deagle" },
      rationale: "Legendarny pistolet, kieszonkowa snajperka. Wymaga precyzji."
    },
    {
      id: "R_R8",
      name: "R8 Revolver",
      conditions: { round_economy: "force", playstyle: "spray_defense", engagement_distance: "long" },
      conclusion: { primaryWeaponId: "r8" },
      rationale: "Potężny rewolwer wymagający załadowania strzału, idealny do pre-fire."
    },
    {
      id: "R_CZ75",
      name: "CZ75-Auto",
      conditions: { round_economy: "force", tactical_role: "lurk", engagement_distance: "close" },
      conclusion: { primaryWeaponId: "cz75" },
      rationale: "Kieszonkowy automat do zasadzek w zwarciu. Bardzo wysoka szybkostrzelność."
    },
    {
      id: "R_MAC10",
      name: "MAC-10",
      conditions: { side: "T", round_economy: "force", playstyle: "run_and_gun" },
      conclusion: { primaryWeaponId: "mac10" },
      rationale: "Maszyna do zabijania w biegu podczas rusha. Bardzo wysoka szybkostrzelność."
    },
    {
      id: "R_MP9",
      name: "MP9",
      conditions: { side: "CT", round_economy: "force", playstyle: "run_and_gun" },
      conclusion: { primaryWeaponId: "mp9" },
      rationale: "niedrogi, ale wyjątkowo celny pistolet maszynowy. Idealny do gry w biegu."
    },
    {
      id: "R_NOVA",
      name: "Nova",
      conditions: { round_economy: "force", tactical_role: "anti_rush", playstyle: "precision" },
      conclusion: { primaryWeaponId: "nova" },
      rationale: "Tania strzelba o ciasnym skupieniu śrutu. Ogromna nagroda i zaskakująca celność w locie."
    },
    {
      id: "R_MAG7",
      name: "MAG-7",
      conditions: { side: "CT", round_economy: "force", tactical_role: "anti_rush", engagement_distance: "close" },
      conclusion: { primaryWeaponId: "mag7" },
      rationale: "Niedroga, ale celna strzelba CT do obrony ciasnych zakrętów. Wybór na farmienie fragów."
    },
    {
      id: "R_SAWEDOFF",
      name: "Sawed-Off",
      conditions: { side: "T", round_economy: "force", tactical_role: "entry", engagement_distance: "close" },
      conclusion: { primaryWeaponId: "sawedoff" },
      rationale: "Tania strzelba T do czyszczenia wejścia na bombsite. Dobra na force buy."
    },

    // 3. Semi
    {
      id: "R_GALILAR",
      name: "Galil AR",
      conditions: { side: "T", round_economy: "semi", tactical_role: "entry" },
      conclusion: { primaryWeaponId: "galilar" },
      rationale: "Ekonomiczny karabin T - tańszy odpowiednik kałasznikowa."
    },
    {
      id: "R_FAMAS",
      name: "FAMAS",
      conditions: { side: "CT", round_economy: "semi", tactical_role: "anchor" },
      conclusion: { primaryWeaponId: "famas" },
      rationale: "Karabin budżetowy CT z opcją trybu seryjnego. Kup, jeśli nie stać cię na inne karabiny."
    },
    {
      id: "R_SSG08",
      name: "SSG 08",
      conditions: { round_economy: "semi", tactical_role: "sniper_support" },
      conclusion: { primaryWeaponId: "ssg08" },
      rationale: "Lekka snajperka Scout z większym magazynkiem i prędkością ruchu niż AWP."
    },
    {
      id: "R_MP5SD",
      name: "MP5-SD",
      conditions: { round_economy: "semi", tactical_role: "lurk", weapon_feature: "silencer" },
      conclusion: { primaryWeaponId: "mp5sd" },
      rationale: "Cichy PM z wbudowanym tłumikiem do bezszelestnego flankowania."
    },
    {
      id: "R_P90",
      name: "P90",
      conditions: { round_economy: "semi", weapon_feature: "high_capacity", playstyle: "run_and_gun" },
      conclusion: { primaryWeaponId: "p90" },
      rationale: "Nieustanne zasypywanie przeciwników gradem kul w biegu. Zostaniesz znienawidzony."
    },
    {
      id: "R_BIZON",
      name: "PP-Bizon",
      conditions: { round_economy: "semi", weapon_feature: "high_capacity", tactical_role: "anti_rush" },
      conclusion: { primaryWeaponId: "bizon" },
      rationale: "Ogromny bębenek bez konieczności przeładowywania. Świetne anty-eco."
    },
    {
      id: "R_UMP45",
      name: "UMP-45",
      conditions: { round_economy: "semi", playstyle: "precision" },
      conclusion: { primaryWeaponId: "ump45" },
      rationale: "Mocne uderzenie i wysoka penetracja pancerza za niewielkie pieniądze."
    },
    {
      id: "R_MP7",
      name: "MP7",
      conditions: { round_economy: "semi", playstyle: "spray_defense" },
      conclusion: { primaryWeaponId: "mp7" },
      rationale: "Zbalansowany SMG o stabilnym odrzucie na średnim dystansie. Używaj ostrożnie."
    },
    {
      id: "R_NEGEV",
      name: "Negev",
      conditions: { round_economy: "semi", weapon_feature: "high_capacity", playstyle: "spray_defense" },
      conclusion: { primaryWeaponId: "negev" },
      rationale: "Laser zaporowy - w bezruchu i przykucu praktycznie idealnie celny. Zatrzymuje każdy rush."
    },
    {
      id: "R_XM1014",
      name: "XM1014",
      conditions: { round_economy: "semi", tactical_role: "anti_rush", engagement_distance: "close" },
      conclusion: { primaryWeaponId: "xm1014" },
      rationale: "Automatyczna strzelba bojowa, jeśli chcesz obić przeciwnika, ale nie zależy Ci na precyzji."
    },

    // 4. Full
    {
      id: "R_AK47",
      name: "AK-47",
      conditions: { side: "T", round_economy: "full", weapon_feature: "standard" },
      conclusion: { primaryWeaponId: "ak47" },
      rationale: "Król karabinów T – natychmiastowa eliminacja jednym strzałem w głowę."
    },
    {
      id: "R_SG553",
      name: "SG 553",
      conditions: { side: "T", round_economy: "full", weapon_feature: "scope" },
      conclusion: { primaryWeaponId: "sg553" },
      rationale: "Krieg - Wyjątkowy karabin terrorystów z lunetą optyczną i 100% penetracją pancerza."
    },
    {
      id: "R_M4A1S",
      name: "M4A1-S",
      conditions: { side: "CT", round_economy: "full", weapon_feature: "silencer" },
      conclusion: { primaryWeaponId: "m4a1s" },
      rationale: "Wyciszony karabin CT z minimalnym rozrzutem i brakiem smug przez dym."
    },
    {
      id: "R_AUG",
      name: "AUG",
      conditions: { side: "CT", round_economy: "full", weapon_feature: "scope" },
      conclusion: { primaryWeaponId: "aug" },
      rationale: "Karabin defensywny CT z lunetą optyczną na długie aleje. Konkurent Kriega."
    },
    {
      id: "R_M4A4",
      name: "M4A4",
      conditions: { side: "CT", round_economy: "full", weapon_feature: "high_capacity" },
      conclusion: { primaryWeaponId: "m4a4" },
      rationale: "Klasyczny, niezawodny karabin CT do zmasowanej obrony pozycji."
    },
    {
      id: "R_AWP_FULL",
      name: "AWP",
      conditions: { round_economy: "full", tactical_role: "sniper_support" },
      conclusion: { primaryWeaponId: "awp" },
      rationale: "Legendarna snajperka zabijająca jednym strzałem nawet w klatkę piersiową i przez cienkie ściany."
    },

    // 5. Rich
    {
      id: "R_G3SG1",
      name: "G3SG1",
      conditions: { side: "T", round_economy: "rich", tactical_role: "sniper_support" },
      conclusion: { primaryWeaponId: "g3sg1" },
      rationale: "Samopowtarzalna snajperka terrorystów, eliminująca cele dwoma szybkimi strzałami."
    },
    {
      id: "R_SCAR20",
      name: "SCAR-20",
      conditions: { side: "CT", round_economy: "rich", tactical_role: "sniper_support" },
      conclusion: { primaryWeaponId: "scar20" },
      rationale: "Auto-snajperka antyterorystów, idealna do spowalniania wejść na bombsite z bezpiecznej odległości."
    },
    {
      id: "R_M249",
      name: "M249",
      conditions: { round_economy: "rich", weapon_feature: "high_capacity" },
      conclusion: { primaryWeaponId: "m249" },
      rationale: "Prestiżowy CKM z taśmą 100 naboi do ciągłego ognia. Wybierany głównie dla zabawy, bo jest absurdalnie drogi."
    }
  ];


  // Zwraca gotowe zasoby bazy wiedzy
  return {
    WEAPONS,
    FACT_DEFINITIONS,
    RULES
  };
}));
