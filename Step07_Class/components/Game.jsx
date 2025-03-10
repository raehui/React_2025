// src/components/game.jsx
import React, { useState } from 'react';

import myCss from './css/study.module.css'
// classnames 를 import 해서 cn 이라는 이름으로 사용하기
// import cn from 'classnames'
// 외부 css 를 바인딩해서 사용하게 도와주는 binder import
import binder from 'classnames/bind'
// binder 를 이용해서 myCss 를 바인딩해서 cx 라는 이름의 함수로 사용하기
const cx =binder.bind(myCss)

function Game(props) {

    const [array, setArray] = useState(["my-color", "bg-yellow"]);
    const [isYellow, setYellow] = useState(false);
    const [style, setStyle] = useState({
        "my-color" : false,
        "bg-yellow" : false
    })
    const handleChange = (e)=>{
        // 변화된 checkbox 의 name 속성과 체크 여부 얻어내기
        const {name, checked} = e.target;
        setStyle({
            ...style,
            [name]: checked
        })
    }

    return (
        <div>
            <h2 className={cx("my-color")}>Game 입니다.</h2>
            <p className={cx("my-color", "bg-yellow")}>p1</p>
            <p className={cx(["my-color", "bg-yellow"])}>p2</p>
            {/* 배열과 오브젝트로 상태를 제어 가능하게 된다. */}
            <p className={cx(array)}>p3</p>
            <p className={cx({"my-color":true , "bg-yellow":true})}>p4</p>
            bg-yellow <input type="checkbox" onChange={(e)=>{
                //현재 checkbox 의 체크 상태를 isYellow 에 반영한다.
                //체크되면 true 로 변경
                setYellow(e.target.checked);
            }} />
            {/* <p className={cx({"bg-yellow":isYellow})}></p> */}
            <br />
            {/* 체크된 css 요소에 반영  */}
            my-color <input type="checkbox" name='my-color' onChange={handleChange} />
            bg-yellow <input type="checkbox" name='bg-yellow' onChange={handleChange} />
            <p className={cx(style)}>p</p>
            
            

        </div>
    );
}

export default Game;