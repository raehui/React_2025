import Child from "./components/Child";
import Fortune from "./components/Fortune";

function App(){

    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <Child/>
            <Child/>
            <Child/>
            {/* data 라는 property 명으로 string type 전달하기 */}
            <Fortune data={"럭키비키"}/>
            <Fortune data={"아이스크림 사줘요"}/>
        </div>
    )
}
export default App;