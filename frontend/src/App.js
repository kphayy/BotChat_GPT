import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ChakraProvider, Container } from '@chakra-ui/react'

import HomePage from "./pages/Home";
import ChatPage from "./pages/Chat";

const Root = () => {
  return (
    <>
      <Container maxW='xl' centerContent>
        <Outlet />
      </Container>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/chats",
        element: <ChatPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </div>
  );
}

export default App;
