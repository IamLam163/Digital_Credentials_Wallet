import React, { useContext, useEffect, useState } from "react";
import { Avatar, Text, Button, Paper } from "@mantine/core";
import { UserContext } from "../context/userContext";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Sidebar from "./Sidebar";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('https://digital-credentials-wallet-git-latest-iamlam163.vercel.app/forgot-password')
      const response = await axios.post(
        "http://localhost:7000/forgot-password",
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>
      <div style={{ marginLeft: "20px", display: "flex", flex: 1, justifyContent: "center", height: '270px', marginTop: '20px'}}>
        {user && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Paper
              radius="md"
              withBorder
              p="sm"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "#001935"
                    ? theme.colors.dark[8]
                    : theme.white,
              })}
            >
              <Avatar
                src="https://images.unsplash.com/photo-1611068813580-b07ef920964b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyJTIwZm9yJTIwbW9iaWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                size={120}
                radius={120}
                mx="auto"
              />
              <Text ta="center" fz="lg" weight={500} mt="md">
                {user.name}
              </Text>
              <Text ta="center" c="dimmed" fz="sm">
                {user.email}
              </Text>

              <Button
                onClick={handleSubmit}
                variant="default"
                fullWidth
                mt="md"
              >
                Change Password
              </Button>
            </Paper>
          </div>
        )}
      </div>
    </div>
  );
}
