import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom';

function PostDetail(props) {
    // "/posts/:num" 에서 num 에 해당되는 경로 파라미터 값 읽어오기
    const {num} = useParams()
    // 글 하나의 정보를 상태값으로 관리
    const [state,setState] = useState({})
    // 검색 키워드 관련처리
    const [params, setParams] = useSearchParams()

    useEffect(()=>{
        // query = condition=xxx&keyword=yyy
        const query = new URLSearchParams(params).toString();
        console.log(query);
        axios.get(`/posts/${num}${params.get("condition") ? "?"+query :""}`)
        .then(res=>{
            //글 하나의 정보를 상태값에 넣어주고
            setState(res.data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[num]);

    return (
        <>
            <h1>글 자세히 보기 페이지</h1>
            <Table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <td>{state.num}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{state.writer}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{state.title}</td>
                    </tr>
                    <tr>
                        <th>조회수</th>
                        <td>{state.viewCount}</td>
                    </tr>
                    <tr>
                        <th>수정일</th>
                        <td>{state.updatedAt}</td>
                    </tr>
                    <tr>
                        <th>작성일</th>
                        <td>{state.createdAt}</td>
                    </tr>
                </thead>
            </Table>
            <div dangerouslySetInnerHTML={{__html: state.content}}> 
                
            </div>
        </>
    );
}

export default PostDetail;