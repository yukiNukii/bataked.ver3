import React, { useState } from 'react';
import { Play, CheckCircle, Share2, Upload, ArrowRight, MessageCircle, Coffee, Wifi, Brain, HelpCircle, Zap, X, Send, Globe, ThumbsUp, ThumbsDown, ArrowLeft, Mic, Edit3 } from 'lucide-react';
import { useTask } from '../contexts/TaskContext';
import { Link } from 'react-router-dom';

interface Mission {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  difficulty: string;
  points: number;
  category: 'mission' | 'chat';
  hints?: string[];
}

interface SuggestedResponse {
  text: string;
  translation?: string;
}

const TaskArena: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'normal' | 'hospitality'>('normal');
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showCompletionScreen, setShowCompletionScreen] = useState<boolean>(false);
  const [earnedPoints, setEarnedPoints] = useState<number>(0);
  const [completedConversations, setCompletedConversations] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [isJapanese, setIsJapanese] = useState<boolean>(true);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [suggestedResponses, setSuggestedResponses] = useState<SuggestedResponse[]>([
    { 
      text: "Good morning! I would like a latte, please.",
      translation: "おはようございます！ラテをお願いします。"
    },
    { 
      text: "I'd like a latte, please.",
      translation: "ラテをお願いします。"
    }
  ]);

  const normalMissions: Mission[] = [
    {
      id: 1,
      title: "お気に入りのコーヒーを注文する",
      description: "近所の新しいコーヒーショップにいます。お気に入りのコーヒーを注文してください。行き詰まったらヒントを使うこともできます。",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      icon: <Coffee className="w-6 h-6" />,
      difficulty: "初級",
      points: 30,
      category: 'mission',
      hints: [
        "挨拶から始めると良いでしょう",
        "丁寧な表現を使うことを忘れずに",
        "'please'を使うと丁寧になります"
      ]
    },
    {
      id: 2,
      title: "Wi-Fiの接続問題を解決する",
      description: "AIを活用して、Wi-Fi接続の問題を診断し、解決策を提案してください。",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      icon: <Wifi className="w-6 h-6" />,
      difficulty: "中級",
      points: 50,
      category: 'mission'
    },
    {
      id: 3,
      title: "AIを使った業務効率化",
      description: "AIを使って、日常の業務プロセスを自動化する方法を考えてください。",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      icon: <Brain className="w-6 h-6" />,
      difficulty: "上級",
      points: 70,
      category: 'mission'
    }
  ];

  const hospitalityMissions: Mission[] = [
    {
      id: 4,
      title: "ホテルでの接客対応",
      description: "海外からのお客様への適切な接客方法を学びます。",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      icon: <MessageCircle className="w-6 h-6" />,
      difficulty: "中級",
      points: 60,
      category: 'chat'
    }
  ];

  const openMissionDetail = (mission: Mission) => {
    setSelectedMission(mission);
    setShowCompletionScreen(false);
    setChatMessages([{ text: `[smiling] Good morning, what coffee would you like?`, sender: 'bot' }]);
    setShowHints(false);
  };

  const closeMissionDetail = () => {
    setSelectedMission(null);
    setChatMessages([]);
    setUserInput('');
    setShowHints(false);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setChatMessages([...chatMessages, { text: userInput, sender: 'user' }]);
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: "AIからの応答をここに表示します。", sender: 'bot' }]);
      }, 1000);
      setUserInput('');
    }
  };

  const completeMission = () => {
    if (selectedMission) {
      setEarnedPoints(selectedMission.points);
      setCompletedConversations(prev => prev + 1);
      setShowCompletionScreen(true);
    }
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  const useSuggestedResponse = (response: string) => {
    setUserInput(response);
  };

  const CompletionScreen = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white dark:bg-background-dark rounded-lg w-full max-w-md p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">
            会話をコンプリートしたよ！
          </h2>

          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-300">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">新しくクリアした会話</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-300 mt-2">
              {completedConversations}
            </div>
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/30 rounded-lg p-4 mb-8">
            <div className="flex items-center space-x-2 text-teal-600 dark:text-teal-300">
              <Zap className="w-5 h-5" />
              <span className="font-medium">獲得ポイント</span>
            </div>
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-300 mt-2">
              {earnedPoints}ポイント
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setShowCompletionScreen(false)}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              続ける
            </button>
            <button
              onClick={() => {
                setShowCompletionScreen(false);
                if (selectedMission) {
                  openMissionDetail(selectedMission);
                }
              }}
              className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 border border-gray-400 rounded-lg shadow transition duration-300"
            >
              この会話をやり直す
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedMission) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={closeMissionDetail}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ホームに戻る
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48">
            <img
              src={selectedMission.image}
              alt={selectedMission.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                {selectedMission.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{selectedMission.title}</h1>
                <p className="text-gray-600">バリスタ</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">目的:</h2>
              <p className="text-gray-700">{selectedMission.description}</p>
            </div>

            <div className="space-y-4">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-50'
                      : 'bg-gray-50'
                  }`}>
                    {message.text}
                    {message.sender === 'bot' && (
                      <div className="flex items-center mt-2 space-x-2">
                        <button className="text-gray-500 hover:text-gray-700">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 text-sm">
                          翻訳
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center bg-gray-50 rounded-lg p-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="英語（アメリカ）か日本語で入力してね"
                  className="flex-1 bg-transparent border-none focus:outline-none px-2"
                />
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={toggleHints}
                    className={`p-2 ${showHints ? 'text-primary' : 'text-gray-500'} hover:text-gray-700`}
                  >
                    <HelpCircle className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSendMessage}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {showHints && (
                <div className="mt-4 bg-yellow-50 rounded-lg p-4 animate-fade-in">
                  <h3 className="font-semibold mb-2">推奨する返答:</h3>
                  <div className="space-y-2">
                    {suggestedResponses.map((response, index) => (
                      <button
                        key={index}
                        onClick={() => useSuggestedResponse(response.text)}
                        className="w-full text-left p-2 hover:bg-yellow-100 rounded transition-colors duration-200"
                      >
                        <p className="font-medium">{response.text}</p>
                        {response.translation && (
                          <p className="text-sm text-gray-600">{response.translation}</p>
                        )}
                      </button>
                    ))}
                  </div>
                  {selectedMission.hints && (
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">ヒント:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedMission.hints.map((hint, index) => (
                          <li key={index} className="text-sm text-gray-700">{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setActiveTab('normal')}
          className={`flex-1 py-3 px-4 text-center rounded-l-lg transition duration-300 ease-in-out ${
            activeTab === 'normal'
              ? 'bg-primary text-white'
              : 'bg-background-light text-text hover:bg-gray-200'
          }`}
        >
          通常ミッション
        </button>
        <button
          onClick={() => setActiveTab('hospitality')}
          className={`flex-1 py-3 px-4 text-center rounded-r-lg transition duration-300 ease-in-out ${
            activeTab === 'hospitality'
              ? 'bg-primary text-white'
              : 'bg-background-light text-text hover:bg-gray-200'
          }`}
        >
          接待ミッション
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(activeTab === 'normal' ? normalMissions : hospitalityMissions).map((mission) => (
          <div 
            key={mission.id} 
            className="bg-white dark:bg-background-dark shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="relative">
              <img 
                src={mission.image} 
                alt={mission.title} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm">
                {mission.category === 'mission' ? 'ミッション' : 'チャット'}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold line-clamp-1">{mission.title}</h3>
                {mission.icon}
              </div>
              <p className="text-sm text-text dark:text-text-dark mb-4 line-clamp-2">
                {mission.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                  {mission.difficulty}
                </span>
                <button
                  onClick={() => openMissionDetail(mission)}
                  className="bg-secondary text-white px-4 py-2 rounded text-sm transition duration-300 ease-in-out hover:bg-secondary-dark"
                >
                  開始
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCompletionScreen && <CompletionScreen />}
    </div>
  );
};

export default TaskArena;