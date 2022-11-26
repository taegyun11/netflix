import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { movieAction } from "../redux/actions/movieAction";
import ClipLoader from "react-spinners/ClipLoader";
import { Badge, Col, Container, Row, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { movieDetail, loading, movieReview, relatedMovie, movieTrailer } =
    useSelector((state) => state.movie);
  let { id } = useParams();
  useEffect(() => {
    dispatch(movieAction.getMovieDetail({ id }));
  }, []);
  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  const opts = {
    height: "450",
    width: "800",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
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
    <div>
      <div className="movie-detail-page">
        <div className="movie-picture">
          <img
            className="detail-page-picture"
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetail?.poster_path}`}
          />
        </div>
        <div className="movie-detail-description">
          <div>
            {movieDetail.genres.map((genre) => (
              <Badge bg="danger" className="Badge-style" key={genre.id}>
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className="movie-detail-overview">
            <div className="movieDetail_title">{movieDetail.title}</div>
            <hr className="hr_description" />
            <h1>Overview</h1>
            <div className="moviedetail-overview">{movieDetail.overview}</div>
            <hr className="hr_description" />
            <br />
            <div>
              <Badge bg="danger" className="budget-badge">
                Budget
              </Badge>
              : {movieDetail.budget}
            </div>
            <div>
              <Badge bg="danger" className="budget-badge">
                Popularity
              </Badge>
              : {movieDetail.popularity}
            </div>
            <div>
              <Badge bg="danger" className="budget-badge">
                Release Date
              </Badge>
              : {movieDetail.release_date}
            </div>
            <div>
              <Badge bg="danger" className="budget-badge">
                Revenue
              </Badge>
              : ${movieDetail.revenue}
            </div>
            <div>
              {/* Movie Trailer Button */}
              <Button variant="primary" onClick={handleShow}>
                Show Trailer <FontAwesomeIcon icon={faPlay} />
              </Button>
              {/* Modal for Trailer */}
              <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Body className="movie-trailer-body">
                  <YouTube videoId={movieTrailer.results[0].key} opts={opts} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      {toggle == false ? (
        <div className="movieReview">
          <Badge bg="danger" className="budget-badge review-button">
            Reviews
          </Badge>
          <Badge
            bg="dark"
            className="budget-badge review-button"
            onClick={toggler}
          >
            Related
          </Badge>
          {movieReview.results.map((item) => (
            <div>
              <h2 className="review-author">{item.author}</h2>
              <br />
              <h5>{item.content}</h5>
              <hr className="hr_description" />
            </div>
          ))}
        </div>
      ) : (
        <div className="movieReview">
          <Badge
            bg="dark"
            className="budget-badge review-button"
            onClick={toggler}
          >
            Reviews
          </Badge>
          <Badge bg="danger" className="budget-badge review-button">
            Related
          </Badge>
          <Container>
            <Row>
              <Col>
                {relatedMovie.results.map((item) => (
                  <span className="related-movie">
                    <img
                      src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
                    />
                  </span>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
