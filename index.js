import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './src/view/webinterface';

const globalVars = require('./const/global');

console.log("Init done");

ReactDOM.render(<App/>, document.getElementById('app'));
