import {
  Text,
  TextInput,
  ActionIcon,
  useMantineTheme,
  Container,
  Box,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TildaHeader } from "../components/TildaHeader";

const Message = ({name, message, self}:MessageProps) => {
  return (
    <Box
      sx={{
        backgroundColor: self ? "blue" : "black",
        textAlign: self ? "end" : "start",
      }}
    >
      <Text>
        {name}: {message}
      </Text>
    </Box>
  );
};

interface MessageProps {
  name: string;
  message: string;
  self: boolean;
}

const Chat = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const theme = useMantineTheme();
  const [message, setMessage] = useState("");
  const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET);
  ws.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data);
      setMessages([{name: data.name, message: data.message, self: data.name===currentUser?.name ? true : false}, ...messages])
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (currentUser == null) {
      navigate(`/signin`);
    }
  }, []);

  return currentUser === null ? (
    <Container />
  ) : (
    <Container>
      <TildaHeader />
      <TextInput
        radius="xl"
        size="md"
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
            onClick={() => {
              if (message != "") {
                const payload = JSON.stringify({
                  name: currentUser.name,
                  message: message,
                });
                ws.send(payload);
                setMessage("");
              }
            }}
          >
            <IconArrowRight size={18} stroke={1.5} />
          </ActionIcon>
        }
        placeholder="Lite"
        rightSectionWidth={42}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Box>
        {messages.map((m,i) => {
          return <Message key={i} name={m.name} message={m.message} self={m.self} />
        })}
      </Box>
    </Container>
  );
};

export default Chat;
