import React, { useContext } from 'react';
import ArticleItem from './ArticleItem';
import NewsContext from '../context/news';

const Results = () => {
  const { results } = useContext(NewsContext);

  return (
    <div className="search-results">
      { results.map((article, index) => (
        <ArticleItem key={article.id} {...article} index={index} />
      )) }
    </div>
  );
};

export default Results;
