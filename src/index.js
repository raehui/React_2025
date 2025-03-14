import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // App.js를 import 해서 App라는 이름으로 사용하기
import reportWebVitals from './reportWebVitals';
import { Router, RouterProvider } from 'react-router-dom';
 import router from "./router";
import {legacy_createStore as createStore} from 'redux';
import { Provider } from 'react-redux';

// redux store 에서 관리될 state 의 초기값
const initState = {
  userInfo :null,
  loginModal:{
    title:"",
    show:false
  } 
};

//action 에는 2가지의 정보(type, payload)를 담을 수 있다.
//reducer 함수에서 관리되는 상태값
const reducer = (state = initState, action)=>{
  let newState;
  if(action.type == "USER_INFO"){
    newState = {
      ...state,
      userInfo : action.payload
    }
  }
  else if(action.type == "LOGIN_MODAL"){
    newState = {
      ...state,
      loginModal : action.payload
    }
  }
  else {
    newState =state;
  }
  return newState;
};

// reducer 함수를 전달하면서 store(저장소) 를 만든다.
const store = createStore(reducer);


// id가 root 인 div 안에 App.js에서 리턴해준 component 로 채우기
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
