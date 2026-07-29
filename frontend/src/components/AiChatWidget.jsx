import { useState, useRef, useEffect } from "react";
import { MessageSquareText, Send, X, Bot, User, Sparkles } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AiChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hi there! I'm your RentRide AI assistant. Looking for a specific car or city?",
    },
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "ai", content: data.answer }]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Oops! Something went wrong connecting to the AI." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[500px] w-[350px] sm:w-[400px] flex-col overflow-hidden rounded-3xl border border-base-200 bg-base-100 shadow-2xl animate-in slide-in-from-bottom-5 transition-all">
          
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-5 py-4 text-primary-content relative overflow-hidden">
            {/* Decorative background shape */}
            <div className="absolute -right-4 -top-4 text-primary-content/10">
              <Sparkles size={100} />
            </div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-primary-content/20 flex items-center justify-center h-10 w-10 rounded-full shrink-0">
                <Bot size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-none tracking-tight">RentRide AI</h3>
                <span className="text-xs text-primary-content/80 font-medium">Online and ready</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-circle btn-ghost btn-sm text-primary-content hover:bg-primary-content/20 relative z-10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-base-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-primary text-primary-content" : "bg-base-200 text-base-content/70"}`}>
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                </div>
                <div
                  className={`chat-bubble text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "chat-bubble-primary"
                      : "bg-base-200 text-base-content"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-8 h-8 rounded-full bg-base-200 text-base-content/70 flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                </div>
                <div className="chat-bubble bg-base-200 text-base-content flex items-center h-10">
                  <span className="loading loading-dots loading-sm opacity-50"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-base-200 bg-base-100 p-4">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 bg-base-200 rounded-full p-1 pl-4">
              <input
                type="text"
                placeholder="Ask about our cars..."
                className="w-full bg-transparent text-sm focus:outline-none text-base-content placeholder:text-base-content/50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="btn btn-circle btn-primary btn-sm shrink-0"
                disabled={isLoading || !input.trim()}
              >
                <Send size={16} className={input.trim() ? "translate-x-0.5" : ""} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button Area */}
      <div className={`relative flex flex-col items-end ${isOpen ? 'hidden' : ''}`}>
        
        {/* Floating "Need help?" Message Bubble */}
        <div className="absolute bottom-20 right-0 mb-2 mr-1 w-max animate-bounce">
          <div className="bg-base-100 text-base-content shadow-xl rounded-2xl py-2 px-4 border border-base-200 font-bold text-sm flex items-center gap-2 relative">
            <span className="text-xl">👋</span> Need help booking?
            {/* Little triangle pointing down to the button */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-base-100 border-b border-r border-base-200 rotate-45"></div>
          </div>
        </div>

        {/* Pulsing Aura Effect */}
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 duration-1000"></div>

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-circle btn-primary h-16 w-16 shadow-2xl shadow-primary/40 transition-transform duration-300 hover:scale-110 relative z-10"
        >
          <MessageSquareText size={30} strokeWidth={2.5} />
          
          {/* Notification Red Dot */}
          <span className="absolute top-0 right-0 w-4 h-4 bg-error rounded-full border-2 border-primary-content shadow-sm"></span>
        </button>

      </div>

    </div>
  );
};

export default AiChatWidget;