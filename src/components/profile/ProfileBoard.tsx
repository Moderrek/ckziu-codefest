import React, { useContext } from 'react';

import { Project } from '@/components/fetchable/Projects';
import { CardPost } from '@/components/Posts';
import ProfileContext from '@/components/profile/ProfileContext';

import { useName } from '@/globalstate/useName';
import { Post } from '@/utils/FetchPosts';
import { CodefestProject, User } from '@/utils/FetchProfile';

export const ProfileBoard = () => {
  const user: User = useContext(ProfileContext);
  const projects = user.projects;
  const posts = user.posts;
  const name = useName();
  const isOwner = name !== null && name === user.name;

  if (!user || !projects || !posts)
    return (<>None</>);

  const board = [...posts, ...projects].sort((a, b) => b.created_at - a.created_at);

  return <div className="flex justify-center">
    <div className="flex flex-col gap-4">
      {/*{isOwner ? <>*/}
      {/*  <CreatePost />*/}
      {/*</> : <></>}*/}
      {board.map(item => {
        if ('private' in item) {
          const project = item as CodefestProject;
          project.owner_name = user.name;
          return <Project key={item.id} project={project} showAuthor={true} />;
        }
        const post = item as Post;
        post.owner = {
          displayName: user.display_name, flags: user.flags, id: user.id, name: user.name
        };
        return <CardPost post={post} key={item.id} />;
      })}
    </div>
  </div>;
};