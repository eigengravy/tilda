import { Card, Image, Text, Badge, Button, Group, Grid } from "@mantine/core";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

export interface GistCardProps {
  title: string;
  author: string;
  gistId: string;
  createdAt: string;
  desc?: string;
  isPublic?: boolean;
}

const GistCard = ({
  title,
  author,
  gistId,
  createdAt,
  desc,
  isPublic = true,
}: GistCardProps) => {
  return (
    <Grid.Col span={4}>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        component={Link}
        to={`/${author}/${gistId}`}
      >
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{title}</Text>
          <Text weight={500}>{author}</Text>
          <Text size="sm" color="dimmed">
            {format(createdAt)}
          </Text>
        </Group>

        <Group position="apart" mt="md" mb="xs">
          <Text size="sm" color="dimmed">
            {desc}
          </Text>

          {!isPublic && (
            <Badge color="pink" variant="light">
              Private
            </Badge>
          )}
        </Group>
      </Card>
    </Grid.Col>
  );
};

export default GistCard;
