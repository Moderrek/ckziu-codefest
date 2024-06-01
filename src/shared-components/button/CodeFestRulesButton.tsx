import { Button, Tooltip } from "@material-tailwind/react";
import { Book } from "lucide-react";

import UnstyledLink from "@/shared-components/link/UnstyledLink";

const CodeFestRulesButton = () => {
  return (
    <Tooltip content="Przejdziesz na zewnętrzny regulamin na stronie szkoły.">
      <UnstyledLink href="/regulamin">
        <Button
          variant="gradient"
          color="red"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="flex flex-row items-center justify-between gap-1 px-4 py-2 font-semibold"
        >
          <Book className="size-6" /> Regulamin konkursu
        </Button>
      </UnstyledLink>
    </Tooltip>
  );
};

export { CodeFestRulesButton };
