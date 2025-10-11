import React from 'react';
import styles from './Timeline.module.css';

const Timeline = ({ timelineData }) => {
    return (
        <div className={styles.journeySection}>
            <h3 className={styles.sectionSubtitle}>
                🚀 My Journey
                <div className={styles.subtitleLine}></div>
            </h3>
            <div className={styles.timelineContainer}>
                <div className={styles.timelineLine}></div>
                <div className={styles.timelineContent}>
                    {timelineData.map((item, index) => (
                        <div className={styles.timelineItem} key={index}>
                            <div className={styles.timelineNode}></div>
                            <div className={styles.timelineCard}>
                                <div className={styles.timelineYear}>{item.year}</div>
                                <div className={styles.timelineRole}>{item.role}</div>
                                <div className={styles.timelineCompany}>{item.company}</div>
                                <p className={styles.timelineDescription}>{item.description}</p>
                                <div className={styles.timelineTech}>
                                    {item.technologies.map(tech => <span key={tech} className={styles.techTag}>{tech}</span>)}
                                </div>
                                <div className={styles.timelineAchievement}>✨ {item.achievement}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;