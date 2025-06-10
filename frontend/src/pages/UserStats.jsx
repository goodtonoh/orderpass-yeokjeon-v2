import { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const chartData = {
  today: [
    { name: "00-04", total: 45 },
    { name: "04-08", total: 15 },
    { name: "08-12", total: 89 },
    { name: "12-16", total: 156 },
    { name: "16-20", total: 203 },
    { name: "20-24", total: 134 },
  ],
  week: [
    { name: "월요일", total: 1200 },
    { name: "화요일", total: 1500 },
    { name: "수요일", total: 1800 },
    { name: "목요일", total: 2200 },
    { name: "금요일", total: 2500 },
    { name: "토요일", total: 1800 },
    { name: "일요일", total: 1600 },
  ],
  month: [
    { name: "Week 1", total: 320 },
    { name: "Week 2", total: 450 },
    { name: "Week 3", total: 380 },
    { name: "Week 4", total: 520 },
  ],
  total: [
    { name: "1월", total: 1200 },
    { name: "2월", total: 1500 },
    { name: "3월", total: 1800 },
    { name: "4월", total: 2200 },
    { name: "5월", total: 2500 },
    { name: "6월", total: 2800 },
    { name: "7월", total: 3100 },
    { name: "8월", total: 3400 },
    { name: "9월", total: 3200 },
    { name: "10월", total: 3600 },
    { name: "11월", total: 3900 },
    { name: "12월", total: 4200 },
  ],
};

const chartTitles = {
  today: "오늘 방문자수 (Hourly)",
  week: "이번 주 (Daily)",
  month: "이번 달 (Weekly)",
  total: "Total 방문자수 (Monthly)",
};

function UserStats() {
  const [selectedMetric, setSelectedMetric] = useState('total');

  const metrics = [
    { key: 'today', label: '오늘 방문자수', value: '634' },
    { key: 'week', label: '이번 주', value: '1,237' },
    { key: 'month', label: '이번 달', value: '4,345' },
    { key: 'total', label: 'Total 방문자수', value: '15,678' },
  ];

  return (
    <>
      <Row className="mb-4">
        {metrics.map((metric) => (
          <Col key={metric.key} md={6} lg={3} className="mb-3">
            <Card
              onClick={() => setSelectedMetric(metric.key)}
              bg={selectedMetric === metric.key ? 'primary' : 'light'}
              text={selectedMetric === metric.key ? 'white' : 'dark'}
              className={`h-100 cursor-pointer ${selectedMetric === metric.key ? 'border-2 border-primary' : 'border'}`}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <Card.Title className="small mb-2">{metric.label}</Card.Title>
                <h4 className="fw-bold mb-0">{metric.value}</h4>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="bg-white text-dark">
        <Card.Header as="h5" className="bg-white text-dark">
            {chartTitles[selectedMetric]}
        </Card.Header>
        <Card.Body style={{ height: 400, backgroundColor: '#fff' }}>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData[selectedMetric]}>
                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Bar dataKey="total" fill="#0d6efd" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </Card.Body>
        </Card>
    </>
  );
}

export default UserStats;
