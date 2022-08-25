import {
  Badge,
  Box,
  Button,
  Container,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import { TildaFooter } from "../components/TildaFooter";
import { TildaHeader } from "../components/TildaHeader";
import { fetchFailure, fetchStart, fetchSuccess } from "../redux/gistSlice";
import { RootState } from "../redux/store";
import { User } from "../redux/userSlice";
import { NotFound } from "../components/NotFound";
import MarkdownPreview from "@uiw/react-markdown-preview";
import MarkdownEditor from "@uiw/react-markdown-editor";

const ViewOrEditGist = () => {
  const params = useParams();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const { currentGist } = useSelector((state: RootState) => state.gist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        const userRes = await axios.get(`/users/find/${params.name}`);
        const gistRes = await axios.get(`/gists/find/${params.id}`);
        setUser(userRes.data);
        dispatch(fetchSuccess(gistRes.data));
        setLoading(false);
        setFound(true);
      } catch (err) {
        dispatch(fetchFailure());
        setLoading(false);
        setFound(false);
      }
    };
    fetchData();
  }, [params, dispatch]);

  const isOwner = user?._id === currentUser?._id;

  const ViewGistPage = () => {
    return (
      <Container>
        <TildaHeader />
        <Text>{currentGist?.title}</Text>
        <Text>{currentGist?.desc}</Text>
        <Text>{format(currentGist?.createdAt!!)}</Text>
        {!currentGist?.public && (
          <Badge color="pink" variant="light">
            Private
          </Badge>
        )}
        {isOwner && (
          <Button color={"green"} onClick={() => setEditing(true)}>
            Edit
          </Button>
        )}
        <MarkdownPreview source={currentGist?.url} />
        <TildaFooter />
      </Container>
    );
  };

  const EditGistPage = () => {
    const [source, setSource] = useState(currentGist?.url);
    const [title, setTitle] = useState(currentGist?.title);
    const [desc, setDesc] = useState(currentGist?.desc);
    const [isPrivate, setIsPrivate] = useState(!currentGist?.public);

    const saveGist = () => {
      try {
        axios
          .put(`/gists/${currentGist?._id}`, {
            title,
            desc,
            public: !isPrivate,
            url: source,
          })
          .then((res) => navigate(0));
      } catch (err) {}
    };

    const deleteGist = () => {
      try {
        axios.delete(`/gists/${currentGist?._id}`).then((res) => navigate(0));
      } catch (err) {}
    };

    return (
      <Container>
        <TildaHeader />
        <TextInput
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <TextInput
          value={desc}
          onChange={(event) => setDesc(event.currentTarget.value)}
        />
        <Switch
          checked={isPrivate}
          onLabel={"Private"}
          offLabel={"Public"}
          onChange={(event) => setIsPrivate(event.currentTarget.checked)}
        />
        <Button color={"green"} onClick={() => saveGist()}>
          Save
        </Button>

        <Button color={"red"} onClick={() => deleteGist()}>
          Delete
        </Button>

        <MarkdownEditor
          value={source}
          visible={true}
          onChange={(value) => setSource(value)}
        />
        <TildaFooter />
      </Container>
    );
  };

  return found ? (
    editing ? (
      <EditGistPage />
    ) : (
      <ViewGistPage />
    )
  ) : loading ? (
    <Container />
  ) : (
    <NotFound />
  );
};

export default ViewOrEditGist;
