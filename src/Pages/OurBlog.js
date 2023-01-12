import React, {useEffect, useState} from 'react';
import blogList from "../blogList2.json";
import './OurBlog.css';
import BlogPostCard from "../Components/BlogPostCard";
import FeaturesBlog from "../Components/FeaturesBlog";


const options = [
    {value: 'ViewAll', label: 'View all'},
    {value: 'Design', label: 'Design'},
    {value: 'Product', label: 'Product'},
    {value: 'Software Engineering', label: 'Software Engineering'},
    {value: 'Customer Success', label: 'Customer Success'},
    {value: 'Leadership', label: 'Leadership'},
    {value: 'Management', label: 'Management'}
]

function Home() {
    const [page, setPage] = useState(1);
    // const [sort, setSort] = useState(options[0].value);
    const [blogs, setBlogs] = useState(blogList);
    const [countPage, setCountPage] = useState(Math.ceil(Object.keys(blogs).length / 9));
    // const [windowWidth, setWindowWidth] = useState(window.screen.width);
    const [activeBtn, setActiveBtn] = useState(options[0].label);

    useEffect(() => {
        return () => {

        };
    }, []);

    /* прыгаем при нажатий кнопок */
    const scroll = () => {
        const element = document.getElementById('scrollBlock');
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    /* разбиваем основной масив на страницы */
    function chunkBlog(blog, size) {
        let output = [];
        // Выполняем цикл : (длина массива / длина чанка) = кол-во шагов
        for (let i = 0; i < (blog.length / size); i++) {
            output[i] = blog.slice(i * size, i * size + size);
            // Добавляем новое значение в исх.массив, которое равно - часть массива из входящего массива от i*size (текущая) позиции до текущая + size, это будет массив.
        }
        return output;
    }

    /* Обновление при ввводе input */
    const onChange = (event) => {
        const results = blogList.filter(post => {
            if (event.target.value === "") return post
            return post.title.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setBlogs(results); // обновляем блоги
        setCountPage(Math.ceil(Object.keys(results).length / 8)); // обновляем количество пагинаций
    }

    return (
        <>
            <div className="header_section">
                <div className="container">
                    <div className="content">
                        <p>Our blog</p>
                        <h1>Resources and insights</h1>
                        <p>The latest industry news, interviews, technologies, and resources.</p>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="content" id="scrollBlock">
                        <div className="sidebar">
                            <input type="text" placeholder="&#xf002; Search"
                                   style={{fontSize: "16px", fontFamily: "Arial, FontAwesome"}}
                                   onChange={onChange}
                            />
                            <p>Blog categories</p>
                            <div className="vertical_tabs">
                                {
                                    options.map((item, index) => {
                                        return <button key={index} onClick={
                                            () => {
                                                setActiveBtn(item.label);
                                                //onUpdate(item.label);
                                            }
                                        }
                                                       className={activeBtn === item.label ? 'active' : null}> {item.value} </button>
                                    })
                                }
                            </div>
                        </div>
                        <div className="content">
                            {
                                chunkBlog(blogs, 9)?.[page - 1]?.map((item, index) => {

                                    if (activeBtn === options[0].label) {
                                        if (index === 0) {
                                            return <FeaturesBlog key={index} blog={blogs[index]}/>
                                        }
                                    }else {
                                        console.log(item);
                                        if (index === 0 && activeBtn === item.topic) {

                                            return <FeaturesBlog key={index} blog={blogs[index]}/>
                                        }
                                    }
                                })
                            }
                            <div className="rows">
                                {
                                    chunkBlog(blogs, 9)[page - 1]?.map((item, index) => {
                                        if (activeBtn === options[0].label) {
                                            if (index > 0) {
                                                return <BlogPostCard
                                                    key={index}
                                                    blog={blogs[index]}
                                                />
                                            }
                                        } else {
                                            if (index > 0 && activeBtn === item.topic) {
                                                return <BlogPostCard
                                                    key={index}
                                                    blog={blogs[index]}
                                                />
                                            }
                                        }
                                    })
                                }

                            </div>
                        </div>
                    </div>
                    <div className="pagination">
                        <div>
                            <button
                                disabled={page === 1}
                                onClick={() => {
                                    setTimeout(scroll, 0);
                                    setPage((prevState) => prevState - 1);
                                }}
                            >
                                {'<'} Previous
                            </button>
                        </div>
                        <div className="pagination_number">
                            {

                                [...Array(countPage)].map((x, i) => {
                                        return <button
                                            key={i}
                                            onClick={
                                                () => {
                                                    setTimeout(scroll, 0);
                                                    setPage((i + 1))
                                                }
                                            }>{(i + 1)}</button>
                                    }
                                )
                            }
                        </div>
                        <div>
                            <button
                                disabled={page === countPage}
                                onClick={() => {
                                    setTimeout(scroll, 0);
                                    setPage((prevState) => prevState + 1);
                                }}
                            >
                                Next >
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Home;