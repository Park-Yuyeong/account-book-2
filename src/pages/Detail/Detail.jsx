import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../api/api";

const Detail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const detailId = useParams().id;
  const nickname = useSelector((state) => state.authSlice.user.nickname);

  const refDate = useRef("");
  const refCategory = useRef("");
  const refCost = useRef(0);
  const refContent = useRef("");

  const {
    data: detailItem,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["expense", detailId],
    queryFn: () => api.expense.getExpenseItem(detailId),
  });

  const { mutateAsync: updateExpenseItem } = useMutation({
    mutationFn: (data) => api.expense.updateExpenseItem(data),
    onSuccess: () => {
      alert("지출 데이터가 수정되었습니다");
      queryClient.invalidateQueries(["expenses"]);

      navigate("/");
    },
  });

  const { mutateAsync: deleteExpenseItem } = useMutation({
    mutationFn: (expenseId) => api.expense.deleteExpenseItem(expenseId),
    onSuccess: () => {
      alert("지출 데이터가 삭제되었습니다.");

      navigate("/");
    },
  });

  if (isPending) {
    return <StDetailWrapper>Loading...</StDetailWrapper>;
  }

  if (isError) {
    return (
      <StDetailWrapper>
        지출 내역을 불러오는 도중 오류가 발생했습니다😢
      </StDetailWrapper>
    );
  }

  if (!detailItem) {
    return <StDetailWrapper>Loading...</StDetailWrapper>;
  }

  const { date, category, cost, content, createdBy } = detailItem;

  // 지출 내역 수정
  const modifyAccountBookItem = async () => {
    const detailDate = refDate.current.value.trim();
    const detailCategory = refCategory.current.value.trim();
    const detailCost = refCost.current.value.trim();
    const detailContent = refContent.current.value.trim();

    if (
      detailDate.length &&
      detailCategory.length &&
      detailCost > 0 &&
      detailContent.length
    ) {
      const check = confirm("수정하시겠습니까?");
      if (check) {
        const changedItem = {
          id: detailId,
          date: detailDate,
          category: detailCategory,
          cost: detailCost,
          content: detailContent,
          month: new Date(detailDate).getMonth() + 1,
          createdBy,
        };

        await updateExpenseItem(changedItem);
      } else {
        alert("수정이 취소되었습니다");
      }
    } else {
      alert("알맞은 지출 양식을 작성해주세요!");
    }
  };

  // 지출 내역 삭제
  const deleteAccountBookItem = async () => {
    const check = confirm("삭제하시겠습니까?");
    if (check) {
      await deleteExpenseItem(detailId);
    } else {
      alert("삭제가 취소되었습니다");
    }
  };

  // Home으로 이동
  const goToBack = () => navigate("/");

  return (
    <StDetailWrapper>
      <StDiv>
        <label htmlFor="detail-date">날짜</label>
        <input
          id="detail-date"
          type="date"
          placeholder="YYYY-MM-DD"
          min="2024-01-01"
          max="2024-12-31"
          ref={refDate}
          defaultValue={date}
        />
      </StDiv>
      <StDiv>
        <label htmlFor="detail-category">항목</label>
        <input
          id="detail-category"
          type="text"
          placeholder="지출 항목"
          ref={refCategory}
          defaultValue={category}
        />
      </StDiv>
      <StDiv>
        <label htmlFor="detail-cost">금액</label>
        <input
          id="detail-cost"
          type="number"
          placeholder="지출 금액"
          ref={refCost}
          defaultValue={cost}
        />
      </StDiv>
      <StDiv>
        <label htmlFor="detail-content">내용</label>
        <input
          id="detail-content"
          type="text"
          placeholder="지출 내용"
          ref={refContent}
          defaultValue={content}
        />
      </StDiv>
      <StButtonDiv>
        {nickname === createdBy ? (
          <>
            <StDetailPageButton onClick={modifyAccountBookItem}>
              수정
            </StDetailPageButton>
            <StDetailPageButton onClick={deleteAccountBookItem}>
              삭제
            </StDetailPageButton>
          </>
        ) : (
          ""
        )}

        <StDetailPageButton onClick={goToBack}>뒤로가기</StDetailPageButton>
      </StButtonDiv>
    </StDetailWrapper>
  );
};

const StDetailWrapper = styled.div`
  padding: 20px;
  border: 5px solid #2ec4b6;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
`;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    font-size: 14px;
  }

  input {
    padding: 10px;
    border: 1px solid #2ec4b6;
    border-radius: 4px;
    font-size: 14px;
  }

  #detail-date {
    max-width: 150px;
  }
`;

const StButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const StDetailPageButton = styled.button`
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

export default Detail;
