
import {v4 as uuid} from "uuid";
// 매개변수도 구조 분해 할당이 가능하기에 {names, onDelete} 로 작성하면 바로 사용 가능
function List(props){
    
    return (
        <>
            <h2>목록입니다.</h2>
            <ul>
                {props.names.map((item, index)=><li key={uuid()}>{item} <button onClick={()=>{
                    // 부모가 전달해준 함수를 호출하면서 삭제한 index 를 전달한다.
                    props.onDelete(index);
                }}>x</button></li>)}
            </ul>
        </>
    )
}
export default List;