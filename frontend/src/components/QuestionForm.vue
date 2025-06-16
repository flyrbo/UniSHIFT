<template>
  <div 
    v-if="isVisible" 
    class="modal-overlay"
    @click="closeForm"
  >
    <div class="modal-content" @click.stop>
      <button 
        @click="closeForm"
        class="modal-close"
        aria-label="Close form"
      >
        <X :size="20" />
      </button>
      
      <div class="form-header">
        <h3 class="form-title">Send us your question</h3>
        <p class="form-subtitle">We'll aim to get back to you within 24 hours</p>
        <p class="form-note">If we don't get back to you in 24 hours, please email us on info@unishift.org</p>
      </div>
      
      <!-- Success Message -->
      <div v-if="submitStatus === 'success'" class="success-message">
        <div class="success-icon">
          <CheckCircle :size="24" />
        </div>
        <div class="success-content">
          <h4>Question Submitted Successfully!</h4>
          <p>Thank you for reaching out. We've received your question and will get back to you within 24 hours.</p>
          <button @click="resetForm" class="btn-primary">
            Ask Another Question
          </button>
        </div>
      </div>
      
      <!-- Error Message -->
      <div v-if="submitStatus === 'error'" class="error-message">
        <div class="error-icon">
          <AlertCircle :size="24" />
        </div>
        <div class="error-content">
          <h4>Submission Failed</h4>
          <p>{{ errorMessage }}</p>
          <button @click="submitStatus = ''" class="btn-secondary">
            Try Again
          </button>
        </div>
      </div>
      
      <!-- Form -->
      <form v-if="!submitStatus" @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="email" class="form-label">Your Email</label>
          <input 
            type="email" 
            id="email"
            v-model="formData.email"
            required
            placeholder="your@email.com"
            :disabled="isSubmitting"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="question" class="form-label">Your Question</label>
          <textarea 
            id="question"
            v-model="formData.question"
            required
            placeholder="Type your question here..."
            rows="4"
            :disabled="isSubmitting"
            class="form-textarea"
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button 
            type="button" 
            @click="closeForm" 
            class="btn-cancel"
            :disabled="isSubmitting"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="btn-submit"
            :disabled="isSubmitting"
          >
            <Send v-if="!isSubmitting" :size="18" />
            <div v-else class="loading-spinner"></div>
            {{ isSubmitting ? 'Sending...' : 'Send Question' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Send, CheckCircle, AlertCircle } from 'lucide-vue-next'

// Props
interface Props {
  isVisible: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
}>()

// Reactive data
const isSubmitting = ref(false)
const submitStatus = ref('') // '', 'success', 'error'
const errorMessage = ref('')

const formData = ref({
  email: '',
  question: ''
})

// Methods
const closeForm = () => {
  emit('close')
  resetForm()
}

const submitForm = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  submitStatus.value = ''
  errorMessage.value = ''

  try {
    const response = await fetch('/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.value.email.trim(),
        question: formData.value.question.trim()
      })
    })

    const result = await response.json()

    if (result.success) {
      submitStatus.value = 'success'
    } else {
      submitStatus.value = 'error'
      errorMessage.value = result.message || 'Failed to submit your question. Please try again.'
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    submitStatus.value = 'error'
    errorMessage.value = 'Network error. Please check your connection and try again.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.value = { email: '', question: '' }
  submitStatus.value = ''
  errorMessage.value = ''
}

// Watch for modal visibility changes to handle body scroll
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  color: var(--text-light);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: var(--gray-100);
  color: var(--text-dark);
}

.form-header {
  margin-bottom: 32px;
  text-align: center;
}

