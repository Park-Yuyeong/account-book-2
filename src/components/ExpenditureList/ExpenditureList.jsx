import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import api from "../../api/api";
import ExpenditureItem from "../ExpenditureItem";

const ExpenditureList = () => {
  const selectedMonth = useSelector(
    (state) => state.selectedMonthSlice.selectedMonth
  );

  const {
    data: expenses,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["expense", { list: true }],
    queryFn: () => api.expense.getExpenses(),
  });

  const filteredList = expenses
    ? expenses.filter((item) => item.month === selectedMonth)
    : [];

  if (isPending) {
    return <StBlankDiv>Loading...</StBlankDiv>;
  }

  if (isError) {
    return (
      <StBlankDiv>지출 내역을 불러오는 도중 오류가 발생했습니다😢</StBlankDiv>
    );
  }

  return (
    <StListSection>
      {filteredList.length === 0 ? (
        <StBlankDiv>지출 내역이 없습니다🍃</StBlankDiv>
      ) : (
        filteredList
          .sort((a, b) => (a.date < b.date ? 1 : -1))
          .map((item) => <ExpenditureItem key={item.id} item={item} />)
      )}
    </StListSection>
  );
};

const StListSection = styled.section`
  border: 5px solid #2ec4b6;
  border-radius: 16px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StBlankDiv = styled.div`
  text-align: center;
  font-size: 16px;
  color: #707070;
  background-color: #f6f7fa;
  border-radius: 8px;
  padding: 20px;
`;

export default ExpenditureList;
