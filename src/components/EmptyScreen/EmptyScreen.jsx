import React from 'react';
import { Result } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

import './EmptyScreen.scss';

const EmptyScreen = () => {
  const title = "There's nothing to show. First of all you need to edit this thing. It's not correct!!!";
  return <Result className="screen--empty" icon={<ArrowUpOutlined className="arrow" />} title={title} />;
};

export default EmptyScreen;
