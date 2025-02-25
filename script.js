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



// Fetch events from API - This provides proper event data matching the speakers
async function fetchEvents() {
    return [
        {
            "id": 1,
            "title": "Future of Banking in Digital Era",
            "type": "Conference",
            "date": "2025-03-10T10:00:00",
            "description": "Join a thought-provoking discussion on the evolution of financial systems in an increasingly digital world and the implications for global economies.",
            "speaker": {
                "id": 1,
                "name": "Raghuram Rajan",
                "role": "Keynote Speaker",
                "profession": "Economist & Professor",
                "current_position": "Professor at University of Chicago Booth School of Business",
                "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"
            },
            "location": "Virtual Event",
            "registration_url": "#register"
        },
        {
            "id": 2,
            "title": "India's Digital Transformation Journey",
            "type": "Talk",
            "date": "2025-03-15T14:30:00",
            "description": "Explore how technology is reshaping India's economic landscape and creating new opportunities for entrepreneurs and innovators.",
            "speaker": {
                "id": 2,
                "name": "Nandan Nilekani",
                "role": "Guest Speaker",
                "profession": "Tech Entrepreneur",
                "current_position": "Chairman of Infosys",
                "image": "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400"
            },
            "location": "Main Auditorium",
            "registration_url": "#register"
        },
        {
            "id": 3,
            "title": "Innovations in Biotech & Healthcare",
            "type": "Workshop",
            "date": "2025-03-20T09:00:00",
            "description": "A hands-on workshop exploring breakthrough technologies in healthcare and how entrepreneurs can contribute to solving global health challenges.",
            "speaker": {
                "id": 3,
                "name": "Kiran Mazumdar-Shaw",
                "role": "Workshop Leader",
                "profession": "Biotech Entrepreneur",
                "current_position": "Executive Chairperson of Biocon",
                "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"
            },
            "location": "Innovation Lab",
            "registration_url": "#register"
        },
        {
            "id": 4,
            "title": "AI & Future of Technology",
            "type": "Masterclass",
            "date": "2025-03-25T13:00:00",
            "description": "Discover how artificial intelligence is transforming industries and creating new possibilities for startups and established businesses alike.",
            "speaker": {
                "id": 4,
                "name": "Sundar Pichai",
                "role": "Special Guest",
                "profession": "Tech Executive",
                "current_position": "CEO of Google & Alphabet",
                "image": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400"
            },
            "location": "Tech Hub",
            "registration_url": "#register"
        },
        {
            "id": 5,
            "title": "Healthcare Entrepreneurship",
            "type": "Fireside Chat",
            "date": "2025-03-30T16:00:00",
            "description": "Learn how innovative business models can make quality healthcare more accessible and affordable while creating sustainable enterprises.",
            "speaker": {
                "id": 5,
                "name": "Dr. Devi Shetty",
                "role": "Featured Speaker",
                "profession": "Healthcare Pioneer",
                "current_position": "Chairman and Founder of Narayana Health",
                "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"
            },
            "location": "Health Sciences Building",
            "registration_url": "#register"
        },
        {
            "id": 6,
            "title": "Women in Leadership",
            "type": "Panel Discussion",
            "date": "2025-04-05T11:00:00",
            "description": "An inspiring discussion on breaking barriers, navigating challenges, and creating impact as women leaders in business and technology.",
            "speaker": {
                "id": 6,
                "name": "Arundhati Bhattacharya",
                "role": "Panel Moderator",
                "profession": "Business Leader",
                "current_position": "Chairperson & CEO of Salesforce India",
                "image": "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=400&h=400"
            },
            "location": "Leadership Center",
            "registration_url": "#register"
        },
        {
            "id": 7,
            "title": "Building Global Businesses",
            "type": "Lecture",
            "date": "2025-04-10T15:30:00",
            "description": "Learn from the experiences of building an Indian conglomerate that successfully expanded into global markets while maintaining core values.",
            "speaker": {
                "id": 7,
                "name": "Ratan Tata",
                "role": "Distinguished Speaker",
                "profession": "Industrialist",
                "current_position": "Chairman Emeritus of Tata Sons",
                "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"
            },
            "location": "Business School Auditorium",
            "registration_url": "#register"
        },
        {
            "id": 8,
            "title": "Global Economic Trends",
            "type": "Seminar",
            "date": "2025-04-15T10:00:00",
            "description": "Gain insights into current economic challenges and opportunities for entrepreneurs in a rapidly changing global landscape.",
            "speaker": {
                "id": 8,
                "name": "Gita Gopinath",
                "role": "Guest Lecturer",
                "profession": "Economist",
                "current_position": "First Deputy Managing Director of IMF",
                "image": "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&h=400"
            },
            "location": "Economics Department",
            "registration_url": "#register"
        },
        {
            "id": 9,
            "title": "Startup Pitch Competition",
            "type": "Competition",
            "date": "2025-04-20T14:00:00",
            "description": "Watch innovative startups pitch their ideas and receive feedback from our distinguished judging panel. A great opportunity to network and learn.",
            "speaker": {
                "id": 9,
                "name": "Shashi Tharoor",
                "role": "Judge",
                "profession": "Politician & Author",
                "current_position": "Member of Parliament, Lok Sabha",
                "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"
            },
            "location": "Entrepreneurship Center",
            "registration_url": "#register"
        }
    ]
}

