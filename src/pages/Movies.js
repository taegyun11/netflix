import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import PopularMovies from "../component/PopularMovies";
import { movieAction } from "../redux/actions/movieAction";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Movies = () => {
  const { loading, searchMovie } = useSelector((state) => state.movie);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(movieAction.getSearchMovie({ page }));
  }, []);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
    dispatch(movieAction.getSearchMovie({ page }));
  };
  const onSortClick = (col) => {};


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
        <div className="flex">
          <div>
            <DropdownButton
              id="dropdown-basic-button"
              title="Sort By"
              variant="dark"
            >
              <Dropdown.Item href="#" onClick={() => onSortClick("popularity")}>
                Popularity(descending)
              </Dropdown.Item>
              <Dropdown.Item href="#">Popularity(ascending)</Dropdown.Item>
            </DropdownButton>
          </div>
          filtering
        </div>
        {/* Object.keys(movieDetail).length? */}
        {Object.keys(searchMovie).length? 
        searchMovie.results?.map((item) => (
          <Col md={4}>
            <PopularMovies item={item} />
          </Col>
        )):null}
      </Row>

      <div>
        <div>
          <ReactPaginate
            marginPagesDisplayed={4}
            pageRangeDisplayed={5}
            pageCount={10}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousLabel={""}
            nextLabel={""}
            activeClassName={"active"}
            forcePage={page-1}
          />
        </div>
      </div>
    </Container>
  );
};

export default Movies;
