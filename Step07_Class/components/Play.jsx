
// src/components/Play.jsx
import React from 'react';

function Play(props) {
    return (
        <div>
            <h2>Play 입니다.</h2>
            {/* App.jsx 에서 글로벌로 css 가 임포트 되었기에 따로 여기서 import 하지 않아도 사용 가능 */}
            <button className='btn btn-primary'>버튼</button>
            <div className='box'></div>
        </div>
    );

}

export default Play;