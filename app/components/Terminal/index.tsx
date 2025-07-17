'use client';
import { useState, useEffect } from 'react';
import { CornerDownRight } from 'lucide-react';
import classNames from 'classnames';

interface ResponseItem {
  text: string;
  isTyping: boolean;
  displayedText: string;
}

interface ContentItem {
  command: string;
  status: boolean;
  responses: ResponseItem[];
  color: string;
}

interface TerminalProps {
  onExit?: () => void;
}

export default function Terminal({ onExit }: TerminalProps) {
  const [input, setInput] = useState('');
  const [content, setContent] = useState<ContentItem[]>([]);

  const addCommand = (
    command: string,
    status: boolean,
    responses: string[],
    color: string = 'text-white' // default value is 'white'
  ) => {
    const responseItems: ResponseItem[] = responses.map((response) => ({
      text: response,
      isTyping: true,
      displayedText: '',
    }));

    setContent((prev) => [...prev, { command, status, responses: responseItems, color }]);
  };

  const handleExit = () => {
    let startNumber = 0;
    let messasges: string[] = [];

    // Calculate array length based on randomDelay (e.g., 1 step per ~1000ms)
    const randomDelay = Math.floor(Math.random() * (6000 - 1000 + 1)) + 1000;
    const steps = Math.max(5, Math.round(randomDelay / 1400)); // minimum 5 steps

    // Simulate exit progress
    [...Array(steps)].forEach((_, index) => {
      startNumber += Math.floor(Math.random() * (99 - startNumber - (5 - index)) + 1);
      if (startNumber > 99) return;
      messasges.push(`############# ${startNumber}%`);
    });
    addCommand(`exit`, true, [...messasges, `############# 100%`, 'Exiting terminal... '], 'text-emerald-600');

    //   Simulate random exit delay

    setTimeout(() => {
      onExit && onExit();
    }, randomDelay);
  };

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setContent((prev) =>
        prev.map((item) => {
          // Find the first response that is still typing
          const typingResponseIndex = item.responses.findIndex((response) => response.isTyping);

          if (typingResponseIndex === -1) return item; // No responses are typing in this item

          const updatedResponses = item.responses.map((response, index) => {
            // Only type the first typing response found
            if (index === typingResponseIndex && response.isTyping && response.displayedText.length < response.text.length) {
              return {
                ...response,
                displayedText: response.text.slice(0, response.displayedText.length + 1),
              };
            } else if (index === typingResponseIndex && response.isTyping && response.displayedText.length === response.text.length) {
              return {
                ...response,
                isTyping: false,
              };
            }
            return response;
          });

          return {
            ...item,
            responses: updatedResponses,
          };
        })
      );
    }, 30); // Typing speed: 50ms per character

    return () => clearInterval(typingInterval);
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const command = input.toLowerCase();

    // Here you can add logic to handle different commands
    if (command === 'help' || command === '/h') {
      addCommand(`${input}`, true, ['Available commands: help, clear', '- help,/h : Displays command help', '- clear,/c : Clears the terminal']);
    } else if (command === 'clear' || command === '/c') {
      setContent([]);
    } else if (command === 'exit' || command === '/q') {
      handleExit();
    } else {
      addCommand(`${input}`, false, [`command not found : ${input}`]);
    }

    setInput('');
  };
  return (
    <div className="fixed h-screen w-screen inset-0 bg-black z-50">
      <div className="flex flex-col h-full ">
        <div className="w-full flex justify-between bg-gray-200 text-black border-gray-400 font-semibold">
          <div className="flex ml-5 items-center h-full">
            <button className="bg-red-700 w-3 h-3 rounded-full text-[5px] text-red-700 hover:text-white flex items-center justify-center" onClick={handleExit}>
              x
            </button>
          </div>
          <p className="text-lg py-2">Terminal</p>
          <div></div>
        </div>
        <div className="grow flex flex-col justify-end overflow-y-auto p-2 h-full overflow-x-hidden">
          {content.map((item: ContentItem, index: number) => (
            <div key={index}>
              {/* Display command immediately */}
              <div className="flex items-center gap-2">
                <p className="text-sky-400 ml-2">rifqiagniamubarok.xyz/home</p>
                <p className="text-white">is in 📦 </p>
                <p className="text-emerald-500">v{require('../../../package.json').version}</p>
              </div>
              <div className="text-white text-sm flex items-center gap-2">
                <CornerDownRight size={12} className={classNames(item.status ? 'text-emerald-600 ' : 'text-red-500')} strokeWidth={4} />
                {item.command}
              </div>
              {/* Display responses with typing effect */}
              {item.responses.map((response: ResponseItem, responseIndex: number) => (
                <div key={responseIndex} className={classNames('text-sm', item.color)}>
                  {response.displayedText}
                  {/* {response.isTyping && <span className="animate-pulse">_</span>} */}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pb-2">
          <div className="flex items-center gap-2">
            <p className="text-sky-400 ml-2">rifqiagniamubarok.xyz/home</p>
            <p className="text-white">is in 📦 </p>
            <p className="text-emerald-500">v{require('../../../package.json').version}</p>
          </div>
          <div className="text-white text-sm w-full flex items-center gap-2">
            <CornerDownRight size={12} className="text-emerald-600 " strokeWidth={4} />
            <form onSubmit={handleSubmit} className="w-full">
              <input value={input} onChange={(e) => setInput(e.target.value)} className="w-full outline-none border-none" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
