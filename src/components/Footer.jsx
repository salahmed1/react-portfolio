import React from 'react';
import { useScrollVisibility } from '../hooks/useScrollVisibility'; // Import the custom hook
import styles from './Footer.module.css'; // Import the CSS Module

const Footer = ({ name, socialLinks }) => {
    // Use our custom hook to get the visibility state
    const isVisible = useScrollVisibility(300);

    // Helper function for smooth scrolling
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const navLinks = ['home', 'about', 'projects', 'skills', 'contact'];

    return (
        <footer className={styles.footerModern}>
            <div className="container"> {/* Using global .container class */}
                <h3 className={`neon-gradient ${styles.footerTitle}`}>{name}</h3>

                <ul className={styles.footerNav}>
                    {navLinks.map(link => (
                        <li key={link}>
                            <a href={`#${link}`}>{link.charAt(0).toUpperCase() + link.slice(1)}</a>
                        </li>
                    ))}
                </ul>

                <div className={styles.socialLinks}>
                    {socialLinks.map(link => (
                        <a
                            href={link.url}
                            key={link.name}
                            className={styles.socialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={link.name}
                            dangerouslySetInnerHTML={{ __html: link.icon }}
                        ></a>
                    ))}
                </div>

                <div className={styles.footerDivider}></div>

                <div className={styles.footerBottom}>
                    <p>&copy; {new Date().getFullYear()} {name}. Built with React & Vite. All Rights Reserved.</p>
                </div>
            </div>

            {/* Conditionally render the button based on the hook's return value */}
            {isVisible && (
                <button onClick={scrollToTop} className={styles.backToTopBtn} title="Go to top">
                    {/* Inline SVG for the arrow icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.9999 10.8284L7.05016 15.7782L5.63595 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                    </svg>
                </button>
            )}
        </footer>
    );
};

export default Footer;