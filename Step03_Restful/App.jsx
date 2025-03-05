import { useEffect, useState } from "react";

function App(){
    //어떻게 form 의 데이터를 json 형식으로 얻어올 수 있는가?

    // 글 목록을 상태값으로 관리하기 위해
    const [posts, setPosts]=useState([]);

    // 글 목록 데이터를 받아오는 함수
    const refresh = ()=>{
        fetch("/v1/posts")
        .then(res=>res.json())
        .then(data=>{
            //서버로 부터 받아온 배열로 상태값을 변경한다.
            //state 를 변경하는 함수를 호출하면 App() 함수가 다시 호출된다.
            // useState([]) 함수가 리턴해주는 배열의 0번 방에는 새로운 posts 배열이 들어있다.
            setPosts(data);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    //refresh(); 무한루프
    /*
        useEffect(함수, 배열)
        배열을 비워두면 App 컴포넌트가 초기화 되는 시점에 최초 1번만 호출된다. = 페이지 로딩 시 1번 호출
        비워두지 않으면 ... 즉 어떤 state 값을 넣어주면 해당 state 가 변경될때마다 호출된다. = 값이 변경될 때마다 호출
    */
    useEffect(()=>{
        refresh();
    },[])
    

    return (
        <div className="container">
            <h1>새글 작성폼</h1>
            <form action="/v1/posts" onSubmit={(e)=>{
                e.preventDefault(); // 폼 전송을 막기
                // 요청 url 
                const url=e.target.action;
                console.log(url)
                //FormData 객체
                const formData=new FormData(e.target);
                //폼에 입력한 내용을 object 로 변환
                //입력한 데이터를 바탕으로 object 로 바꾸면 쉽게 json 문자열을 얻을 수 있다.
                const obj = Object.fromEntries(formData);
                
                //object 에 있는 내용을 이용해서 JSON 문자열 만들어내기
                const json=JSON.stringify(obj);
                

                //fetch 함수를 이용해서 페이지 전환없이 post 방식 요청하면서 json 문자열 전송하기
                //{} 전송에 관한 옵션이 설정되어 있음
                // 여기서 url 은 3000번 포트임,  proxy server 를 통해 9000번 포트를 타서 spring 으로 들어간다.
                fetch(url, {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:json

                })
                .then(res=>res.json())
                .then(data =>{
                    //data 는 서버에서 응답한 json 문자열이 object 로 변경되어서 전달된다.
                    console.log(data);
                    refresh(); // 저장 버튼을 누르면 바로 화면에 나타나게끔
                })
                .catch(error=>{
                    console.log(error);
                })
            }}>
                <input type="text"  name="title" placeholder="제목 입력.."/>
                <input type="text"  name="author" placeholder="작성자 입력.."/>
                <button type="submit">저장</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                {/* post 배열을 이용해서 <tr>이 여러개 들어 있는 배열을 만들어낸다. */}
                <tbody>
                    {posts.map(item =>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td><button onClick={()=>{
                            //수정할 제목을 입력 받는다.
                            const title=prompt(item.id+" 번글의 수정할 제목 입력")
                            //수정할 정보를 이용해서 object 만든다.
                            const obj={
                                title:title,
                                author:item.author
                            };
                            fetch("/v1/posts/"+item.id,{
                                method:"PUT", // id를 제외한 전제 수정을 할 때 사용한다.
                                headers: {"Content-Type":"application/json"},
                                body : JSON.stringify(obj) // object 를 json 문자열로 변경해서 넣어준다.
                            })
                            .then(res=>res.json())
                            .then(data=>{
                                refresh();
                            })
                        }}>수정</button></td>
                        <td><button onClick={()=>{
                            fetch("/v1/posts/"+item.id, {
                                method:"DELETE"
                            })
                            .then(res=>res.json())
                            .then(data=>{
                                //data는 삭제한 post 이다.
                                alert(data.author+" 님의 post 를 삭제했습니다.");
                                refresh();
                            });
                        }}>x</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}
export default App;