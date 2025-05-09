// Typed.js Initialization
const typed = new Typed('.text', {
    strings: ['2nd Year BSIT Student', 'Aspiring Web Developer', 'UX/UI Design Enthusiast'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Image Carousel Logic
const images = ['skills_1.jpg', 'skills_2.jpg', 'skills_3.jpg'];
let currentIndex = 0;
const carouselImg = document.getElementById('carousel-image');

if (carouselImg) {
    document.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        carouselImg.src = `img/${images[currentIndex]}`;
    });

    document.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        carouselImg.src = `img/${images[currentIndex]}`;
    });
}

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-bar');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const percentage = entry.target.getAttribute('data-percent');
            entry.target.style.width = percentage;
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => observer.observe(bar));

// Contact Form Validation
// Function to validate email
async function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const emailApiKey = "8b93d10b4dcb49ad9fe642aaeab3356c";

    const emailValidationMessage = document.getElementById('email-validation-message');
    try {
        const emailRes = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${emailApiKey}&email=${email}`);
        const emailData = await emailRes.json();

        if (!emailData.is_valid_format.value || emailData.deliverability !== "DELIVERABLE") {
            emailValidationMessage.textContent = 'Invalid or undeliverable email address';
            emailValidationMessage.classList.add('invalid');
            emailValidationMessage.classList.remove('valid');
        } else {
            emailValidationMessage.textContent = 'Valid email address';
            emailValidationMessage.classList.add('valid');
            emailValidationMessage.classList.remove('invalid');
        }
    } catch (err) {
        console.error(err);
        emailValidationMessage.textContent = "Error verifying email";
        emailValidationMessage.classList.add('invalid');
    }
}

// Function to validate phone number
// Function to validate phone number
async function validatePhone() {
    const phone = document.getElementById("phone").value.trim();
    const phoneApiKey = "18a35569730f431499da8ffa6be9fc97";
    const phoneValidationMessage = document.getElementById('phone-validation-message');

    try {
        // Enforce +63 format
        if (!phone.startsWith("+63") || phone.length !== 13) {
            phoneValidationMessage.textContent = 'Invalid phone number format. Use +63XXXXXXXXXX';
            phoneValidationMessage.classList.add('invalid');
            phoneValidationMessage.classList.remove('valid');
            return;
        }

        const phoneRes = await fetch(`https://phonevalidation.abstractapi.com/v1/?api_key=${phoneApiKey}&phone=${encodeURIComponent(phone)}`);
        const phoneData = await phoneRes.json();

        if (!phoneData.valid) {
            phoneValidationMessage.textContent = 'Invalid phone number format';
            phoneValidationMessage.classList.add('invalid');
            phoneValidationMessage.classList.remove('valid');
        } else {
            phoneValidationMessage.textContent = 'Valid phone number';
            phoneValidationMessage.classList.add('valid');
            phoneValidationMessage.classList.remove('invalid');
        }
    } catch (err) {
        console.error(err);
        phoneValidationMessage.textContent = "Error verifying phone number";
        phoneValidationMessage.classList.add('invalid');
    }
}
function toggleMenu() {
    document.querySelector('.navbar').classList.toggle('active');
  }

// Add event listeners to validate as user types
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("phone").addEventListener("input", validatePhone);

// Form submission
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const emailValidationMessage = document.getElementById('email-validation-message');
    const phoneValidationMessage = document.getElementById('phone-validation-message');

    if (emailValidationMessage.classList.contains('invalid') || phoneValidationMessage.classList.contains('invalid')) {
        e.preventDefault(); // Prevent form submission if there's an invalid input
    } else {
        alert("Form submitted successfully!");
        this.reset();
    }
});
