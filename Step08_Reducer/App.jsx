import Counter from "./components/Counter";
import Friends from "./components/Friends";
import MyCounter from "./components/MyCounter";

function App(){

    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <Counter/>
            <MyCounter/>
            <Friends/>
        </div>
    )
}
export default App;