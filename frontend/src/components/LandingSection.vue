<template>
  <section id="home" class="landing-section">
    <div class="container">
      <div class="landing-content">
        <div class="left-content fade-in" ref="leftContent">
          <div class="logo-section">
            <div class="logo">
              <div class="logo-icon">
                <img src="\UniSHIFT-LOGO-removebg-preview.png" alt="Logo" class="logo-img" />
              </div>
              <h1 class="logo-text">UniSHIFT</h1>
            </div>
            <p class="slogan">Serving Hope In Food Together</p>
          </div>
          
          <!-- <div class="statistics">
            <div class="stat-item">
              <div class="stat-number" ref="moneyRaised">$0</div>
              <div class="stat-label">Money Raised</div>
            </div>
            <div class="stat-item">
              <div class="stat-number" ref="contributors">0</div>
              <div class="stat-label">Contributors</div>
            </div>
          </div> -->
        </div>
        
        <div class="right-content fade-in" ref="rightContent">
          <div class="hero-image-container">
            <img 
              src="https://images.pexels.com/photos/6995247/pexels-photo-6995247.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="People helping with food distribution"
              class="hero-image floating"
            />
          </div>
        </div>
      </div>
      
      <div class="donation-button-container fade-in" ref="donationButton">
        <a href="https://www.gofundme.com/f/5468g9-hunger-and-homelessness?attribution_id=sl:48ed5f15-7aac-4849-ba46-2d7863e0ed47&lang=en_GB&utm_campaign=man_ss_icons&utm_medium=customer&utm_source=copy_link" class="btn-primary donation-btn">
          <Heart :size="20" style="margin-right: 8px;" />
          Donate Now
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Heart } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'

const leftContent = ref()
const rightContent = ref()
const donationButton = ref()
const moneyRaised = ref()
const contributors = ref()


const animateNumber = (element: HTMLElement, target: number, duration: number = 2000) => {
  let start = 0
  const increment = target / (duration / 16)
  
  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target.toLocaleString()
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start).toLocaleString()
    }
  }, 16)
}

useIntersectionObserver(leftContent, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    leftContent.value.classList.add('visible')
    setTimeout(() => {
      if (moneyRaised.value && contributors.value) {
        moneyRaised.value.textContent = '$'
        contributors.value.textContent = ''
        setTimeout(() => {
          animateNumber(moneyRaised.value, 125000)
          animateNumber(contributors.value, 847)
        }, 500)
      }
    }, 800)
  }
})

useIntersectionObserver(rightContent, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    rightContent.value.classList.add('visible')
  }
})

useIntersectionObserver(donationButton, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    donationButton.value.classList.add('visible')
  }
})
</script>

<style scoped>
.landing-section {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--light-orange) 0%, var(--white) 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 80px; /* Add space for fixed navbar */
}

.landing-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 60px;
  width: 100%;
}

.logo-section {
  margin-bottom: 60px;
  /* Center on desktop and larger screens, but shift slightly right */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 10%;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.logo-icon {
  margin-right: 16px;
  padding: 8px;
  background: white;
  border-radius: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.logo-text {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.slogan {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: var(--text-light);
  font-weight: 400;
  margin-left: 56px;
}

/* .statistics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
} */

/* .stat-item {
  text-align: center;
  padding: 32px 24px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.1);
  border: 1px solid rgba(255, 107, 53, 0.1);
}

.stat-number {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--primary-orange);
  margin-bottom: 8px;
  font-family: 'SF Mono', Monaco, monospace;
}

.stat-label {
  color: var(--text-light);
  font-weight: 500;
  font-size: clamp(0.8rem, 2vw, 1rem);
} */

.hero-image-container {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
}

.hero-image {
  width: 100%;
  max-width: 500px;
  height: 400px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(255, 107, 53, 0.2);
}

.floating {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.donation-button-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.donation-btn {
  display: flex;
  align-items: center;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  padding: 30px 60px;
  border-radius: 16px;
}

/* Tablet styles */
@media (max-width: 1024px) {
  .landing-section {
    padding-top: 70px;
  }
  
  .landing-content {
    gap: 60px;
  }
  
  .logo-section {
    padding-left: 5%;
  }
  
  /* .statistics {
    gap: 30px;
  }
  
  .stat-item {
    padding: 24px 16px;
  } */
}

/* Mobile styles */
@media (max-width: 768px) {
  .landing-section {
    min-height: auto;
    padding: 100px 0 60px;
  }

    .logo-img {
    width: 60px;
    height: 60px;
  }

  .logo-icon {
    padding: 8px;
  }
  
  .landing-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .logo-section {
    /* Center everything on mobile */
    align-items: center;
    text-align: center;
    padding-left: 0;
    margin-bottom: 40px;
  }
  
  .slogan {
    margin-left: 0;
  }
  
  /* .statistics {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 400px;
    margin: 0 auto;
  } */
  
  .hero-image {
    max-width: 400px;
    height: 250px;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .landing-section {
    padding: 70px 0 50px;
  }

    .logo-img {
    width: 44px;
    height: 44px;
  }
  
  .logo-icon {
    margin-right: 12px;
    padding: 7px;
  }
  
  .logo-section {
    /* Ensure perfect centering on small mobile */
    align-items: center;
    text-align: center;
    padding-left: 0;
  }
  
  .slogan {
    margin-left: 0;
  }
  
  /* .stat-item {
    padding: 20px 16px;
  } */
  
  .hero-image {
    max-width: 230px;
    height: 150px;
  }
  
  .donation-btn {
    padding: 16px 32px;
  }
}

/* Landscape mobile */
@media (max-width: 896px) and (orientation: landscape) {
  .landing-section {
    min-height: auto;
    padding: 60px 0 40px;
  }
  
  .landing-content {
    gap: 40px;
  }
  
  .logo-section {
    margin-bottom: 30px;
    /* Center on landscape mobile */
    align-items: center;
    text-align: center;
    padding-left: 0;
  }
  
  .hero-image {
    height: 250px;
  }
}

/* Ultra-wide screens */
@media (min-width: 1600px) {
  .landing-content {
    gap: 120px;
  }
  
  .logo-section {
    padding-left: 15%;
  }
  
  /* .statistics {
    gap: 60px;
  } */
}

/* Extra large desktop screens - more pronounced right shift */
@media (min-width: 1200px) {
  .logo-section {
    padding-left: 12%;
  }
}

/* Medium desktop screens */
@media (min-width: 992px) and (max-width: 1199px) {
  .logo-section {
    padding-left: 8%;
  }
}

/* Small desktop/large tablet */
@media (min-width: 769px) and (max-width: 991px) {
  .logo-section {
    padding-left: 3%;
  }
}
</style>