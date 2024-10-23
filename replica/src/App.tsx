import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ToolDisplay from './components/ToolDisplay';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ImageSlideshow from './components/ImageSlideshow';
import { Tool } from './types';

const App: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTools();
    const handleScroll = () => {
      if (window.scrollY > 300 && !localStorage.getItem('subscribed')) {
        setShowNewsletter(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tools');
      const data = await response.json();
      setTools(data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
    setLoading(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
        <Helmet>
          <title>Top AI Sales Tools 2024 | MarketMind AI</title>
          <meta name="description" content="Discover and compare the best AI-powered sales tools of 2024. Boost your sales performance with cutting-edge AI technology. Updated daily." />
          <meta name="keywords" content="AI sales tools, sales automation, CRM, lead generation, sales analytics" />
          <meta name="author" content="ColdIQ" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:title" content="Top AI Sales Tools 2024 | ColdIQ" />
          <meta property="og:description" content="Explore the latest AI-powered sales tools to supercharge your sales process in 2024. Updated daily with the most innovative solutions." />
          <meta property="og:image" content="https://marketmindai.com/og-image.jpg" />
          <meta property="og:url" content="https://marketmindai.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://marketmindai.com" />
          <meta name="robots" content="index, follow" />
          <meta name="revisit-after" content="1 day" />
          <script type="application/ld+json">
            {`
              {
                "@context": "http://schema.org",
                "@type": "WebSite",
                "name": "MarketMind AI - AI Sales Tools",
                "url": "https://MarketMindai.com",
                "description": "Comprehensive directory of AI-powered sales tools for 2024 with Filters",
                "dateModified": "${currentDate}"
              }
            `}
          </script>
        </Helmet>
        <ImageSlideshow />
        <div className="relative z-10 flex flex-col min-h-screen bg-white bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50 text-gray-900 dark:text-white transition-colors duration-300">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ToolDisplay tools={tools} loading={loading} />} />
            </Routes>
          </main>
          <Footer />
          {showNewsletter && <Newsletter setShowNewsletter={setShowNewsletter} />}
        </div>
      </div>
    </Router>
  );
};

export default App;
