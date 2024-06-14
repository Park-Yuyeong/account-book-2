import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import api from "../../api/api";
import { updateUser } from "../../redux/slices/auth.slice";

const MyPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authSlice.user);
  if (!user) return null;
  const { nickname, avatar } = user;

  const [myNickname, setMyNickname] = useState(nickname);
  const [imgPath, setImgPath] = useState(avatar ?? "/user.png");
  const imgRef = useRef(null);

  const changeInputNickname = (e) => setMyNickname(e.target.value);

  const { mutateAsync: updateUserInfo } = useMutation({
    mutationFn: (data) => api.auth.updateUserInfo(data),
    onSuccess: () => {
      alert("프로필 업데이트 완료!");
      dispatch(
        updateUser({
          nickname: myNickname,
          avatar: JSON.stringify(imgRef.current.files[0]),
        })
      );
    },
  });

  // 프로필 이미지 변경 & 이미지 미리보기
  const showImage = () => {
    if (imgRef.current && imgRef.current.files) {
      const img = imgRef.current.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        setImgPath(String(reader.result));
      };
    }
  };

  // 프로필 업데이트 버튼 클릭
  const updateProfile = async () => {
    if (myNickname.length > 10) alert("닉네임은 10글자 이내입니다.");
    else
      await updateUserInfo({
        nickname: myNickname,
        avatar: imgRef.current.files[0],
      });
  };

  return (
    <StWrapper>
      <StLogInDiv>
        <StDiv>
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={myNickname}
            onChange={changeInputNickname}
          />
        </StDiv>
        <StDiv>
          <label htmlFor="profile_image">프로필 이미지</label>
          <ImageDiv>
            <img src={imgPath} />
          </ImageDiv>
          <input
            id="profile_image"
            type="file"
            accept=".png, .jpeg, .jpg"
            ref={imgRef}
            onChange={showImage}
          />
        </StDiv>
        <StButtonDiv>
          <StButton onClick={updateProfile}>프로필 업데이트</StButton>
        </StButtonDiv>
      </StLogInDiv>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StLogInDiv = styled.div`
  padding: 20px;
  border: 5px solid #2ec4b6;
  border-radius: 16px;
`;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  label {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  input {
    padding: 10px;
    border: 1px solid #2ec4b6;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 100px;
    height: 100px;
    margin: 10px auto;
    border: 1px solid #2ec4b6;
    border-radius: 50%;
  }
`;

const StButtonDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 35px;

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
  width: 100%;

  &:hover {
    background-color: #1e7970;
  }
`;

export default MyPage;
