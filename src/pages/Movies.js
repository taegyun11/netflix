import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import PopularMovies from "../component/PopularMovies";
import { movieAction } from "../redux/actions/movieAction";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import MultiRangeSlider from "multi-range-slider-react";

const Movies = () => {
  const { loading, searchMovie } = useSelector((state) => state.movie);

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(true);
  const [minValue, set_minValue] = useState(1960);
  const [maxValue, set_maxValue] = useState(2023);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  useEffect(() => {
    dispatch(movieAction.getSearchMovie({ page, filter, minValue, maxValue}));
  }, [page,minValue,maxValue]);

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
                <Accordion.Header>Sort By</Accordion.Header>
                <Accordion.Body>
                  <div className="sort-box">
                    <Accordion defaultActiveKey={["1"]}>
                      <Accordion.Item>
                        <Accordion.Header>Popularity Desc</Accordion.Header>
                        <Accordion.Body>
                          <a className="sort_button" onClick={onDescSortClick}>
                            Popularity Desc
                          </a>
                        </Accordion.Body>
                        <Accordion.Body>
                          <a className="sort_button" onClick={onAscSortClick}>
                            Popularity Asc
                          </a>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="main-accordion">
            <Accordion
              defaultActiveKey={["0"]}
              alwaysOpen
              className="accordion-style"
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>Filter</Accordion.Header>
                <Accordion.Body>
                  <MultiRangeSlider
                    min={1960}
                    max={2023}
                    step={5}
                    minValue={minValue}
                    maxValue={maxValue}
                    ruler={false}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
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
