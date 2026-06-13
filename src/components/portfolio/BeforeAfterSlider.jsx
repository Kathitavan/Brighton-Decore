import React from 'react';
import ReactCompareImage from 'react-compare-image';

const BeforeAfterSlider = ({ before, after }) => {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden gold-border p-1">
      <ReactCompareImage
        leftImage={before}
        rightImage={after}
        leftImageLabel="Before"
        rightImageLabel="After"
        sliderLineColor="#C9A55A"
        sliderLineWidth={3}
        handleSize={40}
        labelFontSize="12px"
      />
    </div>
  );
};

export default BeforeAfterSlider;
