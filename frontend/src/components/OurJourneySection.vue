<template>
  <section id="journey" class="journey-section section-padding">
    <div class="container">
      <div class="section-header fade-in" ref="header">
        <h2 class="section-title">Our Journey</h2>
        <p class="section-subtitle">Milestones in our mission to serve hope</p>
      </div>
      
      <div class="journey-content fade-in" ref="journeyContent">
        <!-- Desktop Timeline -->
        <div class="desktop-timeline">
          <div class="timeline-container">
            <div class="timeline">
              <div 
                v-for="(milestone, index) in milestones" 
                :key="index"
                class="timeline-node"
                :class="{ active: activeNode === index }"
                @click="setActiveNode(index)"
              >
                <div class="node-circle">
                  <component :is="milestone.icon" :size="16" />
                </div>
                <div class="node-date">{{ milestone.date }}</div>
              </div>
            </div>
          </div>
          
          <div class="content-card">
            <div class="card-header">
              <div class="navigation-arrows">
                <button @click="previousNode" class="nav-arrow" :disabled="activeNode === 0">
                  <ChevronLeft :size="20" />
                </button>
                <button @click="nextNode" class="nav-arrow" :disabled="activeNode === milestones.length - 1">
                  <ChevronRight :size="20" />
                </button>
              </div>
            </div>
            
            <div class="card-content">
              <div class="milestone-date">{{ milestones[activeNode].date }}</div>
              <h3 class="milestone-title">{{ milestones[activeNode].title }}</h3>
              <p class="milestone-description">{{ milestones[activeNode].description }}</p>
              <div class="milestone-stats" v-if="milestones[activeNode].stats">
                <div 
                  v-for="(stat, key) in milestones[activeNode].stats" 
                  :key="key"
                  class="stat-item"
                >
                  <div class="stat-value">{{ stat }}</div>
                  <div class="stat-label">{{ key }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Timeline -->
        <div class="mobile-timeline">
          <div class="mobile-timeline-header">
            <h3>Timeline Navigation</h3>
            <div class="timeline-progress">
              <div class="progress-bar" :style="{ width: `${((activeNode + 1) / milestones.length) * 100}%` }"></div>
            </div>
          </div>
          
          <div class="mobile-timeline-nav">
            <button 
              v-for="(milestone, index) in milestones" 
              :key="index"
              class="mobile-timeline-button"
              :class="{ active: activeNode === index }"
              @click="setActiveNode(index)"
            >
              <div class="mobile-node-circle">
                <component :is="milestone.icon" :size="14" />
              </div>
              <div class="mobile-node-info">
                <div class="mobile-node-date">{{ milestone.date }}</div>
                <div class="mobile-node-title">{{ milestone.title }}</div>
              </div>
            </button>
          </div>
          
          <div class="mobile-content-card">
            <div class="mobile-card-header">
              <div class="milestone-date">{{ milestones[activeNode].date }}</div>
              <div class="mobile-navigation">
                <button @click="previousNode" class="mobile-nav-arrow" :disabled="activeNode === 0">
                  <ChevronLeft :size="18" />
                </button>
                <span class="milestone-counter">{{ activeNode + 1 }} / {{ milestones.length }}</span>
                <button @click="nextNode" class="mobile-nav-arrow" :disabled="activeNode === milestones.length - 1">
                  <ChevronRight :size="18" />
                </button>
              </div>
            </div>
            
            <div class="mobile-card-content">
              <h3 class="milestone-title">{{ milestones[activeNode].title }}</h3>
              <p class="milestone-description">{{ milestones[activeNode].description }}</p>
              <div class="milestone-stats" v-if="milestones[activeNode].stats">
                <div 
                  v-for="(stat, key) in milestones[activeNode].stats" 
                  :key="key"
                  class="stat-item"
                >
                  <div class="stat-value">{{ stat }}</div>
                  <div class="stat-label">{{ key }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight, Heart, Lightbulb, NotepadText } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'

const header = ref()
const journeyContent = ref()
const activeNode = ref(0)
let autoProgressInterval: ReturnType<typeof setInterval>;

const milestones = [
  {
    date: "December 2024",
    title: "Intial Idea",
    description: "Committee of members witnessed the deprivation and decided to make a change. Our first Idea was launched and our causes to help the community were decided.",
    icon: Lightbulb,
    stats: {
      "Members": "9",
    }
  },
  {
    date: "January 2025",
    title: "Planning",
    description: "We faced numerous issues when trying to establish Unishift, as students we did not earn and income and could not afford all the necessities to make  a charity. Therefore; we settled for an informal organization and planned the areas we will visit as well as the food we will give out and how much the total cost would be.",
    icon: NotepadText,
    stats: {
    }
  },
  {
    date: "March 2025",
    title: "Securing Socials",
    description: "Unishift successfully secured its domain and launched its official website, marking a major milestone in its development. Shortly after, we began building a presence on social media, steadily gaining followers and increasing engagement. Through consistent outreach and content sharing, we started raising awareness about our mission and the causes we stand for, connecting with a growing community that shares our vision",
    icon: Heart,
  },
]

const setActiveNode = (index: number) => {
  activeNode.value = index
}

const nextNode = () => {
  if (activeNode.value < milestones.length - 1) {
    activeNode.value++
  }
}

const previousNode = () => {
  if (activeNode.value > 0) {
    activeNode.value--
  }
}

const autoProgress = () => {
  if (activeNode.value < milestones.length - 1) {
    activeNode.value++
  } else {
    activeNode.value = 0
  }
}

useIntersectionObserver(header, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    header.value.classList.add('visible')
  }
})

