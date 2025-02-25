import { useFragment } from "@apollo/client/react/hooks/useFragment";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FragmentOf,graphql } from "@/gql";

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

  const { episode } = data;

  if (!episode || episode.length === 0) return null;

  const sortedEpisodes = [...episode]
    .filter((episode): episode is typeof episode & { air_date: string } =>
      Boolean(episode?.air_date)
    )
    .sort(
      (a, b) => new Date(a.air_date).getTime() - new Date(b.air_date).getTime()
    );

  if (sortedEpisodes.length === 0) return null;

  const firstEpisode = sortedEpisodes[0];
  const lastEpisode = sortedEpisodes[sortedEpisodes.length - 1];
  const isSingleEpisode = sortedEpisodes.length === 1;

  return (
    <div className="mt-2">
      <Separator className="my-2" />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{episode.length} Episodes</Badge>
        </div>
        <div className="text-sm space-y-1">
          <p className="text-muted-foreground">
            {isSingleEpisode ? "Appearance:" : "First appearance:"}
          </p>
          <p>
            {firstEpisode.episode} - {firstEpisode.air_date}
          </p>
          {!isSingleEpisode && (
            <>
              <p className="text-muted-foreground mt-1">Last appearance:</p>
              <p>
                {lastEpisode.episode} - {lastEpisode.air_date}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
