
import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { getUzumProResponse } from './services/geminiService';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Assalomu alaykum! Men Uzum Pro - sizning Xitoydan import va Uzum Marketda savdo bo'yicha shaxsiy yordamchingizman. Qanday yordam bera olaman?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await getUzumProResponse(userMsg, messages);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex w-80 bg-white border-r border-gray-200 flex-col p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-uzum-purple rounded-xl flex items-center justify-center text-white font-bold text-xl">U</div>
          <div>
            <h1 className="font-bold text-lg text-gray-900 leading-tight">Uzum Pro</h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Import & Logistics</p>
          </div>
        </div>

        <div className="space-y-6">
          <Calculator />
          
          <div className="bg-purple-900 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold mb-2">Eslatma! 💡</h4>
              <p className="text-sm text-purple-100">
                Kargo tanlashda har doim 'Ishonchli reyting' va 'Shartnoma' so'rashni unutmang. Bu sizning tovaringiz xavfsizligi garovidir.
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-700 rounded-full opacity-50"></div>
          </div>

          <div className="p-4 border border-gray-200 rounded-2xl">
            <h4 className="font-bold text-sm mb-3">Mashhur Linklar:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <a href="https://1688.com" target="_blank" className="p-2 bg-gray-50 rounded hover:bg-gray-100 text-center transition">1688.com</a>
              <a href="https://taobao.com" target="_blank" className="p-2 bg-gray-50 rounded hover:bg-gray-100 text-center transition">Taobao</a>
              <a href="https://pinduoduo.com" target="_blank" className="p-2 bg-gray-50 rounded hover:bg-gray-100 text-center transition">Pinduoduo</a>
              <a href="https://seller.uzum.uz" target="_blank" className="p-2 bg-gray-50 rounded hover:bg-gray-100 text-center transition">Uzum Seller</a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative h-screen">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="lg:hidden w-8 h-8 bg-uzum-purple rounded flex items-center justify-center text-white font-bold">U</div>
            <div>
              <h2 className="font-bold text-gray-900">Uzum Pro AI</h2>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-500 font-medium">Online Maslahatchi</span>
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-uzum-purple text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.15s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </div>

        {/* Mobile-only tools hint (can be expanded) */}
        <div className="lg:hidden px-4 py-2 bg-gray-100 flex gap-2 overflow-x-auto text-xs whitespace-nowrap scrollbar-hide">
          <button className="px-3 py-1 bg-white border border-gray-200 rounded-full">Logistika Kalkulyatori</button>
          <button className="px-3 py-1 bg-white border border-gray-200 rounded-full">Kargo Reyting</button>
          <button className="px-3 py-1 bg-white border border-gray-200 rounded-full">1688 Sirlari</button>
        </div>

        {/* Input area */}
        <footer className="p-4 bg-white border-t border-gray-200 sticky bottom-0 z-20">
          <div className="max-w-4xl mx-auto flex items-end gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-uzum-purple transition">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Xitoydan import bo'yicha savolingizni bering..."
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-2 px-3 text-gray-800 min-h-[44px] max-h-[150px]"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`p-3 rounded-xl flex items-center justify-center transition ${
                isLoading || !input.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-uzum-purple hover:bg-purple-700 shadow-md'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-2">Uzum Pro - sun'iy intellekt asosida ishlaydi. Iltimos, moliyaviy qarorlardan oldin kargo bilan shartnomani tekshiring.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
