// Gallery and modal functionality for project showcase

class ProjectGallery {
    constructor() {
        this.modal = document.getElementById('projectModal');
        this.modalBody = document.getElementById('modalBody');
        this.closeBtn = document.querySelector('.modal-close');
        this.currentProject = null;
        
        this.projectData = {
            project1: {
                title: 'E-commerce Platform',
                description: 'A comprehensive Store inventory to faccilitate the easy acces on online product',
                images: [
                    'images/cart.jpg?auto=compress&cs=tinysrgb&w=800',
                    'images/store1.jpg?auto=compress&cs=tinysrgb&w=800',
                    'images/delivery.jpg?auto=compress&cs=tinysrgb&w=800',
                    
                ],
                technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Express.js'],
                features: [
                    'User authentication and authorization',
                    'Access Control Role Mechanism',
                    'Secure payment processing with Stripe',
                    'Order tracking and management',
                    'Admin dashboard for inventory management',
                    'Responsive design for all devices',
                    'Real-time notifications',
                ],
                liveUrl: '#',
                githubUrl: 'https://github.com/TWARIQABDUL/abubastore/tree/frontend',
                completionDate: 'March 2024',
                client: 'Abouba Store Inc.'
            },
            project2: {
                title: 'Movie Pire Application',
                description: 'A Movie Stream website tha keeps you and your family updated and enjoy the moment',
                images: [
                    'images/movie1.jpg?auto=compress&cs=tinysrgb&w=800',
                    'images/movie2.jpg?auto=compress&cs=tinysrgb&w=800',
                    'images/movie3.jpg?auto=compress&cs=tinysrgb&w=800'
                ],
                technologies: ['React JS', 'Socket.io', 'MySQL', 'Laravel PHP', 'JWT'],
                features: [
                    'Real-time collaboration with WebSocket',
                    'User Registration And Authntication Mechanism',
                    'Capture user interaction and provide personalized content',
                    'Admin dashboard ',
                    'Recomendation And notifications',
                    'Project timeline and Gantt charts',
                    'Advanced filtering and search',
                    'Time tracking and reporting',
                    'Mobile-responsive interface'
                ],
                liveUrl: '#',
                githubUrl: 'https://github.com/TWARIQABDUL/moviepire',
                completionDate: 'January 2024',
                client: 'Thousand Softs LTD'
            },
            project3: {
                title: 'Analytics Dashboard',
                description: 'An interactive data visualization dashboard providing real-time insights and comprehensive reporting for business intelligence.',
                images: [
                    'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
                    'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
                    'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800'
                ],
                technologies: ['React', 'D3.js','FastAPI', 'ySQL', 'Redis'],
                features: [
                    'Interactive charts and graphs with D3.js',
                    'Real-time data streaming',
                    'Customizable dashboard layouts',
                    'Advanced filtering and date ranges',
                    'Export functionality (PDF, Excel, CSV)',
                    'User role-based access control',
                    'Automated report generation',
                    'Mobile-optimized responsive design'
                ],
                liveUrl: 'https://abubastore.vercel.app/',
                githubUrl: 'https://github.com/TWARIQABDUL/abubastore',
                completionDate: 'February 2024',
                client: 'Tradind View FX'
            }
        };
        
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.setupKeyboardNavigation();
    }

