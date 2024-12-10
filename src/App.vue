<script setup lang="ts">
import { ref } from 'vue'
import NButton from './components/base/NButton.vue'
import NInput from './components/form/NInput.vue'
import NModal from './components/feedback/NModal.vue'
import NToggle from './components/form/NToggle.vue'

const email = ref('')
const password = ref('')
const emailError = ref('')
const showModal = ref(false)
const showLargeModal = ref(false)
const textInput = ref('')
const emailInput = ref('')
const passwordInput = ref('')
const darkMode = ref(false)
const notifications = ref(true)

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', formData.value)
  showLargeModal.value = false
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Vänligen ange en giltig e-postadress'
  } else {
    emailError.value = ''
  }
}
</script>

<template>
  <div class="app">
    <header>
      <h1>Nordic Design System</h1>
      <p>Ett modernt och tillgängligt komponentbibliotek</p>
    </header>

    <main class="main-content">
      <section class="component-demo">
        <h2>Knappar</h2>
        
        <div class="button-grid">
          <div class="variant-group">
            <h3>Primär</h3>
            <NButton>Standard</NButton>
            <NButton disabled>Inaktiverad</NButton>
            <NButton loading>Laddar</NButton>
          </div>

          <div class="variant-group">
            <h3>Sekundär</h3>
            <NButton variant="secondary">Standard</NButton>
            <NButton variant="secondary" disabled>Inaktiverad</NButton>
            <NButton variant="secondary" loading>Laddar</NButton>
          </div>

          <div class="variant-group">
            <h3>Text</h3>
            <NButton variant="text">Standard</NButton>
            <NButton variant="text" disabled>Inaktiverad</NButton>
            <NButton variant="text" loading>Laddar</NButton>
          </div>

          <div class="variant-group">
            <h3>Storlekar</h3>
            <NButton size="small">Liten</NButton>
            <NButton size="medium">Medium</NButton>
            <NButton size="large">Stor</NButton>
          </div>
        </div>
      </section>

      <section class="component-demo">
        <h2>Textfält</h2>
        
        <div class="form-grid">
          <div class="input-group">
            <NInput
              v-model="email"
              label="E-postadress"
              type="email"
              required
              placeholder="namn@exempel.se"
              :error="emailError"
              @blur="validateEmail"
            />
          </div>

          <div class="input-group">
            <NInput
              v-model="password"
              label="Lösenord"
              type="password"
              required
              placeholder="Ange lösenord"
              hint="Minst 8 tecken"
            />
          </div>

          <div class="input-group">
            <NInput
              label="Inaktiverat fält"
              disabled
              value="Inaktiverat fält"
            />
          </div>

          <div class="input-group">
            <NInput
              label="Lyckat fält"
              value="John Doe"
              success="Fältet är korrekt ifyllt"
            />
          </div>
        </div>
      </section>

      <section class="component-demo">
        <h2>Växlare</h2>
        <div class="toggle-grid">
          <div class="toggle-group">
            <h3>Standard</h3>
            <NToggle
              v-model="darkMode"
              label="Mörkt läge"
            />
          </div>
          
          <div class="toggle-group">
            <h3>Med standardvärde</h3>
            <NToggle
              v-model="notifications"
              label="Notifikationer"
            />
          </div>
          
          <div class="toggle-group">
            <h3>Inaktiverad</h3>
            <NToggle
              v-model="darkMode"
              label="Inaktiverad växlare"
              disabled
            />
          </div>
        </div>
      </section>

      <section class="component-demo">
        <h2>Modal Dialog</h2>
        <div class="button-grid">
          <div class="variant-group">
            <h3>Standard Modal</h3>
            <NButton @click="showModal = true">Öppna Designsystem</NButton>
            
            <NModal
              v-model="showModal"
              title="Designsystem"
              aria-label="Exempel på en tillgänglig modal dialog"
            >
              <template #content>
                <div class="modal-content">
                  <h2>Designsystem</h2>
                  <p>Ett modernt och tillgängligt komponentbibliotek byggt med Vue 3 och TypeScript.</p>
                  <p>Du kan:</p>
                  <ul>
                    <li>Navigera med tangentbordet (Tab)</li>
                    <li>Stänga med Escape-tangenten</li>
                    <li>Använda skärmläsare</li>
                  </ul>
                </div>
              </template>
            </NModal>
          </div>

          <div class="variant-group">
            <h3>Stor Modal med Formulär</h3>
            <NButton @click="showLargeModal = true">Öppna Stort Formulär</NButton>
            
            <NModal
              v-model="showLargeModal"
              title="Kontaktformulär"
              size="large"
              aria-label="Kontaktformulär i modal"
            >
              <template #content>
                <div class="modal-content">
                  <h2>Kontakta oss</h2>
                  <form @submit.prevent="handleSubmit" class="contact-form">
                    <NInput
                      v-model="formData.name"
                      label="Namn"
                      placeholder="Skriv ditt namn"
                      required
                    />
                    <NInput
                      v-model="formData.email"
                      type="email"
                      label="E-postadress"
                      placeholder="exempel@mail.se"
                      required
                    />
                    <NInput
                      v-model="formData.message"
                      type="textarea"
                      label="Meddelande"
                      placeholder="Skriv ditt meddelande här"
                      required
                    />
                    <div class="form-actions">
                      <NButton type="submit" variant="primary">Skicka</NButton>
                      <NButton @click="showLargeModal = false" variant="secondary">Avbryt</NButton>
                    </div>
                  </form>
                </div>
              </template>
            </NModal>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
:root {
  --primary-color: #FF7F50;
  --primary-color-dark: #FF6B3D;
  --background-color: #f8f9fa;
  --text-color: #2c3e50;
  --text-secondary: #6c757d;
  --border-color: #e2e8f0;
  --error-color: #dc3545;
  --success-color: #198754;
  --disabled-bg: #f8f9fa;
}

body {
  margin: 0;
  background-color: var(--background-color);
}

.app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 4rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.main-content {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.component-demo {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 350px;
}

.input-group {
  width: 100%;
}

h2 {
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 1rem;
}

.variant-group, .input-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h3 {
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.toggle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--surface-color, white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.component-demo {
  margin-bottom: 2rem;
  width: 100%;
  max-width: 200px;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.variant-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--surface-color, white);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .component-demo {
    width: 100%;
  }
}
</style>
