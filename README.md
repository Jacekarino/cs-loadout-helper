<div align="center">

# 🎯 CS2 Loadout Helper — System Ekspertowy Doboru Broni

**Inteligentny, regułowy system doradczy wspomagający dobór uzbrojenia w Counter-Strike 2 na podstawie analizy ekonomii, roli taktycznej i stylu gry.**

[![Metody Sztucznej Inteligencji](https://img.shields.io/badge/Projekt-Metody%20Sztucznej%20Inteligencji-8b5cf6?style=for-the-badge&logo=probot&logoColor=white)](#-architektura-systemu-ekspertowego)
[![Inference Engine](https://img.shields.io/badge/Silnik-Forward%20Chaining-F38020?style=for-the-badge&logo=fastapi&logoColor=white)](#-architektura-systemu-ekspertowego)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0%20(Vanilla%20Frontend)-06B6D4?style=for-the-badge&logo=npm&logoColor=white)](#%EF%B8%8F-stack-technologiczny-i-specyfikacja)
[![GitHub Stars](https://img.shields.io/github/stars/jacekarino/cs-loadout-helper?style=for-the-badge&logo=github&color=EAB308)](https://github.com/jacekarino/cs-loadout-helper/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/jacekarino/cs-loadout-helper?style=for-the-badge&logo=github&color=6366F1)](https://github.com/jacekarino/cs-loadout-helper/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/jacekarino/cs-loadout-helper?style=for-the-badge&logo=github&color=EC4899)](https://github.com/jacekarino/cs-loadout-helper/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-22C55E?style=for-the-badge&logo=github)](https://github.com/jacekarino/cs-loadout-helper/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-3B82F6?style=for-the-badge&logo=open-source-initiative&logoColor=white)](license.txt)

<br />

</div>

---

## 🌟 Overview / Przegląd

**CS2 Loadout Helper** to dedykowany system ekspertowy stworzony w ramach zajęć akademickich z przedmiotu **Metody Sztucznej Inteligencji** w Collegium Witelona Uczelnia Państwowa w Legnicy.

Głównym celem projektu jest symulacja procesu decyzyjnego doświadczonego gracza i kapitana drużyny (*In-Game Leader*) w grze *Counter-Strike 2*. Wykorzystując sformalizowaną reprezentację wiedzy dziedzinowej oraz regułowy silnik wnioskowania, aplikacja w ułamku sekundy analizuje sytuację meczową gracza i wskazuje optymalną broń główną na nadchodzącą rundę wraz z pełnym uzasadnieniem taktycznym.

Aplikacja działa w modelu **Single Page Application (SPA)** całkowicie po stronie klienta (Client-Side) – bez konieczności instalowania zewnętrznych pakietów, frameworków czy uruchamiania środowiska serwerowego.

> 📚 Kompletny opis metodologiczny, formalna specyfikacja reguł produkcyjnych oraz analiza działania silnika znajduje się w dołączonym pliku [`dokumentacja.pdf`](dokumentacja.pdf).

---

## 🧠 Architektura Systemu Ekspertowego

System bazuje na klasycznym, sprawdzonym schemacie regułowego systemu doradczego AI.

### 1. Baza Wiedzy (`knowledgeBase.js`)
- Zawiera szczegółowy katalog **34 broni** obecnych w *Counter-Strike 2*, uwzględniając oficjalne parametry: cenę, nagrodę za frag, obrażenia bazowe, mnożnik trafienia w głowę, szybkostrzelność (*fire rate*), penetrację pancerza, pojemność magazynka, kontrolę odrzutu oraz unikalne atuty.
- Definiuje zbiór reguł produkcyjnych zapisanych w formule:
  $$\text{IF } \langle\text{warunki}\rangle \implies \text{THEN } \langle\text{konkluzja: identyfikator broni + uzasadnienie}\rangle$$

### 2. Silnik Wnioskowania w Przód (`inferenceEngine.js`)
- Algorytm wnioskuje od zgromadzonych faktów do konkluzji (*data-driven / Forward Chaining*).
- Zastosowano wielokryterialną funkcję scoringową:
  - **Twardy filtr frakcji**: reguły dla strony przeciwnej są natychmiast odrzucane.
  - **Dopasowanie ekonomiczne**: zgodność stanu portfela z kategorią rundy (`eco`, `force`, `semi`, `full`, `rich`) nadaje decydującą wagę bazową.
  - **Punkty taktyczne**: każda zgodna przesłanka (rola w drużynie, dystans starć, preferowany styl prowadzenia ognia) zwiększa wagę kandydata.
  - **Kary za sprzeczności**: jawny konflikt zadeklarowanych preferencji skutkuje ujemną punktacją.
- Wyłaniana jest reguła o najwyższym wskaźniku dopasowania, a w skrajnych przypadkach braku pokrycia uruchamiany jest deterministyczny mechanizm awaryjny (*fallback*).

### 3. Moduł Wyjaśniający (*Explanation Facility*)
- Zgodnie ze standardami inżynierii wiedzy, system nie działa jak „czarna skrzynka”. W panelu wynikowym użytkownik otrzymuje nie tylko wskazany oręż, lecz także precyzyjne wyjaśnienie, **dlaczego** dana reguła została uaktywniona i które fakty przesądziły o rekomendacji.

---

## ✨ Features / Funkcjonalności

- 🧠 **Regułowy Silnik Wnioskowania AI** — Autorski algorytm wnioskowania w przód (*Forward Chaining*) z zaawansowanym systemem ważenia przesłanek i wykrywaniem konfliktów.
- 🎯 **Ankieta Diagnostyczna w Czasie Rzeczywistym** — Dynamiczne zbieranie faktów z automatycznym przejściem po skompletowaniu parametrów taktycznych.
- 💡 **Moduł Uzasadniania Decyzji** — Pełna transparentność wnioskowania z prezentacją aktywowanej reguły produkcyjnej oraz uzasadnienia taktycznego.
- ⚔️ **Kompletna Baza Uzbrojenia CS2** — 34 w pełni sparametryzowane modele broni (pistolety, pistolety maszynowe, karabinki, karabiny snajperskie, strzelby i ckm-y).
- 🛡️ **Tematyczna Adaptacja Wizualna** — Dynamiczne przełączanie szaty graficznej zależnie od wybranej frakcji: złocisto-bursztynowy klimat Terrorystów (T) lub taktyczny błękit Antyterrorystów (CT).
- 📊 **Szczegółowa Karta Ekwipunku** — Prezentacja statystyk bojowych (obrażenia, penetracja kevlaru, magazynki, kontrola odrzutu, nagroda za fraga) oraz sylwetki wybranej broni.
- ⚡ **100% Zero Dependencies** — Czysty Vanilla JavaScript (ES6+), semantyczny HTML5 i nowoczesny CSS3 bez potrzeby instalowania jakichkolwiek bibliotek czy frameworków.
- 📱 **Responsywny Design** — Wygodna obsługa na monitorach desktopowych, laptopach i ekranach smartfonów.

---

## 📋 Parametry Diagnostyczne (Fakty Wejściowe)

Podczas wywiadu diagnostycznego system ekspertowy bada następujące zmienne:

| Parametr | Zmienna regułowa | Dostępne wartości | Rola w procesie wnioskowania |
| :--- | :--- | :--- | :--- |
| **Drużyna** | `side` | `T`, `CT` | Warunek konieczny – filtruje bronie dostępne wyłącznie dla danej frakcji |
| **Budżet na rundę** | `round_economy` | `eco` (&lt;$1500), `force` ($1500–$2500), `semi` ($2500–$3750), `full` ($3750–$5000), `rich` (&gt;$5000) | Kluczowy wyznacznik – decyduje o dopuszczalnej półce cenowej uzbrojenia |
| **Rola w drużynie** | `tactical_role` | `entry`, `anti_rush`, `anchor`, `lurk`, `sniper_support` | Określa wymagania taktyczne (np. mobilność, tłumik, zoom, siła powstrzymująca) |
| **Dystans walki** | `engagement_distance` | `close` (bliski), `medium` (średni), `long` (daleki) | Optymalizuje dobór pod kątem celności na odległość lub szybkostrzelności w zwarciu |
| **Styl prowadzenia walki** | `playstyle` | `precision` (tapping), `spray_defense` (ogień zaporowy), `run_and_gun` (ostrzały w biegu) | Dopasowuje mechanikę rozrzutu, celność w ruchu oraz pojemność magazynka |
| **Unikalna cecha** | `weapon_feature` | `silenced`, `mobility`, `heavy_stopping_power`, `one_tap` | Kryterium doprecyzowujące w przypadku zbliżonych kandydatów |

---

## 🛠️ Stack Technologiczny i Specyfikacja

| Warstwa | Technologie | Rola w systemie |
| :--- | :--- | :--- |
| **Baza Wiedzy (KB)** | JavaScript (ES6 Module / UMD) | Sformalizowany słownik statystyk 34 broni oraz tablica reguł produkcyjnych IF-THEN |
| **Silnik Wnioskowania** | JavaScript (ES6 Class) | Implementacja wnioskowania w przód (*Forward Chaining*), scoring reguł i fallbacks |
| **Kontroler & UI State** | JavaScript (`app.js`) | Reaktywna obsługa ankiety diagnostycznej, zarządzanie wektorem faktów, renderowanie wyniku |
| **Interfejs & Struktura** | Semantyczny HTML5 | Struktura ankiety, modale informacyjne, karty frakcji i panel uzasadnienia decyzji |
| **Stylistyka & Design** | Modern CSS3 (Variables, Grid, Flexbox) | Autorski motyw Dark Mode stylizowany na CS2, płynne animacje i mikro-interakcje |
| **Assety Wizualne** | Wektory SVG, Rastery PNG | Dedykowane ikony uzbrojenia oraz rendery modeli broni z gry |

---

## 💻 Getting Started / Uruchomienie Lokalne

Aplikacja jest w pełni statyczna i nie wymaga instalowania Node.js, npm, Pythona ani żadnych dodatkowych narzędzi kompilacji.

### 1. Pobierz repozytorium
Możesz sklonować repozytorium za pomocą **GitHub Desktop** lub pobrać plik `.zip` bezpośrednio z platformy GitHub.

### 2. Otwórz w przeglądarce
Wystarczy dwukrotnie kliknąć plik `index.html` w eksploratorze plików lub otworzyć go z poziomu terminala:

```powershell
# Na Windows (PowerShell)
Start-Process index.html

# Na macOS
open index.html

# Na Linux
xdg-open index.html
```

#### Alternatywnie: uruchomienie z lokalnym serwerem HTTP
Jeśli preferujesz uruchomienie przez lokalny serwer developerski:

```bash
# Używając Pythona (jeśli zainstalowany)
python -m http.server 8000

# Używając Node / npx
npx serve .
```

Aplikacja będzie natychmiast dostępna pod adresem: `http://localhost:8000` (lub bezpośrednio pod ścieżką `file:///.../index.html`).

---

## 📂 Struktura Projektu

```text
cs-loadout-helper/
├── assets/
│   ├── weapon-icons/            # Wektorowe ikony sylwetek broni w formacie SVG (34 pliki)
│   └── weapon-models/           # Przezroczyste rendery modeli 3D broni w PNG (34 pliki)
├── scripts/
│   ├── knowledgeBase.js         # BAZA WIEDZY: Katalog 34 broni oraz zbiór reguł produkcyjnych IF-THEN
│   ├── inferenceEngine.js       # SILNIK WNIOSKOWANIA: Maszyna wnioskowania w przód (Forward Chaining)
│   └── app.js                   # KONTROLER: Obsługa ankiety, zarządzanie stanem i renderowanie wyników
├── dokumentacja.pdf             # Kompletna dokumentacja naukowa i projektowa (Metody Sztucznej Inteligencji)
├── index.html                   # Główny szkielet aplikacji SPA (ankieta, karty, modal informacyjny)
├── style.css                    # Arkusze stylów CSS (motywy T/CT, zmienne CSS, animacje, układ Grid)
├── license.txt                  # Warunki licencji open-source (MIT)
└── README.md                    # Dokumentacja techniczna projektu
```

---

## 📖 Dokumentacja Akademicka

W repozytorium znajduje się pełna dokumentacja przygotowana na potrzeby zaliczenia przedmiotu **Metody Sztucznej Inteligencji**: [`dokumentacja.pdf`](dokumentacja.pdf). Zawiera ona m.in.:
1. Wprowadzenie teoretyczne do systemów ekspertowych i struktur regułowych.
2. Formalną specyfikację reguł produkcyjnych oraz algorytmu rozwiązywania konfliktów.
3. Szczegółowy diagram przepływu danych i wnioskowania.
4. Wyniki testów czarnoskrzynkowych weryfikujących poprawność doboru ekwipunku dla reprezentatywnych scenariuszy meczowych.

---

## 🤝 Contributing / Wkład w projekt

Wszelkie sugestie, rozbudowa bazy wiedzy o nowe reguły oraz ulepszenia silnika wnioskowania są mile widziane!

1. Sforkuj projekt (**Fork**)
2. Utwórz nową gałąź funkcjonalną (`feature/NoweRegulyTaktyczne`)
3. Zatwierdź swoje zmiany
4. Wypchnij gałąź do swojego forka
5. Otwórz **Pull Request**

---

## 📬 Kontakt

**Jacek Kowalczyk** (Album: 44921)  
*Wydział Nauk Technicznych i Ekonomicznych — Collegium Witelona Uczelnia Państwowa w Legnicy*

- 📧 Email studencki: [jacek.kowalczyk.inf@studenci.collegiumwitelona.pl](mailto:jacek.kowalczyk.inf@studenci.collegiumwitelona.pl)
- 📧 Email kontaktowy: [jacekarino@duck.com](mailto:jacekarino@duck.com)
- 🐙 Profil GitHub: [@Jacekarino](https://github.com/Jacekarino)

---

## 📄 Licencja

Projekt dystrybuowany na licencji **MIT**. Szczegółowe informacje znajdują się w pliku [`license.txt`](license.txt).

---

<div align="center">

Made with ♡ by [**Jacekarino**](https://github.com/Jacekarino)

</div>