useIntersectionObserver(journeyContent, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    journeyContent.value.classList.add('visible')
  }
})

onMounted(() => {
  autoProgressInterval = setInterval(autoProgress, 8000)
})

onUnmounted(() => {
  if (autoProgressInterval) {
    clearInterval(autoProgressInterval)
  }
})
</script>

<style scoped>
.journey-section {
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

/* Desktop Timeline Styles */
.desktop-timeline {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 60px;
  align-items: start;
}

.timeline-container {
  position: sticky;
  top: 100px;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--gray-200);
}

.timeline-node {
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.timeline-node:hover {
  transform: translateX(8px);
}

.node-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 3px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.timeline-node.active .node-circle {
  background: var(--primary-orange);
  border-color: var(--primary-orange);
  color: white;
  transform: scale(1.2);
}

.node-date {
  font-weight: 600;
  color: var(--text-light);
  transition: color 0.3s ease;
  font-size: clamp(0.8rem, 2vw, 1rem);
}

.timeline-node.active .node-date {
  color: var(--primary-orange);
}

.content-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 30px 40px 0;
  display: flex;
  justify-content: flex-end;
}

.navigation-arrows {
  display: flex;
  gap: 12px;
}

.nav-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--gray-200);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-arrow:hover:not(:disabled) {
  border-color: var(--primary-orange);
  color: var(--primary-orange);
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.card-content {
  padding: 20px 40px 40px;
}

.milestone-date {
  color: var(--primary-orange);
  font-weight: 600;
  margin-bottom: 8px;
  font-size: clamp(0.8rem, 2vw, 1rem);
}

.milestone-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 16px;
}

.milestone-description {
  color: var(--text-light);
  line-height: 1.6;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  margin-bottom: 32px;
}

.milestone-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 24px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: var(--light-orange);
  border-radius: 12px;
}

.stat-value {
  display: block;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 700;
  color: var(--primary-orange);
  margin-bottom: 4px;
}

.stat-label {
  color: var(--text-light);
  font-size: clamp(0.8rem, 2vw, 0.9rem);
}

/* Mobile Timeline Styles */
.mobile-timeline {
  display: none;
}

.mobile-timeline-header {
  margin-bottom: 24px;
}

.mobile-timeline-header h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.timeline-progress {
  height: 4px;
  background: var(--gray-200);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--primary-orange);
  transition: width 0.3s ease;
}

.mobile-timeline-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;
}

.mobile-timeline-nav::-webkit-scrollbar {
  width: 4px;
}

.mobile-timeline-nav::-webkit-scrollbar-track {
  background: var(--gray-100);
  border-radius: 2px;
}

.mobile-timeline-nav::-webkit-scrollbar-thumb {
  background: var(--primary-orange);
  border-radius: 2px;
}

.mobile-timeline-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border: 2px solid var(--gray-200);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
}

.mobile-timeline-button:hover {
  border-color: var(--primary-orange);
  background: var(--light-orange);
}

.mobile-timeline-button.active {
  border-color: var(--primary-orange);
  background: var(--light-orange);
}

.mobile-node-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.mobile-timeline-button.active .mobile-node-circle {
  background: var(--primary-orange);
  color: white;
}

.mobile-node-info {
  flex: 1;
  min-width: 0;
}

.mobile-node-date {
  font-size: 0.8rem;
  color: var(--text-light);
  margin-bottom: 2px;
}

.mobile-node-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-content-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.mobile-card-header {
  padding: 20px;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-navigation {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-nav-arrow {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--gray-200);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-nav-arrow:hover:not(:disabled) {
  border-color: var(--primary-orange);
  color: var(--primary-orange);
}

.mobile-nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.milestone-counter {
  font-size: 0.8rem;
  color: var(--text-light);
  font-weight: 500;
}

.mobile-card-content {
  padding: 20px;
}

/* Tablet styles */
@media (max-width: 1024px) {
  .desktop-timeline {
    grid-template-columns: 250px 1fr;
    gap: 40px;
  }
  
  .card-content {
    padding: 20px 30px 30px;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .section-header {
    margin-bottom: 60px;
  }
  
  .desktop-timeline {
    display: none;
  }
  
  .mobile-timeline {
    display: block;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .mobile-timeline-nav {
    max-height: 250px;
  }
  
  .mobile-timeline-button {
    padding: 10px;
    gap: 10px;
  }
  
  .mobile-node-circle {
    width: 28px;
    height: 28px;
  }
  
  .mobile-node-title {
    font-size: 0.8rem;
  }
  
  .mobile-card-header {
    padding: 16px;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .mobile-card-content {
    padding: 16px;
  }
  
  .milestone-stats {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  .stat-item {
    padding: 16px 12px;
  }
}

/* Ultra-wide screens */
@media (min-width: 1600px) {
  .desktop-timeline {
    grid-template-columns: 400px 1fr;
    gap: 80px;
  }
}
</style>