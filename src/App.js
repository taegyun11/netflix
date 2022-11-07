import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import { Navbar } from 'react-bootstrap';
import Navigation from './component/Navigation';

//1. 3개의 페이지 필요 홈페이지, movie page, movie detail page
//2. 홈페이지 에서 배너를 볼수있다
//3. 3가지 섹션의 영화를 볼수있다, popular movie, top rated, upcoming movie
//4. 각 영화에 마우스를 올려 두면 제목, 장르, 점수, 인기도, 청불 여부를 알수있다
//5. 영화를 슬라이드로 넘기면서 볼 수 있다.

//6. 영화 디테일 페이지 에서 영화에대한 디테일을 볼수있다 (포스터, 제목, 줄거리, 점수, 인기도, 청불여부, 예산, 이익, 러닝타임 등등..)
//7. Trailer 를 누르면 예고편을 볼수있다.
//8. 영화의 리뷰도 볼수 있다.
//9. 관련된 영화도 볼수있다.

//10. 영화 검색을 할수있다.
//11. 영화 정렬 가능
//12. 영화를 필터링 할수도 있다.
//13. 




function App() {
  return (
    <div>
    <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movies/:id' element={<MovieDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
