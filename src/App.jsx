import axios from "axios";
import { useEffect, useState } from "react";
// key 값을 얻어내기 위한 함수 import
import {v4 as uuid} from "uuid";
/*
    npm install bootstrap 해서 설치하고
    아래와 같이 import 하면 전역에서 사용가능한 bootstrap css 가 로딩된다.
*/
import "bootstrap/dist/css/bootstrap.css"
function App(){
    //페이지 정보를 state 로 관리한다 
    const [pageInfo, setPageInfo] = useState({
        list:[]
    });
    //컴포턴트가 활성화 되는 시점에 1 페이지 정보를 얻어온다.
    useEffect(()=>{
        refresh(1);
    }, []);

    //페이지를 요청해서 출력하는 함수
    const refresh = (pageNum) =>{
        axios.get("/posts?pageNum="+pageNum)
        .then(res=>{
            console.log(res) 
            //서버에서 응답한 data는 res.data 에 들어 있다.
            //data 는 요청한 pageNum에 맞는 row , startPageNum , endPageNum , totalPageNum 가 오브젝트로 들어있음
            console.log(res.data);
            //상태값을 변경한다.
            setPageInfo(res.data);
            //페이징 처리에 필요한 배열을 만들어서 
            const result=range(res.data.startPageNum, res.data.endPageNum);
            //상태값을 변경한다.
            setPageArray(result);
        })
        .catch(err=>console.log(err));
    }


    //페이징 숫자를 출력할때 사용하는 배열을 상태값으로 관리 하자
    const [pageArray, setPageArray]=useState([]);

    //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수를 만들어 두고 활용하자 
    function range(start, end){
        const result=[];
        for(let i=start; i<=end ;i++){
            result.push(i);
        }
        return result;
    }

    return (
        <div className="container">
            <h1>글 목록 입니다</h1>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {pageInfo.list.map(item => 
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ul className="pagination">
                {pageArray.map(num=>
                    <li className={`page-item ${pageInfo.pageNum == num ? 'active': ''}`} key={uuid()}>
                        <a className="page-link" href="#" onClick={(e)=>{
                            e.preventDefault(); //링크의 기본 동작 막기
                            refresh(num);
                        }}>{num}</a>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default App;