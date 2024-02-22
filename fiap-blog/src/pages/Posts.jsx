import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { client } from "../lib/createClient";
import { Link } from "react-router-dom";
import { Pagination } from "../components/Pagination";

export const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limitPerPage = 3;
    
    useEffect(() => {
        client
            .getEntries({
                content_type: 'blogPost',
                limit: limitPerPage,
                order: "sys.createdAt"
            })
            .then(function (entries) {
                console.log('posts', entries);
                setPosts(entries.items);
                setTotalPages(entries.total)
            });
    }, []);
    useEffect(() => {
        client
            .getEntries({
                content_type: 'blogPost',
                skip: (currentPage * limitPerPage) - limitPerPage,
                limit: limitPerPage,
                order: "sys.createdAt"
            })
            .then(function (entries) {
                setPosts(entries.items);
            });
    }, [currentPage]);
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="mt-1">
                        <Link to="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            &lt;- Voltar para Home
                        </Link>
                    </div>
                    <main className="col-md-8">
                        <h1 className="my-3">Últimos posts</h1>

                        {posts.map(post => (
                            <div className="card mb-3" key={post.sys.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{post.fields.postTitle}</h5>
                                    <p className="card-text">{post.fields.postDescription}</p>
                                    <Link to={`/post/${post.fields.postSlug}`} className="card-link">
                                        Ver post
                                    </Link>
                                </div>
                            </div>
                        ))}

                        <Pagination currentPage={currentPage} totalPages={totalPages/limitPerPage} onPageChange={setCurrentPage}/>
                        
                    </main>
                </div>
            </div>
        </Layout>
    )
}