import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const changeInputId = (e) => setUserId(e.target.value);
  const changeInputPassword = (e) => setPassword(e.target.value);

  const { mutateAsync: logIn } = useMutation({
    mutationFn: (data) => api.auth.logIn(data),
  });

  // 로그인 버튼 클릭
  const clickLogInButton = async () => {
    const response = await logIn({ id: userId, password });

    if (response) {
      alert("로그인 성공!");
      navigate("/");
    }
  };

  // 회원가입 페이지로 이동
  const clickSignUpButton = () => {
    navigate("/sign_up");
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
        <StButtonDiv>
          <StButton onClick={clickLogInButton}>로그인</StButton>
          <StButton onClick={clickSignUpButton}>회원가입</StButton>
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

export default LogIn;
