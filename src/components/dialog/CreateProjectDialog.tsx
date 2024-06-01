import { Button as MaterialButton } from "@material-tailwind/react";
import axios from "axios";
import { LockIcon, Plus, UnlockIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { API_V1 } from "@/lib/api/api";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ProfileContext from "@/pages-components/profile/ProfileContext";
import { FetchProject } from "@/utils/FetchProfile";

import { Checkbox } from "../ui/checkbox";
import { useToast } from "../ui/use-toast";

const legalizeChars = new Map([
  [" ", "-"],
  ["ą", "a"],
  ["ć", "c"],
  ["ę", "e"],
  ["ó", "o"],
  ["ś", "s"],
  ["ł", "l"],
  ["ż", "z"],
  ["ź", "z"],
  ["ń", "n"]
]);

const legalizeName = (name: string): string => {
  name = name.toLowerCase().trimStart().trimEnd();
  const buffer = name.split("");
  for (let i = 0; i < buffer.length; i += 1) {
    const char = buffer[i];
    if (buffer[i - 1] === "-" && buffer[i] === "-") {
      buffer[i] = "";
      continue;
    }
    if (legalizeChars.has(char)) {
      buffer[i] = legalizeChars.get(char) ?? "";
      continue;
    }
    if (char.toUpperCase() !== char.toLowerCase()) continue;
    buffer[i] = "";
  }
  if (buffer[0] === "-") buffer[0] = "";
  if (buffer[buffer.length - 1] === "-") buffer[buffer.length - 1] = "";
  return buffer.join("").trim();
};

const DialogCreateProject = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [projectName, setProjectName] = useState("");
  const [projectDisplayname, setProjectDisplayname] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectPrivate, setProjectPrivate] = useState(false);
  const [projectExists, setProjectExists] = useState(false);

  const [projectPublishing, setProjectPublishing] = useState(false);

  const user = useContext(ProfileContext);

  const publishProject = async () => {
    setProjectPublishing(true);

    const endpoint = `${API_V1}/projects`;
    let response;
    try {
      response = await axios.post(endpoint, {
        name: projectName,
        display_name: projectDisplayname,
        description: projectDescription,
        private: projectPrivate
      });
      setProjectPublishing(false);
    } catch (err: any) {
      setProjectPublishing(false);
      // Request error or status code != 200
      if (err.response && err.response.message) {
        const data = err.response.data;
        toast({
          variant: "destructive",
          title: "Wystąpił problem",
          description: `Nie udało się opublikować projektu. ${data.message}`
        });
        return;
      }
      toast({
        variant: "destructive",
        title: "Wystąpił nieznany problem",
        description: `Nie udało się opublikować projektu. Sprawdź dostępnośc serwerów https://ckziucodefest.pl/status`
      });
      return;
    }
    const data = response.data;
    if (!data.success || !data.created) {
      toast({
        variant: "destructive",
        title: "Wystąpił problem",
        description: `Nie udało się opublikować projektu. ${data.message}`
      });
      return;
    }

    setProjectName("");
    setProjectDisplayname("");
    setProjectDescription("");
    setProjectPrivate(false);

    toast({
      variant: "default",
      title: "Sukces!",
      description: "Pomyślnie utworzono nowy projekt!"
    });

    await router.push(`/p/${user.name}/${projectName}`);
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const project = await FetchProject(user.name, projectName);
      setProjectExists(project !== null);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [user.name, projectName]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MaterialButton
          variant="gradient"
          color="green"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="center m-1 p-2"
        >
          <Plus width={16} height={16} /> Utwórz projekt
        </MaterialButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Utwórz projekt</DialogTitle>
          <DialogDescription>
            Utwórz projekt na swoim profilu tutaj. Kliknij utwórz kiedy już
            skończysz.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="center flex-col">
            <h1 className="flex flex-row items-center justify-center gap-2 font-title text-2xl">
              {projectPrivate ? <LockIcon /> : <UnlockIcon />}
              {projectDisplayname}
            </h1>
            <p className="text-center">{projectDescription}</p>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nazwa projektu
            </Label>
            <Input
              id="name"
              defaultValue="Przykładowy projekt"
              className="col-span-3"
              value={projectDisplayname}
              disabled={projectPublishing}
              maxLength={40}
              onChange={(event) => {
                const displayName = event.target.value;
                setProjectName(legalizeName(displayName));
                setProjectDisplayname(displayName);
              }}
            />
          </div>
          <p className="w-full text-center text-sm text-muted-foreground">
            {projectExists ? (
              <span className="text-red-400">
                Nie można utworzyć projektu, ponieważ już istnieje!
              </span>
            ) : (
              <span>
                Projekt będzie wyświetlany pod nazwą:{" "}
                <b className="text-green-400">{projectName}</b>
              </span>
            )}
          </p>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Opis <span className="text-muted-foreground">(opcjonalne)</span>
            </Label>
            <Input
              id="description"
              defaultValue=""
              placeholder="Przykładowy projekt napisany..."
              className="col-span-3"
              disabled={projectPublishing}
              maxLength={100}
              value={projectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="private" className="text-right">
              Prywatny
            </Label>
            <Checkbox
              id="private"
              className="col-span-3"
              checked={projectPrivate}
              onClick={() => setProjectPrivate(!projectPrivate)}
              disabled={projectPublishing}
            />
          </div>
        </div>
        <DialogFooter>
          <MaterialButton
            variant="outlined"
            color="green"
            loading={projectPublishing}
            disabled={projectExists}
            onClick={async () => publishProject()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {projectPublishing ? "Publikowanie..." : "Utwórz projekt"}
          </MaterialButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { DialogCreateProject };
