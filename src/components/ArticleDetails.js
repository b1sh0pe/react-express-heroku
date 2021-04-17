import React, { useEffect, useContext } from 'react';
import NewsContext from '../context/news';
import moment from 'moment';

const ArticleDetails = () => {
  const { details, onResetPage } = useContext(NewsContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    title,
    url,
    content,
    category_name,
    updated
  } = details;

  return (
    <div className="article-details">
      <div className="back-link">
        <a href="#" onClick={onResetPage}>
          &lt;&lt; Back to results
        </a>
      </div>
      <div className="main-section">
        <div className="left-section">
          <div className="title">{title}</div>
          <hr />
          <div
            className="article-description"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
        <div className="right-section">
          <div className="article-details">
            <h3> <strong> Article details </strong> </h3>
            <div className="article-name">Категория: {category_name}</div>
            Оригинал:
            <a className="article-url" href={url}>
              {url}
            </a>
            <p> Posted {moment(new Date(updated)).fromNow()} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
