import { useState, useRef, useEffect } from 'react'
import './App.css'
import RecentSearch from './component/RecentSearch'
import ChatArea from './component/ChatArea'

function App() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentHistroy,setRecentHistroy] = useState(JSON.parse(localStorage.getItem('histroy')) || []);
  const [showSidebar, setShowSidebar] = useState(false);
  const textareaRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [questionFromRecentHistroy,setQuestionFromRecentHistroy] = useState(false);
  
  const clearHistroy = () =>{
    localStorage.removeItem('histroy');
    setRecentHistroy([]);
  }

  const deleteHistoryItem = (itemToDelete) => {
    const updatedHistory = recentHistroy.filter(item => item !== itemToDelete);
    localStorage.setItem('histroy', JSON.stringify(updatedHistory));
    setRecentHistroy(updatedHistory);
  }

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [loading, messages]);

  const handleSelectedHistroy = (item) => {
    setQuestionFromRecentHistroy(true);
    setShowSidebar(false);
    handleQuestion(item);
  }

  const handleQuestion = async (historyItem = null) => {
    const currentQuestion = historyItem || question;
    if (!currentQuestion.trim()) return;
    
    if(!historyItem && question.trim()){
      // Trim extra spaces from the question
      const trimmedQuestion = question.trim().replace(/\s+/g, ' ');
      
      // Remove duplicates (case-sensitive) using Set
      const existingHistory = recentHistroy || [];
      const filteredHistory = existingHistory.filter(item => item !== trimmedQuestion);
      
      // Add new question at the start and keep only 20 items
      const updatedHistory = [trimmedQuestion, ...filteredHistory].slice(0, 20);
      
      localStorage.setItem('histroy', JSON.stringify(updatedHistory));
      setRecentHistroy(updatedHistory);
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
      <RecentSearch 
        recentHistroy={recentHistroy}
        showSidebar={showSidebar}
        onSelectHistory={handleSelectedHistroy}
        onClearHistory={clearHistroy}
        onDeleteItem={deleteHistoryItem}
      />
      <ChatArea 
        messages={messages}
        loading={loading}
        error={error}
        question={question}
        textareaRef={textareaRef}
        messagesContainerRef={messagesContainerRef}
        questionFromRecentHistroy={questionFromRecentHistroy}
        onQuestionChange={setQuestion}
        onSubmit={() => handleQuestion()}
      />
    </div>
  )
}

export default App
