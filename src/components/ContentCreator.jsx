import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router";

function ContentCreator(props) {
  const creator_info = props;
  return (
    <div>
      <Card style={{ width: "20rem" }} className="my-1">
        <Card.Img variant="top" src={props.imageURL} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            <a href={props.url} target="_blank">
              {props.url}
            </a>
          </Card.Text>
          <Card.Text
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {props.description}
          </Card.Text>
          <Link to="/view" state={{ creator_info: creator_info }}>
            <Button type="button" style={{ marginRight: "5px" }}>
              View More
            </Button>
          </Link>
          <Link to="/edit" state={{ target_id: props.id }}>
            <Button variant="primary">Edit</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ContentCreator;
