import React, { useEffect } from "react";

const services = [
  {
    category: "01 / Visual identity",
    title: "Graphic design",
    description:
      "Distinctive identities, art direction, and visual systems built to communicate with clarity.",
  },
  {
    category: "02 / Moving image",
    title: "Video editing",
    description:
      "Thoughtful cuts, precise pacing, and stories that hold attention from the first frame to the last.",
  },
  {
    category: "03 / Behind the lens",
    title: "Cinematography",
    description:
      "Atmospheric visuals shaped by light, composition, color, and emotion.",
  },
  {
    category: "04 / Digital craft",
    title: "Front-end development",
    description:
      "Responsive, accessible digital experiences that balance thoughtful design with practical functionality.",
  },
];

const projects = [
  {
    name: "Open Form — Identity & Campaign",
    description: "A flexible visual language for an arts festival.",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Colorful contemporary art exhibition",
    ariaLabel: "Discuss a project like Open Form",
  },
  {
    name: "Still / Moving — Short Film",
    description: "A quiet study of place, memory, and home.",
    category: "Film",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Cinema projector and film equipment",
    ariaLabel: "Discuss a film project like Still Moving",
  },
  {
    name: "Field Notes — Digital Experience",
    description: "An editorial home for ideas and independent voices.",
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Warm minimalist interior with plants and furniture",
    ariaLabel: "Discuss a digital project like Field Notes",
  },
  {
    name: "After Hours — Live Session",
    description: "An intimate performance film, shot and edited on location.",
    category: "Film / Edit",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Live musical performance under dramatic lighting",
    ariaLabel: "Discuss a live film project like After Hours",
  },
];

function App() {
  useEffect(() => {
    const header = document.querySelector(".topbar");
    const navLinks = [...document.querySelectorAll(".nav-links a")];
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    const revealItems = document.querySelectorAll(
      ".service, .project, .section-heading, .about-copy, .hero-image, .contact",
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const setActiveNav = () => {
      const offset = window.scrollY + 180;
      let currentId = sections[0]?.id || "";

      sections.forEach((section) => {
        if (section.offsetTop <= offset) {
          currentId = section.id;
        }
      });

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentId}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const handleScroll = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
      setActiveNav();
    };

    if (prefersReducedMotion) {
      setActiveNav();
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="page-shell">
        <header className="topbar">
          <a className="wordmark" href="#home" aria-label="Navawit Nigussie home">
            NN<span>.</span>
          </a>
          <p className="availability">Available for select projects</p>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a className="nav-contact" href="#contact">
              Let’s talk <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </header>

        <main id="main">
          <section className="hero" id="home" aria-labelledby="hero-title">
            <p className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              Independent creative · Multidisciplinary designer
            </p>
            <h1 id="hero-title">
              Ideas made
              <br />
              <span>to be seen.</span>
            </h1>
            <div className="hero-bottom">
              <p className="intro">
                I’m Navawit Nigussie — a multidisciplinary creative bringing
                thoughtful stories to life through design, film, and the web.
              </p>
              <a className="round-link" href="#work" aria-label="Explore selected work">
                <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="hero-index">DESIGN / FILM / DIGITAL</p>
          </section>

          <section className="hero-image" aria-label="Creative studio">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85"
              alt="Sunlit creative studio with a shared worktable"
              fetchpriority="high"
            />
            <div className="image-overlay" />
            <div className="image-caption">
              <span>01 — A space for ideas</span>
              <span>Creative practice / 2025</span>
            </div>
          </section>

          <section className="section" id="services" aria-labelledby="services-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">What I do</p>
                <h2 id="services-title">
                  Creative thinking.
                  <br />
                  Practical making.
                </h2>
              </div>
              <p className="section-description">
                One curious mind, four creative toolkits. Each discipline
                brings a different perspective to the work.
              </p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article className="service" key={service.title}>
                  <span className="service-number">{service.category}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-arrow" aria-hidden="true">
                    ↗
                  </span>
                </article>
              ))}
            </div>
          </section>

          <section
            className="section work-section"
            id="work"
            aria-labelledby="work-title"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">A selection of projects</p>
                <h2 id="work-title">
                  Selected work<span className="accent">.</span>
                </h2>
              </div>
              <p className="section-description">
                A collection of visual identities, moving images, and digital
                experiences made with intention.
              </p>
            </div>
            <div className="work-grid">
              {projects.map((project, index) => (
                <article className="project" key={project.name}>
                  <a
                    className="project-image"
                    href="#contact"
                    aria-label={project.ariaLabel}
                  >
                    <img src={project.image} alt={project.imageAlt} loading="lazy" />
                    <span className="project-image-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                  <div className="project-meta">
                    <div className="project-details">
                      <span className="project-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                    </div>
                    <span className="project-type">{project.category}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section about" id="about" aria-labelledby="about-title">
            <div className="about-label">
              <p className="eyebrow">A little about me</p>
              <span className="about-symbol" aria-hidden="true">
                ✳
              </span>
            </div>
            <div className="about-content">
              <h2 id="about-title">
                Good work starts with a good conversation
                <span className="accent">.</span>
              </h2>
              <div className="about-copy">
                <p>
                  I’m a multidisciplinary creative who enjoys moving between
                  disciplines. From the first sketch to the final frame or line
                  of code, I build work that feels clear, considered, and human.
                </p>
                <p>
                  My approach combines visual curiosity, technical precision,
                  and a genuine interest in the people behind every project.
                </p>
                <a className="text-link" href="#contact">
                  Tell me about your project <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </section>

          <section className="contact" id="contact" aria-labelledby="contact-title">
            <div className="contact-content">
              <p className="eyebrow">Have something in mind?</p>
              <h2 id="contact-title">
                Let’s make
                <br />
                <span>it happen.</span>
              </h2>
              <p className="contact-description">
                Have an idea, a question, or a project in mind? I’d love to hear
                what you’re working on.
              </p>
              <a className="contact-email" href="mailto:hello@example.com">
                hello@example.com <span aria-hidden="true">↗</span>
              </a>
            </div>
            <a
              className="contact-circle"
              href="mailto:hello@example.com"
              aria-label="Send Navawit an email"
            >
              <span aria-hidden="true">↗</span>
            </a>
            <span className="contact-decoration" aria-hidden="true">
              NN.
            </span>
          </section>
        </main>

        <footer className="footer">
          <a className="footer-brand" href="#home">
            NN<span>.</span>
          </a>
          <p className="footer-note">
            © {new Date().getFullYear()} Navawit Nigussie. Designed with
            intention.
          </p>
          <nav className="footer-links" aria-label="Social links">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a href="mailto:hello@example.com">
              Email <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </footer>
      </div>
    </>
  );
}

export default App;
