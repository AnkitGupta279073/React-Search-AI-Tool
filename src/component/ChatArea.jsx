import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

const ChatArea = ({ 
  messages, 
  loading, 
  error, 
  question, 
  textareaRef, 
  messagesContainerRef, 
  questionFromRecentHistroy,
  onQuestionChange, 
  onSubmit 
}) => {
  return (
    <div className='w-full md:col-span-4 p-3 md:p-6 flex flex-col h-screen pt-16 md:pt-6 relative'>
      <ChatHeader />
      
      <MessageList 
        messages={messages}
        loading={loading}
        error={error}
        messagesContainerRef={messagesContainerRef}
      />

      <ChatInput 
        question={question}
        loading={loading}
        textareaRef={textareaRef}
        questionFromRecentHistroy={questionFromRecentHistroy}
        onQuestionChange={onQuestionChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ChatArea;
