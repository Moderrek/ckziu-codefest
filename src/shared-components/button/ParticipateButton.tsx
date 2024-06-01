import { Button, Tooltip } from "@material-tailwind/react";
import { Plus } from "lucide-react";

import { useName } from "@/globalstate/useName";
import UnstyledLink from "@/shared-components/link/UnstyledLink";

const ParticipateButton = () => {
  const name = useName();

  return (
    <Tooltip content="Zgłoś swoją pracę do konkursu.">
      <UnstyledLink href={name ? `/p/${name}` : "/zaloguj"} className="w-1/2">
        <Button
          variant="gradient"
          color="green"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="flex w-full min-w-fit flex-1 flex-row items-center justify-center gap-1"
        >
          <Plus className="size-6" /> Weź udział
        </Button>
      </UnstyledLink>
    </Tooltip>
  );
};

export { ParticipateButton };
