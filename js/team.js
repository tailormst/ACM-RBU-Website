// ====================
// TEAM SECTION - MODALS & ANIMATIONS
// ====================

class TeamSection {
  constructor() {
    this.memberCards = document.querySelectorAll('.member-card');
    this.modal = document.getElementById('bio-modal');
    this.modalClose = document.querySelector('.modal-close');
    
    this.init();
  }
  
  init() {
    // Initialize scroll animations
    this.initScrollAnimations();
    
    // Initialize modal functionality
    this.initModals();
    
    // Prevent social icon clicks from opening modal
    this.initSocialIcons();
  }
  
  // Scroll-triggered Staggered Fade-in
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    this.memberCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // Modal Functionality
  initModals() {
    this.memberCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't open modal if clicking on social icons
        if (e.target.closest('.social-icon')) {
          return;
        }
        this.openModal(card);
      });
    });
    
    // Close modal
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }
    
    // Close on backdrop click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }
  
  openModal(card) {
    const name = card.querySelector('.member-name').textContent;
    const role = card.querySelector('.member-role').textContent;
    const department = card.querySelector('.member-department').textContent;
    const imageSrc = card.querySelector('.member-image').src;
    const bio = card.getAttribute('data-bio');
    const linkedin = card.getAttribute('data-linkedin');
    const twitter = card.getAttribute('data-twitter');
    const github = card.getAttribute('data-github');
    
    // Update modal content
    document.querySelector('.modal-image').src = imageSrc;
    document.querySelector('.modal-info h3').textContent = name;
    document.querySelector('.modal-info .member-role').textContent = role;
    document.querySelector('.modal-info .member-department').textContent = department;
    document.querySelector('.modal-body p').textContent = bio;
    
    // Update social links
    const socialContainer = document.querySelector('.modal-social');
    socialContainer.innerHTML = '';
    
    if (linkedin) {
      socialContainer.innerHTML += `
        <a href="${linkedin}" target="_blank" rel="noopener" class="social-icon">
          <i data-lucide="linkedin"></i>
        </a>
      `;
    }
    
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Show modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Prevent Social Icon Clicks from Opening Modal
  initSocialIcons() {
    const socialIcons = document.querySelectorAll('.member-overlay .social-icon');
    
    socialIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.stopPropagation();
        const link = icon.getAttribute('data-link');
        if (link) {
          window.open(link, '_blank', 'noopener,noreferrer');
        }
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const teamSection = document.querySelector('.team-section');
  if (teamSection) {
    new TeamSection();
  }
});
