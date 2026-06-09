// 1. Premium Sticky Header Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Custom Bilingual Engine
const btnEn = document.getElementById('btn-en');
const btnMm = document.getElementById('btn-mm');
const translatableElements = document.querySelectorAll('.translate');

function setLanguage(lang) {
    if (lang === 'en') {
        btnEn.classList.add('active');
        btnMm.classList.remove('active');
    } else {
        btnMm.classList.add('active');
        btnEn.classList.remove('active');
    }

    translatableElements.forEach(el => {
        el.style.opacity = 0;
        setTimeout(() => {
            if (lang === 'en') {
                el.textContent = el.getAttribute('data-en');
            } else {
                el.textContent = el.getAttribute('data-mm');
            }
            el.style.opacity = 1;
        }, 150);
    });
}

btnEn.addEventListener('click', () => setLanguage('en'));
btnMm.addEventListener('click', () => setLanguage('mm'));

// 3. Premium Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');

mobileToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navList.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
        mobileToggle.style.color = "var(--primary-color)";
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        if (!header.classList.contains('scrolled')) {
            mobileToggle.style.color = "var(--white)";
        }
    }
});

// 4. Form Submission with Formspree (AJAX Method)
const form = document.getElementById('premium-form');

async function handleSubmit(event) {
    event.preventDefault();
    const formBtn = form.querySelector('button');
    const originalText = formBtn.innerHTML;
    
    // Loading State
    formBtn.innerHTML = 'Sending...';
    formBtn.disabled = true;

    const data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formBtn.innerHTML = 'Sent Successfully!';
            formBtn.style.backgroundColor = '#10b981'; // Green color
            form.reset();
            
            setTimeout(() => {
                formBtn.innerHTML = originalText;
                formBtn.style.backgroundColor = '';
                formBtn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        formBtn.innerHTML = 'Error! Try again.';
        formBtn.style.backgroundColor = '#ef4444'; // Red color
        setTimeout(() => {
            formBtn.innerHTML = originalText;
            formBtn.style.backgroundColor = '';
            formBtn.disabled = false;
        }, 3000);
    }
}

form.addEventListener('submit', handleSubmit);