import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Toast, ToastContainer } from "react-bootstrap";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // For temporary
  const VALID_USERNAMES = ["admin", "test"];
  const VALID_PASSWORD = "1511";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해주세요!");
      return;
    }

    if (VALID_USERNAMES.includes(username) && password === VALID_PASSWORD) {
      localStorage.setItem("userId", username);
      localStorage.setItem("isLoggedIn", "true");

      setShowToast(true);

      setTimeout(() => {
        navigate("/dashboard");
        window.location.href = "/dashboard";
      }, 1500);
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow">
        <Card.Body>
          <div className="text-center mb-4">
            <img
              src="img/2025airpassCI_logo.png"
              alt="logo"
              className="img-fluid"
              style={{ maxHeight: "80px" }}
            />
          </div>

          <h4 className="text-center mb-4 fw-bold text-primary">로그인</h4>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="text"
                placeholder="아이디 입력"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              로그인
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer position="top-center" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={1500}
          autohide
          bg="light"
        >
          <Toast.Header>
            <strong className="me-auto text-primary">Login</strong>
            <small>Now</small>
          </Toast.Header>
          <Toast.Body className="text-dark">로그인 성공!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default LoginPage;
