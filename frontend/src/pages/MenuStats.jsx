import { useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import menuStatsDummy from '../newMenuData.json';

function MenuStats() {
  const [selectedCategory, setSelectedCategory] = useState("인기메뉴");

  const categories = ["인기메뉴", ...Array.from(new Set(menuStatsDummy.map(m => m.category)))];

  let chartData = [];

  if (selectedCategory === "인기메뉴") {
    
    const filtered = menuStatsDummy.filter(item => item.category !== "대표메뉴");

    const aggregated = Object.values(
      filtered.reduce((acc, item) => {
        if (!acc[item.name]) {
          acc[item.name] = { ...item, totalClicksSum: item.totalClicks, count: 1 };
        } else {
          acc[item.name].totalClicksSum += item.totalClicks;
          acc[item.name].count += 1;
        }
        return acc;
      }, {})
    ).map(item => ({
      name: item.name,
      totalClicks: Math.round(item.totalClicksSum / item.count),
    }));

    // TOP 10
    chartData = aggregated
      .sort((a, b) => b.totalClicks - a.totalClicks)
      .slice(0, 10);
  } else {
    
    chartData = menuStatsDummy.filter(item => item.category === selectedCategory);
  }

  return (
    <>
      <Row className="mb-4">
        <Col xs={12} md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Card className="bg-white text-dark">
        <Card.Header as="h5">메뉴별 클릭 통계</Card.Header>
        <Card.Body style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 50, right: 30, left: 0, bottom: 30 }}
            >
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={100}
                stroke="#888"
                fontSize={12}
              />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  backgroundColor: 'rgb(255, 255, 255)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 0 6px rgba(0,0,0,0.1)',
                  fontSize: '14px',
                  color: '#333',
                }}
              />
              <Bar dataKey="totalClicks" fill="#0d6efd" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </>
  );
}

export default MenuStats;
