import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Group, PaperProps, Divider, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

interface AuthProps {
  type: "signin" | "signup";
}

const Auth = ({ type }: AuthProps) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val: string) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
  });

  interface FormValues {
    email: string;
    name: string;
    password: string;
  }

  const dispatch = useDispatch();

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Welcome {type === "signin" && "back"} to Tilda!
        </Title>

        <Group grow mb="md" mt="md">
          <Button
            leftIcon={<IconBrandGoogle />}
            variant="default"
            color="gray"
            radius="xl"
            onClick={() => {
              dispatch(loginStart());
              signInWithPopup(auth, googleProvider)
                .then((result) => {
                  axios
                    .post("/auth/google", {
                      name: result.user.email,
                      email: result.user.email,
                      img: result.user.photoURL,
                    })
                    .then((res) => {
                      dispatch(loginSuccess(res.data));
                      navigate("/", { replace: true });
                    });
                })
                .catch((err) => dispatch(loginFailure()));
            }}
          >
            Google
          </Button>

          <Button
            leftIcon={<IconBrandGithub />}
            variant="default"
            color="gray"
            radius="xl"
            onClick={() => {}}
          >
            Github
          </Button>
        </Group>

        <Divider label="Or continue with" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(async (values: FormValues) => {
            dispatch(loginStart());
            const { email, name, password } = values;
            if (type === "signin") {
              try {
                const res = await axios.post("/auth/signin", {
                  email,
                  password,
                });
                console.log(res);
                dispatch(loginSuccess(res.data));
                navigate("/", { replace: true });
              } catch (err) {
                dispatch(loginFailure());
              }
            } else {
              try {
                const res = await axios.post("/auth/signup", {
                  email,
                  name,
                  password,
                });
                navigate("/signin", { replace: true });
              } catch (err) {}
            }
          })}
        >
          {type === "signup" && (
            <TextInput
              required
              label="Username"
              mt="md"
              placeholder="abc"
              size="md"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
            />
          )}

          <TextInput
            required
            label="Email address"
            placeholder="hello@gmail.com"
            mt="md"
            size="md"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            required
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />

          <Button fullWidth mt="xl" size="md" type="submit">
            {type === "signin" ? "Sign In" : "Sign Up"}
          </Button>

          <Text align="center" mt="md">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Anchor
              weight={700}
              component={Link}
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Sign Up" : "Sign In"}
            </Anchor>
          </Text>
        </form>
      </Paper>
    </div>
  );
};

export default Auth;
