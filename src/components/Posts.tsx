import { Button, Textarea } from '@material-tailwind/react';
import axios from 'axios';
import { Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { API_V1 } from '@/lib/api/api';
import { cn } from '@/lib/utils';

import { ProjectAuthor, UserDisplayName } from '@/components/fetchable/Projects';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import { useToast } from '@/components/ui/use-toast';

import { useName } from '@/globalstate/useName';
import { useUser } from '@/globalstate/useUser';
import { fetchPosts, Post } from '@/utils/FetchPosts';


export const CreatePost = () => {
  const name = useName();
  const user = useUser(name ?? 'moderr');
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState('');
  const { toast } = useToast();
  if (!user) return;

  const createPost = async () => {
    if (content.length < 1) {
      toast({
        variant: 'default',
        title: 'Nie można opublikować projektu',
        description: 'Wpis musi posiadać zawartość'
      });
      return;
    }
    if (content.length > 240) {
      toast({
        variant: 'default',
        title: 'Nie można opublikować projektu',
        description: 'Maksymalna długość wpisu to 240 znaków'
      });
      return;
    }
    setUploading(true);
    try {
      await axios.post(`${API_V1}/posts`, {
        content: content
      });
      setContent('');
      setUploading(false);
    } catch (err: any) {
      setUploading(false);
      toast({
        variant: 'destructive',
        title: 'Wystąpił problem podczas publikowania wpisu',
        description: `Nie udało się utworzyć wpisu. ${err.message}`
      });
      return;
    }
  };

  return <div className={cn('max-w-sm overflow-hidden rounded-md border-2', uploading ? 'animate-pulse' : '')}>
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
            className={cn('text-xs', content.length < 1 || content.length > 240 ? 'text-red-400' : 'text-muted-foreground')}>{content.length} / 240</span>
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

const CardPost = ({ post }: { post: Post }) => {
  return <div className="max-w-sm overflow-hidden rounded-md border-2">
    <div className="px-6 py-4">
      <ProjectAuthor owner_name={post.owner.name} create={post.created_at} type="Wpis" />
      <hr className="my-1 h-px border-0 bg-gray-200 dark:bg-gray-700" />
      <p className="ml-12 mt-2 text-sm text-gray-900 dark:text-gray-300">
        {post.content}
      </p>

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
      <CreatePost />
      {posts.map(post => {
        return <CardPost post={post} key={post.id} />;
      })}
    </>
  );
};

export { CardPost, Posts };