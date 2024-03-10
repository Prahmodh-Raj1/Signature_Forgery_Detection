import React from 'react';

const StyledText = ({ text, color }) => {
  const containerStyle = {
    margin: 'auto'
  };

  const textStyle = {
    fontSize: '4rem',
    textShadow: '-0.02em -0.01em 0.01em #000',
    animation: 'rise 2s ease-in-out 0.5s forwards',
    color: color || '#ffdd40',
    backgroundClip: 'text',
    fontStyle: 'italic',
    lineHeight: '1',
  };

  return (
    <div style={containerStyle}>
      <p style={textStyle}>
        {text}
      </p>
    </div>
  );
};

export default StyledText;
