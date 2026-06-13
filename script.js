/* =========================================
   Theme Toggle functionality
========================================= */
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('i');
const htmlElement = document.documentElement;

// Check for saved theme preference in local storage
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
}

themeBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

/* =========================================
   Mobile Menu Toggle
========================================= */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.querySelector('.close-btn');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

/* =========================================
   Typewriter Effect
========================================= */
const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

TypeWriter.prototype.type = function() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span>${this.txt}</span>`;

    let typeSpeed = 100;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.getElementById('typewriter');
    const words = ['Software Engineer', 'Full Stack Developer', 'Problem Solver'];
    const wait = 2500;
    
    // Check if element exists
    if(txtElement) {
        txtElement.innerHTML = ''; // clear static text
        new TypeWriter(txtElement, words, wait);
    }
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Check reveal elements on load
    reveal();
}

/* =========================================
   Scroll Reveal Animation
========================================= */
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
            
            // If it's a progress bar, animate it
            if(reveals[i].classList.contains('skill-category')) {
                const bars = reveals[i].querySelectorAll('.bar-inner');
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease-in-out';
                        bar.style.width = width;
                    }, 300);
                });
            }
        }
    }
}

window.addEventListener('scroll', reveal);

/* =========================================
   Navbar Sticky & Active Link Setting
========================================= */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-links .nav-link');

window.addEventListener('scroll', () => {
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* =========================================
   Contact Form Validation
========================================= */
const contactForm = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Name Validation
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            nameInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            nameInput.parentElement.classList.remove('error');
        }
        
        // Email Validation
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            emailInput.parentElement.classList.remove('error');
        }
        
        // Message Validation
        const msgInput = document.getElementById('message');
        if (msgInput.value.trim() === '') {
            msgInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            msgInput.parentElement.classList.remove('error');
        }
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                successMsg.style.display = 'flex';
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            }, 1500);
        }
    });
    
    // Clear error class on input
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('error');
        });
    });
}

/* =========================================
   Custom Video Player
========================================= */
const video = document.getElementById('preview-video');
const videoOverlay = document.getElementById('video-overlay');
const playPauseBtn = document.getElementById('control-play-pause');
const muteBtn = document.getElementById('control-mute');
const fullscreenBtn = document.getElementById('control-fullscreen');
const progressContainer = document.querySelector('.progress-bar-container');
const progressFill = document.getElementById('progress-fill');
const timeDisplay = document.getElementById('time-display');

if (video) {
    // Video Tab Switching logic
    const tabBtns = document.querySelectorAll('.video-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;

            // Swap active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Pause and load new video source
            video.pause();
            const newSource = btn.getAttribute('data-video');
            video.src = newSource;
            video.load();

            // Reset video controls UI
            videoOverlay.classList.remove('hidden');
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            progressFill.style.width = '0%';
            timeDisplay.textContent = '00:00 / 00:00';
        });
    });

    // Toggle play/pause state
    function togglePlay() {
        if (video.paused) {
            video.play().then(() => {
                videoOverlay.classList.add('hidden');
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }).catch(err => {
                console.error("Playback failed: ", err);
            });
        } else {
            video.pause();
            videoOverlay.classList.remove('hidden');
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }

    // Format time helper (MM:SS)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // Event listeners
    videoOverlay.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    playPauseBtn.addEventListener('click', togglePlay);

    // Update progress bar and time display
    video.addEventListener('timeupdate', () => {
        if (video.duration) {
            const percent = (video.currentTime / video.duration) * 100;
            progressFill.style.width = `${percent}%`;
            timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
        }
    });

    // Set duration initially when metadata is loaded
    video.addEventListener('loadedmetadata', () => {
        timeDisplay.textContent = `00:00 / ${formatTime(video.duration)}`;
    });

    // Seek video when clicking progress bar
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            if (video.duration) {
                video.currentTime = pos * video.duration;
            }
        });
    }

    // Toggle mute
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            if (video.muted) {
                muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            } else {
                muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            }
        });
    }

    // Toggle Fullscreen
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const videoWrapper = video.parentElement;
            if (!document.fullscreenElement) {
                if (videoWrapper.requestFullscreen) {
                    videoWrapper.requestFullscreen();
                } else if (videoWrapper.mozRequestFullScreen) {
                    videoWrapper.mozRequestFullScreen();
                } else if (videoWrapper.webkitRequestFullscreen) {
                    videoWrapper.webkitRequestFullscreen();
                } else if (videoWrapper.msRequestFullscreen) {
                    videoWrapper.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });
    }

    // Listen for fullscreen change
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        } else {
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
        }
    });
    
    document.addEventListener('webkitfullscreenchange', () => {
        if (document.webkitFullscreenElement) {
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        } else {
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
        }
    });

    // Reset player on end
    video.addEventListener('ended', () => {
        videoOverlay.classList.remove('hidden');
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        progressFill.style.width = '0%';
    });
}

/* =========================================
   YouTube Video Modal
========================================= */
const videoModal = document.getElementById('video-modal');
const modalOverlay = document.querySelector('.video-modal-overlay');
const modalClose = document.querySelector('.close-modal');
const modalIframe = document.getElementById('modal-iframe');
const demoCards = document.querySelectorAll('.demo-card');

if (videoModal && modalIframe) {
    demoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-video-id');
            if (videoId) {
                // Set iframe URL with autoplay and enablejsapi
                modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
                videoModal.classList.add('active');
                videoModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Stop page scrolling
            }
        });
    });

    function closeModal() {
        videoModal.classList.remove('active');
        videoModal.setAttribute('aria-hidden', 'true');
        modalIframe.src = ''; // Clear source to stop video
        document.body.style.overflow = ''; // Restore scrolling
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
}
