import { useState } from 'react'
import './App.css'

function App() {
const [question, setQuestion] = useState('');
const [response, setResponse] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

const handleQuestion = async () => {
  if (!question.trim()) return;
  
  setLoading(true);
  setError('');
  setResponse('');
  
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
            parts: [{ text: question }]
          }
        ]
      })
    });
    
    const data = await res.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      setResponse(data.candidates[0].content.parts[0].text);
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
   <div className='grid grid-cols-5 h-screen text-center'> 
  <div className='col-span-1 bg-zinc-800'>
  </div>
  <div className='col-span-4 p-10'>
    <div className='container h-225 overflow-y-auto mb-4'>
      {loading && (
        <div className='text-white text-xl'>Loading...</div>
      )}
      {error && (
        <div className='text-red-500 text-lg'>{error}</div>
      )}
      {response && (
        <div className='bg-zinc-900 p-6 rounded-lg text-left text-white whitespace-pre-wrap'>
          {response}
        </div>
      )}
    </div>
    <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-16'>
    <input 
      type="text" 
      value={question} 
      onChange={(e)=>{setQuestion(e.target.value)}} 
      onKeyPress={(e) => e.key === 'Enter' && handleQuestion()}
      className='w-full h-full p-3 outline-none' 
      placeholder='Ask Me Anything...'
      disabled={loading}
    />
    <button onClick={handleQuestion} className='cursor-pointer hover:text-blue-400' disabled={loading}>
      {loading ? 'Loading...' : 'Ask'}
    </button>
    </div>
  </div>
   </div>
  )
}

export default App
