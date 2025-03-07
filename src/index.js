import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // App.js를 import 해서 App라는 이름으로 사용하기
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
// 폴더명 까지만 import 하면 default 로 index.jsx 가 import 된다.
import router from './router';

// id가 root 인 div 안에 App.js에서 리턴해준 component 로 채우기
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
