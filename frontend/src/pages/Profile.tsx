import { Container, Text } from "@mantine/core";
import { useParams } from "react-router-dom";

import GistCardGrid from "../components/GistCardGrid";
import { TildaFooter } from "../components/TildaFooter";
import { TildaHeader } from "../components/TildaHeader";

const Profile = () => {
  let params = useParams();

  return (
    <Container>
      <TildaHeader/>
      <Text>{params.name}</Text>
      <GistCardGrid cards={[]} />
      <TildaFooter />
    </Container>
  );
};

export default Profile;
