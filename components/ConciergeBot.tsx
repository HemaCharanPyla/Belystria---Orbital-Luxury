import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ConciergeBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Greetings. I am the Belystria AI Concierge. How may I assist you with your orbital journey today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Format history for the service if needed, but for now we just send the message 
    // effectively as a new prompt with context in system instruction to keep it simple
    // or we could map the history.
    const historyForApi = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendMessageToGemini(userMessage.text, historyForApi);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gold-500 text-black p-4 rounded-full shadow-lg hover:bg-gold-400 transition-all transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 z-50 w-full max-w-sm bg-space-900 border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none translate-y-10'}`}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/10 bg-space-950/50 rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-gold-400" />
            <span className="font-serif text-white font-medium">Concierge AI</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-space-950/80">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-space-800 border border-white/10 text-gray-200 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-space-800 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-none">
                 <div className="flex space-x-1">
                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-space-900 border-t border-white/10 rounded-b-2xl">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about Belystria..."
              className="w-full bg-space-950 text-white border border-white/20 rounded-full py-3 px-4 pr-12 focus:outline-none focus:border-gold-400 text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gold-400 hover:text-gold-300 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConciergeBot;