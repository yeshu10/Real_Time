// DrawingControls.tsx

import React from 'react';

interface DrawingControlsProps {
  onBrushSizeChange: (size: number) => void;
  onColorChange: (color: string) => void;
}

const DrawingControls: React.FC<DrawingControlsProps> = ({ onBrushSizeChange, onColorChange }) => {
  return (
    <div className="drawing-controls">
      <label htmlFor="brush-size">Brush Size:</label>
      <input
        type="range"
        id="brush-size"
        min="1"
        max="100"
        onChange={(e) => onBrushSizeChange(parseInt(e.target.value))}
      />
      <label htmlFor="brush-color">Color:</label>
      <input
        type="color"
        id="brush-color"
        onChange={(e) => onColorChange(e.target.value)}
      />
    </div>
  );
};

export default DrawingControls;
