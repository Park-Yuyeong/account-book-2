import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";

const SignUp = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const changeInputId = (e) => setUserId(e.target.value);
  const changeInputPassword = (e) => setPassword(e.target.value);
  const changeInputNickname = (e) => setNickname(e.target.value);

  const { mutateAsync: signUp } = useMutation({
    mutationFn: (data) => api.auth.signUp(data),
  });

  // 로그인 페이지로 이동
  const clickLogInButton = () => {
    navigate("/log_in");
  };

  // 회원가입 버튼 클릭
  const clickSignUpButton = async () => {
    if (userId.length < 4 || userId.length > 10)
      alert("아이디는 4~10글자로 해주세요");
    else if (password.length < 4 || password.length > 15)
      alert("비밀번호는 4~15글자로 해주세요");
    else if (nickname.length > 10) alert("닉네임은 10글자 이내입니다.");
    else {
      const response = await signUp({ id: userId, password, nickname });

      if (response) {
        alert(response.message);
        navigate("/log_in");
      }
    }
  };

  return (
    <StWrapper>
      <StLogInDiv>
        <StDiv>
          <label htmlFor="userId">아이디(ID)</label>
          <input
            id="userId"
            type="text"
            placeholder="아이디를 입력해주세요"
            value={userId}
            onChange={changeInputId}
          />
        </StDiv>
        <StDiv>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={changeInputPassword}
          />
        </StDiv>
        <StDiv>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={changeInputNickname}
          />
        </StDiv>
        <StButtonDiv>
          <StButton onClick={clickSignUpButton}>회원가입</StButton>
          <StButton onClick={clickLogInButton}>로그인</StButton>
        </StButtonDiv>
      </StLogInDiv>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StLogInDiv = styled.div`
  padding: 20px;
  border: 5px solid #2ec4b6;
  border-radius: 16px;
`;

const StDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  label {
    font-size: 16px;
    font-weight: bold;
    width: 80px;
    text-align: center;
  }

  input {
    padding: 10px;
    border: 1px solid #2ec4b6;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const StButtonDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;

  justify-content: space-between;
`;

const StButton = styled.button`
  padding: 10px 20px;
  background-color: #2ec4b6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  width: 50%;

  &:hover {
    background-color: #1e7970;
  }
`;

export default SignUp;
