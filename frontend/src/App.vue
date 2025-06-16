<template>
  <div id="app">
    <NavbarSection />
    <LandingSection />
    <CausesSection />
    <ReachOutSection />
    <OurJourneySection />
    <QuestionsSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import NavbarSection from './components/NavbarSection.vue'
import LandingSection from './components/LandingSection.vue'
import CausesSection from './components/CausesSection.vue'
import ReachOutSection from './components/ReachOutSection.vue'
import OurJourneySection from './components/OurJourneySection.vue'
import QuestionsSection from './components/QuestionsSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  overflow-x: hidden;
  background-color: #ffffff;
  width: 100%;
  min-height: 100vh;
}

#app {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  text-align: left;
  min-height: 100vh;
}

:root {
  --primary-orange: #FF6B35;
  --secondary-orange: #F7931E;
  --accent-yellow: #FFD700;
  --deep-orange: #FF4500;
  --light-orange: #FFE5D9;
  --text-dark: #2D3748;
  --text-light: #718096;
  --white: #FFFFFF;
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
}

html {
  scroll-behavior: smooth;
  width: 100%;
}

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-orange);
  padding: 14px 28px;
  border: 2px solid var(--primary-orange);
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-secondary:hover {
  background: var(--primary-orange);
  color: white;
  transform: translateY(-2px);
}

.section-padding {
  padding: 100px 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

/* Add IDs for smooth scrolling */
section:nth-child(2) { /* LandingSection */
  scroll-margin-top: 0;
}

section:nth-child(3) { /* CausesSection */
  scroll-margin-top: 100px;
}

section:nth-child(4) { /* ReachOutSection */
  scroll-margin-top: 100px;
}

section:nth-child(5) { /* OurJourneySection */
  scroll-margin-top: 100px;
}

section:nth-child(6) { /* QuestionsSection */
  scroll-margin-top: 100px;
}

section:nth-child(7) { /* FooterSection */
  scroll-margin-top: 100px;
}

/* Responsive breakpoints */
@media (max-width: 1400px) {
  .container {
    max-width: 1200px;
  }
}

@media (max-width: 1200px) {
  .container {
    max-width: 100%;
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .section-padding {
    padding: 60px 0;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .btn-primary, .btn-secondary {
    padding: 14px 24px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 12px;
  }
  
  .section-padding {
    padding: 40px 0;
  }
  
  .btn-primary, .btn-secondary {
    padding: 12px 20px;
    font-size: 14px;
    width: 100%;
    text-align: center;
  }
}

/* Ultra-wide screens */
@media (min-width: 1600px) {
  .container {
    max-width: 1600px;
  }
}

/* Portrait tablets and large phones */
@media (max-width: 1024px) and (orientation: portrait) {
  .section-padding {
    padding: 80px 0;
  }
}

/* Landscape phones */
@media (max-width: 896px) and (orientation: landscape) {
  .section-padding {
    padding: 50px 0;
  }
}
</style>