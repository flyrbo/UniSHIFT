<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="navbar-container">
      <div class="navbar-brand">
        <div class="logo">
          <div class="logo-icon">
              <img src="\UniSHIFT-LOGO-removebg-preview.png" alt="Logo" class="logo-img" />
          </div>
          <span class="logo-text">UniSHIFT</span>
        </div>
      </div>
      
      <button 
        class="hamburger-menu"
        :class="{ 'active': isMenuOpen }"
        @click="toggleMenu"
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
    
    <!-- Mobile Menu Overlay -->
    <div 
      class="menu-overlay"
      :class="{ 'active': isMenuOpen }"
      @click="closeMenu"
    >
      <div class="mobile-menu" @click.stop>
        <div class="menu-header">
          <div class="logo">
            <div class="logo-icon">
              <img src="\UniSHIFT-LOGO-removebg-preview.png" alt="Logo" class="logo-img" />
            </div>
            <span class="logo-text">UniSHIFT</span>
          </div>
          <button 
            class="close-menu"
            @click="closeMenu"
            aria-label="Close menu"
          >
            <X :size="24" />
          </button>
        </div>
        
        <nav class="menu-nav">
          <a href="#home" class="menu-link" @click="closeMenu">
            <Home :size="20" />
            <span>Home</span>
          </a>
          <a href="#causes" class="menu-link" @click="closeMenu">
            <Heart :size="20" />
            <span>Our Causes</span>
          </a>
          <a href="#help" class="menu-link" @click="closeMenu">
            <HandHeart :size="20" />
            <span>Ways to Help</span>
          </a>
          <a href="#journey" class="menu-link" @click="closeMenu">
            <MapPin :size="20" />
            <span>Our Journey</span>
          </a>
          <a href="#faq" class="menu-link" @click="closeMenu">
            <MessageCircle :size="20" />
            <span>FAQ</span>
          </a>
          <a href="#contact" class="menu-link" @click="closeMenu">
            <Phone :size="20" />
            <span>Contact</span>
          </a>
        </nav>
        
        <div class="menu-actions">
          <a href="https://www.gofundme.com/f/5468g9-hunger-and-homelessness?attribution_id=sl:48ed5f15-7aac-4849-ba46-2d7863e0ed47&lang=en_GB&utm_campaign=man_ss_icons&utm_medium=customer&utm_source=copy_link" class="btn-primary menu-donate" @click="closeMenu">
            <Heart :size="18" style="margin-right: 8px;" />
            Donate Now
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Heart, X, Home, Heart as HandHeart, MapPin, MessageCircle, Phone } from 'lucide-vue-next'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  // Prevent body scroll when menu is open
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Close menu on escape key
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen.value) {
      closeMenu()
    }
  }
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: calc(100% - 40px);
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 107, 53, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 107, 53, 0.2);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-icon {
  margin-right: 16px;
  padding: 6px;
  background: white;
  border-radius: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hamburger-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
}

.hamburger-menu:hover {
  background: rgba(255, 107, 53, 0.1);
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: var(--primary-orange);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger-line:not(:last-child) {
  margin-bottom: 4px;
}

.hamburger-menu.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(3px, 3px);
}

.hamburger-menu.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-menu.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(3px, -3px);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(1.5px);
  border-radius: 20px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 999;
}

.menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-menu {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 320px;
  max-width: calc(100vw - 40px);
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.menu-overlay.active .mobile-menu {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--gray-200);
}

.close-menu {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-light);
}

.close-menu:hover {
  background: var(--primary-orange);
  color: white;
}

.menu-nav {
  padding: 20px 0;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  color: var(--text-dark);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.menu-link:hover {
  background: var(--light-orange);
  border-left-color: var(--primary-orange);
  color: var(--primary-orange);
}

.menu-actions {
  padding: 20px 24px;
  border-top: 1px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-donate,
.menu-volunteer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

/* Tablet styles */
@media (max-width: 1024px) {
  .navbar {
    width: calc(100% - 32px);
    top: 16px;
  }
  
  .navbar-container {
    padding: 14px 20px;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .navbar {
    width: calc(100% - 24px);
    top: 12px;
  }
  
  .navbar-container {
    padding: 12px 16px;
  }

  .logo-img {
    width: 44px;
    height: 44px;
  }

  .logo-icon {
    padding: 6px;
  }
  
  .logo-text {
    font-size: 1.3rem;
  }
  
  .mobile-menu {
    width: 280px;
    top: 12px;
    right: 12px;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .navbar {
    width: calc(100% - 16px);
    top: 8px;
  }
  
  .navbar-container {
    padding: 10px 14px;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
  
  .logo-icon {
    margin-right: 8px;
    padding: 6px;
  }
  
  .hamburger-menu {
    width: 40px;
    height: 40px;
  }
  
  .hamburger-line {
    width: 20px;
  }
  
  .mobile-menu {
    width: calc(100vw - 16px);
    top: 8px;
    right: 8px;
    left: 8px;
  }
  
  .menu-header {
    padding: 16px 20px;
  }
  
  .menu-link {
    padding: 14px 20px;
  }
  
  .menu-actions {
    padding: 16px 20px;
  }
}

/* Landscape mobile */
@media (max-width: 896px) and (orientation: landscape) {
  .mobile-menu {
    max-height: calc(100vh - 40px);
    overflow-y: auto;
  }
  
  .menu-nav {
    padding: 16px 0;
  }
  
  .menu-link {
    padding: 12px 24px;
  }
}

/* Ultra-wide screens */
@media (min-width: 1600px) {
  .navbar {
    max-width: 1400px;
  }
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Add scroll offset for fixed navbar */
section {
  scroll-margin-top: 100px;
}
</style>