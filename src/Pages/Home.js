import React, {useEffect, useState} from 'react';
import blogList from "../blogList.json";
import Header from "../Components/Header/Header";
import Card from "../Components/Card";
import './Home.css';

const options = [
    {value: 'UpNewestFirst', label: '\u2193 Newest first'},
    {value: 'DownNewestFirst', label: '\u2191 Newest first'},
    {value: 'UpAlphabetical', label: '\u2193 In alphabetical order'},
    {value: 'DownAlphabetical', label: '\u2191 In alphabetical order'}
]

function Home() {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(options[0].value);
    const [blogs, setBlogs] = useState(blogList.sort(sortParams()));
    const [countPage, setCountPage] = useState(Math.ceil(Object.keys(blogs).length / 8));
    const [windowWidth, setWindowWidth] = useState(window.screen.width);


    useEffect(() => {
        window.onresize = () => {
            setWindowWidth(window.screen.width)
        };
        return () => {
            window.onresize = false
        };
    }, [windowWidth]);

    /* возвращает параметры при сортировке */
    function sortParams() {
        switch (sort) {
            case options[0].value:
                return ((a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1);
            case options[1].value:
                return ((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1);
            case options[2].value:
                return ((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
            case options[3].value:
                return ((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1);
            default:
                return null;
        }
    }

    /* разбиваем основной масив на страницы */
    function chunkBlog(blogs, size) {
        let output = [];
        // Выполняем цикл : (длина массива / длина чанка) = кол-во шагов
        for (let i = 0; i < (blogs.length / size); i++) {
            output[i] = blogs.slice(i * size, i * size + size);
            // Добавляем новое значение в исх.массив, которое равно - часть массива из входящего массива от i*size (текущая) позиции до текущая + size, это будет массив.
        }
        return output;
    }

    /* Обновление при select */
    const handleChange = (event) => {
        setSort(event.target.value);
    };

    /* Обновление при ввводе input */
    const onChange = (event) => {
        const results = blogList.filter(post => {
            if (event.target.value === "") return post
            return post.title.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setBlogs(results); // обновляем блоги
        setCountPage(Math.ceil(Object.keys(results).length / 8)); // обновляем количество пагинаций
    }

    /* прыгаем при нажатий кнопок */
    const scroll = () => {
        const element = document.getElementById('scrollBlock');
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    return (
        <>
            <div className="header_section">
                <div className="container">
                    <div className="content">
                        <p>Resources</p>
                        <h1>Untitled blog</h1>
                        <p>Tool and strategies modern teams need to help their companies grow.</p>
                        <div className="email_capture">
                            <input type="text" placeholder="Enter you email"/>
                            <button>Get Started</button>
                        </div>
                        <p>We care about you data in our <a href="/#">privacy policy.</a></p>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="content">
                        <div className="sort_and_search">
                            <input type="text" placeholder="&#xf002; Search"
                                   style={{fontSize: "16px", fontFamily: "Arial, FontAwesome"}}
                                   onChange={onChange}/>
                            <select className="sort_selected" onChange={handleChange}>
                                {
                                    options.map((item, index) => {
                                        return <option key={index} value={item.value}> {item.label} </option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="cards" id="scrollBlock">
                            {
                                chunkBlog(blogs, 8)[page - 1]?.sort(sortParams())?.map((item, index) => {
                                    return <Card key={index} image={item.images} date={item.date}
                                                 author={item.author} topic={item.topic} title={item.title}
                                                 body={item.body} link={item.link}/>
                                })
                            }
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
                                    windowWidth > 1200 ?
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
                                        :
                                        <p>Page: {page}</p>
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
            </div>
            <div className="CTA_section">
                <div className="container">
                    <div className="content">
                        <h1>No Long-term contracts.<br/>No catches.</h1>
                        <p>Start you 30-day free trial today</p>
                        <button>Learn more</button>
                        <button>Get started</button>
                    </div>
                    <div className="content">
                        <img src={require("../assets/img1.png")} alt="img"/>
                        <img src={require("../assets/img2.png")} alt="img"/>
                        <br/>
                        <img src={require("../assets/img3.png")} alt="img"/>
                        <img src={require("../assets/img4.png")} alt="img"/>
                        <img src={require("../assets/img5.png")} alt="img"/>
                    </div>
                </div>
            </div>
            <div className="CTA_sections">
                <div className="container">
                    <div className="content">
                        <div>
                            {windowWidth > 1200 ?
                                <h1>Start your 30-day free trial</h1>
                                :
                                <h1>Start you free trial</h1>
                            }
                            <p>Join over 4,000+ startups already growing with Untitled.</p>
                        </div>
                        <div>
                            <button>
                                Learn more
                            </button>
                            <button>
                                Get started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background_overlap"/>
            <div className="footer">
                <div className="container">
                    <div className="content">
                        <div className="logo_and_link">
                            <div className="logo">
                                <img src={require("../assets/blog.png")} alt="" width="32px"/>
                                <h3>Untiled UI</h3>
                            </div>
                            <div className="footer_link">
                                <ul>
                                    <li>Overview</li>
                                    <li>Features</li>
                                    <li>Pricing</li>
                                    <li>Careers</li>
                                    <li>Help</li>
                                    <li>Privacy</li>
                                </ul>
                            </div>
                        </div>
                        <div className="newsletter">
                            <div className="heading">
                                <p>Stay up to date</p>
                            </div>
                            <div className="email_capture">
                                <input type="text" placeholder="Enter you email"/>
                                <button>Subscribe</button>
                            </div>
                        </div>

                    </div>
                    <div className="footer_text">
                        <div className="text">
                            <p>© 2077 Untitled UI. All rights reserved.</p>
                        </div>
                        <ul className="link">
                            <li>Terms</li>
                            <li>Privacy</li>
                            <li>Cookies</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;