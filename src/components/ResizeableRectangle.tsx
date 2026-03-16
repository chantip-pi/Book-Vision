
import { useState, useEffect } from 'react';

interface ResizableRectangleProps {
  width: number;
  height: number;
  name: string;
}

export default function ResizableRectangle({ width, height, name }: ResizableRectangleProps) {
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) return 0.4; // sm breakpoint
      if (screenWidth < 768) return 0.6; // md breakpoint
      if (screenWidth < 1024) return 0.8; // lg breakpoint
      return 1;
    };

    const handleResize = () => {
      setScaleFactor(calculateScale());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scaledWidth = width * scaleFactor;
  const scaledHeight = height * scaleFactor;

  return (
    <div className="flex flex-col items-center">
    <div>
      <div
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          backgroundColor: 'lightblue',
          border: '2px solid blue',
          marginTop: '10px'
        }}
      />
    </div>
    <div className="text-center font-medium text-gray-600 text-xs sm:text-sm">{name}</div>   
    </div>
  );
}
