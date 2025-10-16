import React, { useState, useEffect } from 'react';
import styles from './Nav.module.css';

const Nav = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;
            let currentSectionId = 'home';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 71;
                if (scrollY >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });
            setActiveLink(currentSectionId);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const navLinks = ['home', 'about', 'projects', 'skills', 'contact'];
    
    // Construct the correct URL for the CV file
    const cvUrl = `${import.meta.env.BASE_URL}cv.pdf`;

    return (
        <nav className={styles.nav}>
            <div className={`container ${styles.navContainer}`}>
                <a href="#home" className={styles.navLogo} onClick={closeMobileMenu}>
                    <span className={styles.logoText}>&lt;Portfolio /&gt;</span>
                </a>

                <div className={`${styles.navMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
                    <ul className={styles.navList}>
                        {navLinks.map(link => (
                            <li className={styles.navItem} key={link}>
                                <a
                                    href={`#${link}`}
                                    className={`${styles.navLink} ${activeLink === link ? styles.active : ''}`}
                                    onClick={closeMobileMenu}
                                >
                                    {link.charAt(0).toUpperCase() + link.slice(1)}
                                </a>
                            </li>
                        ))}
                        {/* The "Download CV" navigation item */}
                        <li className={styles.navItem}>
                            <a
                                href={cvUrl}
                                className={styles.navLinkCv}
                                download="Salah_M_CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Download CV
                            </a>
                        </li>
                    </ul>
                </div>

                {/* The hamburger menu toggle button */}
                <div className={`${styles.navToggle} ${isMobileMenuOpen ? styles.active : ''}`} onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    );
};

export default Nav;