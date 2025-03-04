// App2.jsx
import { useState } from "react";

function App(){
    
    const [names, setNames] = useState(["김구라", "원숭이","해골"]);

    const handleAdd = () => {
        // spread 연산자를 이용해서 기존에 배열에 있는 내용을 펼쳐놓고 
        // item 이 추가된 새로운 배열을 얻어내서 state 변경하기
        setNames([...names,"주뎅이"])
    }
    

    // 배열을 가져올 때는 map으로 새로 만들어서 가져옴
    // map에는 자동으로 반복문 돌고 새로운 요소를 만들어준다.
    return(
        <div className="container">
            <h1>배열을 state로 관리해 보기</h1>
            <button onClick={handleAdd}>추가</button>
            <ul>
                {names.map(item=> <li>{item}</li>)}
            </ul>
        </div>
    )
}

export default App;