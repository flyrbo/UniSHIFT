<template>
  <section id="faq" class="questions-section section-padding">
    <div class="container">
      <div class="section-header fade-in" ref="header">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-subtitle">Find answers to common questions about our mission and impact</p>
      </div>
      
      <div class="questions-container">
        <div class="questions-list">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="question-card fade-in"
            :ref="(el) => setCardRef(el, index)"
          >
            <button 
              class="question-header"
              @click="toggleQuestion(index)"
              :class="{ active: activeQuestion === index }"
            >
              <span class="question-text">{{ faq.question }}</span>
              <ChevronDown 
                :size="20" 
                class="chevron"
                :class="{ rotated: activeQuestion === index }"
              />
            </button>
            <div 
              class="question-content"
              :class="{ expanded: activeQuestion === index }"
            >
              <div class="answer-text">{{ faq.answer }}</div>
            </div>
          </div>
        </div>
        
        <div class="contact-form-trigger fade-in" ref="contactTrigger">
          <div class="trigger-content">
            <h3>Have a different question?</h3>
            <p>We're here to help! Send us your inquiry and we'll get back to you as soon as possible.</p>
            <button @click="showContactForm = true" class="btn-primary">
              <MessageCircle :size="20" style="margin-right: 8px;" />
              Ask a Question
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Question Form Component -->
    <QuestionForm 
      :isVisible="showContactForm" 
      @close="showContactForm = false" 
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronDown, MessageCircle } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'
import QuestionForm from './QuestionForm.vue'

const header = ref()
const contactTrigger = ref()
const cardRefs = ref<(HTMLElement | null)[]>([])
const activeQuestion = ref(-1)
const showContactForm = ref(false)

const faqs = [
  {
    question: "What is Unishift and what does it stand for?",
    answer: "Unishift is a student-led charity initiative focused on creating positive change through community-driven projects, awareness campaigns, and educational outreach. Our mission is to empower young people to make a difference by addressing social, environmental, and educational challenges both locally and globally."
  },
  {
    question: "What makes Unishift different from other charities?",
    answer: "What makes Unishift special is that we're entirely youth-driven. We believe in the power of young people to create change, and we give students a platform to lead, learn, and make a real difference. Our approach is grassroots, hands-on, and fueled by genuine passion for social impact."
  },
  {
    question: "Where does my money go?",
    answer: "Your generous donation goes a long way! Every pound you give helps us provide warm, nutritious meals to people experiencing homelessness, making a real difference in their day. It also helps us keep the Unishift platform running—so we can continue spreading awareness, sharing updates, and bringing more people together to support meaningful causes. With your support, we're able to create real impact, both online and in the community."
  },
  {
    question: "Do you accept food donations?",
    answer: "We really appreciate your kindness and willingness to help! However, for health and safety reasons, we're unable to accept food donations from individuals at this time. To ensure the well-being of those we support, we can only accept food that comes from certified organizations that follow strict health and safety guidelines. This helps us make sure everything we distribute is safe, properly handled, and high-quality. Thank you so much for understanding—and there are still plenty of other ways to get involved if you'd like to help!"
  }
]

const setCardRef = (el: any, index: number) => {
  if (el && el instanceof HTMLElement) {
    cardRefs.value[index] = el
  }
}

const toggleQuestion = (index: number) => {
  activeQuestion.value = activeQuestion.value === index ? -1 : index
}

useIntersectionObserver(header, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    header.value.classList.add('visible')
  }
})

useIntersectionObserver(contactTrigger, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    contactTrigger.value.classList.add('visible')
  }
})

onMounted(() => {
  cardRefs.value.forEach((card, index) => {
    if (card) {
      useIntersectionObserver(card, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          setTimeout(() => {
            card.classList.add('visible')
          }, index * 100)
        }
      })
    }
  })
})
</script>

<style scoped>
.questions-section {
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

.questions-container {
  max-width: 800px;
  margin: 0 auto;
}

.questions-list {
  margin-bottom: 60px;
}

.question-card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.question-card:hover {
  box-shadow: 0 8px 30px rgba(255, 107, 53, 0.1);
  border-color: var(--primary-orange);
}

.question-header {
  width: 100%;
  padding: 24px 28px;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.question-header.active {
  background: var(--light-orange);
}

.question-text {
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  font-weight: 600;
  color: var(--text-dark);
  flex: 1;
  margin-right: 16px;
}

.chevron {
  color: var(--text-light);
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.question-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.question-content.expanded {
  max-height: 300px;
}

.answer-text {
  padding: 0 28px 24px;
  color: var(--text-light);
  line-height: 1.6;
  font-size: clamp(0.9rem, 2vw, 1rem);
}

.contact-form-trigger {
  background: linear-gradient(135deg, var(--light-orange) 0%, var(--white) 100%);
  padding: 48px;
  border-radius: 24px;
  text-align: center;
  border: 1px solid rgba(255, 107, 53, 0.1);
}

.trigger-content h3 {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.trigger-content p {
  color: var(--text-light);
  margin-bottom: 24px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  font-size: clamp(0.9rem, 2vw, 1rem);
}

/* Tablet styles */
@media (max-width: 1024px) {
  .contact-form-trigger {
    padding: 40px 32px;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .section-header {
    margin-bottom: 60px;
  }
  
  .question-header {
    padding: 20px;
  }
  
  .answer-text {
    padding: 0 20px 20px;
  }
  
  .contact-form-trigger {
    padding: 32px 24px;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .questions-container {
    padding: 0;
  }
  
  .question-header {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .question-text {
    margin-right: 0;
  }
  
  .chevron {
    align-self: flex-end;
  }
  
  .answer-text {
    padding: 0 16px 16px;
  }
  
  .contact-form-trigger {
    padding: 24px 16px;
  }
}
</style>