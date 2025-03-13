
import React from 'react';
import { useSelector } from 'react-redux';



function Child(props) {
    const isLogin = useSelector((state)=>state.isLogin);
    const userName = useSelector((state)=>state.userName);
    return (
        <div style={{
            height:"150px",
            "background-color": "yellow"

        }}>
            <h2>Child 요소 입니다.</h2>
            {/* 만일 로그인 중이라면 xxx 님 반가워요! */}
            {isLogin ? <p>{userName}님 반가워요</p>:<></>}
            {/* true 이어야 오른쪽 흐름으로 넘어감 */}
            {isLogin && <p>{userName}님 반가워요</p>}
        </div>
    );
}

export default Child;