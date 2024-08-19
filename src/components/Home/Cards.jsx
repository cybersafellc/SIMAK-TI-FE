import { Button, Card } from "react-bootstrap";

export default function Cards({ url, title, icon, text }) {
  const handleUrl = () => {
    window.location.href = url;
  };
  return (
    <>
      <Card
        className="w-100 shadow p-3 border-1 card-home rounded-5 h-100"
        onClick={handleUrl}
      >
        <Card.Body>
          <Card.Title className="fs-4 d-flex align-items-center justify-content-start gap-2">
            {icon} {title}
          </Card.Title>
          <Card.Text>{text}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
