import { useRef } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import Child from "./components/Child";

function App() {

    // redux store 에서 관리되는 state 는 UseSelector() 라는 hook 을 이용하면 된다.

    // 함수의 매개변수에 store 관리되는 상태값이 들어가고 필요한 놈을 뽑기
    //  왜 userName 사용? usrName 이 있다면 로그인 성공
    // 디스패치로 다시 호츨되면서 다시 실행
    const isLogin = useSelector((state)=>state.isLogin); 
    const inputName = useRef();
    // action  을 발행할 사용하는 hook
    // store 에 발행할 함수를 사용할 때
    const dispatch = useDispatch();
    const usrName = useSelector((state)=>state.userName);

    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            {isLogin ?
                <p>
                    <strong>{usrName}</strong> 님 로그인 중...
                    <button onClick={()=>{
                        //  isLogin = false 로 변경하기
                        const action3 ={type : "LOGIN_STATUS", payload : false};
                        dispatch(action3);    
                    }}>로그아웃</button>
                </p>
            :
                <>
                    <input ref={inputName} type="text" placeholder="사용자명..." />
                    <button onClick={()=>{
                            //입력한 userName
                            const userName=inputName.current.value;
                            //userName 을 변경하는 action 
                            const action1  = {type :"USER_NAME", payload : userName};
                            // 로그인 상태를 변경하는 action
                            const action2 = {type: "LOGIN_STATUS" , payload : true};
                            // actio 발행하기
                            dispatch(action1);
                            dispatch(action2);
                    }}>로그인</button>
                </>
            }
            <Child/>
        </div>
    )
}
export default App;