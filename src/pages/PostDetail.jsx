import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

//module css 를 import 해서 cx 함수로 사용할 준비를 한다.
import customCss from "./css/cafe_detail.module.css";
import binder from "classnames/bind";
import ConfirmModal from '../components/ConfirmModal';
const cx=binder.bind(customCss);

function PostDetail(props) {
    // "/posts/:num" 에서 num 에 해당되는 경로 파라미터 값 읽어오기
    // 요청되는 글번호를 가져옴
    const {num} = useParams()
    // 글 하나의 정보를 상태값으로 관리
    const [state,setState] = useState({})
    // 검색 키워드 관련처리
    // 글 목록 보는 페이지로부터  공유됨
    const [params, setParams] = useSearchParams({
        condition :"",
        keyword:""
    });

    //로그인된 userName ???
    const userName = useSelector(state=>state.userInfo.userName);
    
    const navigate = useNavigate();

    //글 삭제 버튼을 눌었을 때 호출되는 함수
    // const deleteConfirm = () =>{
    //     const isDelete = window.confirm("글을 삭제 하시겠습니까?");
    //     if(!isDelete) return;
    //     axios.delete(`/posts/${state.num}`)
    //     .then(res=>{
    //         navigate("/posts");
    //     })
    //     .catch(error=>{
    //         console.log(error);
    //     })
    // };

    useEffect(()=>{
        // query = condition=xxx&keyword=yyy
        const query = new URLSearchParams(params).toString();
        console.log(query);
        axios.get(`/posts/${num}${params.get("condition") ? "?"+query :""}`)
        .then(res=>{
            //글 하나의 정보를 상태값에 넣어주고
            setState(res.data);
            // console.log(res.data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[num]);

    const [modalShow , setModalShow] = useState(false);

    return (
        <>
            <ConfirmModal show={modalShow} message="이 글을 삭제 하시겠습니까?" onYes={()=>{
                axios.delete(`/posts/${state.num}`)
                .then(res=>{
                    navigate("/posts");
                })
                .catch(error=>{
                    console.log(error);
                });
                setModalShow(false);
            }} onCancel={()=>setModalShow(false)}/>
            {/* 여기서 state 는 선택한 글 하나의 정보 */}
            {state.prevNum !==0 ? <Link to={`/posts/${state.prevNum}${params.get("condition") &&"?" + new URLSearchParams(params).toString() }`}>이전글</Link> : "" }
            {state.nextNum !==0 ? <Link to={`/posts/${state.nextNum}${params.get("condition") &&"?" + new URLSearchParams(params).toString() }`}>다음글</Link> : "" }
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
            {/* 간접 출력 */}
            {/* cx 함수를 이용해서 복잡한 이름을 불러낼 수 있음 */}
            <div className={cx("content")} dangerouslySetInnerHTML={{__html: state.content}}></div>
            {
                userName === state.writer ?
                <>
                    <Button variant='warning'>수정</Button>
                    <Button variant='danger' onClick={()=>setModalShow(true)}>삭제</Button>
                </>
                : ""
            }
        </>
    );
}

export default PostDetail;