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
  const [isHiding, setIsHiding] = useState(false);
  const [lastCellKey, setLastCellKey] = useState<string>('');

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

    // Shuffle the black cells array for random order
    const shuffledCells = [...blackCells].sort(() => Math.random() - 0.5);

    // Animate cells one by one in random order
    shuffledCells.forEach((cellKey, index) => {
      setTimeout(() => {
        setVisibleCells((prev) => new Set([...Array.from(prev), cellKey]));

        // Set isDone to true when the last cell is displayed
        if (index === shuffledCells.length - 1) {
          setLastCellKey(cellKey); // Set the last cell for blinking
          setTimeout(() => {
            setIsHiding(true);
            // Wait for fade animation to complete before setting isDone
            setTimeout(() => {
              setIsDone(true);
            }, 1000); // Match the transition duration
          }, 500); // Small delay after last cell appears
        }
      }, (index * 2000) / shuffledCells.length);
    });
  }, []);

  return (
    <>
      {!isDone && (
        <div
          className={classNames(
            'z-50 fixed inset-0 h-screen w-screen bg-white dark:bg-black flex items-center justify-center transition-opacity duration-1000',
            isHiding ? 'opacity-0' : 'opacity-100'
          )}
        >
          <div className="flex flex-col items-center justify-center">
            {logoItemPosition.map((row, rowIndex) => (
              <div className="flex items-center" key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  const cellKey = `${rowIndex}-${cellIndex}`;
                  const isVisible = visibleCells.has(cellKey);
                  const isLastCell = cellKey === lastCellKey;

                  return (
                    <div
                      className={classNames(
                        'w-4 h-4 md:w-10 md:h-10 transition-all duration-500',
                        cell ? (isVisible ? 'bg-black dark:bg-white opacity-100' : 'bg-black dark:bg-white opacity-0') : 'opacity-0',
                        isLastCell && isVisible && !isHiding ? 'animate-pulse' : ''
                      )}
                      key={cellIndex}
                    />
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
