import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function ArticleSection() {
    const { data, error } = useSWR('http://25.50.65.38:3030/article', fetcher)
    console.log(data);

    if (!data || error) return <><div className="flex flex-col gap-4 w-52">
        <div className="skeleton h-16 w-full"></div>
        <div className="skeleton h-4 w-14"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
    </div><div className="flex flex-col gap-4 w-52">
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-4 w-14"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div><div className="flex flex-col gap-4 w-52">
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-4 w-14"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div><div className="flex flex-col gap-4 w-52">
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-4 w-14"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div><div className="flex flex-col gap-4 w-52">
            <div className="skeleton h-16 w-full"></div>
            <div className="skeleton h-4 w-14"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div></>

    return (<>
        {data.map((articles, idx) => {
            return (
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">{articles.title}</h3>
                        <h1 className="card-title">{articles.author}</h1>
                        <p>{articles.description}</p>
                    </div>
                    <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                </div>
            )
        })}
    </>
    )
}