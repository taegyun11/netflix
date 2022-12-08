import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../redux/actions/movieAction";

const Paginate = ({page, setPage}) => {
  const { loading, searchMovie } = useSelector((state) => state.movie);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState([])


  let postsPerPage = 20;
  let totalPage = 200;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPage / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const pageChange = () =>{
    setPage(searchMovie.page +1)
  }
  
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number=>(
            <li key={number} className="list-items">
                <a onClick={pageChange}>
                    {number}
                </a>
            </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
