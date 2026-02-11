import { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import {
  Mail, Phone, MapPin, Linkedin, Github, GraduationCap, Award,
  Code2, Cpu, BookOpen, Music, PenTool, Users, FolderGit2, Brain,
  Terminal, ChevronDown, ExternalLink, Sparkles, Zap
} from 'lucide-react';

function App() {
  const [isToggled, setIsToggled] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const portfolioRef = useRef<HTMLDivElement>(null);

  // Mouse click sound from audio file
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    clickAudioRef.current = new Audio('/click.mp3');
    clickAudioRef.current.preload = 'auto';
    clickAudioRef.current.volume = 0.8;
  }, []);

  const playClickSound = useCallback(() => {
    try {
      if (clickAudioRef.current) {
        clickAudioRef.current.currentTime = 0;
        clickAudioRef.current.play();
      }
    } catch (e) {
      // Fail silently
    }
  }, []);

  // Lock scroll until toggled
  useEffect(() => {
    if (!showPortfolio) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showPortfolio]);

  // Handle toggle
  const handleToggle = useCallback(() => {
    playClickSound();
    setIsToggled(true);
    setTimeout(() => {
      setShowPortfolio(true);
      setTimeout(() => {
        portfolioRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1200);
  }, [playClickSound]);

  // Parallax scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    if (!showPortfolio) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showPortfolio]);

  return (
    <div className="app-root">
      {/* ====== LANDING PAGE - JELLY TOGGLE ====== */}
      <section className={`landing ${isToggled ? 'landing--activated' : ''}`}>
        {/* Animated background elements */}
        <div className="landing__bg">
          <div className="landing__orb landing__orb--1" />
          <div className="landing__orb landing__orb--2" />
          <div className="landing__orb landing__orb--3" />
          <div className="landing__grid" />
        </div>

        <div className="landing__content">
          <div className="landing__title-area">
            <p className="landing__pre-title">WELCOME, This is</p>
            <h1 className="landing__name">
              <span className="landing__name-char" style={{ animationDelay: '0.1s' }}>S</span>
              <span className="landing__name-char" style={{ animationDelay: '0.15s' }}>u</span>
              <span className="landing__name-char" style={{ animationDelay: '0.2s' }}>r</span>
              <span className="landing__name-char" style={{ animationDelay: '0.25s' }}>y</span>
              <span className="landing__name-char" style={{ animationDelay: '0.3s' }}>a</span>
              <span className="landing__name-char" style={{ animationDelay: '0.35s' }}>n</span>
              <span className="landing__name-char" style={{ animationDelay: '0.4s' }}>s</span>
              <span className="landing__name-char" style={{ animationDelay: '0.45s' }}>h</span>
              <span className="landing__name-char landing__name-space" style={{ animationDelay: '0.5s' }}>&nbsp;</span>
              <span className="landing__name-char" style={{ animationDelay: '0.55s' }}>T</span>
              <span className="landing__name-char" style={{ animationDelay: '0.6s' }}>r</span>
              <span className="landing__name-char" style={{ animationDelay: '0.65s' }}>i</span>
              <span className="landing__name-char" style={{ animationDelay: '0.7s' }}>p</span>
              <span className="landing__name-char" style={{ animationDelay: '0.75s' }}>a</span>
              <span className="landing__name-char" style={{ animationDelay: '0.8s' }}>t</span>
              <span className="landing__name-char" style={{ animationDelay: '0.85s' }}>h</span>
              <span className="landing__name-char" style={{ animationDelay: '0.9s' }}>i</span>
            </h1>
            <p className="landing__subtitle">MCA Student &bull; AI-Focused Engineer</p>
          </div>

          {/* JELLY TOGGLE SWITCH */}
          <div className="landing__toggle-area">
            <p className="landing__toggle-label">
              {isToggled ? (
                <><Sparkles size={16} /> Entering Portfolio...</>
              ) : (
                <><Zap size={16} /> Toggle to Enter</>
              )}
            </p>
            <div className="jelly-switch-wrapper">
              {/* Track / Rail */}
              <div className="jelly-track">
                <div className="jelly-track__rail" />
                <div className="jelly-track__glow" style={{ opacity: isToggled ? 1 : 0 }} />
                <span className="jelly-track__label jelly-track__label--off">OFF</span>
                <span className="jelly-track__label jelly-track__label--on">ON</span>
              </div>

              {/* The Jelly */}
              <button
                className={`jelly ${isToggled ? 'jelly--on' : ''} ${isPressed ? 'jelly--pressed' : ''}`}
                onMouseDown={() => !isToggled && setIsPressed(true)}
                onMouseUp={() => {
                  if (!isToggled) {
                    setIsPressed(false);
                    handleToggle();
                  }
                }}
                onMouseLeave={() => setIsPressed(false)}
                onTouchStart={() => !isToggled && setIsPressed(true)}
                onTouchEnd={() => {
                  if (!isToggled) {
                    setIsPressed(false);
                    handleToggle();
                  }
                }}
                disabled={isToggled}
                aria-label="Toggle to enter portfolio"
              >
                <div className="jelly__body">
                  <div className="jelly__shine" />
                  <div className="jelly__shadow" />
                  <div className="jelly__reflection" />
                </div>
              </button>
            </div>
          </div>

          <div className={`landing__scroll-hint ${isToggled ? 'landing__scroll-hint--hidden' : ''}`}>
            <ChevronDown size={20} />
          </div>
        </div>
      </section>

      {/* ====== MAIN PORTFOLIO ====== */}
      {showPortfolio && (
        <main className="portfolio" ref={portfolioRef}>
          {/* Parallax background shapes */}
          <div className="parallax-bg" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
            <div className="parallax-shape parallax-shape--1" />
            <div className="parallax-shape parallax-shape--2" />
            <div className="parallax-shape parallax-shape--3" />
            <div className="parallax-shape parallax-shape--4" />
          </div>

          {/* Hero Section */}
          <section className="section section--hero">
            <div className="container">
              <div className="reveal reveal--up">
                <p className="section__label"><Sparkles size={14} /> Portfolio</p>
                <h2 className="hero__title">
                  Suryansh<br />
                  <span className="gradient-text">Tripathi</span>
                </h2>
                <p className="hero__role">MCA Student | AI-Focused Engineer</p>
              </div>
              <div className="reveal reveal--up delay-2 hero__contact-row">
                <a href="mailto:tripathip024@gmail.com" className="pill"><Mail size={14} /> tripathip024@gmail.com</a>
                <a href="tel:+919140353515" className="pill"><Phone size={14} /> +91 9140353515</a>
                <span className="pill"><MapPin size={14} /> Greater Noida, UP</span>
              </div>
              <div className="reveal reveal--up delay-3 hero__links">
                <a href="https://www.linkedin.com/in/suryanshtripathi01" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                  <Linkedin size={18} /> LinkedIn <ExternalLink size={14} />
                </a>
                <a href="https://github.com/SuryanshTripathi01" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                  <Github size={18} /> GitHub <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <div className="hero__scroll-indicator">
              <span>Scroll</span>
              <div className="hero__scroll-line" />
            </div>
          </section>

          {/* Career Objective */}
          <section className="section section--objective">
            <div className="container">
              <div className="reveal reveal--left">
                <p className="section__label"><Sparkles size={14} /> Career Objective</p>
                <h2 className="section__title">About Me</h2>
              </div>
              <div className="reveal reveal--up delay-2">
                <div className="objective-card">
                  <p className="objective-card__text">
                    Motivated MCA student with a strong foundation in data systems that power modern AI applications, logic building, firmware development, testing, and AI and Data Analysis, keen to gain real-world experience in AI-adjacent projects, and contribute through disciplined coding and continuous skill development.
                  </p>
                  <div className="objective-card__highlights">
                    <div className="objective-card__stat">
                      <span className="objective-card__stat-value gradient-text">AI/ML</span>
                      <span className="objective-card__stat-label">Focus Area</span>
                    </div>
                    <div className="objective-card__stat">
                      <span className="objective-card__stat-value gradient-text">MCA</span>
                      <span className="objective-card__stat-label">Current Program</span>
                    </div>
                    <div className="objective-card__stat">
                      <span className="objective-card__stat-value gradient-text">200+</span>
                      <span className="objective-card__stat-label">Surveys Done</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="section section--education">
            <div className="container">
              <div className="reveal reveal--left">
                <p className="section__label"><GraduationCap size={14} /> Education</p>
                <h2 className="section__title">Academic Journey</h2>
              </div>
              <div className="timeline">
                <div className="reveal reveal--left delay-1 timeline__item">
                  <div className="timeline__dot" />
                  <div className="timeline__card">
                    <span className="timeline__year">2024 - Present</span>
                    <h3 className="timeline__degree">Master of Computer Applications (MCA)</h3>
                    <p className="timeline__school">Sharda University, Greater Noida</p>
                  </div>
                </div>
                <div className="reveal reveal--right delay-2 timeline__item">
                  <div className="timeline__dot" />
                  <div className="timeline__card">
                    <span className="timeline__year">2021 - 2024</span>
                    <h3 className="timeline__degree">Bachelor of Science (Mathematics, Physics)</h3>
                    <p className="timeline__school">Bundelkhand University, Orai</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="section section--skills">
            <div className="container">
              <div className="reveal reveal--left">
                <p className="section__label"><Code2 size={14} /> Technical Skills</p>
                <h2 className="section__title">What I Work With</h2>
              </div>
              <div className="skills-container">
                <div className="skills-col">
                  <h3 className="reveal reveal--up delay-1 skills-col__title">Technical</h3>
                  {['Python', 'Java', 'Prompt Engineering', 'AI/ML Fundamentals', 'Deep Learning'].map((skill, i) => (
                    <div key={skill} className={`reveal reveal--left delay-${i + 1} skill-bar`}>
                      <div className="skill-bar__info">
                        <span className="skill-bar__name">
                          {i < 2 ? <Code2 size={14} /> : i < 3 ? <Terminal size={14} /> : <Brain size={14} />}
                          {skill}
                        </span>
                      </div>
                      <div className="skill-bar__track">
                        <div className="skill-bar__fill" style={{ '--fill-width': `${90 - i * 8}%` } as React.CSSProperties} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="skills-col">
                  <h3 className="reveal reveal--up delay-1 skills-col__title">Activities & Soft Skills</h3>
                  <div className="reveal reveal--up delay-2 skills-tags">
                    {['LLMs', 'NLP', 'Leadership', 'Co-Working', 'Communication', 'Time Management'].map((tag) => (
                      <span key={tag} className="skills-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="section section--projects">
            <div className="container">
              <div className="reveal reveal--left">
                <p className="section__label"><FolderGit2 size={14} /> Projects</p>
                <h2 className="section__title">What I&apos;ve Built</h2>
              </div>
              <div className="projects-grid">
                {[
                  { title: 'HR Management System', tech: 'Python, Flask', icon: <Cpu size={28} />, desc: 'Complete HRMS for managing employee records, attendance, and payroll with database integration.' },
                  { title: 'Personal Portfolio Website', tech: 'HTML, CSS, JavaScript', icon: <Code2 size={28} />, desc: 'Responsive personal website showcasing projects and skills.' },
                  { title: 'AI-Based Face Recognition', tech: 'Python, OpenCV', icon: <Brain size={28} />, desc: 'Attendance system using facial recognition with real-time detection.' },
                  { title: 'Transfer Learning using CNN', tech: 'Python, TensorFlow', icon: <Terminal size={28} />, desc: 'Advancement in transfer learning techniques using Convolutional Neural Networks.' },
                ].map((project, i) => (
                  <div key={project.title} className={`reveal reveal--up delay-${i + 1} project-card`}>
                    <div className="project-card__icon">{project.icon}</div>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__desc">{project.desc}</p>
                    <div className="project-card__tech">
                      {project.tech.split(', ').map((t) => (
                        <span key={t} className="project-card__tech-tag">{t}</span>
                      ))}
                    </div>
                    <div className="project-card__glow" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="section section--achievements">
            <div className="container">
              <div className="reveal reveal--left">
                <p className="section__label"><Award size={14} /> Achievements</p>
                <h2 className="section__title">Recognition</h2>
              </div>
              <div className="achievements-list">
                {[
                  'Certified of C Programming - Great Learning Academy',
                  'Quality Education Report - Sharda University',
                  'Prompt Engineering Certificate - Sharda University',
                ].map((ach, i) => (
                  <div key={ach} className={`reveal reveal--right delay-${i + 1} achievement-row`}>
                    <div className="achievement-row__number">0{i + 1}</div>
                    <div className="achievement-row__content">
                      <Award size={20} className="achievement-row__icon" />
                      <span>{ach}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Community */}
          <section className="section section--community">
            <div className="container">
              <div className="reveal reveal--up">
                <div className="community-banner">
                  <div className="community-banner__bg" style={{ transform: `translateY(${(scrollY - 3000) * 0.05}px)` }} />
                  <div className="community-banner__content">
                    <Users size={48} />
                    <div className="community-banner__number">200+</div>
                    <h3>Home Surveys</h3>
                    <p className="community-banner__subtitle">Community Connect 2024</p>
                    <p className="community-banner__desc">
                      Surveyed 200+ homes in villages of Greater Noida, UP and prepared a comprehensive report about quality of education.
                    </p>
                    <a
                      href="/community-connect-report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--report"
                    >
                        View Report <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interests */}
          <section className="section section--interests">
            <div className="container">
              <div className="reveal reveal--left">
                <p className="section__label"><BookOpen size={14} /> Interests</p>
                <h2 className="section__title">Beyond Code</h2>
              </div>
              <div className="interests-row">
                <div className="reveal reveal--up delay-1 interest-card">
                  <div className="interest-card__icon">
                    <Music size={36} />
                  </div>
                  <h3>Music Production</h3>
                  <p>Creative expression through sound design and composition</p>
                </div>
                <div className="reveal reveal--up delay-2 interest-card">
                  <div className="interest-card__icon">
                    <PenTool size={36} />
                  </div>
                  <h3>Writing</h3>
                  <p>Articulating thoughts and ideas through the written word</p>
                </div>
              </div>
              <p className="reveal reveal--up delay-3 interests-quote">
                &ldquo;Both help me stay creative and happy.&rdquo;
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="section section--contact">
            <div className="container">
              <div className="reveal reveal--up">
                <p className="section__label"><Mail size={14} /> Contact</p>
                <h2 className="section__title">Let&apos;s Connect</h2>
              </div>
              <div className="contact-grid reveal reveal--up delay-2">
                <a href="mailto:tripathip024@gmail.com" className="contact-card">
                  <Mail size={28} />
                  <span className="contact-card__label">Email</span>
                  <span className="contact-card__value">tripathip024@gmail.com</span>
                </a>
                <a href="tel:+919140353515" className="contact-card">
                  <Phone size={28} />
                  <span className="contact-card__label">Phone</span>
                  <span className="contact-card__value">+91 9140353515</span>
                </a>
                <a href="https://www.linkedin.com/in/suryanshtripathi01" target="_blank" rel="noopener noreferrer" className="contact-card">
                  <Linkedin size={28} />
                  <span className="contact-card__label">LinkedIn</span>
                  <span className="contact-card__value">Suryansh Tripathi</span>
                </a>
                <a href="https://github.com/SuryanshTripathi01" target="_blank" rel="noopener noreferrer" className="contact-card">
                  <Github size={28} />
                  <span className="contact-card__label">GitHub</span>
                  <span className="contact-card__value">SuryanshTripathi01</span>
                </a>
              </div>
              <div className="reveal reveal--up delay-3 contact-location">
                <MapPin size={16} /> Greater Noida, Uttar Pradesh, India
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <p>&copy; 2025 Suryansh Tripathi. All rights reserved.</p>
          </footer>
        </main>
      )}
    </div>
  );
}

export default App;
