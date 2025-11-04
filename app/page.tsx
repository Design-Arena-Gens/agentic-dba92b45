'use client';

import { useState, useEffect } from 'react';

const topics = [
  "Day 1 – What is Python, print, input/output",
  "Day 2 – Variables, data types, operators",
  "Day 3 – If-else, loops",
  "Day 4 – Functions",
  "Day 5 – Mini project – calculator",
  "Day 6 – Lists and tuples",
  "Day 7 – Dictionaries and sets",
  "Day 8 – Strings and loops",
  "Day 9 – Error handling",
  "Day 10 – Mini project – quiz or word counter",
  "Day 11 – NumPy basics",
  "Day 12 – Pandas (dataframes)",
  "Day 13 – Data filtering",
  "Day 14 – Matplotlib visualization",
  "Day 15 – CSV analysis mini-project",
  "Day 16 – What is Machine Learning",
  "Day 17 – Install Scikit-learn",
  "Day 18 – Linear regression example",
  "Day 19 – Decision Tree example",
  "Day 20 – Mini project – predict house prices"
];

const motivationQuotes = [
  "Keep coding — your AI skills are growing! 💻",
  "Small steps today, big AI tomorrow! 🚀",
  "You're building something amazing! 🌟",
  "Every line of code brings you closer to mastery! 💪",
  "Learning Python + AI = Unlocking the future! 🔓",
  "Progress over perfection. Keep going! ⭐",
  "Your future self will thank you for this! 🎯",
  "Consistency is the key to success! 🔑"
];

export default function Home() {
  const [completed, setCompleted] = useState<boolean[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [timeUntilReminder, setTimeUntilReminder] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('completedTopics');
    const savedDate = localStorage.getItem('startDate');

    if (saved) {
      setCompleted(JSON.parse(saved));
    } else {
      setCompleted(new Array(20).fill(false));
    }

    if (savedDate) {
      setStartDate(savedDate);
    } else {
      const today = new Date().toISOString().split('T')[0];
      setStartDate(today);
      localStorage.setItem('startDate', today);
    }

    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % motivationQuotes.length);
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    if (completed.length > 0) {
      localStorage.setItem('completedTopics', JSON.stringify(completed));
    }
  }, [completed]);

  useEffect(() => {
    const updateTimer = () => {
      if (!startDate) return;

      const now = new Date();
      const start = new Date(startDate);
      const daysSinceStart = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const nextReminderDay = new Date(start);
      nextReminderDay.setDate(start.getDate() + daysSinceStart + 1);
      nextReminderDay.setHours(9, 0, 0, 0);

      const diff = nextReminderDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeUntilReminder(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [startDate]);

  const toggleComplete = (index: number) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      setCompleted(new Array(20).fill(false));
      const today = new Date().toISOString().split('T')[0];
      setStartDate(today);
      localStorage.setItem('startDate', today);
    }
  };

  const completedCount = completed.filter(Boolean).length;
  const progressPercentage = (completedCount / 20) * 100;
  const currentDay = completed.findIndex(c => !c) + 1 || 20;

  const daysSinceStart = startDate
    ? Math.floor((new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="container">
      <div className="header">
        <h1>🐍 20-Day Python + AI Learning Journey</h1>
        <p>Master Python fundamentals and dive into AI/ML</p>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">{completedCount}/20</div>
          <div className="stat-label">Completed</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{currentDay}</div>
          <div className="stat-label">Current Day</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{daysSinceStart}</div>
          <div className="stat-label">Days Since Start</div>
        </div>
      </div>

      <div className="content">
        <div className="motivation">
          {motivationQuotes[currentQuote]}
        </div>

        <div className="topics-grid">
          {topics.map((topic, index) => {
            const dayNum = index + 1;
            const isCompleted = completed[index];
            const isCurrent = !isCompleted && (index === 0 || completed[index - 1]);

            return (
              <div
                key={index}
                className={`topic-card ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                onClick={() => toggleComplete(index)}
              >
                <div className="checkbox">
                  {isCompleted && '✓'}
                </div>
                <div className="topic-info">
                  <div className="day-number">DAY {dayNum}</div>
                  <div className="topic-title">{topic.split(' – ')[1]}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reminder-section">
          <h3>⏰ Next Daily Reminder</h3>
          <div className="next-reminder">{timeUntilReminder}</div>
          <p style={{ marginTop: '10px', color: '#666' }}>
            Daily reminders help you stay consistent!
          </p>
        </div>

        <div className="controls">
          <button className="btn btn-primary" onClick={() => {
            const nextIncomplete = completed.findIndex(c => !c);
            if (nextIncomplete !== -1) {
              toggleComplete(nextIncomplete);
            }
          }}>
            ✓ Complete Current Day
          </button>
          <button className="btn btn-secondary" onClick={resetProgress}>
            ↺ Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}
