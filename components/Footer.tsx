import React from 'react';

const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <span>© 2024 Systemic Insights. All Rights Reserved.</span>
        <span className="footer-tagline">Powered by LEVERAGEAI LLC</span>
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
    </footer>
  );
};

export default Footer;