// Render events with modern animations and interactions
async function renderEvents() {
    const eventsContainer = document.getElementById('events-container');
    const events = await fetchEvents();

    // Clear loading placeholders
    eventsContainer.innerHTML = '';

    // If no events or error, show message
    if (!events || events.length === 0) {
        eventsContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="inline-block p-6 rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700">
                    <svg class="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <h3 class="text-xl text-gray-400">No events found</h3>
                    <p class="text-gray-500 mt-2">Check back later for exciting updates!</p>
                </div>
            </div>
        `;
        return;
    }

    // Apply modern card layout to each event
    events.forEach((event, index) => {
        const eventDate = new Date(event.date);
        const card = document.createElement('div');
        
        // Initialize card without opacity and transform classes that could hide it
        card.className = 'event-card flex flex-col rounded-xl overflow-hidden bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 transition-all duration-700 hover:shadow-xl hover:shadow-blue-500/10';
        
        // Format date strings
        const formattedDate = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        // Determine badge color based on event type
        let badgeClass = 'bg-e-cell-blue';
        if (event.type === 'Workshop') badgeClass = 'bg-purple-600';
        if (event.type === 'Conference') badgeClass = 'bg-emerald-600';
        if (event.type === 'Competition') badgeClass = 'bg-amber-600';
        if (event.type === 'Panel Discussion') badgeClass = 'bg-pink-600';
        
        card.innerHTML = `
            <div class="relative overflow-hidden h-52 group">
                <img src="${event.speaker?.image || `/api/placeholder/400/250`}" alt="${event.title}" 
                     class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div class="absolute top-4 left-4 ${badgeClass} text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    ${event.type}
                </div>
                <div class="absolute bottom-4 left-4 flex items-center bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <svg class="w-4 h-4 text-e-cell-blue mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span class="text-xs font-medium text-white">${formattedDate} · ${formattedTime}</span>
                </div>
            </div>
            <div class="p-6 flex-1 flex flex-col">
                <div class="mb-3 flex items-center">
                    <span class="text-sm text-gray-400">${event.location}</span>
                </div>
                <h3 class="text-xl font-bold mb-3 hover:text-e-cell-blue transition-colors duration-300">${event.title}</h3>
                <p class="text-gray-400 mb-6 line-clamp-2">${event.description}</p>
                <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full overflow-hidden ring-2 ring-e-cell-blue/20">
                            <img src="${event.speaker?.image || `/api/placeholder/40/40`}" alt="${event.speaker?.name}" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <h6 class="font-medium">${event.speaker?.name}</h6>
                            <p class="text-xs text-gray-400">${event.speaker?.role || 'Speaker'}</p>
                        </div>
                    </div>
                    <button class="register-btn text-xs font-medium text-e-cell-blue hover:text-white bg-e-cell-blue/10 hover:bg-e-cell-blue px-3 py-1.5 rounded-full transition-all duration-300">
                        Register
                    </button>
                </div>
            </div>
        `;

        eventsContainer.appendChild(card);
        
        // Add a subtle fade-in animation that won't prevent visibility
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.opacity = '1';
        }, 100 + (index * 50));
    });

    // Add filter functionality
    const filterButtons = document.querySelectorAll('.event-filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-e-cell-blue', 'text-white'));
            button.classList.add('active', 'bg-e-cell-blue', 'text-white');
            
            const filterType = button.textContent.trim();
            
            // Apply filter with simpler animation that won't hide cards
            const cards = document.querySelectorAll('.event-card');
            cards.forEach(card => {
                // Apply a subtle scale animation
                card.style.transform = 'scale(0.98)';
                card.style.opacity = '0.7';
                
                setTimeout(() => {
                    // Show all if "All Events" is selected
                    if (filterType === 'All Events') {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.transform = 'scale(1)';
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        // Check if card contains the selected event type
                        if (card.innerHTML.includes(filterType)) {
                            card.style.display = 'flex';
                            setTimeout(() => {
                                card.style.transform = 'scale(1)';
                                card.style.opacity = '1';
                            }, 50);
                        } else {
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 200);
                        }
                    }
                }, 200);
            });
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add required CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .event-filter-btn {
            position: relative;
            overflow: hidden;
        }
        
        .event-filter-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
        }
        
        .event-filter-btn:hover::after {
            width: 300px;
            height: 300px;
        }
        
        .event-filter-btn.active {
            font-weight: 500;
        }
        
        .register-btn {
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .register-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            z-index: -1;
            transition: left 0.6s ease;
        }
        
        .register-btn:hover::before {
            left: 100%;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Render events
    renderEvents();
});
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