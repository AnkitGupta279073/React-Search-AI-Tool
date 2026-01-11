# Search AI Tool

A modern, responsive AI-powered search application built with React and Vite. Ask questions and get intelligent responses powered by Google's Gemini API.

## ✨ Features

- 🤖 **AI-Powered Responses** - Get intelligent answers using Google Gemini API
- 💬 **Real-time Chat Interface** - Clean, ChatGPT-like UI for seamless conversations
- 📝 **Multi-line Input** - Support for Shift+Enter to add new lines in questions
- 🕐 **Search History** - Recent searches saved in localStorage for quick access
- 📱 **Fully Responsive** - Mobile-first design with sidebar toggle on small screens
- ⚡ **Auto-scroll** - Automatically scrolls to latest messages
- 🎨 **Modern UI** - Beautiful gradient headers and smooth animations
- 🔄 **Loading States** - Visual feedback during API requests

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Google Gemini API** - AI/LLM integration
- **localStorage** - Client-side data persistence

## 📁 Project Structure

```
src/
├── component/
│   ├── Answer.jsx          # Markdown rendering for AI responses
│   ├── ChatArea.jsx        # Main chat container component
│   ├── ChatHeader.jsx      # Greeting header component
│   ├── ChatInput.jsx       # Input field and submit button
│   ├── MessageList.jsx     # Message display and empty states
│   └── RecentSearch.jsx    # Sidebar with search history
├── App.jsx                 # Main application logic
├── App.css                 # Application styles
└── main.jsx               # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Search-AI-Tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🎯 Usage

### Asking Questions

1. Type your question in the input field at the bottom
2. Press **Enter** to submit or click the **Ask** button
3. Use **Shift + Enter** to add new lines without submitting

### Recent History

- **Desktop**: Sidebar always visible on the left
- **Mobile**: Tap the hamburger menu (☰) to toggle sidebar
- Click any history item to re-run that search
- Click the trash icon to clear all history

### Keyboard Shortcuts

- `Enter` - Submit question
- `Shift + Enter` - New line in input

## 🏗️ Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

## 📱 Responsive Design

- **Mobile** (< 768px): Single column, collapsible sidebar
- **Tablet/Desktop** (≥ 768px): Two-column layout with persistent sidebar

## 🎨 Customization

### Styling

- Tailwind configuration: `tailwind.config.js`
- Custom CSS: `src/App.css`

### Components

All components are modular and can be easily customized:
- **ChatHeader** - Update greeting message
- **MessageList** - Customize message bubbles
- **ChatInput** - Modify input behavior
- **RecentSearch** - Change sidebar appearance

## 🔧 Development

Built with:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) - Fast Refresh with Babel
- ESLint - Code quality and consistency

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

Created with ❤️ using React + Vite
