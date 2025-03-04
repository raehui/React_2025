import { useState } from "react";

// App3.jsx
function App(){
    // 이 함수는 언제 호출될까? 화면이 업데이트할 때마다 함수가 호출된다.
    
    // 함수가 호출될 때마다 상태가 초기화 되지 않게 state 로 상태를 관리한다.
    
    // 전체가 호출되지만 최적화되서 변경된 부분만 업데이트 된다.
    console.log("App()함수 호출")
    const [state, setState] = useState({
        name:"김구라",
        addr:"노량진"
    })

    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <p>이름은 <strong>{state.name}</strong></p>
            <p>주소는 <strong>{state.addr}</strong></p>
            {/* 새로은 오브젝트로 덮어쓴다. */}
            이름 입력 <input type="text" onChange={(e)=>{
                setState({
                    ...state, 
                    name:e.target.value})
            }} value={state.name} />
            <br />
            주소 입력 <input type="text" onChange={(e)=>{
                setState({
                    ...state,
                    addr:e.target.value
                })
            }} value={state.addr}/>
        </div>
    )
}
// 이 파일을 import 하면 App 함수를 사용할 수 있다.
export default App;