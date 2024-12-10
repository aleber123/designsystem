# Nordic Design System

Ett modernt och tillgängligt komponentbibliotek byggt med Vue 3 och TypeScript, med fokus på WCAG 2.1 tillgänglighet och användarvänlig design.

## 🌟 Demo

Besök vår [live demo](https://aleber123.github.io/designsystem/) för att se komponenterna i aktion.

## ✨ Funktioner

- **Tillgängliga Komponenter**: Alla komponenter följer WCAG 2.1 riktlinjer
- **TypeScript Support**: Fullständigt typad för bättre utvecklarupplevelse
- **Responsiv Design**: Anpassad för alla skärmstorlekar
- **Modern Arkitektur**: Byggd med Vue 3 och Composition API
- **Interaktiva Element**: Inklusive swipe-funktionalitet för mobila enheter

## 🚀 Komponenter

### Baskomponenter
- **NButton**: Anpassningsbar knappkomponent med olika varianter och storlekar
- **NInput**: Textinmatningsfält med validering och felhantering
- **NToggle**: Tillgänglig växlare med stöd för v-model

### Feedback
- **NModal**: Modal/dialog-komponent med fokushantering och keyboard-interaktioner

### Navigation
- **NTabs**: Swipebara flikar med stöd för mobil interaktion
- **NTabPanel**: Innehållspaneler för flikkomponenten

## 🛠️ Installation

```bash
# Klona repositoryt
git clone https://github.com/aleber123/designsystem.git

# Navigera till projektmappen
cd designsystem

# Installera beroenden
npm install

# Starta utvecklingsservern
npm run dev
```

## 📖 Användning

```vue
<template>
  <!-- Exempel på knappanvändning -->
  <NButton variant="primary" size="medium">
    Klicka här
  </NButton>

  <!-- Exempel på inputfält -->
  <NInput
    v-model="email"
    label="E-postadress"
    type="email"
    required
  />

  <!-- Exempel på toggle -->
  <NToggle
    v-model="isActive"
    label="Aktivera funktion"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NInput, NToggle } from './components'

const email = ref('')
const isActive = ref(false)
</script>
```

## 🔧 Utveckling

```bash
# Kör utvecklingsserver
npm run dev

# Bygg för produktion
npm run build

# Kör tester
npm run test

# Linting
npm run lint
```

## 📱 Mobilanpassning

- Responsiv design för alla komponenter
- Touch-optimerade interaktioner
- Swipe-funktionalitet för relevanta komponenter
- Anpassad för olika skärmstorlekar

## 🎨 Anpassning

Komponenter kan anpassas genom:
- Props för funktionalitet
- CSS-variabler för styling
- Slots för innehållsanpassning

## 🌐 Webbläsarstöd

- Chrome (senaste)
- Firefox (senaste)
- Safari (senaste)
- Edge (senaste)

## 📄 Licens

MIT License - Se [LICENSE](LICENSE) filen för detaljer.

## 🤝 Bidra

1. Forka repositoryt
2. Skapa en feature branch (`git checkout -b feature/AmazingFeature`)
3. Committa dina ändringar (`git commit -m 'Add some AmazingFeature'`)
4. Pusha till branchen (`git push origin feature/AmazingFeature`)
5. Öppna en Pull Request

## 📞 Kontakt

Alexander Bergqvist - [GitHub](https://github.com/aleber123)

Projektlänk: [https://github.com/aleber123/designsystem](https://github.com/aleber123/designsystem)
