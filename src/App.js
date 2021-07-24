import "./styles.css";
import UserList from "./UserList";
import React, { useRef, useState } from "react";
import CreateUser from "./CreateUser";

export default function App() {
  // 여러개의 input 관리 하기 위해 useState 여러번 쓰는 것이 아니라, 객체형체로 관리
  const [inputs, setInputs] = useState({
    username: "",
    email: ""
  });

  //미리 inputs, setInputs 추출
  const { username, email } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      //객체에서 스프레드 연산자를 사용해서 기존 값을 넣음
      ...inputs,
      // 받아온 name 값을 value로 덮어쓰우기, 밑에서 name 은 배열의 usename 이나 email 임
      [name]: value
    });
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "make",
      email: "make111@gmail.com"
    },
    {
      id: 2,
      username: "jane",
      email: "jane6988@gmail.com"
    },
    {
      id: 3,
      username: "john",
      email: "john244@gmail.com"
    }
  ]);
  //새로운 값을 추가하고싶을 때나 push, splice, sort 사용X
  //새로운 항목을 추가하는 방법(1~2)

  //useRef 가 변경된다고 리랜더링 X
  const nextId = useRef(4);

  const onCreate = () => {
    //1. 배열에서도 스프레드 연산자 사용가능
    //기존 배열을 복사하여, ...users 넣은다음 새로운 배열 [...users, user] 만들고 뒤에 user 넣어주면 항목 추가
    const user = {
      id: nextId.current,
      username,
      email
    };

    // 2. 새로운 배열을 만들어서 맨 마지막에 붙여줌
    // setUsers([...users, user]); 이것이 아니라 밑에 부분
    setUsers(users.concat(user));

    //클릭시 삭제하는 방법
    setInputs({
      username: "",
      email: ""
    });

    console.log(nextId.current); //4
    nextId.current += 1;
  };
  return (
    <div className="App">
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </div>
  );
}
