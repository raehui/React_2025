// App2.jsx
import axios from "axios";
import { useEffect, useState } from "react";

function App(){
    //어떻게 form 의 데이터를 json 형식으로 얻어올 수 있는가?

    // 글 목록을 상태값으로 관리하기 위해
    const [posts, setPosts]=useState([]);

    // 글 목록 데이터를 받아오는 함수
    const refresh = ()=>{
        axios.get("/v1/posts")
        .then(res=>{
            setPosts(res.data);
            
        })
        .catch(error=>console.log(error));
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
                
                //object 를 넣으면 자동으로json으로 변경
                /*
                    -post(요청경로, object)

                    - object 에 담긴 내용이 자동으로 json 문자열로 변경되어서 서버에 전달된다.
                */
                axios.post("/v1/posts",obj)
                .then(res=>{
                    //res 는 object 인데 응답에 관련된 여러가지 정보가 들어 있다.
                    console.log(res);
                    //서버가 응답한 json 문자열이 object 혹은 array 로 변환되어서 res.data 라는 방에 들어 있다.
                    console.log(res.data);
                    refresh();
                })
                .catch(error=>{
                    console.log(error);
                })

                //fetch 함수를 이용해서 페이지 전환없이 post 방식 요청하면서 json 문자열 전송하기
                //{} 전송에 관한 옵션이 설정되어 있음
                // 여기서 url 은 3000번 포트임,  proxy server 를 통해 9000번 포트를 타서 spring 으로 들어간다.
                
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
                            axios.put("/v1/posts/"+item.id, obj)
                            .then(res=>{
                                console.log(res.data);
                                refresh();
                            })
                            .catch(error=>{
                                console.log(error);
                            })
                        }}>수정</button></td>
                        <td><button onClick={()=>{
                            axios.delete("/v1/posts/"+item.id)
                            .then(res=>{
                                alert(res.data.id+"번 글을 삭제했습니다.")
                                refresh();
                            })
                            .catch(error=>console.log(error))
                        }}>x</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}
export default App;