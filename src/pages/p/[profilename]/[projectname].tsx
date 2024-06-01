import { Button, Tooltip } from "@material-tailwind/react";
import { Button as MaterialButton } from "@material-tailwind/react/components/Button";
import axios from "axios";
import {
  CalendarPlus2,
  Github,
  Home,
  Link,
  LockIcon,
  LogOut,
  SaveAll,
  Settings,
  Trash,
  Trophy,
  UnlockIcon,
  User
} from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import remarkMath from "remark-math";

import { API_V1 } from "@/lib/api/api";
import { useOwner, useSession } from "@/lib/auth/useSession";
import { cn } from "@/lib/utils";
import { isValidHttpUrl } from "@/lib/validate";

import NextImage from "@/components/NextImage";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import { UserMention } from "@/pages-components/profile/UserMention";
import CkziuLogo from "@/shared-components/icon/CkziuLogo";
import DefaultLayout from "@/shared-components/layout/DefaultLayout";
import Seo from "@/shared-components/layout/Seo";
import UnstyledLink from "@/shared-components/link/UnstyledLink";
import { CodefestProject, FetchProject, FetchProjectAxios } from "@/utils/FetchProfile";

interface ProjectPageProps {
  username: string;
  projectname: string;
  serverproject: CodefestProject | null;
}

