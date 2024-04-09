export type ApiArticleData = {
  author: string;
  title: string;
  description: string;
};

export type ApiProjectData = {
  display_name: string;
  author: string;
  description: string;
  thumbnail_url: string;
  likes: number;
};

export type ApiArticlesData = ApiArticleData[];
export type ApiProjectsData = ApiProjectData[];
