import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Lightbulb, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  correction?: string;
  tip?: string;
}

const conversationStarters = [
  {
    category: "Social básico",
    messages: [
      { role: 'assistant' as const, content: "Hi! Nice to meet you. What's your name?", tip: "Responde con 'My name is...' o simplemente 'I'm...'" },
      { role: 'assistant' as const, content: "Hello! How are you today?", tip: "Puedes responder con 'I'm fine, thank you' o 'I'm doing great!'" },
      { role: 'assistant' as const, content: "Hey! Where are you from?", tip: "Usa 'I'm from...' seguido del nombre de tu ciudad o país" },
    ]
  },
  {
    category: "Ambiente laboral - Sistemas",
    messages: [
      { role: 'assistant' as const, content: "Hi! Are you a developer? What programming languages do you use?", tip: "Responde con 'Yes, I am. I use...' y menciona los lenguajes que conoces" },
      { role: 'assistant' as const, content: "Good morning! There's a bug in the system. Can you help me?", tip: "Puedes decir 'Sure, let me check' o 'What's the problem?'" },
      { role: 'assistant' as const, content: "Hey, we have a meeting about the new project. When are you available?", tip: "Usa 'I'm available at...' seguido de la hora" },
    ]
  }
];

export function ConversationSimulator() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentTip, setCurrentTip] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const startConversation = (categoryIndex: number, messageIndex: number) => {
    const category = conversationStarters[categoryIndex];
    const starter = category.messages[messageIndex];
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: starter.content,
    }]);
    setCurrentTip(starter.tip);
    setCurrentCategory(categoryIndex);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      const responses = currentCategory === 0 
        ? [
            { content: "That's great! Nice to meet you too. What do you do for work?", tip: "Usa 'I work as a...' o 'I'm a...'" },
            { content: "Wonderful! How long have you been living there?", tip: "Usa 'I have been living here for...' seguido del tiempo" },
            { content: "That's interesting! Do you like it?", tip: "Responde con 'Yes, I do' o 'Yes, I love it'" },
          ]
        : [
            { content: "Great skills! How many years of experience do you have?", tip: "Responde con 'I have X years of experience'" },
            { content: "Thanks! Can you check the database logs? I think there's a connection error.", tip: "Puedes decir 'Sure, I'll check the logs right now'" },
            { content: "Perfect! The meeting is at 3pm. Does that work for you?", tip: "Responde con 'Yes, that works for me' o 'I'm sorry, I'm not available at that time'" },
          ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse.content,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentTip(randomResponse.tip);
      setIsTyping(false);
    }, 1500);
  };

  const resetConversation = () => {
    setMessages([]);
    setCurrentTip('');
  };

  if (messages.length === 0) {
    return (
      <div className="animate-slide-up space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Simulador de Conversación</h2>
          <p className="text-muted-foreground">Practica conversaciones reales en inglés</p>
        </div>

        {conversationStarters.map((category, catIndex) => (
          <div key={catIndex} className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              {catIndex === 0 ? '👋' : '💼'} {category.category}
            </h3>
            <div className="grid gap-3">
              {category.messages.map((msg, msgIndex) => (
                <Card 
                  key={msgIndex}
                  className="p-4 shadow-soft hover:shadow-hover cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                  onClick={() => startConversation(catIndex, msgIndex)}
                >
                  <p className="font-medium text-foreground">"{msg.content}"</p>
                  <p className="text-sm text-muted-foreground mt-2">💡 {msg.tip}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-slide-up flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Conversación en curso</h3>
        <Button variant="ghost" size="sm" onClick={resetConversation}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Nueva conversación
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center shrink-0
              ${message.role === 'user' ? 'gradient-accent' : 'gradient-primary'}
            `}>
              {message.role === 'user' ? (
                <User className="w-5 h-5 text-accent-foreground" />
              ) : (
                <Bot className="w-5 h-5 text-primary-foreground" />
              )}
            </div>
            <Card className={`
              p-4 max-w-[80%]
              ${message.role === 'user' 
                ? 'gradient-accent text-accent-foreground' 
                : 'bg-card shadow-soft'
              }
            `}>
              <p className={message.role === 'user' ? 'text-accent-foreground' : 'text-foreground'}>
                {message.content}
              </p>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <Card className="p-4 bg-card shadow-soft">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Tip */}
      {currentTip && (
        <div className="mb-4 p-3 bg-accent/10 rounded-xl flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">{currentTip}</p>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu respuesta en inglés..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1"
        />
        <Button variant="hero" size="icon" onClick={handleSend}>
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
