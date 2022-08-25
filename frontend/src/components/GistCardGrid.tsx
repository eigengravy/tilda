import { Grid } from "@mantine/core";
import GistCard, { GistCardProps } from "./GistCard";

interface GistCardGridProps {
  cards: GistCardProps[];
}

const GistCardGrid = (props: GistCardGridProps) => {
  return (
    <Grid grow>
      {props.cards.map((card) => {
        return (
          <GistCard
            key={card.gistId}
            title={card.title}
            author={card.author}
            gistId={card.gistId}
            desc={card.desc}
            isPublic={card.isPublic}
            createdAt={card.createdAt}
          />
        );
      })}
    </Grid>
  );
};

export default GistCardGrid;
