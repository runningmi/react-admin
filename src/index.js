import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css'

import storgeUtils from './utils/storgeUtils'
import memoryUtils from './utils/memoryUtils'

memoryUtils.user = storgeUtils.getUser()

ReactDOM.render(
    <App />,
  document.getElementById('root')
);


