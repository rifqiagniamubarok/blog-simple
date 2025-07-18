'use client';
import { useState } from 'react';
import Terminal from '.';

export default function ButtonTerminal() {
  const [isShowTerminal, setIsShowTerminal] = useState(false);
  return (
    <>
      {/* <button
        className=" fixed bottom-10 right-10 cursor-pointer flex items-center gap-1 shadow-md bg-gray-100/50 backdrop-blur-md py-1 px-2 rounded-md text-xs"
        onClick={() => setIsShowTerminal(!isShowTerminal)}
      >
        <p>backend side </p>
        <p>{`</>`}</p>
      </button> */}
      <div
        className="w-80 fixed right-0 z-20 h-screen bg-gradient-to-r from-black/0 via-black/50 to-black/100 dark:from-white/0 dark:via-white/50 dark:to-white/100 opacity-0 hover:opacity-100 transition-opacity duration-1000 flex items-center justify-end pr-10 cursor-pointer text-2xl font-medium tracking-widest"
        onClick={() => setIsShowTerminal(!isShowTerminal)}
      >
        <p className="[writing-mode:vertical-lr] rotate-180 text-white dark:text-black">{`B  A  C  K  E  N  D S  I  D  E`}</p>
      </div>

      {isShowTerminal && <Terminal onExit={() => setIsShowTerminal(false)} />}
    </>
  );
}
