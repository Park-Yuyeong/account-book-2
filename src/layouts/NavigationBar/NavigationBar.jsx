import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";
import { setUser } from "../../redux/slices/auth.slice";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authSlice.user);
  if (!user) return;
  const { nickname, avatar } = user;

  useEffect(() => {
    (async () => {
      const response = await api.auth.getUserInfo();
      if (response) {
        dispatch(
          setUser({
            userId: response.id,
            nickname: response.nickname,
            avatar: response.avatar,
          })
        );
      } else {
        navigate("/log_in");
      }
    })();
  }, [dispatch, user]);

  // 홈페이지로 이동
  const goToHome = () => {
    navigate("/");
  };

  // 마이 페이지로 이동
  const goToMyPage = () => {
    navigate("/my_page");
  };

  // 로그아웃 버튼 클릭
  const clickLogOutButton = () => {
    dispatch(
      setUser({
        userId: null,
        nickname: null,
        avatar: null,
      })
    );
    localStorage.clear();

    const check = confirm("로그아웃 하시곘습니까?");
    if (check) {
      navigate("/log_in");
    }
  };

  return (
    <StNav>
      <StNavigationDiv>
        <StDiv onClick={goToHome}>Home</StDiv> |{" "}
        <StDiv onClick={goToMyPage}>My Page</StDiv>
      </StNavigationDiv>
      <StNavigationDiv>
        <img src={avatar ?? "/user.png"} />
        <StNickname>{nickname}</StNickname>
        <StButton onClick={clickLogOutButton}>로그아웃</StButton>
      </StNavigationDiv>
    </StNav>
  );
};

const StNav = styled.nav`
  background-color: #abe0db;
  display: flex;
  padding: 10px 20px;
  border-radius: 10px;
  justify-content: space-between;
`;

const StNavigationDiv = styled.div`
  display: flex;
  color: white;
  align-items: center;
  font-weight: bold;

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

const StDiv = styled.div`
  padding: 10px;

  cursor: pointer;
`;

const StNickname = styled.div`
  padding: 10px;
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

  &:hover {
    background-color: #1e7970;
  }
`;

export default NavigationBar;
