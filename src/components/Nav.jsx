import React, { useState, useEffect } from 'react';
import styles from './Nav.module.css'; // Import the new CSS Module

const Nav = () => {
    // State to manage the mobile menu (open/closed)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // State to track the currently active section
    const [activeLink, setActiveLink] = useState('home');

    // Effect to handle highlighting the nav link based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;
            let currentSectionId = 'home'; // Default to 'home'

            sections.forEach(section => {
                // Offset by 71px to account for the navbar height
                const sectionTop = section.offsetTop - 71;
                if (scrollY >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });
            setActiveLink(currentSectionId);
        };

        window.addEventListener('scroll', handleScroll);
        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggles the mobile menu's visibility
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Closes the mobile menu (used when a link is clicked)
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinks = ['home', 'about', 'projects', 'skills', 'contact'];

    return (
        <nav className={styles.nav}>
            <div className={`container ${styles.navContainer}`}>
                <a href="#home" className={styles.navLogo} onClick={closeMobileMenu}>
                    <span className={styles.logoText}>&lt; salahmed /&gt;</span>
                </a>

                {/* The 'active' class is toggled here for the slide-in effect */}
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
                    </ul>
                </div>

                {/* The hamburger toggle button */}
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