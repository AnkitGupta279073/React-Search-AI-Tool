const ChatInput = ({ 
  question, 
  loading, 
  textareaRef, 
  questionFromRecentHistroy,
  onQuestionChange, 
  onSubmit 
}) => {
  return (
    <div className='bg-zinc-800 w-full max-w-3xl mx-auto p-2 md:p-3 pr-3 md:pr-5 text-white rounded-2xl border border-zinc-700 flex items-center gap-2 md:gap-3 shadow-lg'>
      <textarea
        ref={textareaRef}
        value={question}
        onChange={(e) => {
          onQuestionChange(e.target.value);
          e.target.style.height = 'auto';
          e.target.style.height = e.target.scrollHeight + 'px';
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !loading) {
            e.preventDefault();
            onSubmit();
          }
        }}
        className='flex-1 bg-transparent p-2 md:p-3 outline-none text-white placeholder-gray-500 resize-none max-h-40 overflow-y-auto text-sm md:text-base'
        placeholder='Ask me anything...'
        disabled={loading}
        rows="1"
      />
      <button
        onClick={onSubmit}
        disabled={loading || !question.trim()}
        className='bg-blue-400 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed px-4 md:px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer text-sm md:text-base'
      >
        {loading && !questionFromRecentHistroy ? 'Sending...' : 'Ask'}
      </button>
    </div>
  );
};

export default ChatInput;
