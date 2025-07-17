'use client';
import { useState } from 'react';
import Terminal from '.';

export default function ButtonTerminal() {
  const [isShowTerminal, setIsShowTerminal] = useState(false);
  return (
    <>
      <button
        className=" fixed bottom-10 right-10 cursor-pointer flex items-center gap-1 shadow-md bg-gray-100/50 backdrop-blur-md py-1 px-2 rounded-md text-xs"
        onClick={() => setIsShowTerminal(!isShowTerminal)}
      >
        <p>backend side </p>
        <p>{`</>`}</p>
      </button>
      {isShowTerminal && <Terminal onExit={() => setIsShowTerminal(false)} />}
    </>
  );
}
