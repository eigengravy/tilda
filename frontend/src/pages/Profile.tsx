import { Avatar, Box, Container, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GistCardProps } from "../components/GistCard";

import GistCardGrid from "../components/GistCardGrid";
import { TildaFooter } from "../components/TildaFooter";
import { TildaHeader } from "../components/TildaHeader";
import { Gist } from "../redux/gistSlice";
import { RootState } from "../redux/store";
import { User } from "../redux/userSlice";

const Profile = () => {
  const params = useParams();
  const [user, setUser] = useState<User|null>(null);
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
      if (user !== null) {
        const userGists = await Promise.all(
          user?.gists.map(async (gist) => {
            const res = await axios.get(`/gists/find/${gist}`);
            return res.data;
          })
        );
        setGists(userGists);
      }
    };
    fetchGists()
  }, [user])

  const gistCards : GistCardProps[] = gists.map(gist => {
    return {
      title: gist.title,
      author: user?.name!!,
      gistId: gist._id,
      createdAt: gist.createdAt,
      desc: gist.desc,
      isPublic: gist.public ,
    }
   }
  )

  return (
    <Container>
      <TildaHeader />
      <Avatar src={user?.img} />
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
      <GistCardGrid cards={gistCards} />
      <TildaFooter />
    </Container>
  );
};

export default Profile;
