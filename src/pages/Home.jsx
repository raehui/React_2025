import axios from 'axios';
import React from 'react';

function Home(props) {
    return (
        <div>
            <h1>인덱스 페이지 입니다</h1>
            <button onClick={()=>{
                axios.get("/ping")
                .then(res =>{
                    alert(res.data);
                    
                })
                .catch(error=>{
                    alert("응답하지 않음");
                })
            }}>Ping 요청</button>

        </div>
    );
}

export default Home;