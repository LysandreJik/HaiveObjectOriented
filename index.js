import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './src/view/webinterface';
import { Provider } from 'react-redux';
import store from './src/store'

const globalVars = require('./const/global');

console.log("Init done");

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));
