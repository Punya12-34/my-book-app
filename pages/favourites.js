
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Container } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (favouritesList.length === 0) {
    return (
      <>
        <PageHeader
          text="Nothing Here"
          subtext="Add a book to your favourites to see it here"
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        text="Favourites"
        subtext="Your Favourite Books"
      />

      <Container>
        <Row className="gy-4">
          {favouritesList.map((workId) => (
            <Col key={workId} lg={3} md={6}>
              <BookCard workId={workId} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}