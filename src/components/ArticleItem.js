import React, { useContext } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import NewsContext from '../context/news';

const ArticleItem = (props) => {
  const { onItemClick } = useContext(NewsContext);

  const {
    id,
    title,
    url,
    updated,
    excerpt,
    category_name,
    index
  } = props;

  return (
    <div className="article-item" index={index + 1}>
      <div className="article-info">
        <div className="article-title" onClick={() => onItemClick(id)}>
          <strong>{title}</strong>
        </div>
        { excerpt && <div className="article-description">
          { excerpt.substring(0, 300) + "..." } <span onClick={() => onItemClick(id)}> <strong> More </strong> </span>
        </div> }
      </div>
      <div className="col-3 align-items-end post-info">
        <div className="post-time">
          <p> Category: {category_name} </p>
          Posted {moment(new Date(updated)).fromNow()}
          <p> Original: <a target="_blank" href={url}> here </a> </p>
        </div>
      </div>
    </div>
  );
};

ArticleItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  category_name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default ArticleItem;
