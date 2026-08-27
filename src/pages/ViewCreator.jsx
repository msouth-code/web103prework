import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router";
import { supabase } from "../client.js";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";

export default function ViewCreator() {
  const location = useLocation();
  const creator_info = location.state?.creator_info;

  const [errorMsg, setErrorMsg] = useState(null);

  const handleDelete = async () => {
    // 1. Delete the row from the Supabase database
    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", creator_info.id); // Matches the column 'id' with the variable id

    if (error) {
      setErrorMsg(error.message);
      console.error("Error deleting row:", errorMsg);
      return;
    }
    window.location.href = "/";
  };

  return (
    <div>
      <Container className="py-4">
        <Row className="mb-4">
          <Link to="/">
            <Button type="button" className="my-1">
              Back
            </Button>
          </Link>
        </Row>

        <Card style={{ width: "auto" }}>
          <Card.Img
            variant="top"
            src={creator_info.imageURL}
            style={{ height: "300px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{creator_info.name}</Card.Title>
            <Card.Text>
              <a href={creator_info.url} target="_blank">
                {creator_info.url}
              </a>
            </Card.Text>
            <Card.Text>{creator_info.description}</Card.Text>
            <Link to="/edit" state={{ target_id: creator_info.id }}>
              <Button variant="primary" style={{ marginRight: "5px" }}>
                Edit
              </Button>
            </Link>
            <Button variant="primary" onClick={handleDelete}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
