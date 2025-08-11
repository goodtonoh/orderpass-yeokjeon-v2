import { useEffect, useState } from 'react';
import { Tab, Tabs, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import UserStats from './UserStats';
import VisitStats from './VisitStats';
import MenuStats from './MenuStats';
import TableMenuStats from './TableMenuStats';

export default function Dashboard() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('user-stats');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    setShowToast(true);
    
    setTimeout(() => {
      navigate('/admin');
    }, 2000);
  };

  return (
    <div className="min-vh-100 bg-white text-dark">
      <div className="container py-4">
        {/* ✅ Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="h3 fw-bold mb-0">
            👤 <span className="text-primary">ADMIN</span> 사용자 분석 페이지
          </h1>
          <div>
            {/* <Button variant="outline-secondary" className="me-2" onClick={toggleTheme}>
              Theme
            </Button> */}
            <Button variant="danger" onClick={handleLogout}>
              <LogOut size={16} className="me-1" />
              Log Out
            </Button>
          </div>
        </div>

        {/* ✅ Toast Notification */}
        <ToastContainer position="top-end" className="p-3">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={2000}
            autohide
            bg="light"
          >
            <Toast.Header>
              <strong className="me-auto text-primary">알림</strong>
              {/* <small>Now</small> */}
            </Toast.Header>
            <Toast.Body className="text-dark">로그아웃 되었습니다.</Toast.Body>
          </Toast>
        </ToastContainer>

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
          <Tab eventKey="menu-stats2" title="메뉴별 통계 RT">
            <MenuStatsNew />
          </Tab>
          <Tab eventKey="table-stats" title="테이블별 통계">
            <TableMenuStats />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

