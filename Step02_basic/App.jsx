// { } 분할 할당해서 오브젝트에서 useState라는 방에 있는 useState에 담겠다.

// react 를 import 하면 object 가 리턴되는데 해당 object 의 
// useState 라는 방에 있는 함수를 useState 라는 이름의 변수에 담기기
import { useState } from "react";

//let {useState} = react;
//let useState = react.useState;



function App(){

    //상태값 관리
    //상태값을 변경하기 위해서는 setCount 를 이용해서 변경
    const [count,setCount] =useState(0) // 초기값

    const handleMinus = () =>{
        setCount(count-1)
    }

    const handelPlus = () =>{
        setCount(count+1)
    }

    // useState => hook 
    const [name, setName] = useState("김구라");

   


    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <button onClick={handleMinus}>-</button>
            <strong>{count}</strong>
            <button onClick={handelPlus}>+</button>
            <p>내 이름은 <strong>{name}</strong></p>
            <button onClick={()=>{
                setName("원숭이")
            }}>이름변경</button>
        </div>
    )
}
export default App;