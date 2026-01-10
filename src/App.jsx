import { useState, useRef, useEffect } from 'react'
import './App.css'
import Answer from './component/Answer'

function App() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentHistroy,setRecentHistroy] = useState(JSON.parse(localStorage.getItem('histroy')) || []);
  const [showSidebar, setShowSidebar] = useState(false);
  const textareaRef = useRef(null);
  const messagesContainerRef = useRef(null);
  
  const clearHistroy = () =>{
    localStorage.removeItem('histroy');
    setRecentHistroy([]);
  }

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [loading, messages]);

  const handleSelectedHistroy = (item) => {
    setShowSidebar(false);
    handleQuestion(item);
  }

  const handleQuestion = async (historyItem = null) => {
    const currentQuestion = historyItem || question;
    if (!currentQuestion.trim()) return;
    
    if(!historyItem && question.trim()){
      localStorage.setItem('histroy', JSON.stringify([question,...(recentHistroy || [])]));
      setRecentHistroy(JSON.parse(localStorage.getItem('histroy')));
    }
    setQuestion('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setLoading(true);
    setError('');

    setMessages(prev => [...prev, { type: 'question', text: currentQuestion }]);

    try {
      const res = await fetch(import.meta.env.VITE_GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: currentQuestion }]
            }
          ]
        })
      });

      const data = await res.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const answerText =
          data.candidates[0].content.parts[0].text;

        setMessages(prev => [
          ...prev,
          { type: 'answer', text: answerText }
        ]);
      } else {
        setError('No response received from API');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='md:grid md:grid-cols-5 h-screen text-center relative'>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setShowSidebar(!showSidebar)}
        className='md:hidden fixed top-3 left-4 z-50 bg-zinc-800 rounded-lg text-white hover:bg-zinc-700'
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
        </svg>
      </button>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div 
          className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-30'
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 fixed md:relative md:col-span-1 bg-zinc-800 pt-3 h-screen w-64 md:w-auto transition-transform duration-300 ease-in-out z-40 left-0 top-0`}>
        <h1 className='text-white text-2xl flex text-center justify-center border-b border-zinc-700 px-2'>
          <span className='text-lg'>Recent Search</span>
          <button onClick={() => clearHistroy()} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        </h1>
        <ul className='text-left overflow-auto mt-2 h-[calc(100vh-80px)]'>
          {
             recentHistroy && recentHistroy.map((item, index) => (
              <li onClick={() => handleSelectedHistroy(item)}  key={index} className='px-5 py-2 mx-2 mb-2 truncate hover:bg-zinc-700 cursor-pointer text-zinc-400 hover:text-zinc-50 rounded-xl'>{item}</li>
            ))
          }
        </ul>
      </div>
      <div className='w-full md:col-span-4 p-3 md:p-6 flex flex-col h-screen pt-16 md:pt-6 relative'>
        <div ref={messagesContainerRef} className='flex-1 overflow-y-auto mb-4 md:mb-6 px-2 md:px-4 pb-4 no-scrollbar'>
          {loading && (
            <div className='flex items-center gap-3 p-4 bg-zinc-800/30 rounded-lg'>
              <div className='animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full'></div>
              <span className='text-gray-400 text-sm'>Generating response...</span>
            </div>
          )}

          {error && (
            <div className='p-4 bg-red-900/20 border border-red-700/50 rounded-lg'>
              <p className='text-red-400'>{error}</p>
            </div>
          )}

          <div className='max-w-4xl mx-auto space-y-6'>
            {messages.map((message, idx) => (
              <div key={idx}>
                {message.type === 'question' ? (
                  <div className='flex justify-end'>
                    <div className='bg-blue-600 text-white px-4 md:px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] md:max-w-2xl text-right'>
                      <p className='text-base leading-relaxed'>{message.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-start text-left'>
                    <div className='bg-zinc-800 text-white px-4 md:px-5 py-4 rounded-2xl rounded-tl-sm max-w-[85%] md:max-w-3xl'>
                      <Answer text={message.text} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!loading && !error && messages.length === 0 && (
            <div className='flex items-center justify-center h-full'>
              <div className='text-center text-gray-500'>
                <p className='text-lg mb-2'>🤖 Ask me anything!</p>
                <p className='text-sm'>Type your question below to get started</p>
              </div>
            </div>
          )}
        </div>

        <div className='bg-zinc-800 w-full max-w-3xl mx-auto p-2 md:p-3 pr-3 md:pr-5 text-white rounded-2xl border border-zinc-700 flex items-center gap-2 md:gap-3 shadow-lg'>
          <textarea
            ref={textareaRef}
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !loading) {
                e.preventDefault();
                handleQuestion();
              }
            }}
            className='flex-1 bg-transparent p-2 md:p-3 outline-none text-white placeholder-gray-500 resize-none max-h-40 overflow-y-auto text-sm md:text-base'
            placeholder='Ask me anything...'
            disabled={loading}
            rows="1"
          />
          <button
            onClick={() => handleQuestion()}
            disabled={loading || !question.trim()}
            className='bg-blue-400 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed px-4 md:px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer text-sm md:text-base'
          >
            {loading ? 'Sending...' : 'Ask'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
