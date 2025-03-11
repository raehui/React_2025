import React, { useReducer, useRef } from 'react';
import {v4 as uuid} from "uuid";
//action 에는 2가지의 정보(type, payload)를 담을 수 있다.
const reducer = (state, action)=>{
    let newState;
    if(action.type === "add"){
        newState ={
            ...state,
            friends:[...state.friends,{id:uuid(), name:action.payload}] // 기존의 배열에 object를 요소로  하나 추가하기
        }
    }else if(action.type === "reset"){
        newState ={
            ...state,
            friends:[] // 원하는 상태값 작성하기
        }
    }else if(action.type === "remove"){
        //배열에서 특정 아이템을 제거되는 filter
        //item 은 friends 에 있는 오브젝트 요소
        newState ={
            ...state,
            friends:state.friends.filter(((item)=> action.payload !== item.id ))
        }
    }
    else{
        newState=state;
    }
    
    /*
        {
            userName: string;
            friends: { id: string; name: string }[];
        }
    */
    
    return newState;
}

//초기상태값
const initState={
    userName:"kimgura",
    // 친구를 추가할 때마다 { id: string, name: string } 객체가 배열에 추가됨 
    friends:[]
}

function Friends(props) {
    // useReducer(리듀서 함수, 초기 상태값)
    // 초기의 state 은 {userName: " ", friends:[ ]} 
    const [state, dispatch] = useReducer(reducer,initState);

    //특정 요소의 참조값을 관리하기 위한 hook
    //직접 참조값을 얻어오기위해서 .current 로 읽어와야 함
    const inputName=useRef();

    return (
        <div>
            <p>로그인된 userName : <strong>{state.userName}</strong></p>
            <input ref={inputName} type="text" placeholder='친구 이름 입력...' />
            <button onClick={()=>{
                //입력한 이름을 추가하는 action 을 dispatch 한다(동작을 발행한다)
                //inputName.current 라는 방에는 참조값(input 요소) 이 들어잇다.
                const name=inputName.current.value;
                //발행할 action 을 object 로 만든다.
                //입력한 내용을 payload 라는 변수에 담고 
                const action = {type:"add",payload:name};
                //action 발행하기
                dispatch(action);
            }}>추가</button>
            <button onClick={()=>{
                const action = {type:"reset"};
                dispatch(action);
            }}>리셋</button>
            <ul>
                {state.friends.map(item=>
                    // item item: { id: string, name: string }
                    <li key={item.id}> 
                        {item.name} 
                        <button onClick={()=>{
                            //해당 아이템만을 삭제하는 action
                            const action ={type:"remove", payload:item.id};
                            //action 에는 type 과 payload 에 필요한 데이터가 담겼음
                            dispatch(action);
                        }}>x</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Friends;