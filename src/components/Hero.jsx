import React, { useEffect, useState, useMemo } from 'react';
import styles from './Hero.module.css';

// --- Sub-Component for the Typing Effect ---
const TypingEffect = ({ title, textsToType }) => {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const fullTextList = useMemo(() => [title, ...textsToType], [title, textsToType]);

    useEffect(() => {
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pause = 2000;

        const handleTyping = () => {
            const currentText = fullTextList[index % fullTextList.length];
            const updatedText = isDeleting
                ? currentText.substring(0, text.length - 1)
                : currentText.substring(0, text.length + 1);

            setText(updatedText);

            if (!isDeleting && updatedText === currentText) {
                setTimeout(() => setIsDeleting(true), pause);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setIndex(prevIndex => prevIndex + 1);
            }
        };

        const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, index, fullTextList]);

    return (
        <h2 className={styles.heroSubtitle}>
            {text}
            <span className={styles.cursor}>|</span>
        </h2>
    );
};

// --- Main Hero Component ---
const Hero = ({ data }) => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const developerTexts = [
        "Creating Tomorrow's Web Experiences",
        "Building the Future with Code",
        "Transforming Ideas into Reality"
    ];

    // Construct the correct URL for the CV file
    const cvUrl = `${import.meta.env.BASE_URL}cv.pdf`;

    return (
        <section className={styles.hero} id="home">
            <div className={styles.heroBg} style={{ transform: `translateY(${offsetY * 0.5}px)` }}></div>
            <div className={styles.particles}></div>
            
            <div className={styles.heroContent}>
                <h1 className={styles.glitch} data-text={data.name}>
                    {data.name}
                </h1>
                
                <TypingEffect title={data.title} textsToType={developerTexts} />
                
                <p className={styles.heroTagline}>{data.tagline}</p>
                
                <div className={styles.heroButtons}>
                    <a href="#projects" className="btn btn-primary">View My Work</a>
                    <a 
                        href={cvUrl} 
                        className="btn btn-secondary"
                        download="Salah_M_CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download CV
                    </a>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <a href="#about" aria-label="Scroll down">
                    <div className={styles.scrollArrow}></div>
                </a>
            </div>
        </section>
    );
};

export default Hero;