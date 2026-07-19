/* ==========================================
   AOS Animation
========================================== */

AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in-out"
});

/* ==========================================
   Typed.js Animation
========================================== */

new Typed("#typing", {

    strings: [
        "MERN Stack Developer",
        "Frontend Developer",
        "React.js Developer",
        "Web Designer",
        "JavaScript Developer"
    ],

    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 1500,
    loop: true

});

/* ==========================================
   Navbar Background on Scroll
========================================== */

const navbar = document.querySelector(".custom-navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.background = "rgba(7,11,23,.95)";
        navbar.style.padding = "12px 0";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.25)";

    } else {

        navbar.style.background = "rgba(10,10,20,.60)";
        navbar.style.padding = "18px 0";
        navbar.style.boxShadow = "none";

    }

});

/* ==========================================
   Animated Counter
========================================== */

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    counter.innerText = "0";

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = target / 80;

        if (count < target) {

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCounter, 25);

        } else {

            counter.innerText = target;

        }

    };

    updateCounter();

});

/* ==========================================
   Active Navbar Link
========================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") == "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ==========================================
   Scroll To Top
========================================== */

const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTopBtn.style.opacity = "1";
        scrollTopBtn.style.visibility = "visible";

    } else {

        scrollTopBtn.style.opacity = "0";
        scrollTopBtn.style.visibility = "hidden";

    }

});

/* ==========================================
   Smooth Scroll
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/* ==========================================
   Project Card Hover Effect
========================================== */

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

/* ==========================================
   Contact Form
========================================== */

// const form = document.querySelector(".contact-form");

// if (form) {

//     form.addEventListener("submit", function(e) {

//         e.preventDefault();

//         alert("Thank you! Your message has been sent successfully.");

//         form.reset();

//     });

// }


/* ==========================================
   Contact Form API
========================================== */

/* ==========================================
   Contact Form API
========================================== */

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        // Disable button
        submitBtn.disabled = true;
        btnText.innerHTML = "Sending...";

        const formData = {

            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            mobile: document.getElementById("mobile").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value

        };

        try {

            const response = await fetch(
                // "http://localhost:5000/api/contact",
                "https://portfolio-backend-msin.onrender.com/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (data.success) {

                alert("✅ Message Sent Successfully!");

                form.reset();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("❌ Failed to Send Message!");

        } finally {

            // Enable button again
            submitBtn.disabled = false;
            btnText.innerHTML = "Send Message";

        }

    });

}

/* ==========================================
   Loading Animation
========================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/* ==========================================
   Floating Icons Animation
========================================== */

document.querySelectorAll(".icons i").forEach((icon, index) => {

    icon.style.animation = `floatIcon 3s ease-in-out ${index * 0.2}s infinite`;

});

/* ==========================================
   Cursor Glow Effect
========================================== */

const glow = document.createElement("div");

glow.id = "cursor-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

/* ==========================================
   Console Message
========================================== */

console.log(
"%cPortfolio Developed by Jaiminkumar Vaghela",
"color:#7C5CFF;font-size:18px;font-weight:bold;"
);


// Enable CORS
// app.use(cors({

//     origin:[
//         "http://127.0.0.1:5500",
//         "http://localhost:5500"
//     ],

//     methods:[
//         "GET",
//         "POST"
//     ],

//     allowedHeaders:[
//         "Content-Type"
//     ]

// }));