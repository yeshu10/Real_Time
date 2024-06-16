import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { fabric } from 'fabric';
import DrawingControls from './DrawingControls';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './WhiteboardCanvas.css';

interface WhiteboardCanvasProps {
  roomId: string;
}

interface Cursor {
  x: number;
  y: number;
  userId: string;
}

const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({ roomId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [cursors, setCursors] = useState<Cursor[]>([]);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
    });
    setCanvas(newCanvas);

    const newSocket = io('http://localhost:5000'); // Replace with your Socket.io server URL
    setSocket(newSocket);

    newSocket.emit('join', roomId);

    newSocket.on('drawing', (data: any) => {
      newCanvas.loadFromJSON(data, newCanvas.renderAll.bind(newCanvas));
    });

    newSocket.on('cursor', (data: Cursor) => {
      setCursors((prevCursors) => {
        const newCursors = prevCursors.filter((cursor) => cursor.userId !== data.userId);
        newCursors.push(data);
        return newCursors;
      });
    });

    newCanvas.on('mouse:up', () => {
      if (newCanvas && newSocket) {
        const jsonData = newCanvas.toJSON();
        setHistory((prevHistory) => [...prevHistory, jsonData]);
        newSocket.emit('drawing', jsonData);
      }
    });

    newCanvas.on('mouse:move', (e) => {
      if (newSocket) {
        const pointer = newCanvas.getPointer(e.e);
        newSocket.emit('cursor', { x: pointer.x, y: pointer.y, userId: newSocket.id });
      }
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [roomId]);

  const handleBrushSizeChange = (size: number) => {
    if (canvas) {
      canvas.freeDrawingBrush.width = size;
    }
  };

  const handleColorChange = (color: string) => {
    if (canvas) {
      canvas.freeDrawingBrush.color = color;
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setRedoStack((prevStack) => [...prevStack, lastState]);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      canvas?.loadFromJSON(lastState, canvas.renderAll.bind(canvas));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const lastRedoState = redoStack[redoStack.length - 1];
      setHistory((prevHistory) => [...prevHistory, lastRedoState]);
      setRedoStack((prevStack) => prevStack.slice(0, -1));
      canvas?.loadFromJSON(lastRedoState, canvas.renderAll.bind(canvas));
    }
  };

  const saveAsImage = async () => {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current;
      const canvasDataUrl = canvasElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = canvasDataUrl;
      link.download = 'whiteboard.png';
      link.click();
    }
  };

  const saveAsPDF = async () => {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current;
      const canvasImage = await html2canvas(canvasElement);
      const imgData = canvasImage.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
      });
      pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
      pdf.save('whiteboard.pdf');
    }
  };

  return (
    <div>
      <DrawingControls
        onBrushSizeChange={handleBrushSizeChange}
        onColorChange={handleColorChange}
      />
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      <button onClick={saveAsImage}>Save as Image</button>
      <button onClick={saveAsPDF}>Save as PDF</button>
      <canvas ref={canvasRef} width={800} height={600} />
      {cursors.map((cursor) => (
        <div
          key={cursor.userId}
          style={{
            position: 'absolute',
            left: cursor.x,
            top: cursor.y,
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

export default WhiteboardCanvas;
