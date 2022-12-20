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
import Accordion from "react-bootstrap/Accordion";

const Movies = () => {
  const { loading, searchMovie } = useSelector((state) => state.movie);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(true);
  useEffect(() => {
    dispatch(movieAction.getSearchMovie({ page, filter }));
  }, [page]);

  const handlePageClick = (data, filter) => {
    setPage(data.selected + 1);
    dispatch(movieAction.getSearchMovie({ filter, page }));
  };
  const onDescSortClick = () => {
    setFilter(true);
    dispatch(movieAction.getSearchMovie({ filter, page }));
  };
  const onAscSortClick = () => {
    setFilter(false);
    dispatch(movieAction.getSearchMovie({ filter, page }));
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
  // <DropdownButton id="dropdown-basic-button" title="Sort By" variant="dark">
  //   <Dropdown.Item href="#" onClick={onDescSortClick}>
  //     Popularity(descending)
  //   </Dropdown.Item>
  //   <Dropdown.Item href="#" onClick={onAscSortClick}>
  //     Popularity(ascending)
  //   </Dropdown.Item>
  // </DropdownButton>;

  return (
    <Container>
      <Row>
        <div className="flex">
          <div className="main-accordion">
            <Accordion
              defaultActiveKey={["0"]}
              alwaysOpen
              className="accordion-style"
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Sort</Accordion.Header>
                <Accordion.Body>
                  <div className="sort-box">
                    <h6>Sort</h6>
                    <Accordion>
                      <Accordion.Item>
                        <Accordion.Header>Sort Desc</Accordion.Header>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>

        {Object.keys(searchMovie).length
          ? searchMovie.results?.map((item) => (
              <Col md={3}>
                <PopularMovies item={item} />
              </Col>
            ))
          : null}
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
            forcePage={page - 1}
          />
        </div>
      </div>
    </Container>
  );
};

export default Movies;
