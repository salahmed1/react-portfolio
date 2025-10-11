import React from 'react';
import styles from './AboutIntro.module.css';

const AboutIntro = ({ name, title, story }) => {
    return (
        <div className={styles.aboutHero}>
            <div className={styles.profileContainer}>
                <div className={styles.profileImageWrapper}>
                    <img src={`${import.meta.env.BASE_URL}profile-pic.jpg`} alt={name} className={styles.profileImage} />                </div>
            </div>
            <div className={styles.aboutIntro}>
                <h3 className={styles.aboutTitle}>Greetings, I'm <span className={styles.neonCyan}>{name}</span></h3>
                <p className={styles.aboutSubtitle}>{title}</p>
                <p className={styles.aboutHook}>{story}</p>
            </div>
        </div>
    );
};

export default AboutIntro;