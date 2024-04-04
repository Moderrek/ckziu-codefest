export default function ArticleEmpty() {
  return (
    <div className="card w-96 h-100 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="skeleton h-4 w-14"></div>
        <div className="skeleton h-4 w-8"></div>
        <div className="skeleton h-8 w-full"></div>
      </div>
      <div className="skeleton h-16 w-full"></div>
    </div>
  )
}