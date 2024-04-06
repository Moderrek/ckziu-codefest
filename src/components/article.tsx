import {ApiArticleData} from "@/lib/api_responses";

export default function Article(props: { article: ApiArticleData }) {
  // @ts-ignore
  return (
    <div className="card w-96 glass">
      <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!"/></figure>
      <div className="card-body">
        <h2 className="card-title">{props.article.title}</h2>
        <p>{props.article.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Czytaj</button>
        </div>
      </div>
    </div>
  )
}