import { useOutlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import BsNavBar from "./components/BsNavBar";
import LoginModal from "./components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function App() {
    // 현재 라우터에 해당하는 컴포넌트 가져오기
    const currentOutlet = useOutlet();
    //로그인 모델의 상태값을 redux store 롭 무터 얻어낸다.
    const loginModal = useSelector(state => state.loginModal);
    const dispatch = useDispatch();
    

    // App component 가 활성화 되는 시점에 token 관련 처리
    // 변화가 있어도 변경되지 않음 ? 
     useEffect(()=>{
        const token = localStorage.token;
        // 만일 토큰이 존재 한다면 
        if(token){
            axios.get("/ping", {
                headers : {Authorization : token}
            })
            // 토큰이 유효한 경우 then 이 실행
            // 요청에 응답을 했으니 디폴트로 헤더에 달고가게 함
            .then(res => {
                //axios 의 요청헤더에 자동으로 토큰이 포함되도록 한다.
                //토큰이 유효한 경우 axios 에서 디폴트 값 설정
                axios.defaults.headers.common["Authorization"]=token;

                // 토큰을 디코딩해서 userName 을 얻어온다.
                const decoded = jwtDecode(token.substring(7));
                // 발생할 action
                //로그인 한 정보를 유지시키기
                const action = {type : "USER_INFO", payload : {
                    userName :  decoded.sub,
                    role : decoded.role
                }};
                // 액션 발행하기
                dispatch(action);
            })
            // 토큰이 만료된 경우 catch 가 실행 (요청에 대해 오류가 전달되기 때문)
            .catch(err => {
                delete localStorage.token;
            });
            
        }
    },[]); // 여기에 userInfo 가 있으면 무한루프로 2번 로그아웃 -> 

    return (
        <>
            <BsNavBar />
            <div className="container" style={{ marginTop: "60px" }}>
                <div>{currentOutlet}</div>
            </div>
            <LoginModal show={loginModal.show} />
        </>


    )
}
export default App;