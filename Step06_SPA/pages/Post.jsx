// pages/Post.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

import { v4 as uuid } from "uuid";

function Post(props) {
    // "/posts?pageNum=x" 에서 pageNum 와 같은 query parameter 를 추출과 수정을 위한 hook
    const [params, setParams] = useSearchParams({pageNum:1});

    // 왜 사용? 
    const navigate = useNavigate();

    //페이지 정보를 state 로 관리한다 
    const [pageInfo, setPageInfo] = useState({
        list: []
    });

    //컴포턴트가 활성화 되는 시점에 1 페이지 정보를 얻어온다.
    useEffect(() => {
        // query 파라미터 값을 읽어와 본다
        let pageNum = params.get("pageNum");

        refresh(pageNum);
    }, [params]); // params 가 변경될 때 useEffect() 안에 있는 함수가 다시 호출되도록 한다.

    // navigate() 함수를 이용해서 페이지를 변경하는 함수
    const move = (pageNum)=>{
        navigate(`/posts?pageNum=${pageNum}`);
    }

    //페이지를 요청해서 출력하는 함수
    const refresh = (pageNum) => {
        axios.get("/v3/posts?pageNum=" + pageNum)
            .then(res => {
                console.log(res)
                //서버에서 응답한 data는 res.data 에 들어 있다.
                //data 는 요청한 pageNum에 맞는 row , startPageNum , endPageNum , totalPageNum 가 오브젝트로 들어있음
                console.log(res.data);
                //상태값을 변경한다.
                setPageInfo(res.data);
                //페이징 처리에 필요한 배열을 만들어서 
                const result = Range(res.data.startPageNum, res.data.endPageNum);
                //상태값을 변경한다.
                setPageArray(result);
            })
            .catch(err => console.log(err));
    }

    //페이징 숫자를 출력할때 사용하는 배열을 상태값으로 관리 하자
    const [pageArray, setPageArray] = useState([]);

    //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수를 만들어 두고 활용하자 
    function Range(start, end) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }

    return (
        <>
            <h1>글 목록 입니다.</h1>
            <NavLink to="/posts/new">새글 작성</NavLink>
            {/* 실제 글 목록 나오게 */}
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>수정</th>
                        <th>삭제</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {pageInfo.list.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>
                                <NavLink to={`/posts/${item.id}/edit`}>수정</NavLink>
                            </td>
                            <td>
                                <button onClick={()=>{
                                    axios.delete(`/v3/posts/${item.id}`)
                                    .then(res=>{
                                        alert(res.data.id +"번글을 삭제 했습니다.")
                                        //현재 페이지 정보가 다시 출력되도록 한다.
                                        //? 왜 refresh
                                        //refresh(pageInfo.pageNum);
                                        //refresh() 대신에 아래와 같이 작업할 수도 있다.
                                        // move(pageInfo.pageNum);

                                        //pageInfo.list 에서 실제 삭제된 글정보를 실제 삭제한 배열을 얻어내서 상태값 변경
                                        setPageInfo({
                                            ...pageInfo,
                                            list:pageInfo.list.filter(item=>item.id !== res.data.id)
                                        })

                                    })
                                    .catch(err=>console.log(err));
                                }}>x</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ul className="pagination">
                {/* 이전 버튼 */}
                {/* javascript 로 작성하면 기본 동작 막는 코드 작성안해도 ㅇㅋ */}
                <li className={`page-item ${pageInfo.startPageNum == 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" onClick={(e) => {
                        e.preventDefault();
                        move(pageInfo.startPageNum - 1);
                    }}>Prev</a>
                </li>

                {pageArray.map(num =>
                    <li className={`page-item ${pageInfo.pageNum == num ? 'active' : ''}`} key={uuid()}>
                        <a className="page-link" href="#" onClick={(e) => {
                            e.preventDefault(); //링크의 기본 동작 막기
                            move(num);
                        }}>{num}</a>
                    </li>
                )}

                {/* 다음 버튼 */}
                {/* total > enpage 이면 다음 페이지가 존재함 */}
                <li className={`page-item ${pageInfo.totalPageCount > pageInfo.endPageNum ? '' : 'disabled'}`}>
                    <a className="page-link" href="#" onClick={(e) => {
                        e.preventDefault();
                        move(pageInfo.endPageNum + 1);
                    }}>Next</a>
                </li>
            </ul>
        </>
    );
}

export default Post;