import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Category, Platform } from '../types';

interface ChatAssistantProps {
  categories: Category[];
  platforms: Platform[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ categories, platforms }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-chat-assistant', handler);
    return () => window.removeEventListener('open-chat-assistant', handler);
  }, []);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string | undefined;

  const systemPrompt = `You are an assistant that helps users manage a dashboard of platforms.\nCurrent categories: ${categories
    .map(c => `${c.main}(${c.subs.join(', ')})`)
    .join('; ')}.\nExisting platforms: ${platforms.map(p => p.name).join(', ')}.`;

  const sendMessage = async () => {
    if (!input) return;
    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    if (!apiKey) return;
    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            ...newMessages,
          ],
        }),
      });
      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content?.trim();
      if (content) {
        setMessages(prev => [...prev, { role: 'assistant', content }]);
      }
    } catch {
      // ignore errors
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        className="fixed bottom-6 right-6 p-4 rounded-full bg-primary text-white shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="AI Assistant"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white/90 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col max-h-[60vh]">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium">AI Assistant</h3>
        <button onClick={() => setOpen(false)} aria-label="Close">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left text-primary'}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-500">...</div>}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage();
        }}
        className="p-3 border-t border-gray-200 dark:border-gray-700 flex space-x-2"
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 text-sm"
          placeholder="Ask me..."
        />
        <button
          type="submit"
          className="px-3 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
};
