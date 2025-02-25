// Page loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 800);
});

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    let lastScrollTop = 0;

    // Highlight active link based on current URL or section
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentUrl = window.location.href;
        const currentPath = window.location.pathname;

        // Set the home link as active by default if we're on the homepage
        if (currentPath === '/' || currentPath === '/index.html') {
            const homeLink = document.querySelector('.nav-link[href="#"]');
            if (homeLink) {
                homeLink.classList.add('active');
                homeLink.classList.add('text-white');
            }
        }

        // Check for anchor links in the current URL
        const currentHash = window.location.hash;
        if (currentHash) {
            const activeLink = document.querySelector(`.nav-link[href="${currentHash}"]`);
            if (activeLink) {
                navLinks.forEach(link => link.classList.remove('active', 'text-white'));
                activeLink.classList.add('active');
                activeLink.classList.add('text-white');
            }
        }

        // Add click event listeners to all nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                navLinks.forEach(l => l.classList.remove('active', 'text-white'));
                this.classList.add('active');
                this.classList.add('text-white');
            });
        });
    }

    // Call this initially to set the active link
    setActiveNavLink();

    // Update active link on scroll
    window.addEventListener('scroll', function () {
        // Get all sections for scroll-based highlighting
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        // Update active nav link based on current section
        if (current) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active', 'text-white');

                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                    link.classList.add('text-white');
                }
            });
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', function () {
        if (mobileMenu.classList.contains('hidden')) {
            // Open menu
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0');
                mobileMenu.classList.add('opacity-100');
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            }, 10);

            // Animate hamburger to X
            const path = menuToggle.querySelector('svg path');
            path.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            // Close menu
            mobileMenu.classList.add('opacity-0');
            mobileMenu.style.maxHeight = '0';

            // Hide after animation completes
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 500);

            // Animate X back to hamburger
            const path = menuToggle.querySelector('svg path');
            path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add background on scroll
        if (scrollTop > 50) {
            navbar.classList.add('py-2');
            navbar.classList.remove('py-3');
            navbar.classList.add('bg-black/80');
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('py-2');
            navbar.classList.add('py-3');
            navbar.classList.remove('bg-black/80');
            navbar.classList.remove('shadow-lg');
        }

        // Hide navbar on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});
// Fetch events from API
async function fetchEvents() {
    return [
        {
            "id": 1,
            "name": "Raghuram Rajan",
            "description": "Renowned economist and former Governor of the Reserve Bank of India. Currently a professor at the University of Chicago.",
            "current_position": "Professor at University of Chicago Booth School of Business"
        },
        {
            "id": 2,
            "name": "Nandan Nilekani",
            "description": "Co-founder of Infosys and architect of India's Aadhaar program. A prominent leader in India's digital transformation.",
            "current_position": "Chairman of Infosys"
        },
        {
            "id": 3,
            "name": "Kiran Mazumdar-Shaw",
            "description": "Founder of Biocon and a leader in the biotech industry, driving innovations in healthcare and pharmaceuticals.",
            "current_position": "Executive Chairperson of Biocon"
        },
        {
            "id": 4,
            "name": "Sundar Pichai",
            "description": "CEO of Alphabet Inc. and Google, known for leading innovations in AI, cloud computing, and search technology.",
            "current_position": "CEO of Google & Alphabet"
        },
        {
            "id": 5,
            "name": "Dr. Devi Shetty",
            "description": "Renowned cardiac surgeon and philanthropist, known for making healthcare affordable through Narayana Health.",
            "current_position": "Chairman and Founder of Narayana Health"
        },
        {
            "id": 6,
            "name": "Arundhati Bhattacharya",
            "description": "Former Chairperson of the State Bank of India and the first woman to lead India's largest bank.",
            "current_position": "Chairperson & CEO of Salesforce India"
        },
        {
            "id": 7,
            "name": "Ratan Tata",
            "description": "Former Chairman of Tata Sons, a visionary industrialist who transformed Tata Group into a global conglomerate.",
            "current_position": "Chairman Emeritus of Tata Sons"
        },
        {
            "id": 8,
            "name": "Gita Gopinath",
            "description": "Indian-American economist and the first female Chief Economist at the International Monetary Fund (IMF).",
            "current_position": "First Deputy Managing Director of IMF"
        },
        {
            "id": 9,
            "name": "Shashi Tharoor",
            "description": "Indian politician, diplomat, and author known for his eloquence and leadership in global affairs.",
            "current_position": "Member of Parliament, Lok Sabha"
        }
    ]
}

// Render events
async function renderEvents() {
    const eventsContainer = document.getElementById('events-container');
    const speakers = await fetchEvents();

    // Clear loading placeholders
    eventsContainer.innerHTML = '';

    // If no events or error, show message
    if (!speakers || speakers.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-span-full text-center py-10">
                <h3 class="text-xl text-gray-400">No events found. Check back later!</h3>
            </div>
        `;
        return;
    }

    // Convert speakers to events for demo purposes
    speakers.forEach((speaker, index) => {
        const date = new Date();
        date.setDate(date.getDate() + (index * 5)); // Spread events out over time

        const card = document.createElement('div');
        card.className = 'event-card flex flex-col rounded-xl overflow-hidden bg-gray-800 hover:bg-gray-750 transition-all duration-300';

        // Use speaker image or placeholder
        const imageUrl = speaker.image || `/api/placeholder/400/250`;

        card.innerHTML = `
            <div class="relative overflow-hidden h-48">
                <img src="${imageUrl}" alt="${speaker.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
                <div class="absolute top-4 left-4 bg-e-cell-blue text-white text-xs font-medium px-2 py-1 rounded">
                    ${new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
            </div>
            <div class="p-6 flex-1 flex flex-col">
                <div class="mb-2">
                    <span class="text-sm text-gray-400">${speaker.profession || 'Workshop'}</span>
                </div>
                <h3 class="text-xl font-bold mb-3">${speaker.role ? 'Talk: ' + speaker.role : 'Entrepreneurship Workshop'}</h3>
                <p class="text-gray-400 mb-4 line-clamp-2">${speaker.description || 'Join us for an exciting session with industry experts and innovators.'}</p>
                <div class="flex items-center gap-3 mt-auto">
                    <div class="w-10 h-10 rounded-full overflow-hidden">
                        <img src="${speaker.image || `/api/placeholder/40/40`}" alt="${speaker.name}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h6 class="font-medium">${speaker.name}</h6>
                        <p class="text-sm text-gray-400">${speaker.profession || 'Speaker'}</p>
                    </div>
                </div>
            </div>
        `;

        eventsContainer.appendChild(card);

        // Add staggered animation to cards
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, 150 * index);
    });
}

// Initialize animations with GSAP
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate fade-in elements
    gsap.utils.toArray('.fade-in').forEach((element, index) => {
        gsap.fromTo(element,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                }
            }
        );
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderEvents();
    initAnimations();

    // Simulate loading for better UX
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 800);
});