import React, { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, project }) => {
    // Effect to handle the 'Escape' key press to close the modal
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        // Cleanup function
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Render nothing if the modal is not open
    if (!isOpen) return null;

    return (
        // The overlay that covers the screen
        <div className={styles.overlay} onClick={onClose}>
            {/* The modal content itself, stopPropagation prevents closing when clicking inside */}
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">&times;</button>
                <img src={project.image} alt={project.title} className={styles.modalImage} />
                <div className={styles.modalContent}>
                    <h2 className={styles.modalTitle}>{project.title}</h2>
                    <div className={styles.techTags}>
                        {project.technologies.map(tech => <span key={tech} className={styles.tag}>{tech}</span>)}
                    </div>
                    <p className={styles.modalDescription}>{project.description}</p>
                    <div className={styles.modalLinks}>
                        {/* Replace '#' with actual project links or disable if not available */}
                        <a href="#" className="btn btn-primary">View Demo</a>
                        <a href="#" className="btn btn-secondary">View Source</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;