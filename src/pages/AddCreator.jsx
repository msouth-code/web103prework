import { supabase } from "../client.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Link } from "react-router";
import { Container, Row } from "react-bootstrap";

export default function AddCreator() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImageUrl] = useState("");
  // 3. INSIDE THE FUNCTION: The submission handler (replaces the event listener)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    const imageURL = image.trim() === '' ? "https://learn.g2.com/hubfs/G2CM_FI909_Learn_Article_Images_%5Bcontent_creator%5D_V1b.png" : image 
    
    console.log(imageURL);
    const { data, error } = await supabase
      .from("creators")
      .insert([{ name, url, description, imageURL }]);

    if (error) {
      console.error("Error:", error.message);
    }
    console.log(data);
    window.location.href = "/";
  };

  return (
    <div>
      <Container className="py-4">
        <Row className="mb-4">
          <Link to="/">
            <Button type="button" className="my-4">
              Back
            </Button>
          </Link>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formCreatorName">
              <Form.Label>Creator Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUrl">
              <Form.Label>Url</Form.Label>
              <Form.Control
                type="text"
                name="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Url"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={image}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image url"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}
