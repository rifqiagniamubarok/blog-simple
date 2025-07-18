'use client';
import { useState, useEffect, useRef } from 'react';
import { CornerDownRight } from 'lucide-react';
import classNames from 'classnames';
import { clear } from 'console';
import { useRouter } from 'next/navigation';

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
  dir?: string;
}

interface TerminalProps {
  onExit?: () => void;
}

const directoryList = {
  home: {
    href: '/',
  },
  experience: {
    href: '/experience',
  },
  blog: {
    href: '/blog',
  },
};

const defaultResponse = (): ResponseItem[] | [] => {
  let startNumber = 0;

  //   welcome response
  const welcomeResponseRaw = [
    '██████╗------███████╗-----███╗---███╗',
    '██╔══██╗----██╔══██╗----████╗-████║',
    '██████╔╝----███████║----██╔████╔██║',
    '██╔══██╗----██╔══██║----██║╚██╔╝██║',
    '██║-----██║---.██║----██║----██║-╚═╝---██║',
    '╚═╝-----╚═╝---.╚═╝----╚═╝----╚═╝-----------╚═╝',
    '',
    '-----R(Rifqi)-------------A(Agnia)--------------M(Mubarok)------',
    '',
    '---------------------- Rifqi Agnia Mubarok ---------------------- ',
    '---------------------- Full-stack Developer ---------------------- ',
  ];

  const welcomeResponse = welcomeResponseRaw.map((line) => ({
    text: line,
    isTyping: true,
    displayedText: '',
  }));

  //   Calculate array length based on random steps (e.g., 3 to 7 steps)
  const steps = Math.floor(Math.random() * (7 - 3 + 1)) + 3;

  const loading = '######################';
  // Simulate exit progress
  const response: ResponseItem[] = [...Array(steps)]
    .map((_, index) => {
      startNumber += Math.floor(Math.random() * (99 - startNumber - (5 - index)) + 1);
      if (startNumber > 99) return undefined;
      return {
        text: `${loading} [${startNumber}%] ${loading}`,
        isTyping: true,
        displayedText: '',
      };
    })
    .filter((item): item is ResponseItem => item !== undefined);

  response.push({
    text: `${loading} [100%] #####################`,
    isTyping: true,
    displayedText: '',
  });
  response.push({
    text: 'Starting Terminal ...',
    isTyping: true,
    displayedText: '',
  });

  return [...welcomeResponse, ...response];
};

const defaultTerminalContent: ContentItem[] = [
  {
    command: '',
    status: false,
    responses: defaultResponse(),
    color: 'text-white',
    dir: '',
  },
];

