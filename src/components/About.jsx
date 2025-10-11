import React from 'react';
import AboutIntro from './AboutIntro';
import Timeline from './Timeline';
import ValuesGrid from './ValuesGrid';
import styles from './About.module.css';

const About = ({ data }) => {
    return (
        <section className={styles.about} id="about">
            <div className={styles.aboutBackground}>
                <div className={styles.holographicGrid}></div>
            </div>
            <div className="container"> {/* Using global .container class */}
                <h2 className={`neon-gradient ${styles.sectionTitle}`}>About Me</h2>
                
                <AboutIntro name={data.name} title={data.title} story={data.story} />
                <Timeline timelineData={data.timeline} />
                <ValuesGrid valuesData={data.values} />
            </div>
        </section>
    );
};

export default About;