import React from 'react';
import styles from './ValuesGrid.module.css';

const ValuesGrid = ({ valuesData }) => {
    return (
        <div className={styles.personalitySection}>
            <h3 className={styles.sectionSubtitle}>
                💡 Core Values
                <div className={styles.subtitleLine}></div>
            </h3>
            <div className={styles.personalityGrid}>
                {valuesData.map((value) => (
                    <div className={`${styles.personalityCard} ${styles[value.color]}`} key={value.title}>
                        <div className={styles.personalityIcon} dangerouslySetInnerHTML={{ __html: value.icon }}></div>
                        <h4 className={styles.personalityTitle}>{value.title}</h4>
                        <p className={styles.personalityDescription}>{value.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ValuesGrid;