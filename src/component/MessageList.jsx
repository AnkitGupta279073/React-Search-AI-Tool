import Answer from './Answer'

const MessageList = ({ messages, loading, error, messagesContainerRef }) => {
  return (
    <div ref={messagesContainerRef} className='flex-1 overflow-y-auto mb-4 md:mb-6 px-2 md:px-4 pb-4 no-scrollbar'>
      {error && (
        <div className='p-4 bg-red-900/20 border border-red-700/50 rounded-lg mb-4'>
          <p className='text-red-400'>{error}</p>
        </div>
      )}

      <div className='max-w-4xl mx-auto space-y-6'>
        {messages.map((message, idx) => (
          <div key={idx}>
            {message.type === 'question' ? (
              <div className='flex justify-end'>
                <div className='bg-zinc-700 text-white px-4 md:px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] md:max-w-2xl text-right'>
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
        
        {loading && (
          <div className='flex items-center gap-3 p-4 bg-zinc-800/30 rounded-lg mt-6'>
            <div className='animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full'></div>
            <span className='text-gray-400 text-sm'>Generating response...</span>
          </div>
        )}
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
  );
};

export default MessageList;
