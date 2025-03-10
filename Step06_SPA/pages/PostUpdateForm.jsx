import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


function PostUpdateForm(props) {

    // 경로 파라미터 /posts/:id/edit 값을 가지고 있는 object 얻어내기
    //{id : '수정할 글번호'} 형식의 object 가 리턴된다. 따라서 수정할 글번호는 params.id 이다.
    //{id} 분할할당

    // 글 번호를 파람으로 달고 오면 그걸 추출
    const params = useParams();
    // console.log(params);

    const [post, setPost] = useState({});

    //참조할 값을 저장해주는 hook
    //{current :null}
    //초기값을 담는 current 방이 있음
    let savedPost = useRef(null); // savedPost 는 object 이고 current 라는 방에 저장된 값이 들어 있다.

    useEffect(() => {
        //컴포넌트가 활성화 되는 시점에 수정할 회원의 번호를 이용해서 수정할 회원의 정보를 로딩한다.
        axios.get(`/v3/posts/${params.id}`)
            .then(res => {
                setPost(res.data)
                //useRef() 가 리턴한 object 의 current 에 초기 post 를 저장해 둔다.
                // 초기값 담는 방에 해당하는 id의 내용을 담음
                savedPost.current = res.data;

            })
            .catch(err => console.log(err));
    }, [])

    // title 혹은 author 입력란에 change 이벤트가 발생했을 때 상태값을 변경하도록 한다.
    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value // titel 혹은 author 이 된다. e.target.name 이 가리키는 찐 값으로 된다.
        })
    };

    const navigate = useNavigate();

    return (
        <>
            <h1>Post 수정 폼 입니다.</h1>
             {/* react-bootstrap 로 변경 시 react html 요소 , value , 함수   */}
             {/* 왜 button 이 form 안으로 들어가면 안되는가? 폼을 제출하는 것이 아닌 상태값 변경이기에 */}
            <Form>
                <Form.Group className="mb-3" controlId="id">
                    <Form.Label>글번호</Form.Label>
                    <Form.Control type="text" value={post.id} readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" name="title" onChange={handleChange} value={post.title} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="autohr">
                    <Form.Label>작성자</Form.Label>
                    <Form.Control type="text" name="author" onChange={handleChange} value={post.author} />
                </Form.Group>
            </Form>

             {/* react-bootstrap 로 변경 시 react html 요소 , value , 함수   */}
             <Button variant="success" onClick={() => {
                    axios.put(`/v3/posts/${post.id}`, post)
                        .then(res => {
                            alert(res.data.id + " 번 글을 수정했습니다.");
                            navigate("/posts");
                        })
                        .catch(err => console.log(err));
                }}>수정확인</Button>
                <Button variant="warning" onClick={() => {
                    // useRef() 를 이용해서 저장해 두었던 초기 post 로 되돌린다.
                    setPost(savedPost.current);
                }}>취소</Button>



            {/* <div>
                <label htmlFor="id">글번호</label>
                <input type="text" id="id" name="id" value={post.id} readOnly />
            </div>
            <div>
                <label htmlFor="title">글제목</label>
                <input type="text" id="title" name="title" onChange={handleChange} value={post.title} />
            </div>
            <div>
                <label htmlFor="author">작성</label>
                <input type="text" id="author" name="author" onChange={handleChange} value={post.author} />
            </div>
            <button onClick={() => {
                axios.put(`/posts/${post.id}`, post) // 알아서 json 으로 변경된다.
                    .then(res => {
                        alert(res.data.id + "번 글을 수정했습니다.")
                        navigate("/posts");
                    })
                    .catch(err => console.log(err));
            }}>수정확인</button>
            <button onClick={() => {
                // useRef() 를 이요해서 저장해 두었던 초기 post 로 되돌린다.
                //초기에 담았던 값으로 덮어쓰기
                setPost(savedPost.current);
            }}>취소</button> */}
        </>
    );
}

export default PostUpdateForm;