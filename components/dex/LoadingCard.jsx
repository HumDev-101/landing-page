import React from 'react';
import classNames from 'classnames';

const LoadingCardComp = ({
  width = 'w-[370px]',
  height = 'h-[80vh]',
  mobileWidth = 'md:w-[370px]',
  mobileHeight = 'md:h-[80vh]',
  maxWidth = 'max-w-[1600px]',
  maxHeight = 'max-h-[900px]',
}) => {
  return (
    <div
      className={classNames(
        'relative flex items-center justify-center rounded-xl shadow-lg overflow-hidden animate-pulse-scale',
        width,
        height,
        maxWidth,
        maxHeight,
        mobileWidth,
        mobileHeight,
        'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
      )}
    >
      {/* Spinner */}
      <div className="w-[30px] h-[30px] border-4 border-white/30 border-t-white rounded-full animate-spin z-10" />

      {/* Optional message or placeholder */}
      <span className="absolute bottom-5 text-sm text-gray-400 z-10">Loading...</span>

      {/* Overlay effect */}
      <div className="absolute inset-0 bg-white/10 rounded-xl animate-pulse-scale pointer-events-none z-0" />
    </div>
  );
};

export default LoadingCardComp;
