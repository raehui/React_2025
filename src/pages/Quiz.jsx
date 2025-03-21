import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import MarkDown from 'react-markdown';

function Quiz() {
    let quizs = ["콘솔창에 1~10 까지 순서대로 출력하는 code를 javascript 로 작성해 보세요",
        "myName 이라는 변수를 만들고 본인의 이름을 대입해 보세요",
        "object 에 name 이라는 키값으로 본인의 이름을 넣고 addr 이라는 키값으로 주소를 넣어보세요"
    ];


    const handleSubmit = () => {
        //질문과 입력한 답을 json 으로 전송한다.
        axios.post("/gemini/quiz", {
            quiz: quizs[state.index],
            answer: state.inputCode // state 에 있는 내용을 전송한다.

        })
            .then(res => {
                // res.data 는 이런 모양의 object 이다 
                console.log(res.data);
                setState({
                    ...state,
                    ...res.data,
                    isAnswered: true
                });
                //console.log(state.isAnswered);
            })
            .catch(error => console.log(error));
    }

    const [state, setState] = useState({
        index:0, //문제의 index 값 state 로 관리
        isAnswered: false,
        isCorrect: false,
        inputCode:"" // 입력한 code 를 state 로 관리
    });

    //다시 풀기 버튼을 눌렀을 때 실행되는 함수
    // isAnswered 가 false 가 되면 이동함
    const handleRetry = () =>{
        setState({...state, isAnswered:false});
    }

    const handleNext = () =>{
        // 문제의 index 1 증가 , isAnswered : false , inputCode : ""
        setState({
            ...state,
            index : state.index+1,
            isAnswered : false,
            inputCode : ""
        });
    }

    const handleChange = (e) =>{
        //입력한 내용을 바로 state 에 반영하기
        setState({
            ...state,
            inputCode : e.target.value 
        });
    }

    return (
        <>
            <h1>javascript 문제</h1>
            {state.isAnswered ?
                <div>
                    <h3>체점 결과</h3>
                    {state.isCorrect ?
                        <Alert variant='success'>축하 합니다 정답 입니다.</Alert>
                        :
                        <Alert variant='danger'>오답 입니다.</Alert>
                    }
                    <MarkDown>{state.comment}</MarkDown>
                    {/* <div>{state.comment}</div> */}
                    <Button variant='warning' className='me-3' onClick={handleRetry}> &larr; 다시 풀기</Button>
                    <Button variant='success' onClick={handleNext}>다음문제 &rarr;</Button>
                </div>
                :
                <div>
                    <Form.Group className='mb-3'>
                        <Form.Label><strong>{`${state.index+1}.`}</strong> {quizs[state.index]}</Form.Label>
                        <Form.Control onChange={handleChange} value={state.inputCode} as="textarea" rows="10"></Form.Control>
                    </Form.Group>
                    <Button onClick={handleSubmit}>제출</Button>
                </div>
            }

        </>
    )
}

export default Quiz;