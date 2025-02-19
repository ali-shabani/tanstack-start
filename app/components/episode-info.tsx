import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { graphql, FragmentOf } from "@/gql";
import { useFragment } from "@apollo/client/react/hooks/useFragment";

export const CHARACTER_EPISODE_INFO_FRAGMENT = graphql(`
  fragment CharacterEpisodeInfo on Character {
    episode {
      id
      name
      episode
      air_date
    }
  }
`);

export function EpisodeInfo({
  character,
}: {
  character: FragmentOf<typeof CHARACTER_EPISODE_INFO_FRAGMENT>;
}) {
  const { data } = useFragment({
    from: character,
    fragment: CHARACTER_EPISODE_INFO_FRAGMENT,
  });
  const sortedEpisodes = [...data.episode].sort(
    (a, b) => new Date(a.air_date).getTime() - new Date(b.air_date).getTime()
  );

  const firstEpisode = sortedEpisodes[0];
  const lastEpisode = sortedEpisodes[sortedEpisodes.length - 1];

  return (
    <div className="mt-2">
      <Separator className="my-2" />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{data.episode.length} Episodes</Badge>
        </div>
        <div className="text-sm space-y-1">
          <p className="text-muted-foreground">First appearance:</p>
          <p>
            {firstEpisode.episode} - {firstEpisode.air_date}
          </p>
          <p className="text-muted-foreground mt-1">Last appearance:</p>
          <p>
            {lastEpisode.episode} - {lastEpisode.air_date}
          </p>
        </div>
      </div>
    </div>
  );
}
