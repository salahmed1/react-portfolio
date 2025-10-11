import React from 'react';
// We no longer need to import Tooltip, so that line is removed.
import styles from './Skills.module.css';

const Skills = ({ data }) => {
    // --- All useState and event handlers for the tooltip have been removed ---

    // Helper to render a single category of skills
    const renderSkillCategory = (categoryName, skills, icon) => (
        <div className={styles.skillsCategory} data-category={categoryName}>
            <h3 className={`${styles.categoryTitle} ${styles[categoryName.toLowerCase()]}`}>
                {icon} {categoryName}
            </h3>
            <div className={styles.skillsConstellation}>
                {skills.map(skill => (
                    // The onMouseEnter and onMouseLeave events are now removed from the badge
                    <div className={styles.skillBadge} key={skill.name}>
                        {skill.name}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        // The onMouseMove event is removed from the section tag
        <section className={styles.skillsSection} id="skills">
            <div className="container">
                <h2 className={`neon-gradient ${styles.sectionTitle}`}>My Arsenal</h2>
                <div className={styles.skillsCategories}>
                    {renderSkillCategory('Frontend', data.Frontend, '💻')}
                    {renderSkillCategory('Backend', data.Backend, '⚙️')}
                    {renderSkillCategory('Tools & Technologies', data['Tools & Technologies'], '🔧')}
                </div>
            </div>
            {/* --- The line that conditionally rendered the Tooltip component is now gone --- */}
        </section>
    );
};

export default Skills;