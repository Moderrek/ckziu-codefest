import {ApiArticleData} from "@/lib/api_responses";

export default function Article(props: { article: ApiArticleData }) {
  // @ts-ignore
  return (
    <div className="card w-96 h-100 bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title">{props.article.title}</h3>
        <h1 className="card-title">{props.article.author}</h1>
        <p>{props.article.description}</p>
      </div>
      <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"/></figure>
    </div>
  )
}