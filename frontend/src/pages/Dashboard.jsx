import { useEffect, useState } from 'react';
import { Tab, Tabs, Button } from 'react-bootstrap';
import UserStats from './UserStats';
import VisitStats from './VisitStats';
import MenuStats from './MenuStats';


export default function Dashboard() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('user-stats');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const isDark = theme === 'dark';

  return (
    <div className="min-vh-100 bg-white text-dark">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="h3 fw-bold mb-0">🍻<span class="text-danger"> 역전할머니맥주</span> 분석 페이지</h1>
        </div>
        
        <Tabs
          id="dashboard-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
          variant="pills"
        >
          <Tab eventKey="user-stats" title="사용자 통계">
            <UserStats />
          </Tab>
          <Tab eventKey="visit-stats" title="방문자 통계">
            <VisitStats />
          </Tab>
          <Tab eventKey="menu-stats" title="메뉴별 통계">
            <MenuStats />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
