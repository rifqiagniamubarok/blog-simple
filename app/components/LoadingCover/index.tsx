'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';

const logoItemPosition = [
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
];

export default function LoadignCover() {
  const [visibleCells, setVisibleCells] = useState<Set<string>>(new Set());
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const blackCells: string[] = [];

    // Collect all black cell positions
    logoItemPosition.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === 1) {
          blackCells.push(`${rowIndex}-${cellIndex}`);
        }
      });
    });

    // Animate cells one by one
    blackCells.forEach((cellKey, index) => {
      setTimeout(() => {
        setVisibleCells((prev) => new Set([...Array.from(prev), cellKey]));

        // Set isDone to true when the last cell is displayed
        if (index === blackCells.length - 1) {
          setTimeout(() => {
            setIsDone(true);
          }, 500); // Small delay after last cell appears
        }
      }, (index * 2000) / blackCells.length);
    });
  }, []);

  return (
    <>
      {!isDone && (
        <div className="z-50 fixed inset-0 h-screen w-screen bg-white flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            {logoItemPosition.map((row, rowIndex) => (
              <div className="flex items-center" key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  const cellKey = `${rowIndex}-${cellIndex}`;
                  const isVisible = visibleCells.has(cellKey);

                  return (
                    <div className={classNames('w-10 h-10 transition-colors duration-100', cell ? (isVisible ? 'bg-black' : 'bg-transparent') : 'opacity-0')} key={cellIndex} />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
