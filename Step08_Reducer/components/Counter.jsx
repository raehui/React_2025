// src/components/Counter.jsx
import React, { useState } from 'react';

function Counter(props) {
    
const [count,setCount] = useState(0);

    return (
        <div>
            <button onClick={()=>{
                setCount(count-1);
            }}>-</button>
            <strong>{count}</strong>
            <button onClick={()=>{
                setCount(count+1);
            }}>+</button>
        </div>
    );
}

export default Counter;