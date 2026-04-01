// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking a link (for mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact form simulation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        formMessage.textContent = 'Terima kasih! Tim BIGBEE akan menghubungi Anda maksimal 2x24 jam.';
        formMessage.style.color = '#b22222';
        contactForm.reset();
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#2d1a1a';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #8b0000 0%, #a11c1c 100%)';
        navbar.style.backdropFilter = 'none';
    }
});

// ========== PAGINATION & FILTER GALERI PROYEK ==========
const projectItems = document.querySelectorAll('.project-item');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const paginationNumbers = document.getElementById('paginationNumbers');

let currentPage = 1;
let itemsPerPage = 6;  // 6 proyek per halaman
let currentFilter = 'all';
let filteredItems = [];

// Initialize filtered items
function updateFilteredItems() {
    if (currentFilter === 'all') {
        filteredItems = Array.from(projectItems);
    } else {
        filteredItems = Array.from(projectItems).filter(item => 
            item.getAttribute('data-category') === currentFilter
        );
    }
}

// Display projects for current page
function displayProjects() {
    const totalItems = filteredItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Adjust current page if out of range
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }
    if (currentPage < 1) {
        currentPage = 1;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);
    
    // Hide all projects first
    projectItems.forEach(item => {
        item.style.display = 'none';
    });
    
    // Show only items for current page
    itemsToShow.forEach(item => {
        item.style.display = 'block';
        // Add animation
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 50);
    });
    
    // Update pagination buttons
    updatePaginationButtons(totalPages);
}

// Update pagination controls
function updatePaginationButtons(totalPages) {
    // Update prev/next buttons
    if (prevPageBtn) {
        prevPageBtn.disabled = currentPage === 1 || totalPages === 0;
    }
    if (nextPageBtn) {
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
    
    // Generate page numbers
    if (paginationNumbers) {
        paginationNumbers.innerHTML = '';
        
        if (totalPages <= 1) {
            const paginationContainer = document.querySelector('.pagination-controls');
            if (paginationContainer) {
                paginationContainer.style.display = 'none';
            }
            return;
        }
        
        const paginationContainer = document.querySelector('.pagination-controls');
        if (paginationContainer) {
            paginationContainer.style.display = 'flex';
        }
        
        // Show page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.classList.add('page-number');
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                displayProjects();
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            });
            paginationNumbers.appendChild(pageBtn);
        }
    }
}

// Next page
function nextPage() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProjects();
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
}

// Previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProjects();
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
}

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        currentFilter = button.getAttribute('data-filter');
        currentPage = 1;
        
        updateFilteredItems();
        displayProjects();
    });
});

// Event listeners for pagination buttons
if (prevPageBtn) {
    prevPageBtn.addEventListener('click', prevPage);
}
if (nextPageBtn) {
    nextPageBtn.addEventListener('click', nextPage);
}

// Initialize animations for project items
projectItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// ========== PAGINATION TESTIMONI KLIEN ==========
const testimonialItems = document.querySelectorAll('.testimonial-card');
const prevTestimonialBtn = document.getElementById('prevTestimonialPageBtn');
const nextTestimonialBtn = document.getElementById('nextTestimonialPageBtn');
const testimonialPaginationNumbers = document.getElementById('testimonialPaginationNumbers');

let currentTestimonialPage = 1;
let testimonialsPerPage = 3;  // 3 testimoni per halaman
let testimonialItemsArray = [];

// Initialize testimonial items
function updateTestimonialItems() {
    testimonialItemsArray = Array.from(testimonialItems);
}

// Display testimonials for current page
function displayTestimonials() {
    const totalItems = testimonialItemsArray.length;
    const totalPages = Math.ceil(totalItems / testimonialsPerPage);
    
    // Adjust current page if out of range
    if (currentTestimonialPage > totalPages && totalPages > 0) {
        currentTestimonialPage = totalPages;
    }
    if (currentTestimonialPage < 1) {
        currentTestimonialPage = 1;
    }
    
    const startIndex = (currentTestimonialPage - 1) * testimonialsPerPage;
    const endIndex = startIndex + testimonialsPerPage;
    const itemsToShow = testimonialItemsArray.slice(startIndex, endIndex);
    
    // Hide all testimonials first
    testimonialItemsArray.forEach(item => {
        item.style.display = 'none';
        item.classList.remove('show');
    });
    
    // Show only items for current page with animation
    itemsToShow.forEach((item, index) => {
        item.style.display = 'block';
        setTimeout(() => {
            item.classList.add('show');
        }, index * 100);
    });
    
    // Update testimonial pagination buttons
    updateTestimonialPagination(totalPages);
}

// Update testimonial pagination controls
function updateTestimonialPagination(totalPages) {
    // Update prev/next buttons
    if (prevTestimonialBtn) {
        prevTestimonialBtn.disabled = currentTestimonialPage === 1 || totalPages === 0;
    }
    if (nextTestimonialBtn) {
        nextTestimonialBtn.disabled = currentTestimonialPage === totalPages || totalPages === 0;
    }
    
    // Generate page numbers
    if (testimonialPaginationNumbers) {
        testimonialPaginationNumbers.innerHTML = '';
        
        if (totalPages <= 1) {
            const paginationContainer = document.querySelector('.testimonials-pagination');
            if (paginationContainer) {
                paginationContainer.style.display = 'none';
            }
            return;
        }
        
        const paginationContainer = document.querySelector('.testimonials-pagination');
        if (paginationContainer) {
            paginationContainer.style.display = 'flex';
        }
        
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.classList.add('page-number');
            if (i === currentTestimonialPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.addEventListener('click', () => {
                currentTestimonialPage = i;
                displayTestimonials();
                document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' });
            });
            testimonialPaginationNumbers.appendChild(pageBtn);
        }
    }
}

// Next testimonial page
function nextTestimonialPage() {
    const totalPages = Math.ceil(testimonialItemsArray.length / testimonialsPerPage);
    if (currentTestimonialPage < totalPages) {
        currentTestimonialPage++;
        displayTestimonials();
        document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' });
    }
}

// Previous testimonial page
function prevTestimonialPage() {
    if (currentTestimonialPage > 1) {
        currentTestimonialPage--;
        displayTestimonials();
        document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' });
    }
}

// Event listeners for testimonial pagination
if (prevTestimonialBtn) {
    prevTestimonialBtn.addEventListener('click', prevTestimonialPage);
}
if (nextTestimonialBtn) {
    nextTestimonialBtn.addEventListener('click', nextTestimonialPage);
}

// Initialize all
function init() {
    updateTestimonialItems();
    displayTestimonials();
    updateFilteredItems();
    displayProjects();
}

// Run init when page is fully loaded
document.addEventListener('DOMContentLoaded', init);
