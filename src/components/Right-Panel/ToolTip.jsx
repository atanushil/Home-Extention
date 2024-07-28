import React, { useState } from 'react';
import classNames from 'classnames';

const ToolTip = ({ children, content, direction = 'top' }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  const tooltipClasses = classNames(
    'absolute z-10 p-2 text-sm text-white bg-gray-700 rounded opacity-0 transition-opacity duration-300 whitespace-nowrap',
    {
      'opacity-100': visible,
      'bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32': direction === 'top',
      'top-full left-1/2 transform -translate-x-1/2 mt-2 w-32': direction === 'bottom',
      'right-full top-1/2 transform -translate-y-1/2 mr-4 w-32': direction === 'left',
      'left-full top-1/2 transform -translate-y-1/2 ml-4 w-32': direction === 'right',
    }
  );

  const arrowClasses = classNames(
    'absolute w-0 h-0 border-solid',
    {
      'border-t-8 border-t-gray-700 border-x-8 border-x-transparent border-b-0 bottom-[-8px] left-1/2 transform -translate-x-1/2': direction === 'top',
      'border-b-8 border-b-gray-700 border-x-8 border-x-transparent border-t-0 top-[-8px] left-1/2 transform -translate-x-1/2': direction === 'bottom',
      'border-l-8 border-l-gray-700 border-y-8 border-y-transparent border-r-0 right-[-8px] top-1/2 transform -translate-y-1/2': direction === 'left',
      'border-r-8 border-r-gray-700 border-y-8 border-y-transparent border-l-0 left-[-8px] top-1/2 transform -translate-y-1/2': direction === 'right',
    }
  );

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>
      <div className={tooltipClasses}>
        {content}
        <div className={arrowClasses}></div>
      </div>
    </div>
  );
};

export default ToolTip;
