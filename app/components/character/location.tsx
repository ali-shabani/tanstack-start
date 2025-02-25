import { useFragment } from "@apollo/client/react/hooks/useFragment";
import { MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FragmentOf, graphql } from "@/gql";

export const CHARACTER_LOCATION = graphql(`
  fragment CharacterLocation on Character {
    location {
      id
      name
      type
      dimension
      created
    }
  }
`);

export type CharacterLocationProps = {
  from: FragmentOf<typeof CHARACTER_LOCATION>;
};

export function CharacterLocation({ from }: CharacterLocationProps) {
  const { data } = useFragment({
    from,
    fragment: CHARACTER_LOCATION,
  });

  const { location } = data;

  if (!location) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold">Current Location</h3>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{location.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Type</p>
            <p className="font-medium">{location.type}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Dimension</p>
            <p className="font-medium">{location.dimension}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
