import { Container } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

import GistCardGrid from "../components/GistCardGrid";
import { TildaFooter } from "../components/TildaFooter";
import { TildaHeader } from "../components/TildaHeader";
import { GistCardProps } from "../components/GistCard";
import { Gist } from "../redux/gistSlice";

const Dashboard = () => {
  const [gists, setGists] = useState<Gist[]>([]);
  const [gistCards, setGistCards] = useState<GistCardProps[]>([]);

  useEffect(() => {
    const fecthGists = async () => {
      try {
        const res = await axios.get("/gists/latest");
        setGists(res.data);
      } catch (err) {
        throw err;
      }
    };
    fecthGists();
  }, []);

  useEffect(() => {
    const fetchGistCards = async () => {
      const gistCardsRes = await Promise.all(
        gists.map(async (gist) => {
          const userRes = await axios.get(`/users/findById/${gist.userId}`);
          const userData = await userRes.data;
          return {
            key: gist._id,
            title: gist.title,
            author: userData.name,
            gistId: gist._id,
            createdAt: gist.createdAt,
            desc: gist.desc,
            isPublic: gist.public,
          };
        })
      );
      setGistCards(gistCardsRes);
    };
    fetchGistCards();
  }, [gists]);

  return (
    <Container>
      <TildaHeader />
      <GistCardGrid cards={gistCards} />
      <TildaFooter />
    </Container>
  );
};

export default Dashboard;
