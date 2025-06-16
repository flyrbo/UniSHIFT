<template>
  <section id="help" class="reach-out-section section-padding">
    <div class="container">
      <div class="section-header fade-in" ref="header">
        <h2 class="section-title">Ways to Help</h2>
        <p class="section-subtitle">Choose how you'd like to make a difference</p>
      </div>
      
      <div class="help-options fade-in" ref="helpOptions">
        <div class="option-card" ref="onlineCard">
          <div class="card-content">
            <div class="card-icon">
              <CreditCard :size="32" />
            </div>
            <h3 class="card-title">Online Donations</h3>
            <p class="card-description">
              Make a secure online donation from anywhere in the world. Every contribution, 
              no matter the size, helps us reach more families in need and create lasting impact 
              in our communities.
            </p>
            <div class="card-features">
              <div class="feature">
                <Shield :size="16" />
                <span>Secure & Safe</span>
              </div>
              <div class="feature">
                <Clock :size="16" />
                <span>Instant Processing</span>
              </div>
              <div class="feature">
                <Receipt :size="16" />
                <span>Tax Deductible</span>
              </div>
            </div>
            <a href="https://gofund.me/7375339c" class="btn-primary card-button">
              <CreditCard :size="20" style="margin-right: 8px;" />
              Donate Online
            </a>
          </div>
        </div>
        
        <div class="option-card" ref="volunteerCard">
          <div class="card-content">
            <div class="card-icon">
              <Users :size="32" />
            </div>
            <h3 class="card-title">Volunteer With Us</h3>
            <p class="card-description">
              Join our community of dedicated volunteers. Whether you have an hour or a day, 
              your time makes a real difference in the lives of families we serve.
            </p>
            <a href="https://www.linkedin.com/company/unishift" class="btn-primary card-button">
              <Users :size="20" style="margin-right: 8px;" />
              Join Our Team
            </a>
          </div>
        </div>
      </div>
      
      <div class="impact-stats fade-in" ref="impactStats">
        <div class="stats-header">
          <h3>Your Impact in Numbers</h3>
          <p>See how your support creates real change</p>
        </div>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <PoundSterlingIcon :size="24" />
            </div>
            <div class="stat-content">
              <div class="stat-number">£10</div>
              <div class="stat-description">Provides 20 meals for people in need</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <Heart :size="24" />
            </div>
            <div class="stat-content">
              <div class="stat-number" v-if="!isLoading">
                £{{ totalDonations.toFixed(2) }}
              </div>
              <div class="stat-number loading" v-else>
                Loading...
              </div>
              <div class="stat-description">Total amount raised so far</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <Heart :size="24" />
            </div>
            <div class="stat-content">
              <div class="stat-number">100%</div>
              <div class="stat-description">Of your donation goes to the program</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  CreditCard, 
  Users, 
  Shield, 
  Clock, 
  Receipt, 
  Heart, 
  PoundSterlingIcon
} from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'
import { useDonations } from '../composables/useDonations'

const header = ref()
const helpOptions = ref()
const onlineCard = ref()
const volunteerCard = ref()
const impactStats = ref()

// Use the donations composable
const { totalDonations, isLoading } = useDonations()

useIntersectionObserver(header, ([{ isIntersecting }]) => {
  if (isIntersecting && header.value) {
    header.value.classList.add('visible')
  }
})

useIntersectionObserver(helpOptions, ([{ isIntersecting }]) => {
  if (isIntersecting && helpOptions.value) {
    helpOptions.value.classList.add('visible')
  }
})

useIntersectionObserver(impactStats, ([{ isIntersecting }]) => {
  if (isIntersecting && impactStats.value) {
    impactStats.value.classList.add('visible')
  }
})

onMounted(() => {
  const cards = [onlineCard, volunteerCard]
  
  cards.forEach((card, index) => {
    if (card.value) {
      useIntersectionObserver(card, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          setTimeout(() => {
            card.value.classList.add('visible')
          }, index * 200)
        }
      })
    }
  })
})
</script>

<style scoped>
.reach-out-section {
  background: white;
  width: 100%;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.help-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 100px;
}

.option-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--gray-200);
  overflow: hidden;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(30px);
}

.option-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.option-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(255, 107, 53, 0.15);
  border-color: var(--primary-orange);
}

.card-content {
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--light-orange), rgba(255, 107, 53, 0.1));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-orange);
  margin-bottom: 24px;
  flex-shrink: 0;
}

.card-title {
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 16px;
}

.card-description {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 32px;
  flex-grow: 1;
  font-size: clamp(0.9rem, 2vw, 1rem);
}

.card-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-light);
  font-size: clamp(0.8rem, 2vw, 0.9rem);
}

.feature svg {
  color: var(--primary-orange);
  flex-shrink: 0;
}

.card-button {
  margin-top: auto;
  width: 100%;
  justify-content: center;
}

.impact-stats {
  background: linear-gradient(135deg, var(--light-orange) 0%, var(--white) 100%);
  padding: 60px 40px;
  border-radius: 24px;
  border: 1px solid rgba(255, 107, 53, 0.1);
}

.stats-header {
  text-align: center;
  margin-bottom: 48px;
}

.stats-header h3 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.stats-header p {
  color: var(--text-light);
  font-size: clamp(0.9rem, 2vw, 1rem);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.stat-card {
  background: white;
  padding: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: var(--light-orange);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-orange);
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  font-weight: 700;
  color: var(--primary-orange);
  margin-bottom: 4px;
}

.stat-number.loading {
  color: var(--text-light);
  font-size: clamp(1rem, 2.5vw, 1.2rem);
}

.stat-description {
  color: var(--text-light);
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  line-height: 1.4;
}

/* Tablet styles */
@media (max-width: 1024px) {
  .help-options {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    margin-bottom: 80px;
  }
  
  .card-content {
    padding: 32px;
  }
  
  .impact-stats {
    padding: 50px 32px;
  }
  
  .stats-grid {
    gap: 24px;
  }
  
  .stat-card {
    padding: 24px;
    gap: 16px;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .section-header {
    margin-bottom: 60px;
  }
  
  .help-options {
    grid-template-columns: 1fr;
    gap: 24px;
    margin-bottom: 60px;
  }
  
  .card-content {
    padding: 24px;
  }
  
  .impact-stats {
    padding: 40px 24px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .stat-card {
    padding: 20px;
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .card-content {
    padding: 20px;
  }
  
  .card-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
  }
  
  .card-features {
    gap: 10px;
    margin-bottom: 24px;
  }
  
  .impact-stats {
    padding: 32px 16px;
  }
  
  .stats-header {
    margin-bottom: 32px;
  }
  
  .stat-card {
    padding: 16px;
  }
  
  .stat-icon {
    width: 50px;
    height: 50px;
  }
}

/* Landscape mobile */
@media (max-width: 896px) and (orientation: landscape) {
  .help-options {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .card-content {
    padding: 24px;
  }
  
  .impact-stats {
    padding: 40px 32px;
  }
}

/* Ultra-wide screens */
@media (min-width: 1600px) {
  .help-options {
    grid-template-columns: repeat(2, 1fr);
    gap: 60px;
    margin-bottom: 120px;
  }
  
  .card-content {
    padding: 50px;
  }
  
  .impact-stats {
    padding: 80px 60px;
  }
  
  .stats-grid {
    gap: 40px;
  }
}

/* Animation delays for staggered entrance */
.option-card:nth-child(1) {
  transition-delay: 0s;
}

.option-card:nth-child(2) {
  transition-delay: 0.2s;
}
</style>