import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, MessageCircle, BarChart, ArrowRight } from 'lucide-react';
import { useTask } from '../contexts/TaskContext';

const Home: React.FC = () => {
  const { tasks, currentTask } = useTask();
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="max-w-md mx-auto px-4">
      <section className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">BeTasked</h1>
        <p className="text-xl mb-6">AI駆動のタスクとプロンプトで生産性を向上</p>
      </section>
      
      <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">現在の進捗</h2>
        <div className="flex justify-between items-center mb-2">
          <span>レベル {Math.floor(completedTasks / 5) + 1}</span>
          <span>{completedTasks}/{totalTasks}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(completedTasks / totalTasks) * 100}%` }}></div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">タスクの種類</h2>
        <div className="space-y-4">
          <TaskTypeCard
            icon={<Zap className="w-6 h-6 text-yellow-500" />}
            title="AIタスク"
            description="AIを活用したタスクに挑戦"
            points={0}
          />
          <TaskTypeCard
            icon={<MessageCircle className="w-6 h-6 text-green-500" />}
            title="MemBotサポート"
            description="AIアシスタントとの対話"
            points={0}
          />
          <TaskTypeCard
            icon={<BarChart className="w-6 h-6 text-blue-500" />}
            title="スキル向上"
            description="実践的なスキルを磨く"
            points={0}
          />
        </div>
      </section>

      <section className="text-center mb-8">
        <Link to="/task-arena" className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold inline-flex items-center hover:bg-blue-700 transition duration-300">
          {currentTask ? '現在のタスクを続ける' : '新しいタスクを始める'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </section>
    </div>
  );
};

const TaskTypeCard: React.FC<{ icon: React.ReactNode; title: string; description: string; points: number }> = ({ icon, title, description, points }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {icon}
        <div className="ml-3">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <span className="font-semibold">{points}ポイント</span>
    </div>
  );
};

export default Home;