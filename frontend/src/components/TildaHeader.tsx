import { useState } from "react";
import {
  createStyles,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Button,
  Menu,
  Header,
  useMantineTheme,
  MantineTheme,
} from "@mantine/core";
import { IconLogout, IconChevronDown, IconUser } from "@tabler/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/userSlice";

const useStyles = createStyles((theme: MantineTheme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    height: 100,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

export function TildaHeader() {
  const globalTheme = useMantineTheme();
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Header height={60} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Text component={Link} to={`/`} size={40}>
            Tilda
          </Text>
        </Group>

        {currentUser === null ? (
          <Group>
            <Button component={Link} to="/signin">
              Sign In
            </Button>
            <Button component={Link} to="/signup">
              Sign Up
            </Button>
          </Group>
        ) : (
          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar
                    src={currentUser.img!!}
                    alt={currentUser.name}
                    radius="xl"
                    size={20}
                  />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {currentUser.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                component={Link}
                to={`/${currentUser.name}`}
                icon={<IconUser size={14} stroke={1.5} />}
              >
                Profile
              </Menu.Item>

              <Menu.Item
                onClick={() => {
                  dispatch(logout());
                  navigate("/", {replace: true})
                }}
                icon={<IconLogout size={14} stroke={1.5} />}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </div>
    </Header>
  );
}
