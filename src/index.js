import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

let url = 'https://jsonip.com/';

function onGetData(data){
    let p = document.querySelector('#result p');
    p.innerText = '';
    p.innerText = data;
};

ReactDOM.render(<Button onGetData={onGetData} url={url} method='get'  />, document.querySelector('#button'));

