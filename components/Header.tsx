import React from 'react';

const Header: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/" className="logo">
          Systemic Insights
        </a>
        <span className="logo-tagline">Powered by LEVERAGEAI LLC</span>
      </div>
      <nav>
        <a
          href="#full-report-section"
          className="nav-link"
          onClick={handleLinkClick}
        >
          Full Research Report
        </a>
      </nav>
    </header>
  );
};

export default Header;
