import {
    Box,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
  import React from "react";
  
  import Login from "../../components/Authentication/Login";
  import Register from "../../components/Authentication/Register";
  
  const HomePage = () => {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          bg={"white"}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl">BotChat GPT</Text>
        </Box>
  
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs variant="soft-rounded">
            <TabList>
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
               <Login/>
              </TabPanel>
              <TabPanel>
                <Register/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </>
    );
  };
  
  export default HomePage;
  