const ProjectEdit = ({
                       username,
                       projectname,
                       project,
                       setProject
                     }: {
  username: string;
  projectname: string;
  project: CodefestProject;
  setProject: any;
}) => {
  const { toast } = useToast();
  const [patchData, setPatchData] = useState({
    display_name: project.display_name,
    description: project.description ?? "",
    private: project.private,
    github_url: project.github_url,
    website_url: project.website_url,
    content: project.content,
    tournament: project.tournament
  });
  const [uploadingChanges, setUploadingChanges] = useState(false);
  const router = useRouter();

  const deleteProject = async () => {
    setUploadingChanges(true);
    const endpoint = `${API_V1}/projects/${username}/${projectname}`;
    try {
      const res = await axios.delete(endpoint);
      setUploadingChanges(false);
    } catch (err: any) {
      setUploadingChanges(false);
      // Request error or status code != 200
      if (err.response && err.response.message) {
        const data = err.response.data;
        toast({
          variant: "destructive",
          title: "Wystąpił problem",
          description: `Nie udało się usunąć projektu. ${data.message}`
        });
        return;
      }
      toast({
        variant: "destructive",
        title: "Wystąpił nieznany problem",
        description: `Nie udało się usunąć projektu. Sprawdź dostępność serwerów https://ckziucodefest.pl/status`
      });
      return;
    }
    toast({
      variant: "default",
      title: "Usunięto projekt",
      description: `Pomyślnie usunięto projekt ${project.display_name}!`
    });

    await router.push(`/p/${username}`);
  };

  const uploadChanges = async () => {
    const changesData = Object.fromEntries(
      Object.entries(patchData).filter(
        ([name, value]) => project[name as keyof CodefestProject] !== value
      )
    );
    if (Object.entries(changesData).length == 0) {
      return;
    }
    setUploadingChanges(true);
    const endpoint = `${API_V1}/projects/${username}/${projectname}`;
    let response;

    try {
      response = await axios.patch(endpoint, changesData);
      setUploadingChanges(false);
    } catch (err: any) {
      setUploadingChanges(false);
      // Request error or status code != 200
      if (err.response && err.response.message) {
        const data = err.response.data;
        toast({
          variant: "destructive",
          title: "Wystąpił problem",
          description: `Nie udało się zaktualizować projektu. ${data.message}`
        });
        return;
      }
      toast({
        variant: "destructive",
        title: "Wystąpił nieznany problem",
        description: `Nie udało się opublikować projektu. Sprawdź dostępność serwerów https://ckziucodefest.pl/status`
      });
      return;
    }
    const data = response.data;
    if (!data.success) {
      toast({
        variant: "destructive",
        title: "Wystąpił problem",
        description: `Nie udało się zaktualizować projektu. ${data.message}`
      });
      return;
    }

    toast({
      variant: "default",
      title: "Sukces!",
      description: "Pomyślnie zaktualizowano dane projektu!"
    });
    setProject({ ...project, ...patchData });
  };

  return (
    <div className="w-full p-5">
      <NextImage
        src="/images/park.jpg"
        width={3000}
        height={2250}
        alt={project.display_name + " tło"}
        imgClassName="rounded-xl"
        useSkeleton={true}
        className="mb-2 w-full md:w-1/2"
      />
      <Input
        className="font-title text-4xl"
        value={patchData.display_name}
        onChange={(e) =>
          setPatchData({ ...patchData, display_name: e.target.value })
        }
        placeholder="abc"
        maxLength={40}
        disabled={uploadingChanges}
      />
      <div className="mt-2 flex flex-row items-center gap-2">
        <Label
          htmlFor="private"
          className="flex flex-row items-center text-right"
        >
          {patchData.private ? (
            <>
              <LockIcon />
              Prywatny
            </>
          ) : (
            <>
              <UnlockIcon />
              Publiczny
            </>
          )}
        </Label>
        <Checkbox
          id="private"
          className="col-span-3"
          checked={patchData.private}
          onClick={() =>
            setPatchData({ ...patchData, private: !patchData.private })
          }
          disabled={uploadingChanges}
        />
      </div>
      <div className="flex w-1/2 flex-row items-center gap-2">
        <Github className="size-10" />
        <Input
          value={patchData.github_url ?? ""}
          onChange={(e) =>
            setPatchData({ ...patchData, github_url: e.target.value.trim() })
          }
          className={cn(
            patchData.github_url &&
            isValidHttpUrl(patchData.github_url) &&
            patchData.github_url.startsWith("https://github.com/") &&
            patchData.github_url.length >= "https://github.com/".length + 3
              ? ""
              : "text-red-400"
          )}
          placeholder="https://github.com/"
          maxLength={100}
          disabled={uploadingChanges}
        />
        <Link className="size-10" />
        <Input
          value={patchData.website_url ?? ""}
          onChange={(e) =>
            setPatchData({ ...patchData, website_url: e.target.value.trim() })
          }
          className={cn(
            isValidHttpUrl(patchData.website_url ?? "") ? "" : "text-red-400"
          )}
          placeholder="https://witryna.pl"
          maxLength={100}
          disabled={uploadingChanges}
        />
      </div>
      <Textarea
        className="ml-1 mt-2 resize-none text-justify text-xl first-letter:text-2xl"
        value={patchData.description}
        onChange={(e) =>
          setPatchData({ ...patchData, description: e.target.value })
        }
        placeholder="Tutaj powinien znajdować się krótki opis projektu. Możesz pozostawić puste."
        maxLength={100}
        disabled={uploadingChanges}
      />

      {/* Owner buttons */}
      <div className="my-4 flex flex-row gap-2">
        <Button
          color="green"
          variant="gradient"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="my-4 flex min-w-fit flex-row items-center justify-center gap-1 p-2"
          disabled={uploadingChanges}
          loading={uploadingChanges}
          onClick={async () => await uploadChanges()}
        >
          <SaveAll className="size-4" />
          Zapisz zmiany
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              color="red"
              variant="gradient"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="my-4 flex min-w-fit flex-row items-center justify-center gap-1 p-2"
            >
              <Trash className="size-4" />
              Usuń projekt
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Usuwanie projektu</DialogTitle>
              <DialogDescription>
                UWAGA! Usunięcie projektu jest nieodwracalne.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <MaterialButton
                variant="gradient"
                color="red"
                loading={uploadingChanges}
                onClick={async () => deleteProject()}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {uploadingChanges ? "Usuwanie..." : "USUŃ projekt"}
              </MaterialButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {!patchData.tournament ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                color="yellow"
                variant="gradient"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="my-4 flex min-w-fit flex-row items-center justify-center gap-1 p-2"
              >
                <Trophy className="size-4" />
                Zgłoś do konkursu
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex flex-row items-center gap-1">
                  <Trophy /> CKZiU CodeFest24
                </DialogTitle>
                <DialogDescription>
                  UWAGA! Zgłoszenie tego projektu do konkursu odwoła zgłoszenie
                  poprzednich projektów, ponieważ tylko jeden projekt może być
                  zgłoszony. Przedmiotem konkursu jest strona napisana
                  własnoręcznie. Tematyka strony jest dowolna. Projekty
                  niezgodne z regulaminem mogą został usunięte.
                </DialogDescription>
              </DialogHeader>
              <ul>
                <li>
                  <UnstyledLink
                    className="text-blue-400 hover:underline"
                    href="/regulamin"
                    target="_blank"
                  >
                    Zgłaszając prace akceptujesz regulamin konkursu
                  </UnstyledLink>
                </li>
              </ul>
              <div className="text-red-400 underline">

                {patchData.private ? <p>Projekt musi być publiczny.</p> : <></>}
                {patchData.tournament ? <p>Projekt nie może byc już zgłoszony.</p> : <></>}

                {!patchData.website_url ? <p>Projekt musi posiadać stronę internetową.</p> : <></>}
                {!isValidHttpUrl(patchData.website_url ?? "") ?
                  <p>Projekt musi prawidłowy link do strony internetowej.</p> : <></>}

                {!patchData.github_url ? <p>Projekt musi posiadać projekt GitHub.</p> : <></>}
                {!isValidHttpUrl(patchData.github_url ?? "") || !(patchData.github_url ?? "").startsWith("https://github.com/") ?
                  <p>Projekt musi prawidłowy link do GitHub'a.</p> : <></>}
              </div>
              <p>Projekty niespełniające wymagań będą odrzucone.</p>
              <DialogFooter>
                <MaterialButton
                  variant="gradient"
                  color="yellow"
                  loading={uploadingChanges}
                  disabled={patchData.private || !patchData.website_url || !patchData.github_url || !isValidHttpUrl(patchData.website_url ?? "") || !isValidHttpUrl(patchData.github_url ?? "") || patchData.tournament || !patchData.github_url.startsWith("https://github.com/")}
                  onClick={() =>
                    setPatchData({ ...patchData, tournament: true })
                  }
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Zgłoś projekt do konkursu
                </MaterialButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <></>
        )}
      </div>

      <p>Strona projektu wspiera znaczniki <b>HTML</b> oraz <b>Markdown</b>. Możesz wkleić swoje README z GitHub'a</p>

      <div className="border-gradient flex w-full flex-row justify-between gap-2 rounded-xl border-2 bg-accent p-4">
        <div className="min-w-1/2 min-h-full w-1/2 rounded-2xl">
          <Textarea
            className="min-h-full resize-none"
            value={patchData.content}
            onChange={(e) =>
              setPatchData({ ...patchData, content: e.target.value })
            }
            disabled={uploadingChanges}
          />
        </div>
        <Markdown
          className="markdown w-1/2 rounded-2xl"
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          rehypePlugins={[rehypeRaw, remarkImages, remarkMath, rehypeSanitize, rehypeStringify]}
          components={{
            code(props: any) {
              const { children, className, _, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  language={match[1]}
                  lineNumberContainerStyle={true}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            }
          }}
        >
          {patchData.content}
        </Markdown>
      </div>
    </div>
  );
};

const ProjectView = ({
                       username,
                       projectname,
                       project
                     }: {
  username: string;
  projectname: string;
  project: CodefestProject;
}) => {
  return (
    <div className="w-full p-5">
      <NextImage
        src="/images/park.jpg"
        width={3000}
        height={2250}
        alt={project.display_name + " tło"}
        imgClassName="rounded-xl"
        useSkeleton={true}
        className="w-full md:w-1/2"
      />
      <div className="overflow-hidden">
        <h1
          className={cn(
            "font-title animate-uptitle flex flex-row items-center gap-2 text-6xl"
          )}
        >
          {project.private ? (
            <Tooltip content="Tylko ty widzisz ten projekt">
              <LockIcon className="size-10 text-red-400" />
            </Tooltip>
          ) : (
            <></>
          )}
          {project.tournament ? (
            <Tooltip content="Kandydat CKZiU CodeFest24">
              <Trophy className="size-10 text-amber-600" />
            </Tooltip>
          ) : (
            <></>
          )}
          {project.display_name}
        </h1>
      </div>
      <div className="flex flex-row items-center text-muted-foreground">
        <User /> Autorstwa{" "}
        <UserMention userName={username} showAvatar={false} />
      </div>
      <div className="flex flex-row items-center text-muted-foreground">
        <CalendarPlus2 /> Utworzono{" "}
        {new Date(project.created_at).toLocaleDateString()}
      </div>
      <div className="ml-1 mt-5 text-justify text-xl first-letter:text-2xl">
        {project.description}
      </div>
      <div className="my-5 flex flex-row flex-wrap justify-center gap-4 ">
        <UnstyledLink
          className="flex min-w-fit flex-row items-center gap-1 font-bold"
          href={`/p/${username}`}
        >
          <User className="size-8" />{" "}
          <UserMention userName={username} showAvatar={false} />
        </UnstyledLink>
        {project.github_url ? (
          <UnstyledLink
            className="flex min-w-fit flex-row items-center gap-1 font-bold"
            href={project.github_url}
          >
            <Github className="size-8" />
            GitHub
          </UnstyledLink>
        ) : (
          <></>
        )}
        {project.website_url ? (
          <UnstyledLink
            className="flex min-w-fit flex-row items-center gap-1 break-words font-bold"
            href={project.website_url}
          >
            <Link className="h-8 w-6" />
            <span className="text-blue-500 underline">
              {project.website_url}
            </span>
          </UnstyledLink>
        ) : (
          <></>
        )}
      </div>
      <Markdown
        className="markdown"
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw, remarkImages, rehypeSanitize]}
        components={{
          code(props: any) {
            const { children, className, _, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1]}
                lineNumberContainerStyle={true}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          }
        }}
      >
        {project.content}
      </Markdown>
    </div>
  );
};

