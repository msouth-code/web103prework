import ContentCreator from "../components/ContentCreator";
import Button from "react-bootstrap/Button";
import { Link } from "react-router";
import { Container, Row } from "react-bootstrap";

export default function ShowCreators({ allCreators }) {
  const instruments = allCreators;

  return (
    <div>
      <div className="image-container">
        <img
          src="https://cdn.hswstatic.com/gif/gettyimages-139494347.jpg"
          style={{ width: "100vw", height: "350px", objectFit: "fill" }}
        />
        <div
          className="centered"
          style={{
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -250%)",
            fontSize: 60,
            fontFamily: "Copperplate",
            textShadow: "0 0 5px #ffffff",
            animation: "glow 1.5s infinite alternate",
          }}
        >
          CREATORVERSE
        </div>
      </div>
      <Container className="py-4">
        <Row className="mb-4">
          <Link to="/add">
            <Button type="button">Add Creator</Button>
          </Link>
        </Row>
      </Container>
      {instruments.length == 0 ? (
        <Container className="py-4">
          <Row className="mb-4">
            <h3> No creators yet!</h3>
          </Row>
        </Container>
      ) : (
        <div>
          <Container className="py-4">
            <Row xs={1} md={2} lg={4} className="py-2">
              {instruments.map((instrument) => ContentCreator(instrument))}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
