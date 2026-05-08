'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Send, Lock } from 'lucide-react';
import { useChatbotStore } from '@/store/chatbotStore';

type Message =
  | { type: 'user' | 'ai'; text: string }
  | { type: 'paywall' };

const PREFILLED: Message[] = [
  { type: 'user', text: 'Was brauche ich für die Ummeldung?' },
  {
    type: 'ai',
    text: 'Für die Ummeldung beim Bürgeramt brauchst du: deinen Personalausweis oder Reisepass, die Wohnungsgeberbestätigung vom Vermieter (Mieterbescheinigung) und ggf. eine Vollmacht. Wichtig: Die Frist beträgt 14 Tage nach dem Einzug!',
  },
  { type: 'user', text: 'Wie kündige ich meinen alten Stromanbieter?' },
  {
    type: 'ai',
    text: 'Kündige schriftlich oder per E-Mail mit Angabe deiner Kundennummer und der gewünschten Kündigungsfrist (meist 4–6 Wochen). Viele Anbieter haben inzwischen auch ein Online-Kündigungsformular. Tipp: Der neue Anbieter übernimmt oft die Kündigung automatisch.',
  },
  { type: 'user', text: 'Ist eine Haftpflichtversicherung Pflicht?' },
  {
    type: 'ai',
    text: 'Gesetzlich vorgeschrieben ist sie nicht — aber dringend empfohlen! Eine Privathaftpflicht schützt dich bei Schäden, die du anderen versehentlich zufügst. Kosten: ab ca. 3–5 €/Monat. Ohne Haftpflicht kannst du im Schadensfall unbegrenzt haftbar gemacht werden.',
  },
];

const FREE_LIMIT = 3;

export default function ChatbotPage() {
  const router = useRouter();
  const { chatCount, incrementCount } = useChatbotStore();
  const [messages, setMessages] = useState<Message[]>(PREFILLED);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSubmit() {
    const text = input.trim();
    if (!text) return;
    setInput('');

    // Append user bubble
    setMessages((prev) => [...prev, { type: 'user', text }]);

    if (chatCount >= FREE_LIMIT) {
      // Already at limit — show paywall banner
      setMessages((prev) => [...prev, { type: 'paywall' }]);
      return;
    }

    incrementCount();

    if (chatCount + 1 >= FREE_LIMIT) {
      // This was the last free message — show paywall banner instead of AI reply
      setMessages((prev) => [...prev, { type: 'paywall' }]);
    } else {
      // Mock AI response for messages within limit (shouldn't trigger in prototype since 3 are pre-filled)
      setMessages((prev) => [
        ...prev,
        { type: 'ai', text: 'Das ist eine gute Frage! Schaue in unseren Anleitungen nach — dort findest du Schritt-für-Schritt-Antworten.' },
      ]);
    }
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#d2d5fc] bg-white px-4 py-3 pt-12">
        <button
          type="button"
          aria-label="Zurück"
          onClick={() => router.back()}
          className="flex h-[36px] w-[36px] items-center justify-center"
        >
          <ChevronLeft size={24} color="#1c2642" />
        </button>
        <h1 className="text-[16px] font-bold text-foreground">KI Chatbot</h1>
        <span className="ml-auto rounded-full bg-[#d2d5fc] px-2 py-0.5 text-[12px] font-bold" style={{ color: '#646efb' }}>
          Beta
        </span>
      </div>

      {/* Chat feed */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => {
          if (msg.type === 'paywall') {
            return (
              <div
                key={i}
                className="animate-in fade-in rounded-[14px] border p-4"
                style={{ backgroundColor: '#d2d5fc', borderColor: '#646efb' }}
              >
                <div className="flex items-start gap-2">
                  <Lock size={16} color="#646efb" className="mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-foreground">
                      Du hast dein Limit erreicht (3/3). Upgrade auf Premium für unbegrenzte Chats.
                    </p>
                    <button
                      type="button"
                      onClick={() => router.push('/ich/premium')}
                      className="mt-2 rounded-[8px] px-4 py-2 text-[14px] font-bold text-white"
                      style={{ backgroundColor: '#646efb' }}
                    >
                      Jetzt upgraden →
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          if (msg.type === 'user') {
            return (
              <div key={i} className="flex justify-end">
                <div
                  className="animate-in fade-in slide-in-from-bottom-2 max-w-[80%] rounded-2xl px-4 py-2"
                  style={{ backgroundColor: '#646efb' }}
                >
                  <p className="text-[14px] font-normal text-white">{msg.text}</p>
                </div>
              </div>
            );
          }
          // AI bubble
          return (
            <div key={i} className="flex justify-start">
              <div
                className="animate-in fade-in slide-in-from-bottom-2 max-w-[80%] rounded-2xl bg-white px-4 py-2"
                style={{ border: '1px solid #d2d5fc' }}
              >
                <p className="text-[14px] font-normal text-foreground">{msg.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar — fixed at bottom, above safe-area */}
      <div
        className="border-t border-[#d2d5fc] bg-white px-4 py-3"
        style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Stell eine Frage..."
            className="flex-1 rounded-[10px] border border-[#d2d5fc] bg-background px-3 py-2 text-[14px] font-normal text-foreground outline-none focus:border-[#646efb]"
          />
          <button
            type="button"
            onClick={handleSubmit}
            aria-label="Absenden"
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full"
            style={{ backgroundColor: '#646efb' }}
          >
            <Send size={18} color="#ffffff" />
          </button>
        </div>
      </div>
    </div>
  );
}
