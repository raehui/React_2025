// pages/PostForm.jsx
import axios from 'axios';
import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PostForm(props) {
    // javascript 로 page 이동을 하기위한 hook
    const navigate = useNavigate();
    
    return (
       <>
         <h1>새 post 작성폼</h1>
         <Form action="/v3/posts" method='post' onSubmit={(e)=>{
            e.preventDefault();
            const url = e.target.action;
            // 폼에 입력한 내용을 이용해서 FormData 객체를 생성한다.
            const formData = new FormData(e.target);
            // 폼에 입력한 내용이 object 에 담긴다.
            const obj = Object.fromEntries(formData);
            // axios 를 이용해서 post 방식으로 전송한다. 
            axios.post(url,obj)
            .then(res=>{
                // 저장된 글정보가 응답된다.
                console.log(res.data);
                alert(res.data.id+"번 글로 저장되었습니다.");
                // "/posts" 자바스크립트
                navigate("/posts");
                
            })
            .catch(err=>console.log(err));
         }}>
            <FloatingLabel label="제목" className='mb-3' controlId='title'>
                <Form.Control type='text' name='title' placeholder='제목 입력...'/>
            </FloatingLabel>
            <FloatingLabel label="작성자" className='mb-3' controlId='author'>
                <Form.Control type='text' name='author' placeholder='작성자 입력...'/>
            </FloatingLabel>
            <Button type='submit' variant='success'>저장</Button>
         </Form>

         
       </>
    );
}

export default PostForm;