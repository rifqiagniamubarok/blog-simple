'use client';
import { useState } from 'react';
import Terminal from '.';

export default function ButtonTerminal() {
  const [isShowTerminal, setIsShowTerminal] = useState(false);
  return (
    <>
      <button className="w-10 h-10 fixed bottom-10 right-10 cursor-pointer" onClick={() => setIsShowTerminal(!isShowTerminal)}>{`</>`}</button>
      {isShowTerminal && <Terminal onExit={() => setIsShowTerminal(false)} />}
    </>
  );
}
