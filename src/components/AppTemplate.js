import React from 'react';
import './AppTemplate.css';

const AppTemplate = ({blog_container}) => {
  return (
    <div className="app-template">
      <div className="blog_container">{blog_container}</div>
    </div>
  );
};

export default AppTemplate;