import { useEffect, useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { supabase } from '../lib/supabaseClient';

function MenuStatsNew() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('menu')
        .select('*');

      if (error) console.error("Error fetching data:", error);
      else setMenuData(data);
    };

    fetchData();
  }, []);
  
  const categories = ["전체", ...Array.from(new Set(menuData.map(m => m.category)))];
  
  const filtered =
    selectedCategory === "전체"
      ? menuData
      : menuData.filter(item => item.category === selectedCategory);

  const deduped = Object.values(
    filtered.reduce((acc, item) => {
      if (!acc[item.name]) {
        
        acc[item.name] = { 
          ...item, 
          total_clicks_sum: parseInt(item.total_clicks || 0), 
          count: 1 
        };
      } else {
        acc[item.name].total_clicks_sum += parseInt(item.total_clicks || 0);
        acc[item.name].count += 1;
      }
      return acc;
    }, {})
  ).map(item => ({
    name: item.name,
    total_clicks: Math.round(item.total_clicks_sum / item.count),
  }))
  .sort((a, b) => b.total_clicks - a.total_clicks)
  .slice(0, 10); // Top menu 10

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
        <Card.Header as="h5">메뉴별 클릭 통계 RT</Card.Header>
        <Card.Body style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={deduped}
              margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
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
                  backgroundColor: "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 0 6px rgba(0,0,0,0.1)"
                }}
                formatter={(value) => [`${value}`, "클릭 수"]}
              />
              <Bar dataKey="total_clicks" fill="#0d6efd" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </>
  );
}

export default MenuStatsNew;
