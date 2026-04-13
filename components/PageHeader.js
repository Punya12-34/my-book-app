import { Container } from "react-bootstrap";

export default function PageHeader({ text, subtext }) {
  return (
    <div className="py-4 mb-4" style={{ borderBottom: "2px solid #dee2e6" }}>
      <Container>
        <h1 className="display-5 fw-bold mb-1">{text}</h1>
        {subtext && (
          <p className="text-muted fs-5 mb-0">{subtext}</p>
        )}
      </Container>
    </div>
  );
}