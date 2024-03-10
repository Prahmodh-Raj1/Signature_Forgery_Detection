import React from 'react';

const Button = ({ onClick, text, color }) => {
  const buttonStyle = {
    position: 'relative',
    background: '#444',
    color: '#fff',
    textDecoration: 'none',
    textTransform: 'uppercase',
    border: 'none',
    letterSpacing: '0.1rem',
    fontSize: '1rem',
    padding: '1rem 3rem',
    transition: '0.2s',
    width: '300px', // Adjust the width as needed
    height: '80px',
  };

  const handleHover = (e) => {
    e.currentTarget.style.letterSpacing = '0.2rem';
    e.currentTarget.style.padding = '1.1rem 3.1rem';
    e.currentTarget.style.background = e.currentTarget.style.getPropertyValue('--clr');
    e.currentTarget.style.color = e.currentTarget.style.getPropertyValue('--clr');
    e.currentTarget.style.animation = 'box 3s infinite';
  };

  return (
    <button
      style={{ ...buttonStyle, '--clr': color || '#8A2BE2' }}
      onMouseEnter={handleHover}
      onMouseLeave={(e) => {
        e.currentTarget.style.letterSpacing = '0.1rem';
        e.currentTarget.style.padding = '1rem 3rem';
        e.currentTarget.style.background = '#444';
        e.currentTarget.style.color = '#fff';
        e.currentTarget.style.animation = 'none';
      }}
      onClick={onClick}
    >
      <span>{text || 'Button'}</span>
      <i></i>
    </button>
  );
};

export default Button;
