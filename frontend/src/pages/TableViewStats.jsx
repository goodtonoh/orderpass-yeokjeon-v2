import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "react-bootstrap";

function TableViewStats() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("menu_clicks")
        .select("table_name, id");

      if (error) {
        console.error("Error fetching table stats:", error);
        return;
      }

      const labelMap = {
        t1: "테이블 1번",
        t2: "테이블 2번",
        t3: "테이블 3번",
        t4: "테이블 4번",
        t5: "테이블 5번",
      };

      const countByTable = data.reduce((acc, item) => {
        const label = labelMap[item.table_name] || item.table_name;
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.keys(countByTable).map((label) => ({
        name: label,
        total_clicks: countByTable[label],
      }));

      setTableData(chartData);
    };

    fetchData();
  }, []);

  return (
    <Card className="bg-white text-dark mt-5">
      <Card.Header as="h5">테이블별 분석 통계</Card.Header>
      <Card.Body style={{ height: 400 }}>
        {tableData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={tableData}
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
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 0 6px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [`${value}`, "클릭 수"]}
              />
              <Bar
                dataKey="total_clicks"
                fill="#75f8f2"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>데이터 로딩 중...</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default TableViewStats;

