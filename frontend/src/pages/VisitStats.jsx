import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function VisitStats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://your-backend.onrender.com/api/visit-stats") // 백엔드 URL에 맞게 수정
      .then((res) => setData(res.data.reverse())) // 오래된 날짜가 위로
      .catch((err) => console.error("방문 통계 가져오기 실패", err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 방문자 통계</h2>

      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>날짜</th>
            <th>방문자 수</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.date}>
              <td>{row.date}</td>
              <td>{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default VisitStats;
