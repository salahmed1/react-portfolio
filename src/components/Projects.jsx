import React, { useState } from 'react';
import Modal from './Modal'; // Import the Modal component
import styles from './Projects.module.css'; // Import the new CSS Module

const Projects = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Function to open the modal with the clicked project's data
    const openModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        // Delay clearing the project to allow for fade-out animation
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <>
            <section className={styles.projectsSection} id="projects">
                <div className="container"> {/* Using global .container class */}
                    <h2 className={`neon-gradient ${styles.sectionTitle}`}>My Creations</h2>
                    <div className={styles.projectsGrid}>
                        {data.map(project => (
                            <div className={styles.projectCard} key={project.title}>
                                <img src={project.image} alt={project.title} className={styles.projectImage} loading="lazy" />
                                <div className={styles.projectContent}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDescription}>{project.description}</p>
                                    <div className={styles.projectTech}>
                                        {project.technologies.map(tech => <span key={tech} className={styles.techTag}>{tech}</span>)}
                                    </div>
                                    <div className={styles.projectLinks}>
                                        {/* This button now opens the modal */}
                                        <button className="btn btn-primary" onClick={() => openModal(project)}>
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* The Modal component is rendered here, but only visible when isModalOpen is true */}
            <Modal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />
        </>
    );
};

export default Projects;