import { Avatar, Box, Container, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GistCardProps } from "../components/GistCard";

import GistCardGrid from "../components/GistCardGrid";
import { TildaFooter } from "../components/TildaFooter";
import { TildaHeader } from "../components/TildaHeader";
import { Gist } from "../redux/gistSlice";
import { User } from "../redux/userSlice";
import { NotFound } from "../components/NotFound";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [gists, setGists] = useState<Gist[]>([]);
  const [gistCards, setGistCards] = useState<GistCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get(`/users/find/${params.name}`);
        setUser(userRes.data);
        const gistsRes = await axios.get(`/gists/user/${params.name}`);
        setGists(gistsRes.data);
        setFound(true);
        setLoading(false);
      } catch (err) {
        setFound(false);
        setLoading(false);
      }
    };
    fetchUser();
  }, [params]);

  useEffect(() => {
    setGistCards(
      gists.map((gist) => {
        return {
          key: gist._id,
          title: gist.title,
          author: user?.name!!,
          gistId: gist._id,
          createdAt: gist.createdAt,
          desc: gist.desc,
          isPublic: gist.public,
        };
      })
    );
  }, [gists]);

  const ProfilePage = () => {
    return (
      <Container>
        <TildaHeader />
        <Box>
          <Avatar src={user?.img} />
          <Text>{user?.name}</Text>
          <Text>{user?.email}</Text>
          <GistCardGrid cards={gistCards} />
        </Box>
        <TildaFooter />
      </Container>
    );
  };

  return loading ? <Container /> : found ? <ProfilePage /> : <NotFound />;
};

export default Profile;
