import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import RouterClass from './routes';

ReactDOM.render(
	<RouterClass/>
	, document.getElementById('root'));
registerServiceWorker();
