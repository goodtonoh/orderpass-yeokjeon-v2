import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { BiSad } from "react-icons/bi";
import { BsHouseHeartFill } from "react-icons/bs";

export default function NotFound() {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center text-center py-5"
      style={{ minHeight: "100vh" }}
    >
      <BiSad size={80} className="text-primary mb-3" />
      <p className="text-primary fw-semibold fs-4">404</p>
      <h1 className="display-4 fw-bold mb-4">Page Not Found</h1>
      <p className="text-muted mb-4 fs-5">
        요청하신 페이지를 찾을 수 없습니다.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          <BsHouseHeartFill className="me-2 mb-1" />
          Go back home
        </Button>
      </Link>
    </Container>
  );
}
