import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import PopularMovies from "../component/PopularMovies";
import { movieAction } from "../redux/actions/movieAction";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const Movies = () => {
  const { loading, searchMovie } = useSelector(
    (state) => state.movie
  );

  let [page, setPage] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(movieAction.getSearchMovie());
  }, []);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
    dispatch(movieAction.getSearchMovie(page));
  };

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
      <Row>
        {searchMovie && <div>sorting filtering</div>}
        {searchMovie.results?.map((item) => (
              <Col md={4}>
                <PopularMovies item={item} />
              </Col>
            ))}
      </Row>

      <div>
        <div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={""}
            pageCount={1000}
            marginPagesDisplayed={2}
            pageRangeDisplayed={0}
            previousLinkClassName={"page"}
            breakClassName={"page"}
            nextLinkClassName={"page"}
            pageClassName={"page"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
            onPageChange={handlePageClick}
          />
        </div>
      </div>
    </Container>
  );
};

export default Movies;
