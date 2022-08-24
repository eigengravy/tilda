import { Avatar, Box, Container, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import GistCardGrid from "../components/GistCardGrid";
import { TildaFooter } from "../components/TildaFooter";
import { TildaHeader } from "../components/TildaHeader";
import { Gist } from "../redux/gistSlice";
import { RootState } from "../redux/store";
import { User } from "../redux/userSlice";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState<User>(null);
  const navigate = useNavigate();
  const [gists, setGists] = useState<Gist[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userRes = await axios.get(`/users/find/${params.name}`);
      if (userRes.status === 200) {
        setUser(userRes.data);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user === null) {
      navigate("/notfound");
    }
  }, [user]);

  useEffect(() => {
    const fetchGists = async () => {
      const userGists = await Promise.all(
        user?.gists.map(async (gist) => {
          const res = await axios.get(`/gists/find/${gist}`);
          return res.data;
        })
      );
      setGists(userGists);
    };
    fetchGists()
  }, [user]);

  return (
    <Container>
      <TildaHeader />
      <Avatar src={user?.img} />
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <GistCardGrid cards={gists} />
      <TildaFooter />
    </Container>
  );
};

export default Profile;
