// =============================================
// NAVBAR - Scroll Effect
// =============================================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =============================================
// MOBILE MENU TOGGLE
// =============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.className = navLinks.classList.contains('active')
            ? 'fa-solid fa-xmark'
            : 'fa-solid fa-bars';
    });

    // মোবাইল মেনুর ভেতরের লিংকে ক্লিক করলে মেনু বন্ধ হবে
    document.querySelectorAll('#navLinks a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });
}

// =============================================
// MODAL SYSTEM DATA
// =============================================
const serviceData = {
    inbound: {
        title: "24/7 Inbound Customer Support",
        icon: "fa-headset",
        details: `
            <p>Provide your customers with flawless, multi-channel support around the clock.</p>
            <ul>
                <li><i class="fa-solid fa-check"></i> <b>Ticket Management:</b> Seamless handling of Zendesk, Freshdesk, or custom CRMs.</li>
                <li><i class="fa-solid fa-check"></i> <b>Live Chat Operations:</b> Industry-leading response times under 60 seconds.</li>
                <li><i class="fa-solid fa-check"></i> <b>Voice Support:</b> Professional, crystal-clear call handling natively in English.</li>
            </ul>`
    },
    outbound: {
        title: "Outbound Telemarketing & Sales",
        icon: "fa-bullseye",
        details: `
            <p>Scale your business revenue with data-driven outbound strategies managed by elite sales pros.</p>
            <ul>
                <li><i class="fa-solid fa-check"></i> <b>Cold Calling Campaigns:</b> High-converting scripts customized for your target demographic.</li>
                <li><i class="fa-solid fa-check"></i> <b>B2B/B2C Lead Generation:</b> Verified and highly qualified prospecting.</li>
                <li><i class="fa-solid fa-check"></i> <b>Appointment Setting:</b> Booking warm leads directly onto your closer's calendar.</li>
            </ul>`
    },
    omnichannel: {
        title: "Omnichannel Chat Mastery",
        icon: "fa-comments",
        details: `
            <p>Meet your customers exactly where they are with a centralized lightning-fast workflow.</p>
            <ul>
                <li><i class="fa-solid fa-check"></i> <b>Social Integration:</b> Unified inbox for WhatsApp, FB Messenger, and Instagram.</li>
                <li><i class="fa-solid fa-check"></i> <b>Email Solutions:</b> Thorough inbox sorting, tracking, and prompt follow-ups.</li>
                <li><i class="fa-solid fa-check"></i> <b>Hybrid AI Operations:</b> Smooth escalation from automated bots to human agents.</li>
            </ul>`
    },
    technical: {
        title: "Technical Helpdesk & IT Support",
        icon: "fa-screwdriver-wrench",
        details: `
            <p>Delight tech-savvy users with specialized agents trained to resolve complex technical issues.</p>
            <ul>
                <li><i class="fa-solid fa-check"></i> <b>Tier-1 & Tier-2 Troubleshooting:</b> Swift diagnostics for hardware, software, and access bugs.</li>
                <li><i class="fa-solid fa-check"></i> <b>SaaS & App Support:</b> Comprehensive walkthroughs and customer onboarding.</li>
                <li><i class="fa-solid fa-check"></i> <b>Developer Handoff Logs:</b> Clean bug reporting using Jira or Linear platforms.</li>
            </ul>`
    }
};