    setupEventListeners() {
        // Project view buttons
        const viewButtons = document.querySelectorAll('.btn-view');
        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.getAttribute('data-project');
                this.openProject(projectId);
            });
        });

        // Modal close events
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Close modal when clicking outside
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                switch (e.key) {
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    openProject(projectId) {
        const project = this.projectData[projectId];
        if (!project) return;

        this.currentProject = project;
        this.renderProjectContent(project);
        this.showModal();
    }

    renderProjectContent(project) {
        const content = `
            <article class="project-detail">
                <header class="project-header">
                    <h2 class="project-title">${project.title}</h2>
                    <div class="project-meta">
                        <span class="completion-date">Completed: ${project.completionDate}</span>
                        <span class="client">Client: ${project.client}</span>
                    </div>
                </header>

                <div class="project-gallery">
                    ${this.renderImageGallery(project.images)}
                </div>

                <div class="project-content">
                    <section class="project-description">
                        <h3>Project Overview</h3>
                        <p>${project.description}</p>
                    </section>

                    <section class="project-technologies">
                        <h3>Technologies Used</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </section>

                    <section class="project-features">
                        <h3>Key Features</h3>
                        <ul class="feature-list">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </section>

                    <section class="project-links">
                        <h3>Project Links</h3>
                        <div class="project-buttons">
                            <a href="${project.liveUrl}" target="_blank" class="btn btn-primary" rel="noopener noreferrer">
                                <span>🔗</span> Live Demo
                            </a>
                            <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary" rel="noopener noreferrer">
                                <span>💻</span> View Code
                            </a>
                        </div>
                    </section>
                </div>
            </article>
        `;

        this.modalBody.innerHTML = content;
        this.setupGalleryControls();
    }

    renderImageGallery(images) {
        if (!images || images.length === 0) return '';

        return `
            <div class="gallery-container">
                <div class="gallery-main">
                    <img src="${images[0]}" alt="Project screenshot" class="gallery-main-image" loading="lazy">
                    <div class="gallery-controls">
                        <button class="gallery-btn gallery-prev" aria-label="Previous image">‹</button>
                        <button class="gallery-btn gallery-next" aria-label="Next image">›</button>
                    </div>
                    <div class="gallery-counter">
                        <span class="current-image">1</span> / <span class="total-images">${images.length}</span>
                    </div>
                </div>
                <div class="gallery-thumbnails">
                    ${images.map((img, index) => `
                        <img src="${img}" alt="Project screenshot ${index + 1}" 
                             class="gallery-thumbnail ${index === 0 ? 'active' : ''}" 
                             data-index="${index}" loading="lazy">
                    `).join('')}
                </div>
            </div>
        `;
    }

    setupGalleryControls() {
        const mainImage = this.modalBody.querySelector('.gallery-main-image');
        const thumbnails = this.modalBody.querySelectorAll('.gallery-thumbnail');
        const prevBtn = this.modalBody.querySelector('.gallery-prev');
        const nextBtn = this.modalBody.querySelector('.gallery-next');
        const currentCounter = this.modalBody.querySelector('.current-image');

        if (!mainImage || !thumbnails.length) return;

        let currentIndex = 0;
        const images = Array.from(thumbnails).map(thumb => thumb.src);

        // Thumbnail click handlers
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                this.setActiveImage(index, mainImage, thumbnails, currentCounter);
                currentIndex = index;
            });
        });

        // Navigation button handlers
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                this.setActiveImage(currentIndex, mainImage, thumbnails, currentCounter);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                this.setActiveImage(currentIndex, mainImage, thumbnails, currentCounter);
            });
        }

        // Store current index for keyboard navigation
        this.currentImageIndex = currentIndex;
        this.galleryImages = images;
        this.galleryElements = { mainImage, thumbnails, currentCounter };
    }

    setActiveImage(index, mainImage, thumbnails, currentCounter) {
        // Update main image with fade effect
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = thumbnails[index].src;
            mainImage.style.opacity = '1';
        }, 150);

        // Update thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        // Update counter
        if (currentCounter) {
            currentCounter.textContent = index + 1;
        }

        // Update stored index
        this.currentImageIndex = index;
    }

    previousImage() {
        if (!this.galleryElements) return;
        
        const newIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
        this.setActiveImage(newIndex, this.galleryElements.mainImage, this.galleryElements.thumbnails, this.galleryElements.currentCounter);
    }

    nextImage() {
        if (!this.galleryElements) return;
        
        const newIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
        this.setActiveImage(newIndex, this.galleryElements.mainImage, this.galleryElements.thumbnails, this.galleryElements.currentCounter);
    }

    showModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        const firstFocusable = this.modal.querySelector('button, a, input, textarea, select');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentProject = null;
        this.currentImageIndex = 0;
        this.galleryImages = [];
        this.galleryElements = null;
        
        // Return focus to the trigger button
        document.activeElement.blur();
    }
}

// Lightbox functionality for general image viewing
class Lightbox {
    constructor() {
        this.lightboxElement = null;
        this.currentImageIndex = 0;
        this.images = [];
        this.initialize();
    }

    initialize() {
        this.createLightboxElement();
        this.setupEventListeners();
    }

    createLightboxElement() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img class="lightbox-image" alt="Enlarged image">
                <div class="lightbox-controls">
                    <button class="lightbox-prev" aria-label="Previous image">&lsaquo;</button>
                    <button class="lightbox-next" aria-label="Next image">&rsaquo;</button>
                </div>
                <div class="lightbox-counter">
                    <span class="lightbox-current">1</span> / <span class="lightbox-total">1</span>
                </div>
            </div>
        `;
        
        lightbox.style.cssText = `
            display: none;
            position: fixed;
            z-index: 3000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
        `;
        
        document.body.appendChild(lightbox);
        this.lightboxElement = lightbox;
    }

    setupEventListeners() {
        const lightbox = this.lightboxElement;
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        // Close button
        closeBtn.addEventListener('click', () => this.close());

        // Navigation buttons
        prevBtn.addEventListener('click', () => this.previous());
        nextBtn.addEventListener('click', () => this.next());

        // Click outside to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.close();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                switch (e.key) {
                    case 'Escape':
                        this.close();
                        break;
                    case 'ArrowLeft':
                        this.previous();
                        break;
                    case 'ArrowRight':
                        this.next();
                        break;
                }
            }
        });

        // Setup image click handlers
        this.setupImageHandlers();
    }

    setupImageHandlers() {
        // Add click handlers to images that should open in lightbox
        const images = document.querySelectorAll('.project-image img, .about-img, .profile-image');
        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                this.open([img.src], 0);
            });
        });
    }

    open(imageUrls, startIndex = 0) {
        this.images = imageUrls;
        this.currentImageIndex = startIndex;
        this.updateImage();
        this.lightboxElement.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightboxElement.style.display = 'none';
        document.body.style.overflow = '';
    }

    next() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.updateImage();
    }

    previous() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    updateImage() {
        const img = this.lightboxElement.querySelector('.lightbox-image');
        const current = this.lightboxElement.querySelector('.lightbox-current');
        const total = this.lightboxElement.querySelector('.lightbox-total');
        const controls = this.lightboxElement.querySelector('.lightbox-controls');

        img.src = this.images[this.currentImageIndex];
        current.textContent = this.currentImageIndex + 1;
        total.textContent = this.images.length;

        // Show/hide controls based on number of images
        controls.style.display = this.images.length > 1 ? 'flex' : 'none';
    }
}

// Initialize gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    new ProjectGallery();
    new Lightbox();
});

// Export for use in other modules
window.Gallery = {
    ProjectGallery,
    Lightbox
};