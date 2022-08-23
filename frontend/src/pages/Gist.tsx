import { Container, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import { TildaFooter } from "../components/TildaFooter";
import { TildaHeader } from "../components/TildaHeader";

const Gist = () => {
  let params = useParams();

  return (
    <Container>
      <TildaHeader/>

      <Text>
        {params.name} {params.id}
      </Text>
      <TildaFooter />
    </Container>
  );
};

export default Gist;