const opsData = {
    onboarding: {
        title: "7-Day Rapid Onboarding Process",
        icon: "fa-bolt",
        details: `
            <p>Our deployment blueprint gets a dedicated support squad fully aligned and active in exactly one week.</p>
            <ul>
                <li><i class="fa-solid fa-check"></i> <b>Day 1-2:</b> CRM, Slack, & internal knowledge-base synchronization.</li>
                <li><i class="fa-solid fa-check"></i> <b>Day 3-5:</b> Tailored macro workflows & brand voice training simulation.</li>
                <li><i class="fa-solid fa-check"></i> <b>Day 6-7:</b> Shadowed soft-launch and active platform sign-off.</li>
            </ul>`
    },
    omnichannel_ops: {
        title: "Complete Omnichannel Mastery",
        icon: "fa-headset",
        details: `
            <p>We unify your touchpoints into an integrated, seamless engine.</p>
            <ul>
                <li><i class="fa-solid fa-check"></i> <b>Instant Handoffs:</b> Switch seamlessly from chatbots to specialized tier agents.</li>
                <li><i class="fa-solid fa-check"></i> <b>Context Control:</b> Call history and past ticket logs viewable at a single glance.</li>
                <li><i class="fa-solid fa-check"></i> <b>Platform Agnostic:</b> Native processing for Intercom, Gorgias, and Salesforce.</li>
            </ul>`
    },
    analytics: {
        title: "Real-Time KPI Dashboards",
        icon: "fa-chart-line",
        details: `
            <p>Monitor our speed, efficiency, and satisfaction ratings live from your own end.</p>
            <ul>
                <li><i class="fa-solid fa-check"></i> <b>Live CSAT & CES tracking:</b> Raw customer sentiment parsed immediately.</li>
                <li><i class="fa-solid fa-check"></i> <b>SLA Guard metrics:</b> Immediate visibility into First Response Time (FRT).</li>
                <li><i class="fa-solid fa-check"></i> <b>Weekly Reviews:</b> Formally structured, data-driven performance audits.</li>
            </ul>`
    },
    multilingual: {
        title: "Native Multi-Lingual Support",
        icon: "fa-language",
        details: `
            <p>Break global barriers with fully localized talent fluent in native cultural nuances.</p>
            <ul>
                <li><i class="fa-solid fa-check"></i> <b>Global Localization:</b> Coverage across North American, European, and Asian time zones.</li>
                <li><i class="fa-solid fa-check"></i> <b>Zero Accents:</b> Crystal-clear verbal comprehension across inbound calling lanes.</li>
                <li><i class="fa-solid fa-check"></i> <b>Localized Copywriting:</b> Grammatically flawless, brand-conscious chat replies.</li>
            </ul>`
    },
    security: {
        title: "Enterprise Grade Security",
        icon: "fa-lock",
        details: `
            <p>We employ stringent, enterprise-level operational firewalls across all environments.</p>
            <ul>
                <li><i class="fa-solid fa-check"></i> <b>Compliance:</b> Built entirely on GDPR, CCPA, and PCI-DSS blueprints.</li>
                <li><i class="fa-solid fa-check"></i> <b>Secure Workstations:</b> Encrypted endpoints with strict identity access controls.</li>
                <li><i class="fa-solid fa-check"></i> <b>NDA Protected:</b> Thorough background checks and ironclad data NDAs.</li>
            </ul>`
    },
    contracts: {
        title: "Elastic, Agile Scale Contracts",
        icon: "fa-file-contract",
        details: `
            <p>Scale your headcount up during high-traffic periods, or dial back down gracefully.</p>
            <ul>
                <li><i class="fa-solid fa-check"></i> <b>Zero Lock-ins:</b> Fluid adjustments customized to active request volume.</li>
                <li><i class="fa-solid fa-check"></i> <b>Seasonal Scaling:</b> Rapid agent spin-up for Black Friday or marketing sprints.</li>
                <li><i class="fa-solid fa-check"></i> <b>Transparent Costs:</b> Predictable flat-rate metrics with no hidden overhead.</li>
            </ul>`
    }
};

// =============================================
// MODAL CONTROLLERS (Services & Features)
// =============================================
function openModal(key, dataset) {
    const modal = document.getElementById('serviceModal');
    const data = dataset[key];
    if (data && modal) {
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalIcon').innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
        document.getElementById('modalDescription').innerHTML = data.details;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function openServiceModal(key) { openModal(key, serviceData); }
function openOpsModal(key) { openModal(key, opsData); }

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// =============================================
// LET'S TALK BUSINESS MODAL HANDLERS
// =============================================
function openTalkModal() {
    const modal = document.getElementById('talkModal');
    if (modal) {
        modal.style.setProperty('display', 'flex', 'important'); // ডিফল্ট হাইড ভেঙে শো করবে
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeTalkModal() {
    const modal = document.getElementById('talkModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto';
    }
}

// গ্লোবাল ক্লিক লিসেনার (মোডালের বাইরে ক্লিক করলে বন্ধ হবে)
window.addEventListener('click', (e) => {
    const serviceModal = document.getElementById('serviceModal');
    const talkModal = document.getElementById('talkModal');
    if (e.target === serviceModal) closeServiceModal();
    if (e.target === talkModal) closeTalkModal();
});

// =============================================
// AOS ANIMATION & STATS COUNTER INITIALIZATION
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // AOS Init
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80
        });
    }

    // Stats Counter Animation (Fixed for Small Numbers)
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let count = 0;
                    
                    // ছোট এবং বড় সংখ্যার জন্য আলাদা লজিক যাতে সুন্দর স্মুথ অ্যানিমেশন হয়
                    const step = target > 10 ? Math.ceil(target / 30) : 1; 
                    const speed = target > 10 ? 40 : 150; 

                    const timer = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            entry.target.innerText = target + (target === 24 || target === 7 ? '' : '+');
                            clearInterval(timer);
                        } else {
                            entry.target.innerText = count;
                        }
                    }, speed);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        counters.forEach(c => counterObserver.observe(c));
    }
});

