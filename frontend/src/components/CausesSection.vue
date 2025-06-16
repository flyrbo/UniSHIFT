<template>
  <section id="causes" class="causes-section section-padding">
    <div class="container">
      <div class="section-header fade-in" ref="header">
        <h2 class="section-title">Our Causes</h2>
        <p class="section-subtitle">Making a difference through focused initiatives</p>
      </div>
      
      <div class="causes-grid">
        <div 
          v-for="(cause, index) in causes" 
          :key="index"
          class="cause-card fade-in"
          :ref="(el) => setCardRef(el, index)"
        >
          <div class="card-image">
            <img :src="cause.image" :alt="cause.title" />
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ cause.title }}</h3>
            <p class="card-description">{{ cause.description }}</p>
            <!-- <div class="card-stats">
              <div class="stat">
                <span class="stat-value">{{ cause.beneficiaries }}</span>
                <span class="stat-label">Beneficiaries</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ cause.raised.toLocaleString() }}</span>
                <span class="stat-label">Raised</span>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const header = ref<HTMLElement>()
const cardRefs = ref<(HTMLElement | null)[]>([])

const causes = [
  {
    title: "Providing Meals",
    description: "Providing free nutritious meals to those in need helps combat hunger and improve public health. It ensures vulnerable individuals receive essential nutrients, supports community well-being, and fosters compassion. By addressing food insecurity, such programs promote dignity, reduce inequality, and create a more caring, inclusive society for all.",
    image: "https://images.pexels.com/photos/6995469/pexels-photo-6995469.jpeg?auto=compress&cs=tinysrgb&w=800",
    // beneficiaries: "N/A",
    // raised: "N/A"
  },
  {
    title: "Creating Opportunities",
    description: "Raising money to support people facing homelessness, displacement, poverty, or crisis provides vital resources for shelter, food, and stability. It empowers affected individuals, promotes recovery, and fosters community resilience. Such efforts inspire solidarity, reduce suffering, and contribute to building a more just and compassionate society for everyone in need.",
    image: "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800",
    // beneficiaries: "N/A",
    // raised: "N/A"
  }
]

const setCardRef = (el: any, index: number) => {
  if (el && el instanceof HTMLElement) {
    cardRefs.value[index] = el
  }
}

useIntersectionObserver(header, ([{ isIntersecting }]) => {
  if (isIntersecting && header.value) {
    header.value.classList.add('visible')
  }
})

onMounted(() => {
  cardRefs.value.forEach((card, index) => {
    if (card) {
      useIntersectionObserver(card, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          setTimeout(() => {
            card.classList.add('visible')
          }, index * 200)
        }
      })
    }
  })
})
</script>

<style scoped>
.causes-section {
  background: var(--gray-50);
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

.causes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  width: 100%;
}

.cause-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  width: 100%;
}

.cause-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(255, 107, 53, 0.2);
}

.card-image {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.cause-card:hover .card-image img {
  transform: scale(1.05);
}

.card-content {
  padding: 32px;
}

.card-title {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 16px;
}

.card-description {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 24px;
  font-size: clamp(0.9rem, 2vw, 1rem);
}

.card-stats {
  display: flex;
  gap: 32px;
  justify-content: center;
}

.stat {
  text-align: center;
  flex: 1;
}

.stat-value {
  display: block;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 700;
  color: var(--primary-orange);
}

.stat-label {
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  color: var(--text-light);
}

/* Tablet styles */
@media (max-width: 1024px) {
  .causes-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .card-content {
    padding: 24px;
  }
  
  .card-stats {
    gap: 24px;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .section-header {
    margin-bottom: 60px;
  }
  
  .causes-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .card-image {
    height: 250px;
  }
  
  .card-content {
    padding: 24px;
  }
  
  .card-stats {
    gap: 20px;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .causes-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .card-image {
    height: 200px;
  }
  
  .card-content {
    padding: 20px;
  }
  
  .card-stats {
    flex-direction: column;
    gap: 16px;
  }
  
  .stat {
    padding: 12px;
    background: var(--light-orange);
    border-radius: 8px;
  }
}

/* Landscape mobile */
@media (max-width: 896px) and (orientation: landscape) {
  .causes-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .card-image {
    height: 200px;
  }
}

/* Ultra-wide screens */
@media (min-width: 1600px) {
  .causes-grid {
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 60px;
  }
}
</style>