import React, { useState, useEffect, useRef } from 'react';
import { Mail, ExternalLink, GraduationCap, MapPin, Building, X, Send, Bot, User } from 'lucide-react';
import { FiGithub, FiLinkedin } from "react-icons/fi";
import profileImg from './assets/port.jpeg';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, px: -1000, py: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  
  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I am Alwin's AI assistant. Ask me anything about his skills, experience, or background." }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Track mouse for 3D tilt and parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y, px: e.clientX, py: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Direct Gemini API Call (Configured for GitHub Pages)
  const callGeminiAPI = async (userText) => {
    // PASTE YOUR RESTRICTED API KEY HERE
    const apiKey = "AIzaSyBSUZDBkLPdbf0wvh8B2IsgPLxZu74FSag"; 
    
    if (apiKey === "AIzaSyBSUZDBkLPdbf0wvh8B2IsgPLxZu74FSag") {
      return "API Error";
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const formattedHistory = messages.map(msg => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
    formattedHistory.push({ role: 'user', parts: [{ text: userText }] });

    const payload = {
      contents: formattedHistory,
      systemInstruction: {
        parts: [{ 
          text: `You are Nexus AI, the exclusive virtual assistant for Alwin George. 
          
          Alwin's Details:
          - Role: Currently Computer Science Student.
          - Education: B.Sc in Computer Science from Union Christian College.
          - Location: Thekkanath house, Thuruthukkara road, Kizhakkambalam P.O, Ernakulam, Kerala, India (PIN: 683562).
          - Email: alwin9895189565@gmail.com
          - GitHub: Alwin444
          
          YOUR STRICT RULES:
          1. You must ONLY answer questions related to Alwin's professional background, skills, portfolio, education, and contact info.
          2. If a user asks about anything unrelated to Alwin (e.g., general knowledge, coding help, weather, history, recipes), you MUST politely refuse to answer and steer the conversation back to Alwin.
          3. Only provide information that is explicitly mentioned in Alwin's profile. Do NOT make assumptions or provide information that is not stated.
          4. Adopt a sleek, professional, slightly futuristic tech persona. Keep answers concise.` 
        }]
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error(error);
      return "Communication link disrupted. Please try again later.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    setIsTyping(true);

    const aiResponse = await callGeminiAPI(userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-[#030508] text-gray-100 font-sans overflow-hidden flex flex-col items-center justify-center relative selection:bg-cyan-500/30">
      
      {/* Hardware-Accelerated Smooth Dynamic Cursor Light */}
      <div 
        className="fixed top-0 left-0 w-[800px] h-[800px] pointer-events-none z-0 mix-blend-screen transition-transform duration-300 ease-out rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 60%)`,
          transform: `translate3d(calc(${mousePos.px}px - 50%), calc(${mousePos.py}px - 50%), 0)`,
          opacity: isHovering ? 1 : 0.6,
          willChange: 'transform'
        }}
      />
      <div 
        className="fixed top-0 left-0 w-[150px] h-[150px] pointer-events-none z-0 mix-blend-screen transition-transform duration-150 ease-out rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`,
          transform: `translate3d(calc(${mousePos.px}px - 50%), calc(${mousePos.py}px - 50%), 0)`,
          willChange: 'transform'
        }}
      />

      <main className="relative z-10 flex flex-col items-center px-6 w-full max-w-5xl mx-auto pt-12 pb-24">
        
        {/* --- HIGH-TECH CORE (EXPANDABLE PROFILE CARD) --- */}
        <div 
          className="relative group mx-auto mb-12 z-20 cursor-default transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-52 h-52 sm:w-64 sm:h-64 hover:w-full hover:max-w-2xl hover:h-[380px] sm:hover:h-[280px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Expanded Card Background */}
          <div className="absolute inset-0 bg-[#0a0f16]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_50px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.2)] delay-75" />

          {/* Avatar & Rings Container */}
          <div className="absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 sm:w-64 sm:h-64 group-hover:left-6 group-hover:top-6 sm:group-hover:left-8 sm:group-hover:top-8 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:w-28 group-hover:h-28 sm:group-hover:w-36 sm:group-hover:h-36">
            
            <div className="absolute w-[140%] h-[140%] -left-[20%] -top-[20%] rounded-full border border-indigo-500/10 border-l-indigo-400/50 animate-reverse-spin-slow opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="absolute w-[115%] h-[115%] -left-[7.5%] -top-[7.5%] rounded-full border border-cyan-500/20 border-t-cyan-400/70 border-b-cyan-400/70 animate-spin-slow opacity-80 group-hover:opacity-50 transition-opacity duration-500" />

            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0a0f16] shadow-[0_0_40px_rgba(6,182,212,0.15)] border border-white/10 transition-shadow duration-500 group-hover:border-cyan-500/30">
              <img 
                src={profileImg} 
                alt="Alwin George" 
                className="w-full h-full object-cover opacity-90 transition-all duration-700 ease-out"
              />
                
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] pointer-events-none group-hover:shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] transition-shadow duration-700" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none mix-blend-overlay" />
            </div>
          </div>

          {/* Details Content */}
          <div className="absolute left-6 right-6 top-[150px] sm:top-8 sm:left-[200px] sm:right-8 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-0 group-hover:duration-500 group-hover:delay-200 pointer-events-none group-hover:pointer-events-auto flex flex-col justify-center gap-4 sm:gap-6">
            
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shrink-0 mt-1">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-gray-200 tracking-wide uppercase mb-1">Education</h3>
                <p className="text-base font-medium text-cyan-50">B.Sc Computer Science</p>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <Building className="w-3.5 h-3.5" />
                  <span>Union Christian College</span>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent" />

            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold text-gray-200 tracking-wide uppercase mb-1">Address</h3>
                <div className="text-sm text-gray-300 leading-relaxed flex flex-col gap-0.5 mt-1">
                  <span className="font-medium text-cyan-50">Thekkanath House</span>
                  <span>Thuruthukkara Road, Kizhakkambalam P.O</span>
                  <span>Ernakulam, Kerala, India</span>
                  <span className="text-cyan-400 font-medium mt-1">PIN: 683562</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* --- PERSONAL INFO --- */}
        <div className="text-center space-y-3 mb-12 relative">
          <div className="relative inline-block cursor-default">
            <h1 className="relative text-4xl sm:text-6xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-50 to-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] pb-2 sm:pb-4 leading-tight">
              Alwin George
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-400 font-medium tracking-widest uppercase mt-2">
            <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">Backend Devolping</span>
            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
            <span className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]">CyberSecurity</span>
          </div>
        </div>

        {/* --- LINKS SECTION --- */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-center items-stretch z-10">
          
          {/* Email Button */}
          <a 
            href="mailto:alwin9895189565@gmail.com"
            className="group relative flex-1 flex items-center gap-4 px-5 py-4 bg-[#0a0f16]/80 border border-white/5 rounded-2xl hover:bg-[#0d141f] hover:border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all duration-300 backdrop-blur-md"
          >
            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-red-500/10 transition-colors">
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
            </div>
            <div className="flex flex-col items-start flex-1 overflow-hidden">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email</span>
              <span className="text-sm text-gray-300 truncate w-full group-hover:text-white transition-colors">alwin9895189565@gmail.com</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
          </a>

          {/* LinkedIn Button */}
          <a 
            href="https://www.linkedin.com/in/alwin-george-44a160358"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-1 flex items-center gap-4 px-5 py-4 bg-[#0a0f16]/80 border border-white/5 rounded-2xl hover:bg-[#0d141f] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 backdrop-blur-md"
          >
            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-500/10 transition-colors">
              <FiLinkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="flex flex-col items-start flex-1 overflow-hidden">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Connect</span>
              <span className="text-sm text-gray-300 truncate w-full group-hover:text-white transition-colors">Alwin George</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
          </a>

          {/* GitHub Button */}
          <a 
            href="https://github.com/Alwin444"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-1 flex items-center gap-4 px-5 py-4 bg-[#0a0f16]/80 border border-white/5 rounded-2xl hover:bg-[#0d141f] hover:border-violet-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 backdrop-blur-md"
          >
            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-violet-500/10 transition-colors">
              <FiGithub className="w-5 h-5 text-gray-400 group-hover:text-violet-400 transition-colors" />
            </div>
            <div className="flex flex-col items-start flex-1 overflow-hidden">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">GitHub</span>
              <span className="text-sm text-gray-300 truncate w-full group-hover:text-white transition-colors">Alwin444</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-violet-400 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0" />
          </a>

        </div>

      </main>

      {/* --- AI CHATBOT FEATURE --- */}
      
      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-50 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:bg-cyan-500/20 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 ${isChatOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100'}`}
      >
        ✨ <span className="font-semibold text-sm hidden sm:block">Ask My AI Assistant</span>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 sm:w-[380px] w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] z-50 flex flex-col bg-[#0a0f16]/95 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(6,182,212,0.15)] transition-all duration-500 origin-bottom-right ${isChatOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 pointer-events-none translate-y-8'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-100">Nexus AI</h3>
              <p className="text-xs text-cyan-400">Alwin's Virtual Agent</p>
            </div>
          </div>
          <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-3 rounded-2xl max-w-[75%] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-50 rounded-tr-none' : 'bg-white/5 border border-white/5 text-gray-200 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 flex-row">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-cyan-500/20 text-cyan-400">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-white/5 bg-black/20 rounded-b-2xl flex gap-2">
          <input 
            type="text" 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about Alwin's skills..." 
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
          <button 
            type="submit"
            disabled={!chatInput.trim() || isTyping}
            className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-reverse-spin-slow {
          animation: reverse-spin-slow 25s linear infinite;
        }
      `}} />
    </div>
  );
}