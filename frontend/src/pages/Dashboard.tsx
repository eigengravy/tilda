import { Container } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios"

import GistCardGrid from "../components/GistCardGrid";
import { TildaFooter } from "../components/TildaFooter";
import { TildaHeader } from "../components/TildaHeader";

const Dashboard = () => {
  const [gists, setGists] = useState([])

  useEffect(()=>{
    const fecthGists = async () => {
      const res = await axios.get("/gists/latest")
      setGists(res.data)
    }
    fecthGists()
  },[])

  return (
    <Container>
      <TildaHeader />
      <GistCardGrid
        cards={gists}
      />
      <TildaFooter />
    </Container>
  );
};

export default Dashboard;
