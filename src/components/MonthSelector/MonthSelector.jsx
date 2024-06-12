import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeSelectedMonth } from "../../redux/slices/selectedMonth.slice";

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const MonthSelector = () => {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(
    (state) => state.selectedMonthSlice.selectedMonth
  );

  const clickMonth = (month) => dispatch(changeSelectedMonth(month));

  return (
    <StMonthsSection>
      {MONTHS.map((month) => (
        <StMonthButton
          key={month}
          onClick={() => clickMonth(month)}
          $selected={month === selectedMonth}
        >
          {month}월
        </StMonthButton>
      ))}
    </StMonthsSection>
  );
};

const StMonthsSection = styled.section`
  border: 5px solid #2ec4b6;
  border-radius: 16px;
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const StMonthButton = styled.button`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  height: 60px;
  padding: 20px;
  width: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  background-color: ${(props) => (props.$selected ? "#2ec4b6" : "#F6F7FA")};
  color: ${(props) => (props.$selected ? "white" : "black")};

  &:hover {
    color: white;
    background-color: #2ec4b6;
  }
`;

export default MonthSelector;
