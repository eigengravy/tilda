import { Button, Container, Switch, TextInput } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { TildaFooter } from "../components/TildaFooter";
import { TildaHeader } from "../components/TildaHeader";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const CreateGist = () => {
  const [source, setSource] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate()
  const { currentUser } = useSelector((state: RootState) => state.user);

  const saveGist = async () => {
    try {
      const data = {
        title,
        desc,
        public: !isPrivate,
        url: source,
      };
      const res = await axios.post(`/gists`, data);
      navigate(`/${currentUser?.name}/${res.data._id}`)
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
      <MarkdownEditor
        value={source}
        visible={true}
        onChange={(value) => setSource(value)}
      />
      <TildaFooter />
    </Container>
  );
};

export default CreateGist;
