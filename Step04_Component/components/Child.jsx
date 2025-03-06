// components/Child.jsx

function Child(){

    return (
        <div>
            <h2>Child Component 입니다</h2>
            <button onClick={(e)=>{
                e.target.innerText="버튼을 눌렀네??"
            }}>눌러봐</button>
        </div>
    )
}
export default Child;