// =============================================
// DYNAMIC NAVIGATION (Scrollspy)
// =============================================
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#navLinks a");

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    const href = link.getAttribute("href");
                    if (href && href.includes("#" + sectionId)) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });

        if (scrollY < 200) {
            navLinks.forEach((link) => {
                const href = link.getAttribute("href");
                if (href === "#hero-section" || (href && href.endsWith("#hero-section"))) {
                    link.classList.add("active");
                } else if (href && !href.includes("careers")) {
                    link.classList.remove("active");
                }
            });
        }
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && href.startsWith("#")) {
                navLinks.forEach((nav) => nav.classList.remove("active"));
                this.classList.add("active");
            }
        });
    });

    if (sections.length > 2) {
        window.addEventListener("scroll", scrollActive);
        scrollActive(); 
    }
});
// =============================================
// LET'S TALK FORM SUBMISSION (AJAX WITH CSRF & IN-LINE THANK YOU)
// =============================================
document.addEventListener("DOMContentLoaded", () => {
    const talkForm = document.getElementById('talkForm');
    
    if (talkForm) {
        talkForm.addEventListener('submit', function(e) {
            e.preventDefault(); // পেজ রিলোড বন্ধ করবে
            
            const responseDiv = document.getElementById('formResponse');
            const submitBtn = talkForm.querySelector('button[type="submit"]');
            const formData = new FormData(this);
            
            // HTML থেকে CSRF Token-টি তুলে নেওয়া হচ্ছে
            const csrfToken = talkForm.querySelector('[name=csrfmiddlewaretoken]').value;
            
            // বাটন ডিসেবল করা (যাতে ইউজার বারবার ক্লিক না করতে পারে)
            if(submitBtn) submitBtn.disabled = true;
            
            // জ্যাঙ্গো ব্যাকএন্ডে ডাটা পাঠানো হচ্ছে (টোকেনসহ)
            fetch('/save-inquiry/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': csrfToken // হেডার ফাইলে টোকেন পাস করা হলো
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // অ্যালার্টের বদলে ফর্মের ভেতর সুন্দর সবুজ রঙে থ্যাংক ইউ মেসেজ দেখাবে
                    responseDiv.style.color = '#2ec4b6'; // আপনার থিমের সাথে মিল রেখে সুন্দর রঙ দিতে পারেন
                    responseDiv.innerText = "✓ " + data.message;
                    responseDiv.style.display = 'block';
                    
                    talkForm.reset(); // ফর্মের ভেতরের লেখা ক্লিয়ার হবে
                    
                    // ২.৫ সেকেন্ড পর মেসেজটি সুন্দরভাবে হাইড হয়ে মোডাল বন্ধ হবে
                    setTimeout(() => {
                        responseDiv.style.display = 'none';
                        closeTalkModal();
                        if(submitBtn) submitBtn.disabled = false;
                    }, 2500);

                } else {
                    responseDiv.style.color = '#e63946'; // এরর হলে লাল রঙ
                    responseDiv.innerText = "✕ " + data.message;
                    responseDiv.style.display = 'block';
                    if(submitBtn) submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                responseDiv.style.color = '#e63946';
                responseDiv.innerText = "✕ Connection error. Please try again.";
                responseDiv.style.display = 'block';
                if(submitBtn) submitBtn.disabled = false;
            });
        });
    }
});