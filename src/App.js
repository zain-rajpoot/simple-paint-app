import React, { useEffect, useRef } from "react";
import p5 from "p5";

const PaintApp = () => {
  const canvasRef = useRef(null);
  const brushSizeRef = useRef(10);
  const currentColorRef = useRef("#000000");

  const setup = (p5, canvasParentRef) => {
    const canvas = p5.createCanvas(800, 400).parent(canvasParentRef);
    p5.background(255);
  };

  const draw = (p5) => {
    if (p5.mouseIsPressed) {
      const brushColor = p5.color(
        p5.red(currentColorRef.current),
        p5.green(currentColorRef.current),
        p5.blue(currentColorRef.current)
      );
      p5.stroke(brushColor);
      p5.strokeWeight(brushSizeRef.current);
      p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
    }
  };

  useEffect(() => {
    const myP5 = new p5((p) => {
      p.setup = () => setup(p, canvasRef.current);
      p.draw = () => draw(p);
    });

    return () => {
      myP5.remove();
    };
  }, []);

  const updateBrushSize = () => {
    brushSizeRef.current = parseInt(document.getElementById("brushSize").value);
  };

  const updateColor = () => {
    currentColorRef.current = document.getElementById("colorPicker").value;
  };

  const clearCanvas = () => {
    const p5Instance = p5.getInstance();
    p5Instance.clear();
  };

  return (
    <div>
      <label htmlFor="brushSize">Brush Size:</label>
      <input
        type="range"
        id="brushSize"
        min="1"
        max="50"
        defaultValue={brushSizeRef.current}
        onChange={updateBrushSize}
      />

      <br />
      <br />

      <label htmlFor="colorPicker">Choose Color:</label>
      <input
        type="color"
        id="colorPicker"
        defaultValue={currentColorRef.current}
        onChange={updateColor}
      />

      <div ref={canvasRef}></div>
      <button onClick={clearCanvas}>Clear Canvas</button>
    </div>
  );
};

export default PaintApp;
