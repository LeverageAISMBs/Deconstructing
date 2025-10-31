import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <a href="/" className="logo">
        Systemic Insights
      </a>
      <nav>
        <a href="#full-report" className="nav-link">
          Full Research Report
        </a>
      </nav>
    </header>
  );
};

export default Header;
