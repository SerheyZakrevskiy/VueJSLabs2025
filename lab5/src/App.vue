<script setup lang="ts">
import Toast from "primevue/toast";

import AppHeader from "./components/AppHeader.vue";
import HeroSection from "./components/HeroSection.vue";
import ProblemSolutionSection from "./components/ProblemSolutionSection.vue";
import BenefitsSection from "./components/BenefitsSection.vue";
import HowItWorksSection from "./components/HowItWorksSection.vue";
import PricingSection from "./components/PricingSection.vue";
import ReviewsSection from "./components/ReviewsSection.vue";
import FaqSection from "./components/FaqSection.vue";
import ContactSection from "./components/ContactSection.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <Toast />
  <AppHeader />
  <main>
    <HeroSection />
    <ProblemSolutionSection />
    <BenefitsSection />
    <HowItWorksSection />
    <PricingSection />
    <ReviewsSection />
    <FaqSection />
    <ContactSection />
  </main>
  <AppFooter />
</template>

<style>
:root {
  font-family: Inter, Arial, sans-serif;
  color: #1f2937;
  background: #f7f8fa;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

main {
  display: flex;
  flex-direction: column;
}

section {
  padding: 72px 24px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
