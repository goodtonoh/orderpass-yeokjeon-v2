import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table } from "react-bootstrap";

function VisitStats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://orderpass-v2.onrender.com/api/visit-stats")
      .then((res) => setData(res.data.reverse()))
      .catch((err) => console.error("방문자 통계 가져오기 실패", err));
  }, []);

  return (
    <Card>
      {/* <Card.Header as="h5" className="text-center bg-white fw-bold">
        📊 방문자 통계
      </Card.Header> */}
      <Card.Body>
        <Table bordered striped hover responsive className="text-center mb-0">
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
        </Table>
      </Card.Body>
    </Card>
  );
}

export default VisitStats;
