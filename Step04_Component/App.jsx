import { useState } from "react";
import Child from "./components/Child";
import Fortune from "./components/Fortune";
import List from "./components/List";

function App(){
    //오늘의 운세를 상태값으로 관리
    const [fortuneToday, setFortune] = useState("로또에 당첨될거에요!");
    //이름 목록을 상태값으로 관리
    const [names, setNames] = useState(["김구라","해골","원숭이"]);


    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <Child/>
            <Child/>
            <Child/>
            {/* data 라는 property 명으로 string type 전달하기 */}
            <Fortune data={"럭키비키"}/>
            <Fortune data={"아이스크림 사줘요"}/>
            <button onClick={()=>{
                setFortune("남쪽으로 가면 귀인을 만날수도...");
            }}>운세 변경</button>
            <Fortune data={fortuneToday}/>
            <List names={names} onDelete={(idx)=>{
                // alert("함수 호출!");
                
                // idx 는 삭제할 item 의 인덱스가 들어 있다
                // names 배열에서 idx 인덱스를 삭제한 새로운 배열을 얻어내서
                // setNames(names.filter((item,index) => index !== idx));
                const newArr = names.filter((item,index) => index !== idx);
                //상태값을 변경한다.
                setNames(newArr);
            }}/>
        </div>
    )
}
export default App;