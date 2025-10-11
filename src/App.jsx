import React, { useState, useEffect, Suspense, lazy } from 'react';

// Import components that are visible on initial load directly
import Nav from './components/Nav';
import Hero from './components/Hero';

// Lazy load all components that are "below the fold" for faster initial page load
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
    // State to hold the portfolio data
    const [data, setData] = useState(null);
    // State to manage the initial loading screen
    const [loading, setLoading] = useState(true);
    // State to handle potential errors during data fetching
    const [error, setError] = useState(null);

    // This effect runs once when the component mounts to fetch the portfolio data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}data.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch portfolio data:", e);
            } finally {
                // Hide the loading screen regardless of success or failure
                setLoading(false);
            }
        };

        fetchData();
    }, []); // The empty dependency array ensures this effect runs only once

    // Display a loading screen while fetching data
    if (loading) {
        // You can create a more elaborate loading component if you wish
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a', color: 'white', fontFamily: 'monospace' }}>
            Initializing Portfolio Matrix...
        </div>;
    }

    // Display an error message if the data could not be fetched
    if (error || !data) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a', color: '#ff00ff', fontFamily: 'monospace' }}>
            Failed to load portfolio content. Please try again later. Error: {error}
        </div>;
    }

    // If data is loaded successfully, render the full portfolio
    return (
        <>
            <Nav />
            <Hero data={data.developer} />
            
            {/* 
              Suspense provides a fallback UI (e.g., a simple "Loading...") 
              while the lazy-loaded components are being fetched.
            */}
            <Suspense fallback={<div style={{ background: '#0a0a0a', color: 'white', textAlign: 'center', padding: '50px' }}>Loading Section...</div>}>
                <About data={data.developer} />
                <Projects data={data.projects} />
                <Skills data={data.skills} />
                <Contact />
                <Footer name={data.developer.name} socialLinks={data.socialLinks} />
            </Suspense>
        </>
    );
}

export default App;