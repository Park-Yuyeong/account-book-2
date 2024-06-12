import { useSelector } from "react-redux";
import styled from "styled-components";
import ExpenditureItem from "../ExpenditureItem";

const ExpenditureList = () => {
  const itemList = useSelector((state) => state.expenditureSlice.expenditure);
  const selectedMonth = useSelector(
    (state) => state.selectedMonthSlice.selectedMonth
  );

  const filteredList = itemList.filter((item) => item.month === selectedMonth);

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
