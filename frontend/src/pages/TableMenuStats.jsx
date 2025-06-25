import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TableMenuStats = () => {
  const tableOptions = [
    { value: "t1", label: "테이블 1번" },
    { value: "t2", label: "테이블 2번" },
    { value: "t3", label: "테이블 3번" },
    { value: "t4", label: "테이블 4번" },
    { value: "t5", label: "테이블 5번" },
  ];
  const [tableName, setTableName] = useState(tableOptions[0].value);
  const [menuData, setMenuData] = useState([]);
  const [startDate, setStartDate] = useState(() =>
    new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(() => new Date().toISOString().slice(0, 10));

  const fetchData = async () => {
    const fromDateISO = new Date(startDate).toISOString();
    const toDateISO = new Date(endDate).toISOString();

    const { data, error } = await supabase.rpc("get_table_menu_clicks", {
      table_param: tableName,
      from_date: fromDateISO,
      to_date: toDateISO,
    });

    if (error) {
      console.error("Error fetching menu stats:", error);
      return;
    }

    setMenuData(
      data.map((item) => ({
        menu_name: item.menu_name,
        click_count: parseInt(item.click_count, 10),
      }))
    );
  };

  useEffect(() => {
    fetchData();
  }, [tableName, startDate, endDate]);

  const handlePreset = (days) => {
    const today = new Date();
    const fromDate = new Date();
    fromDate.setDate(today.getDate() - days);

    setStartDate(fromDate.toISOString().slice(0, 10));
    setEndDate(today.toISOString().slice(0, 10));
  };

  return (
    <>
      <Row className="mb-4 align-items-end">
        {/* 테이블 선택 */}
        <Col xs={12} md={2}>
          {/* <Form.Label>테이블:</Form.Label> */}
          <Form.Select
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          >
            {tableOptions.map((table) => (
              <option key={table.value} value={table.value}>
                {table.label}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* 날짜 선택 */}
        <Col xs={12} md="auto" className="d-flex align-items-center gap-2 mt-2 mt-md-0">
          <Form.Label className="mb-0">날짜:</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Form.Label className="mb-0"> ~ </Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Col>

        {/* preset + 조회 버튼 */}
        <Col xs={12} md="auto" className="d-flex align-items-center gap-2 mt-2 mt-md-0">
          <Button variant="outline-primary" size="md" onClick={() => handlePreset(7)}>
            최근 7일
          </Button>
          <Button variant="outline-primary" size="md" onClick={() => handlePreset(30)}>
            최근 30일
          </Button>
          {/* <Button variant="primary" size="sm" onClick={fetchData}>
            조회
          </Button> */}
        </Col>
      </Row>

      <Card className="bg-white text-dark">
        <Card.Header as="h5">테이블별 메뉴 분석 통계</Card.Header>
        <Card.Body style={{ height: 400 }}>
          {menuData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={menuData}
                margin={{ top: 20, right: 30, left: 0, bottom: 50 }}
              >
                <XAxis
                  dataKey="menu_name"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={100}
                  stroke="#888"
                  fontSize={12}
                />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`${value}`, "클릭 수"]}
                />
                <Bar dataKey="click_count" fill="#75f8f2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center mt-4">해당 기간에 데이터가 없습니다.</p>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default TableMenuStats;

