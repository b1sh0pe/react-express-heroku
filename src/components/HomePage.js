import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNews } from '../actions/news';
import Header from './Header';
import Results from './Results';
import ArticleDetails from './ArticleDetails';
import NewsContext from '../context/news';
import Pagination from "./Pagination";
import Loader from './Loader';

const HomePage = (props) => {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [articleId, setArticleId] = useState(-1);
  const [page, setPage] = useState(1);
  const [pageName, setPageName] = useState("home");
  const [perPage] = useState(10);

  useEffect(() => {
    if (props.news.rows) {
      setResults(props.news.rows);
      setCount(props.news.count);
    }
  }, [props.news]);

  const loadNews = (data) => {
    const { dispatch } = props;

    setIsLoading(true);
    dispatch(
      getNews(data)
    ).then((response) => {
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  };

  useEffect(() => {
    loadNews({page, perPage});
  }, []);

  const handleItemClick = (articleId) => {
    setPageName('details');
    setArticleId(articleId);
  };

  const handleResetPage = () => {
    setPageName('home');
    setArticleId(-1);
  };

  const handleLoadMore = (paginationData) => {
    loadNews({ page: paginationData.currentPage, perPage });
    setPage(paginationData.currentPage);
  };

  let articleDetails = {};
  if (pageName === 'details') {
    articleDetails = results.find(article => article.id === articleId);
  }

  const value = {
    results,
    details: articleDetails,
    onItemClick: handleItemClick,
    onResetPage: handleResetPage
  };

  return (
    <NewsContext.Provider value={value}>
      <Loader show={isLoading}> Loading... </Loader>
      { articleId === -1 && <div className={`home`}>
        <Header />
        { count > 0 && <div className="d-flex pagination-container">
          <Pagination totalRecords={count} pageLimit={perPage} onPageChanged={handleLoadMore} pageNeighbours={1}/>
        </div> }
        <Results />
        { count > 0 && <div className="d-flex justify-content-end pagination-container">
          <Pagination totalRecords={count} pageLimit={perPage} onPageChanged={handleLoadMore} pageNeighbours={1}/>
        </div> }
      </div> }
      { articleId !== -1 && <div className={`${pageName === 'home' && 'hide'}`}>
        {pageName === 'details' && <ArticleDetails />}
      </div> }
    </NewsContext.Provider>
  );
};

HomePage.propTypes = {
  news: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  news: state.news
});

export default connect(mapStateToProps)(HomePage);