export default function Terminal({ onExit }: TerminalProps) {
  const [input, setInput] = useState('');
  const [isBootedUp, setIsBootedUp] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState('');
  const [content, setContent] = useState<ContentItem[]>(defaultTerminalContent);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

    if (!status) {
      responseItems.push({
        text: '"help" or "/h" to see available commands',
        isTyping: true,
        displayedText: '',
      });
    }

    setContent((prev) => [...prev, { command, status, responses: responseItems, color: status ? color : 'text-red-500', dir: currentDirectory }]);
  };

  const commandList = {
    help: {
      alternative: '/h',
      description: 'Displays command help',
      responses: ['Available commands: '],
      action: () => getHelp(),
    },
    list: {
      alternative: 'ls',
      description: 'Displays directory list',
      responses: [''],
      action: () => handleDirectoryList(),
    },
    changedirectory: {
      alternative: 'cd',
      description: 'Changes directory',
      responses: [''],
      action: () => handleChangeDirectory(),
    },
    exit: {
      alternative: '/q',
      description: 'Exits the terminal',
      responses: [],
      action: () => handleExit(),
    },
    goto: {
      alternative: 'gt',
      description: 'Direct to a page of target directory',
      responses: [],
      action: () => handleGoto(),
    },
    clear: {
      alternative: '/c',
      description: 'Clears the terminal',
      responses: [],
      action: () => setContent([]),
    },
    restart: {
      alternative: '/r',
      description: 'Restarts the terminal',
      responses: [],
      action: () => setContent(defaultTerminalContent),
    },
    test: {
      alternative: '/t',
      description: 'Test terminal command. exp test (number || default 50)',
      responses: [],
      action: () => handleTest(),
    },
  };

  const getHelp = () => {
    const responses = [
      ...commandList.help.responses,
      ...Object.entries(commandList).map(([key, { alternative, description }]) => {
        return `- ${key} or ${alternative} : ${description}`;
      }),
    ];

    addCommand(input, true, responses);
  };

  const handleDirectoryList = () => {
    const responses = Object.entries(directoryList).map(([key, { href }]) => {
      return `- ${key} `;
    });

    if (currentDirectory) {
      addCommand(input, false, [`No files in ${currentDirectory}`]);
      return;
    }

    addCommand(input, true, responses);
  };

  const handleChangeDirectory = () => {
    const dir = input.split(' ')[1];
    if (dir in directoryList) {
      setCurrentDirectory(dir);
    } else if (dir == '..') {
      setCurrentDirectory('');
    } else {
      const responses = [`No such directory: ${dir}`];
      addCommand(`cd ${dir}`, false, responses, 'text-red-500');
    }
  };

  const handleGoto = () => {
    const dir = input.split(' ')[1];

    if (dir in directoryList && currentDirectory === '') {
      const href = directoryList[dir].href;
      addCommand(input, true, [`Redirecting to ${href}...`], 'text-emerald-600');
      router.push(href);
      handleExit();
    } else if (dir in directoryList && currentDirectory !== '') {
      const href = directoryList[dir].href;
      addCommand(input, false, [`No such directory: ${dir}`], 'text-emerald-600');
    } else if (dir == '.' && currentDirectory !== '') {
      const href = directoryList[currentDirectory].href;
      addCommand(input, true, [`Redirecting to ${href}...`], 'text-emerald-600');
      router.push(href);
      handleExit();
    } else if (dir == '.' && currentDirectory === '') {
      const href = directoryList[currentDirectory].href;
      addCommand(input, true, [`You are in main directory`], 'text-emerald-600');
      router.push(href);
      handleExit();
    } else {
      addCommand(`go to ${dir}`, false, [`No such directory: ${dir}`], 'text-red-500');
    }
  };

  const handleTest = (typing: boolean = false) => {
    const value = input.split(' ')[1];
    if (!value || isNaN(parseInt(value, 10))) {
      addCommand(input, false, ['Please provide a valid number'], 'text-red-500');
      return;
    }
    const total = value ? parseInt(value, 10) : 50; // Default to 50 if no number is provided
    const response = [...Array(total)].map((_, index) => '- text ' + (index + 1));
    addCommand(input, true, response, 'text-yellow-400');
  };

  const handleExit = () => {
    let startNumber = 0;
    let messasges: string[] = [];

    // Calculate array length based on randomDelay (e.g., 1 step per ~1000ms)
    const randomDelay = Math.floor(Math.random() * (1000 - 500 + 1)) + 1000;
    const steps = Math.max(5, Math.round(randomDelay / 140)); // minimum 5 steps

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
        prev.map((item, itemIndex) => {
          // Find the first response that is still typing
          const typingResponseIndex = item.responses.findIndex((response) => response.isTyping);

          if (typingResponseIndex === -1) return item; // No responses are typing in this item

          const updatedResponses = item.responses.map((response, index) => {
            // Only type the first typing response found
            if (index === typingResponseIndex && response.isTyping && response.displayedText.length < response.text.length) {
              // Check if user is at bottom and scroll only while typing
              setTimeout(() => {
                if (contentRef.current) {
                  const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
                  const isAtBottom = scrollTop + clientHeight >= scrollHeight - 150; // 10px tolerance

                  if (isAtBottom) {
                    contentRef.current.scrollTop = contentRef.current.scrollHeight;
                  }
                }
              }, 0);

              return {
                ...response,
                displayedText: response.text.slice(0, response.displayedText.length + 1),
              };
            } else if (index === typingResponseIndex && response.isTyping && response.displayedText.length === response.text.length) {
              const updatedResponse = {
                ...response,
                isTyping: false,
              };

              return updatedResponse;
            }
            return response;
          });

          return {
            ...item,
            responses: updatedResponses,
          };
        })
      );
    }, 5); // Typing speed: 5ms per character

    return () => clearInterval(typingInterval);
  }, [content]);

  // Check if all default responses are done typing and set isBootedUp to true
  useEffect(() => {
    if (!isBootedUp) {
      const allTypingComplete = content.every((item) => item.responses.every((response) => !response.isTyping));

      if (allTypingComplete && content.length > 0 && content[0].responses.length > 0) {
        setIsBootedUp(true);
      }
    }
  }, [content, isBootedUp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const command = input.split(' ')[0].toLowerCase();

    // Here you can add logic to handle different commands
    if (command in commandList) {
      const { action } = commandList[command];
      action && action();
    } else if (Object.values(commandList).some((cmd) => cmd.alternative === command)) {
      const cmdKey = Object.keys(commandList).find((key) => commandList[key].alternative === command);
      if (cmdKey) {
        const { action } = commandList[cmdKey];
        action && action();
      }
    } else {
      addCommand(command, false, [`command not found: ${command}`], 'text-red-500');
    }

    setInput('');
  };
  return (
    <label htmlFor="terminalInput">
      <div className="fixed h-screen w-screen inset-0 bg-black z-30">
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
          {/* Content Display */}
          <div ref={contentRef} className="max-h-fit p-2 flex flex-col justify-start overflow-y-auto">
            {content.map((item: ContentItem, index: number) => (
              <div key={index}>
                {/* Display command immediately */}
                <div className="flex items-center gap-2">
                  <p className="text-sky-400 ml-2">rifqiagniamubarok.xyz{item.dir ? '/' + item.dir : ''}</p>
                  <p className="text-white">is in 📦 </p>
                  <p className="text-emerald-500">v{require('../../../package.json').version}</p>
                </div>
                <div className="text-white text-sm flex items-center gap-2">
                  <CornerDownRight size={12} className={classNames(item.status ? 'text-emerald-600 ' : 'text-red-500')} strokeWidth={4} />
                  {item.command}
                </div>
                {/* Display responses with typing effect */}
                {item.responses.map((response: ResponseItem, responseIndex: number) => (
                  <div key={responseIndex} className={classNames('text-sm whitespace-pre', item.color)}>
                    {response.displayedText}
                    {/* {response.isTyping && <span className="animate-pulse">_</span>} */}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {isBootedUp && (
            <div className="pb-2">
              <div className="flex items-center gap-2">
                <p className="text-sky-400 ml-2">rifqiagniamubarok.xyz{currentDirectory ? '/' + currentDirectory : ''}</p>
                <p className="text-white">is in 📦 </p>
                <p className="text-emerald-500">v{require('../../../package.json').version}</p>
              </div>
              <div className="text-white text-sm w-full flex items-center gap-2">
                <CornerDownRight size={12} className="text-emerald-600 " strokeWidth={4} />
                <form onSubmit={handleSubmit} className="w-full">
                  <input id="terminalInput" value={input} onChange={(e) => setInput(e.target.value)} className="w-full outline-none border-none" />
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </label>
  );
}
