// App2.jsx
import { useState } from "react";

function App(){
    
    const [names, setNames] = useState(["김구라", "원숭이","해골"]);

    const handleAdd = () => {
        //상태값 변화할려면 새로운 배열을 넣어주면 된다.
        // 기존의 것을 Spread 하는 ... 사용하기
        setNames([...names,"주뎅이"])
    }
    

    // 배열을 가져올 때는 map으로 새로 만들어서 가져옴
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