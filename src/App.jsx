import { useOutlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import BsNavBar from "./components/BsNavBar";
import LoginModal from "./components/LoginModal";
import { useSelector } from "react-redux";



function App() {
    // 현재 라우터에 해당하는 컴포넌트 가져오기
    const currentOutlet = useOutlet();
    //로그인 모델의 상태값을 redux store 롭 무터 얻어낸다.
    const loginModal = useSelector(state=> state.loginModal);

    return (
        <>
            <BsNavBar />
            <div className="container" style={{marginTop:"60px"}}>
                <div>{currentOutlet}</div>
            </div>
            <LoginModal show={loginModal.show}/>
        </>


    )
}
export default App;