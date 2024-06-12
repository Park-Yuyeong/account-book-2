import ExpenditureList from "../../components/ExpenditureList";
import InputForm from "../../components/InputForm";
import MonthSelector from "../../components/MonthSelector";

const Home = () => {
  return (
    <>
      <InputForm />
      <MonthSelector />
      <ExpenditureList />
    </>
  );
};

export default Home;
