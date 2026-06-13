import React from 'react';

const ColorSwatch = ({ color, isActive, onClick, title }) => {
  return (
    <button
      className={`w-full aspect-square rounded-full border-2 transition-all transform hover:scale-110 ${
        isActive ? 'border-gold scale-110 shadow-lg shadow-gold/20' : 'border-transparent shadow-inner'
      }`}
      style={{ backgroundColor: color }}
      title={title}
      onClick={onClick}
    />
  );
};

export default ColorSwatch;
