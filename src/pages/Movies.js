import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import PopularMovies from "../component/PopularMovies";
import { movieAction } from "../redux/actions/movieAction";

const Movies = () => {
  const { loading, popularMovies } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  if (loading) {
    return (
      <ClipLoader
        color="#ffff"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <Container>
      <div>sorting filtering</div>
      <Row>
          {popularMovies.results.map((item) => (
            <Col md={3}><PopularMovies item={item} /></Col>
          ))}

      </Row>
    </Container>
  );
};

export default Movies;