const ProjectPage = ({
                       username,
                       projectname,
                       serverproject
                     }: ProjectPageProps) => {
  const [project, setProject] = useState<CodefestProject | null>(serverproject);
  const session = useSession();
  const isOwner = useOwner(session, username);
  const [editMode, setEditMode] = useState(false);
  const [fetchedProject, setFetchedProject] = useState(false);

  useEffect(() => {
    (async () => {
      if (isOwner && !fetchedProject) {
        setFetchedProject(true);
        const fetchedProject = await FetchProjectAxios(username, projectname);
        if (fetchedProject != null) setProject(fetchedProject);
      }
    })();
  }, [isOwner]);

  if (project === null) {
    return (
      <DefaultLayout
        breadcrumbs={[
          {
            name: username,
            url: `/p/${username}`
          }
        ]}
      >
        <Seo templateTitle="Nie znaleziono projektu" />
        <section className="main-section">
          <div className="flex flex-col items-center">
            <CkziuLogo width={100} height={100} />
            <h2 className="text-center font-title text-4xl font-bold">
              CODEFEST
            </h2>
            <h1 className="text-center text-2xl font-bold">
              Nie znaleziono projektu{" "}
              <i>
                @{username}/{projectname}
              </i>
            </h1>
            <UnstyledLink href="/">
              <Button
                color="red"
                className="center mt-5 flex-row gap-1"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <LogOut /> Wróć na stronę główną
              </Button>
            </UnstyledLink>
          </div>
        </section>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout
      breadcrumbs={[
        {
          name: username,
          url: `/p/${username}`
        },
        {
          name: project.name,
          url: `/p/${username}/${project.name}`
        }
      ]}
    >
      <Seo
        templateTitle={`@${username}: ${project.display_name}`}
        description={
          `@${username}/${project.name}: ` + (project.description ?? ``)
        }
        date={new Date(project.created_at).toISOString()}
        author={username}
      />
      <div className="container mx-auto mb-5 md:mb-10">
        <div
          className="border-gradient mt-0 min-h-[80vh] rounded-2xl border-4 bg-primary-foreground drop-shadow-xl lg:mt-10">
          <div className="flex min-h-[80vh] flex-col md:flex-row">
            {isOwner ? (
              <div
                className="border-gradient flex h-12 w-full flex-row items-center gap-2 border-b-4 p-4 md:min-h-[80vh] md:w-52 md:flex-col md:border-b-0 md:border-r-4">
                <Button
                  className="flex w-full min-w-fit flex-row items-center justify-between p-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onClick={() => setEditMode(false)}
                >
                  <Home className="size-6" />
                  <span className="flex-1">Widok</span>
                </Button>
                <Button
                  className="flex w-full min-w-fit flex-row items-center justify-between p-2"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onClick={() => setEditMode(true)}
                >
                  <Settings className="size-6" />
                  <span className="flex-1">Właściwości</span>
                </Button>
              </div>
            ) : (
              <></>
            )}
            {editMode ? (
              <ProjectEdit
                username={username}
                projectname={projectname}
                project={project}
                setProject={setProject}
              />
            ) : (
              <ProjectView
                username={username}
                projectname={projectname}
                project={project}
              />
            )}
            {/*{!isOwner ? (*/}
            {/*  <div className='md:min-h-[80vh] w-full h-12 md:w-60 border-t-4 md:border-t-0 md:border-l-4 border-gradient flex flex-row md:flex-col items-center pt-4 gap-2'>*/}
            {/*    <p>*/}
            {/*      Licencja <b>MIT</b>*/}
            {/*    </p>*/}
            {/*    <div className='flex flex-wrap gap-2 justify-center text-sm text-white'>*/}
            {/*      {[*/}
            {/*        'octocat',*/}
            {/*        'atom',*/}
            {/*        'electron',*/}
            {/*        'api',*/}
            {/*        'rust',*/}
            {/*        'nextjs',*/}
            {/*        'javascript',*/}
            {/*        'randomtag',*/}
            {/*        'minecraft',*/}
            {/*        'moderrkowo',*/}
            {/*        'lato',*/}
            {/*        'ckziucodefest',*/}
            {/*      ].map((tag, idx) => {*/}
            {/*        return (*/}
            {/*          <span*/}
            {/*            key={idx}*/}
            {/*            className='bg-blue-500 border-blue-600 border-[1px] drop-shadow hover:bg-blue-600 select-none rounded-full p-1 pl-2 pr-2'*/}
            {/*          >*/}
            {/*            {tag}*/}
            {/*          </span>*/}
            {/*        );*/}
            {/*      })}*/}
            {/*    </div>*/}
            {/*    <div className='px-2'>*/}
            {/*      <Button*/}
            {/*        variant='gradient'*/}
            {/*        color='red'*/}
            {/*        placeholder={undefined}*/}
            {/*        onPointerEnterCapture={undefined}*/}
            {/*        onPointerLeaveCapture={undefined}*/}
            {/*        className='flex flex-row items-center justify-between min-w-fit py-2 px-4 w-full'*/}
            {/*      >*/}
            {/*        <Flag className='w-4 h-4' />*/}
            {/*        <span className='break-words flex-1'>Zgłoś projekt</span>*/}
            {/*      </Button>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*) : (*/}
            {/*  <></>*/}
            {/*)}*/}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

const getServerSideProps = async ({
                                    query
                                  }: {
  query: { profilename: string; projectname: string };
}) => {
  // Extract profile name and project name from query
  // https://ckziucodefest.pl/p/PROFILE_NAME/PROJECT_NAME
  let { profilename, projectname } = query;
  profilename = profilename
    .trimEnd()
    .trimStart()
    .replace(" ", "-")
    .trim()
    .toLowerCase();

  projectname = projectname
    .trimEnd()
    .trimStart()
    .replace(" ", "-")
    .trim()
    .toLowerCase();

  // Fetched user from API can be User or null.
  // Null means Not Found.
  const project: CodefestProject | null = await FetchProject(
    profilename,
    projectname
  );

  return {
    props: {
      username: profilename,
      projectname: projectname,
      serverproject: project
    }
  };
};

export { getServerSideProps };
export default ProjectPage;
