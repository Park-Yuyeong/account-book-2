import { RouterProvider } from "react-router-dom";
import styled from "styled-components";
import router from "./routes/router";

function App() {
  return (
    <StMain>
      <RouterProvider router={router} />
    </StMain>
  );
}

const StMain = styled.main`
  width: 100%;
  min-width: 600px;
  max-width: 800px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0px auto;
  padding: 2rem;
`;

export default App;
