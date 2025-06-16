<template>
  <footer id="contact" class="footer-section">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <div class="logo-icon">
              <img src="\UniSHIFT-LOGO-removebg-preview.png" alt="Logo" class="logo-img" />
            </div>
            <span class="logo-text">UniSHIFT</span>
          </div>
          <p class="brand-description">
            Serving Hope In Food Together through unified action- Building stronger communities through 
            sustainable food security and compassionate support.
          </p>
        </div>
        
        <div class="footer-info">
          <div class="contact-info">
            <h4 class="info-title">Contact Us</h4>
            <div class="contact-items">
              <div class="contact-item">
                <MailIcon :size="16" class="contact-icon" />
                <span>info@unishift.org </span>
              </div>
              <div class="contact-item">
                <Phone :size="16" class="contact-icon" />
                <span>+44 7880690832</span>
              </div>
              <div class="contact-item">
                <Clock :size="16" class="contact-icon" />
                <span>Mon-Fri: 1pm-5pm</span>
              </div>
            </div>
          </div>
          
          <div class="social-section">
            <h4 class="info-title">Follow Us</h4>
            <div class="social-links">
              <a href="https://www.instagram.com/unishift_org/" class="social-link" aria-label="Instagram">
                <Instagram :size="20" />
              </a>
              <a href="https://www.linkedin.com/company/unishift" class="social-link" aria-label="LinkedIn">
                <Linkedin :size="20" />
              </a>
              <a href="https://unishift.carrd.co/" class="social-link" aria-label="Carrd.co">
                <CreditCard :size="20" />
              </a>
              <a href="#" class="social-link" aria-label="TikTok">
                <Music3 :size="20" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-bottom-content">
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Instagram, Linkedin, Phone, Clock, MailIcon, CreditCard, Music3 } from 'lucide-vue-next'
</script>

<style scoped>
.footer-section {
  background: linear-gradient(135deg, var(--text-dark) 0%, #1a202c 100%);
  color: white;
  padding: 60px 0 0;
  width: 100%;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
  align-items: start;
}

.footer-brand {
  max-width: 400px;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo-icon {
  margin-right: 16px;
  padding: 7px;
  background: white;
  border-radius: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.logo-text {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-description {
  color: #a0aec0;
  line-height: 1.6;
  font-size: clamp(0.9rem, 2vw, 1rem);
}

.footer-info {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: start;
}

.info-title {
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #a0aec0;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  line-height: 1.4;
}

.contact-icon {
  color: var(--primary-orange);
  margin-top: 2px;
  flex-shrink: 0;
}

.social-section {
  text-align: center;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}

.social-link {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--primary-orange);
  transform: translateY(-2px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  color: #a0aec0;
  margin: 0;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
}

.footer-bottom-links {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.footer-bottom-links a {
  color: #a0aec0;
  text-decoration: none;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: var(--primary-orange);
}

/* Tablet styles */
@media (max-width: 1024px) {
  .footer-section {
    padding: 50px 0 0;
  }
  
  .footer-content {
    gap: 40px;
  }
  
  .footer-info {
    gap: 32px;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .footer-section {
    padding: 40px 0 0;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .footer-info {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }
  
  .social-links {
    flex-direction: row;
    justify-content: center;
    gap: 16px;
  }
  
  .contact-items {
    align-items: center;
  }

    .logo-img {
    width: 50px;
    height: 50px;
  }

  .logo-icon {
    padding: 6px;
  }
  
  .contact-item {
    justify-content: center;
    text-align: center;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .footer-bottom-links {
    justify-content: center;
    gap: 20px;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .footer-section {
    padding: 32px 0 0;
  }
  
  .footer-content {
    gap: 32px;
  }
  
  .footer-info {
    gap: 24px;
  }
  
  .contact-items {
    gap: 10px;
  }
  
  .contact-item {
    flex-direction: column;
    gap: 6px;
  }
  
  .social-links {
    gap: 12px;
  }
  
  .social-link {
    width: 40px;
    height: 40px;
  }
  
  .footer-bottom {
    padding: 20px 0;
  }
  
  .footer-bottom-links {
    flex-direction: column;
    gap: 12px;
  }
}

/* Landscape mobile */
@media (max-width: 896px) and (orientation: landscape) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  
  .footer-info {
    grid-template-columns: 1fr auto;
    gap: 24px;
  }
  
  .social-links {
    flex-direction: column;
    gap: 10px;
  }
}

/* Ultra-wide screens */
@media (min-width: 1600px) {
  .footer-content {
    gap: 80px;
  }
  
  .footer-info {
    gap: 60px;
  }
}

/* Ensure proper spacing on very small screens */
@media (max-width: 320px) {
  .footer-section {
    padding: 24px 0 0;
  }
  
  .logo-icon {
    margin-right: 8px;
    padding: 6px;
  }
  
  .social-link {
    width: 36px;
    height: 36px;
  }
  
  .contact-item {
    font-size: 0.75rem;
  }
}
</style>