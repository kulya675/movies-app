import React from 'react';
import { Tag } from 'antd';

import './Genre.scss';

const Genre = () => {
  return (
    <div className="info__genre">
      <Tag>Action</Tag>
      <Tag>Trash</Tag>
    </div>
  );
};

export default Genre;
