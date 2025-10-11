import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
    const [status, setStatus] = useState('Send Message');
    const [formSuccess, setFormSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setFormSuccess(true);
                setTimeout(() => {
                    form.reset();
                    setFormSuccess(false);
                    setStatus('Send Message');
                }, 4000); // Show success message for 4 seconds
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    throw new Error(responseData["errors"].map(error => error["message"]).join(", "));
                }
                throw new Error('Form submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('Send Message'); // Reset button on error
            alert(`Oops! Something went wrong: ${error.message}`);
        }
    };

    return (
        <section className={styles.contactSection} id="contact">
            <div className="container"> {/* Using global .container class */}
                <h2 className={`neon-gradient ${styles.sectionTitle}`}>Get In Touch</h2>
                <div className={styles.contactWrapper}>

                    {formSuccess ? (
                        <div className={styles.formSuccess}>
                            <div className={styles.successIcon}>✅</div>
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. I'll get back to you soon.</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.contactInfo}>
                                <h3>Let's Collaborate</h3>
                                <p>Have a project in mind or just want to say hello? My inbox is always open.</p>
                            </div>
                            <form
                                className={styles.contactForm}
                                action="https://formspree.io/f/mpwyjnaw"
                                method="POST"
                                onSubmit={handleSubmit}
                            >
                                <div className={styles.formGroup}>
                                    <input type="text" id="name" name="name" required placeholder=" " />
                                    <label htmlFor="name">Your Name</label>
                                </div>
                                <div className={styles.formGroup}>
                                    <input type="email" id="email" name="email" required placeholder=" " />
                                    <label htmlFor="email">Your Email</label>
                                </div>
                                <div className={styles.formGroup}>
                                    <textarea id="message" name="message" required placeholder=" "></textarea>
                                    <label htmlFor="message">Your Message</label>
                                </div>
                                <button type="submit" className={`btn ${styles.submitBtn}`} disabled={status === 'Sending...'}>
                                    {status}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;