import React from 'react';
import { Result } from 'antd';

import './ErrorScreen.scss';

const ErrorScreen = () => {
  return <Result status="404" title="404" subTitle="Sorry, the page you visited doesnt exist" />;
};

export default ErrorScreen;
