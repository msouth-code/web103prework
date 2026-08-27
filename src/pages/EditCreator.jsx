import { supabase } from "../client.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Container, Row } from "react-bootstrap";

export default function EditCreator() {
  const location = useLocation();
  const target_id = location.state?.target_id;
  console.log(location.state);

  // const [creator, setCreator] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   const [id, setId] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [imageURL, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchInfo() {
      try {
        setLoading(true);

        // Fetch rows from your specific table
        const { data, error } = await supabase
          .from("creators") // Your table name here
          .select("*") // Select columns ('*' fetches all)
          .eq("id", target_id) // Filters by a specific column value
          .single();

        if (error) throw error;
        setName(data.name);
        setUrl(data.url);
        setDesc(data.description);
        setImageUrl(data.imageURL);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchInfo();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevents page reload
    setLoading(true);

    const finalImage = imageURL.trim() === '' ? "https://learn.g2.com/hubfs/G2CM_FI909_Learn_Article_Images_%5Bcontent_creator%5D_V1b.png" : imageURL

    const { data, error } = await supabase
      .from("creators")
      .update({
        name: name,
        url: url,
        description: description,
        imageURL: finalImage,
      })
      .eq("id", target_id)
      .select();

    setLoading(false);

    if (error) {
      console.error("Error updating row:", error.message);
      alert("Update failed!");
    }
    console.log(data);
    window.location.href = "/";
  };

  const [errorMsg, setErrorMsg] = useState(null);

  const handleDelete = async () => {
    // 1. Delete the row from the Supabase database
    const { error } = await supabase.from("creators").delete().eq("id", target_id); // Matches the column 'id' with the variable id

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
            <Button type="button" className="my-4">
              Back
            </Button>
          </Link>

          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formCreatorName">
              <Form.Label>Creator Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={name}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUrl">
              <Form.Label>Url</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={url}
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
                placeholder={description}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={imageURL}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder={imageURL}
                defaultValue={imageURL}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="mx-2"
            >
              {loading ? "Updating..." : "Update Info"}
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Delete
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}
