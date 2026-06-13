import React from 'react';

const ProductPanel = ({ item, isActive, onClick }) => {
  return (
    <button
      className={`p-2 border transition-all duration-300 ${
        isActive ? 'border-gold bg-gold/5' : 'border-gold/10'
      } hover:border-gold/40`}
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden mb-2">
        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <p className="text-[10px] text-ivory text-center truncate font-bold">{item.name}</p>
      <p className="text-[9px] text-gold text-center mt-1">{item.price}</p>
    </button>
  );
};

export default ProductPanel;
