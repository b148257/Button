import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

let url = 'https://jsonip.com/';

function onGetData(data){
    let p = document.querySelector('#result p');
    p.innerText = '';
    if(typeof data === 'object') data = data.message;
    p.innerText = data;
};

let urlInput = document.querySelector('#url');
let methodInput = document.querySelector('#method');
urlInput.addEventListener('change', (e) => {
    refresh(urlInput.value || url, methodInput.value);
});
methodInput.addEventListener('change', (e) => {
    refresh(urlInput.value || url,  methodInput.value);
});

function refresh(url = 'https://jsonip.com/', method = 'get'){
    ReactDOM.render(<Button onGetData={onGetData} url={url} method={method}  />, document.querySelector('#button'));
}

refresh();

