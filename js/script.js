// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Check if viewing in desktop mode on mobile
    const isDesktopModeOnMobile = window.innerWidth < window.outerWidth || 
                                 (window.matchMedia('(hover: none)').matches && window.innerWidth > 768);
    
    if (isDesktopModeOnMobile) {
        document.body.classList.add('desktop-mode-mobile');
        // Adjust font sizes for readability
        adjustFontSizes();
    }
    
    // Function to adjust font sizes for better readability
    function adjustFontSizes() {
        if (window.innerWidth < 992) {
            document.querySelectorAll('p, li, a:not(.btn)').forEach(el => {
                el.style.fontSize = '16px';
            });
            document.querySelectorAll('h1, .section-title').forEach(el => {
                el.style.fontSize = '28px';
            });
            document.querySelectorAll('h2').forEach(el => {
                el.style.fontSize = '24px';
            });
            document.querySelectorAll('h3').forEach(el => {
                el.style.fontSize = '20px';
            });
        }
    }
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Hide the mobile-menu-btn when menu is active
            this.style.display = 'none';
        });
    }
    
    // Close menu functions
    function closeMenu() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        // Show the mobile-menu-btn again when menu is closed
        if (mobileMenuBtn) {
            mobileMenuBtn.style.display = 'flex';
        }
    }
    
    // Close with X button
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    
    // Close with overlay click
    overlay.addEventListener('click', closeMenu);
    
    // Dropdown Toggle with animation
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns smoothly
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    const otherContent = otherDropdown.querySelector('.dropdown-content');
                    otherContent.style.maxHeight = '0';
                    otherContent.style.opacity = '0';
                    setTimeout(() => {
                        otherDropdown.classList.remove('active');
                    }, 300);
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
            if (dropdown.classList.contains('active')) {
                content.style.display = 'block';
                requestAnimationFrame(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                });
            } else {
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                setTimeout(() => {
                    content.style.display = 'none';
                }, 300);
            }
        });
    });
    
    // Mobile Dropdown Toggle
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        });
    }
    
    // Back to Top Button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Here you would normally send the data to a server
            // For demonstration, we'll just log it and show a success message
            console.log('Form Values:', formValues);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you soon.</p>
                    <button class="btn primary-btn close-btn">Close</button>
                </div>
            `;
            
            document.body.appendChild(successMessage);
            
            // Close success message
            const closeBtn = successMessage.querySelector('.close-btn');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(successMessage);
            });
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Testimonial Slider (if needed for touch devices)
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialsSlider.classList.add('active');
            startX = e.pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });
        
        testimonialsSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialsSlider.classList.remove('active');
        });
        
        testimonialsSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialsSlider.classList.remove('active');
        });
        
        testimonialsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or if it's a dropdown toggle on mobile
            if (href === '#' || (window.innerWidth <= 768 && this.parentElement.classList.contains('dropdown'))) {
                return;
            }
            
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
            
            // Scroll to the element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add CSS styles for success message
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .success-content {
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 400px;
            width: 90%;
        }
        
        .success-content i {
            font-size: 3rem;
            color: #4CAF50;
            margin-bottom: 15px;
        }
        
        .success-content h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
        
        .success-content p {
            margin-bottom: 20px;
            color: #666;
        }
        
        .close-btn {
            display: inline-block;
        }
    `;
    document.head.appendChild(style);
    
    // Add touch feedback
    const addTouchFeedback = (elements) => {
        elements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            ['touchend', 'touchcancel'].forEach(event => {
                element.addEventListener(event, function() {
                    this.style.transform = '';
                });
            });
        });
    };

    // Apply touch feedback to buttons and cards
    addTouchFeedback(document.querySelectorAll('.btn, .service-card, .blog-card'));

    // Fix for tables on mobile
    const tables = document.querySelectorAll('table');
    if (tables.length > 0) {
        tables.forEach(table => {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            wrapper.style.overflowX = 'auto';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth < 992) {
            adjustFontSizes();
        }
    });

    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                this.classList.toggle('active');
                answer.classList.toggle('active');
            });
        });
    }

    // Pricing Plan Modal Functionality
    const choosePlanButtons = document.querySelectorAll('.choose-plan-btn');
    const planFormModal = document.querySelector('.plan-form-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const selectedPlanText = document.getElementById('selected-plan');
    const planTypeInput = document.getElementById('plan-type');
    
    if (choosePlanButtons.length > 0 && planFormModal) {
        // Open modal when Choose Plan is clicked
        choosePlanButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Get the plan name from the parent pricing card
                const planCard = this.closest('.pricing-card');
                const planName = planCard.querySelector('.card-header h3').textContent;
                
                // Update the modal title and hidden input
                selectedPlanText.textContent = planName;
                planTypeInput.value = planName;
                
                // Show the modal
                planFormModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
                
                // Add animation class
                setTimeout(() => {
                    planFormModal.querySelector('.modal-content').classList.add('active');
                }, 10);
            });
        });
        
        // Close modal when X is clicked
        closeModalBtn.addEventListener('click', function() {
            planFormModal.style.display = 'none';
            document.body.style.overflow = ''; // Enable scrolling again
        });
        
        // Close modal when clicking outside the content
        planFormModal.addEventListener('click', function(e) {
            if (e.target === planFormModal) {
                planFormModal.style.display = 'none';
                document.body.style.overflow = ''; // Enable scrolling again
            }
        });
        
        // Handle form submission
        const planSelectionForm = document.querySelector('.plan-selection-form');
        if (planSelectionForm) {
            planSelectionForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const formData = new FormData(this);
                const formValues = {};
                
                for (let [key, value] of formData.entries()) {
                    formValues[key] = value;
                }
                
                // Here you would normally send the data to a server
                console.log('Plan Selection Form Values:', formValues);
                
                // Show success message
                planFormModal.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-content">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your request for the ${formValues.plan} plan has been submitted. We'll contact you shortly.</p>
                        <button class="btn primary-btn close-success-btn">Close</button>
                    </div>
                `;
                
                document.body.appendChild(successMessage);
                document.body.style.overflow = 'hidden'; // Keep preventing scroll
                
                // Close success message
                const closeSuccessBtn = successMessage.querySelector('.close-success-btn');
                closeSuccessBtn.addEventListener('click', function() {
                    document.body.removeChild(successMessage);
                    document.body.style.overflow = ''; // Enable scrolling again
                });
                
                // Reset form
                planSelectionForm.reset();
            });
        }
    }
}); 