.form-title {
  font-size: clamp(1.3rem, 4vw, 1.6rem);
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.form-subtitle {
  color: var(--text-light);
  margin-bottom: 8px;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}

.form-note {
  color: var(--text-light);
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  font-style: italic;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 600;
  color: var(--text-dark);
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}

.form-input,
.form-textarea {
  padding: 14px 16px;
  border: 2px solid var(--gray-200);
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
  width: 100%;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-orange);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.form-input:disabled,
.form-textarea:disabled {
  background: var(--gray-100);
  cursor: not-allowed;
  opacity: 0.7;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  max-height: 200px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
}

.btn-cancel,
.btn-submit {
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 120px;
  border: none;
}

.btn-cancel {
  background: transparent;
  color: var(--text-light);
  border: 2px solid var(--gray-200);
}

.btn-cancel:hover:not(:disabled) {
  background: var(--gray-100);
  color: var(--text-dark);
}

.btn-submit {
  background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
}

.btn-cancel:disabled,
.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.success-message,
.error-message {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 24px;
  text-align: left;
}

.success-message {
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border: 2px solid #0ea5e9;
}

.error-message {
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  border: 2px solid #ef4444;
}

.success-icon,
.error-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.success-icon {
  color: #0ea5e9;
}

.error-icon {
  color: #ef4444;
}

.success-content,
.error-content {
  flex: 1;
}

.success-content h4,
.error-content h4 {
  font-size: clamp(1rem, 3vw, 1.2rem);
  font-weight: 600;
  margin-bottom: 8px;
}

.success-content h4 {
  color: #0c4a6e;
}

.error-content h4 {
  color: #991b1b;
}

.success-content p,
.error-content p {
  color: var(--text-light);
  margin-bottom: 16px;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  line-height: 1.5;
}

.success-content .btn-primary,
.error-content .btn-secondary {
  padding: 10px 20px;
  font-size: 0.9rem;
}

.loading-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Tablet styles */
@media (max-width: 1024px) {
  .modal-content {
    padding: 32px;
    max-width: 480px;
  }
  
  .form-actions {
    gap: 10px;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 16px;
  }
  
  .modal-content {
    padding: 28px 24px;
    max-width: 100%;
    border-radius: 16px;
  }
  
  .modal-close {
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
  }
  
  .form-header {
    margin-bottom: 28px;
  }
  
  .contact-form {
    gap: 20px;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .btn-cancel,
  .btn-submit {
    width: 100%;
    min-width: auto;
    padding: 16px 24px;
  }
  
  .success-message,
  .error-message {
    flex-direction: column;
    text-align: center;
    gap: 12px;
    padding: 20px;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .modal-overlay {
    padding: 12px;
  }
  
  .modal-content {
    padding: 24px 20px;
    max-height: 95vh;
  }
  
  .modal-close {
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
  }
  
  .form-header {
    margin-bottom: 24px;
  }
  
  .contact-form {
    gap: 18px;
  }
  
  .form-input,
  .form-textarea {
    padding: 12px 14px;
    font-size: 16px; /* Prevent zoom on iOS */
  }
  
  .form-textarea {
    min-height: 80px;
  }
  
  .btn-cancel,
  .btn-submit {
    padding: 14px 20px;
  }
  
  .success-message,
  .error-message {
    padding: 16px;
  }
}

/* Landscape mobile */
@media (max-width: 896px) and (orientation: landscape) {
  .modal-content {
    max-height: 85vh;
    padding: 24px;
  }
  
  .form-header {
    margin-bottom: 20px;
  }
  
  .contact-form {
    gap: 16px;
  }
  
  .form-textarea {
    min-height: 60px;
  }
}

/* Ultra-wide screens */
@media (min-width: 1600px) {
  .modal-content {
    max-width: 600px;
    padding: 50px;
  }
  
  .form-header {
    margin-bottom: 40px;
  }
  
  .contact-form {
    gap: 28px;
  }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .modal-content {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .modal-overlay,
  .modal-content,
  .loading-spinner {
    animation: none;
  }
  
  .btn-submit:hover:not(:disabled) {
    transform: none;
  }
}

/* Dark mode support (if needed in future) */
@media (prefers-color-scheme: dark) {
  .modal-overlay {
    background: rgba(0, 0, 0, 0.8);
  }
}
</style>