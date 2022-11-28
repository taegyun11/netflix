import React, { useEffect, useState } from "react";
import { Navbar, Container, Form, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { movieAction } from "../redux/actions/movieAction";

const Navigation = () => {
  const { searchMovie } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const getSearch = (event) => {
    event.preventDefault()
    setSearch(event.target.value);
  };
  const searchClick = () => {
    if (search != "") {
      dispatch(movieAction.getSearchMovie(search));
    } else {
      dispatch(movieAction.getMovies());
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            width={100}
            src="https://imgix.bustle.com/uploads/image/2017/8/29/c8c8077a-10fc-44d5-93f0-da4e592a299e-netflix-logo-print_pms.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-item">
              Home
            </Link>
            <Link to="/movies" className="nav-item">
              Movies
            </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={getSearch}
            />
            <Button variant="outline-danger" onClick={searchClick}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
