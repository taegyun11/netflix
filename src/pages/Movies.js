import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import PopularMovies from "../component/PopularMovies";
import { movieAction } from "../redux/actions/movieAction";
import ReactPaginate from "react-paginate";
import Pagination from "react-bootstrap/Pagination";
import { useState } from "react";
import axios from 'axios';

const Movies = () => {
  const { loading, popularMovies, searchMovie, moviesPerPage } = useSelector(
    (state) => state.movie
  );
  const [movies, setMovies] = useState([])
  const API_URL = "https://api.themoviedb.org/3"
  const fetchMovies = async()=>{
    const {data:results} = await axios.get(`${API_URL}/discover/movie`,{
      params:{
        api_key:process.env.REACT_APP_API_KEY,
        
      }
    })
    setMovies(results)
  }
  ///search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false

  let [page, setPage] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    fetchMovies()
    dispatch(movieAction.getMovies());
  }, []);

  const handlePageClick = (data) => {
    setPage(data.selected +1)
    dispatch(movieAction.getMoviesPerPage(page));
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
        {popularMovies && <div>sorting filtering</div>}
        {searchMovie=={} && popularMovies
          ? popularMovies.results.map((item) => (
              <Col md={4}>
                <PopularMovies item={item} />
              </Col>
            ))
          : searchMovie.results?.map((item) => (
              <Col md={4}>
                <PopularMovies item={item} />
              </Col>
            ))}
      </Row>

      <div>
        <div >
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
