import { Button, Menu, MenuHandler, MenuItem, MenuList, Spinner, Textarea, Tooltip } from "@material-tailwind/react";
import axios from "axios";
import { EllipsisVertical, Heart, Send, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

import { API_V1 } from "@/lib/api/api";
import { cn } from "@/lib/utils";

import { ProjectAuthor, UserDisplayName } from "@/components/fetchable/Projects";
import NextImage from "@/components/NextImage";
import { useToast } from "@/components/ui/use-toast";

import { loginUrl } from "@/constants/constants";
import { useAuthorized } from "@/globalstate/useAuth";
import { useName } from "@/globalstate/useName";
import ProfileContext from "@/pages-components/profile/ProfileContext";
import UnstyledLink from "@/shared-components/link/UnstyledLink";
import { fetchPosts, Post } from "@/utils/FetchPosts";


export const CreatePost = ({ setPosts }: { setPosts: React.Dispatch<React.SetStateAction<Post[]>> }) => {
  const user = useContext(ProfileContext);

  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState("");

  const { toast } = useToast();

  if (!user) return <></>;
  if (!setPosts) return <></>;

  const createPost = async () => {
    if (content.length < 1) {
      toast({
        variant: "default",
        title: "Nie można opublikować projektu",
        description: "Wpis musi posiadać zawartość"
      });
      return;
    }
    if (content.length > 240) {
      toast({
        variant: "default",
        title: "Nie można opublikować projektu",
        description: "Maksymalna długość wpisu to 240 znaków"
      });
      return;
    }
    setUploading(true);
    try {
      const post = await axios.post(`${API_V1}/posts`, {
        content: content
      });
      setContent("");
      setPosts((prev) => {
        const newPosts = [...prev];
        newPosts.unshift(post.data);
        user.posts = newPosts;
        return newPosts;
      });
      setUploading(false);
    } catch (err: any) {
      setUploading(false);
      toast({
        variant: "destructive",
        title: "Wystąpił problem podczas publikowania wpisu",
        description: `Nie udało się utworzyć wpisu. ${err.message}`
      });
      return;
    }
  };

  return <div className={cn("max-w-sm overflow-hidden rounded-md border-2", uploading ? "animate-pulse" : "")}>
    <div className="px-6 py-4">
      <div className="flex">
        <UnstyledLink href={`/p/${user.name}`}>
          <div className="shrink-0">
            <span className="sr-only">{user.display_name}</span>
            <NextImage
              alt={`${user.display_name} Profile Picture`}
              src="/images/ckziu_thumbnail.png"
              width={40}
              height={40}
              imgClassName="w-10 h-10 rounded-full"
            />
          </div>
        </UnstyledLink>

        <div className="ml-3 pt-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            <UserDisplayName user={user} />
          </p>
        </div>
      </div>
      <div className="mt-2">
        <Textarea label="Utwórz nowy wpis" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                  className="text-sm text-gray-900 dark:text-gray-300" disabled={uploading}
                  value={content} onChange={(e) => setContent(e.target.value)} />
      </div>

      <div className="flex justify-end">
        <div className="flex flex-row items-center gap-1">
          <span
            className={cn("text-xs", content.length < 1 || content.length > 240 ? "text-red-400" : "text-muted-foreground")}>{content.length} / 240</span>
          <Button variant="filled" color="blue" placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className="flex size-8 items-center justify-center p-1"
                  onClick={createPost}
                  loading={uploading}
                  disabled={content.length < 1 || content.length > 240}
          >
            {!uploading ? <Send className="size-4" /> : <></>}
          </Button>
        </div>
      </div>
    </div>
  </div>;
};

const CardPost = ({ post, setPosts }: {
  post: Post,
  setPosts: React.Dispatch<React.SetStateAction<Post[]>> | undefined
}) => {
  const [likes, setLikes] = useState(post.likes ?? 0);
  const [liking, setLiking] = useState(false);
  const [liked, setLiked] = useState(post.liked ?? false);

  const [removing, setRemoving] = useState(false);

  const isAuthorized = useAuthorized();

  const authorName = post.owner.name;
  const myName = useName();
  const isMyPost = myName !== null && myName === authorName;

  const { toast } = useToast();

  const like = async () => {
    if (liking) return;
    const like = !liked;
    if (!isAuthorized) {
      toast({
        variant: "destructive",
        title: "Nie można polubić wpisu",
        description: "Zaloguj się, aby polubić wpis"
      });
      return;
    }
    try {
      setLiking(true);
      await axios.get(`${API_V1}/posts/${post.id}/${like ? "like" : "unlike"}`);
      setLiked(like);
      setLikes(likes + (like ? 1 : -1));
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Wystąpił problem podczas polubienia wpisu",
        description: `Nie udało się polubić wpisu. ${err.message}`
      });
    }
    setLiking(false);
  };

  const deletePost = async () => {
    if (removing) return;
    if (!isAuthorized) {
      toast({
        variant: "destructive",
        title: "Nie można usunąć wpisu",
        description: "Zaloguj się, aby usunąć wpis"
      });
      return;
    }
    if (!isMyPost) {
      toast({
        variant: "destructive",
        title: "Nie można usunąć wpisu",
        description: "Nie jesteś właścicielem wpisu"
      });
      return;
    }
    try {
      setRemoving(true);
      const response = await axios.delete(`${API_V1}/posts/${post.id}`);
      const { data } = response;

      if (data.success) {
        if (setPosts) setPosts((prev) => {
          const newPosts = prev.filter((p) => p.id !== post.id);

          return newPosts;
        });
        toast({
          variant: "default",
          title: "Wpis usunięty",
          description: "Wpis został usunięty pomyślnie"
        });
      } else {
        toast({
          variant: "destructive",
          title: "Wystąpił problem podczas usuwania wpisu",
          description: `Nie udało się usunąć wpisu. ${data.message}`
        });
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        if (setPosts) setPosts((prev) => prev.filter((p) => p.id !== post.id));
        toast({
          variant: "destructive",
          title: "Wpis nie istnieje",
          description: "Wpis, który próbujesz usunąć, nie istnieje"
        });
      } else {
        toast({
          variant: "destructive",
          title: "Wystąpił problem podczas usuwania wpisu",
          description: `Nie udało się usunąć wpisu. ${err.message}`
        });
      }
    }
    setRemoving(false);
  };

  return <div className="max-w-sm overflow-hidden rounded-md border-2">
    <div className="px-6 py-4">
      {isAuthorized && isMyPost ?
        <div className="relative">
          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 }
            }}
          >
            <MenuHandler>
              <div className="absolute right-0 top-0">
                <EllipsisVertical className="size-5 text-muted-foreground hover:text-foreground" />
              </div>
            </MenuHandler>
            <MenuList placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <MenuItem onClick={deletePost} disabled={removing}
                        className="flex flex-row items-center gap-1 bg-red-400 text-white" placeholder={undefined}
                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}><Trash
                className="size-4" /> Usuń wpis</MenuItem>
            </MenuList>
          </Menu>
        </div>
        : <></>
      }
      <ProjectAuthor owner_name={post.owner.name} create={post.created_at} type="Wpis" />


      <hr className="my-1 h-px border-0 bg-gray-200 dark:bg-gray-700" />
      <p className="ml-12 mt-2 text-sm text-gray-900 dark:text-gray-300">
        {post.content}
      </p>
      <div className="flex justify-end">
        <div className="flex flex-row items-center gap-1">
          <span className="text-sm text-red-500">{likes}</span>
          {liking ?
            <Spinner className="size-4" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            :
            isAuthorized ?
              <Tooltip content={liked ? "Usuń polubienie" : "Polub wpis"}>
                <Heart className="size-4 text-red-500" fill={liked ? "red" : "none"} onClick={like} /></Tooltip> :
              <Tooltip content="Zaloguj się, aby polubić wpis">
                <UnstyledLink href={loginUrl}>
                  <Heart className="size-4 text-red-500" fill={liked ? "red" : "none"} />
                </UnstyledLink>
              </Tooltip>
          }
        </div>
      </div>
    </div>
  </div>;
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const result = await fetchPosts();
      if (result) setPosts(result);
    })();
  });

  return (
    <>
      {/*<CreatePost />*/}
      {posts.map(post => {
        return <CardPost post={post} key={post.id} setPosts={setPosts} />;
      })}
    </>
  );
};

const PostsOnProfile = () => {
  const profile = useContext(ProfileContext);

  const loggedInUserName = useName();
  const isMyProfile = loggedInUserName !== null && loggedInUserName === profile.name;

  const [posts, setPosts] = useState<Post[]>(profile.posts ?? []);

  return (
    <>
      {isMyProfile ? <CreatePost setPosts={setPosts} /> : <></>}
      {posts.sort((a, b) => b.created_at - a.created_at).map(post => {
        post.owner = {
          id: profile.id,
          name: profile.name,
          displayName: profile.display_name,
          flags: profile.flags
        };
        return <CardPost post={post} key={post.id} setPosts={setPosts} />;
      })}
    </>
  );
};

export { CardPost, Posts, PostsOnProfile };