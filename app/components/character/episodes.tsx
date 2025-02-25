import { useFragment } from "@apollo/client/react/hooks/useFragment";
import { Tv } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FragmentOf, graphql } from "@/gql";

export const CHARACTER_EPISODES = graphql(`
  fragment CharacterEpisodes on Character {
    episode {
      id
      name
      air_date
      episode
    }
  }
`);

export type CharacterEpisodesProps = {
  from: FragmentOf<typeof CHARACTER_EPISODES>;
};

export function CharacterEpisodes({ from }: CharacterEpisodesProps) {
  const { data, complete } = useFragment({
    from,
    fragment: CHARACTER_EPISODES,
  });

  if (!complete) {
    return null;
  }

  const { episode } = data;

  if (!episode?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Tv className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold">Episodes</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Episode</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Air Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {episode
            .filter((ep): ep is NonNullable<typeof ep> => ep !== null)
            .map((ep) => (
              <TableRow key={ep.id}>
                <TableCell className="font-medium">{ep.episode}</TableCell>
                <TableCell>{ep.name}</TableCell>
                <TableCell>{ep.air_date}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
