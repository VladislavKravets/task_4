import React from 'react';

function BlogPostCard(props) {
    return (
        <div className="blog_post_card">
            <div
                style={{
                    width: "420px",
                    height: "240px",
                    // backgroundImage: `url(https://vgorode.ua/img/article/3938/12_main-v1573686449.jpg)` отладка
                    backgroundImage: `url(${props.blog.images}`
                }}
            />

            <div className="heading_and_sub">
                <div className="badge_group">
                    <div className="badge">
                        <p>{props.blog.topic}</p>
                    </div>
                    <div className="content">
                        <p>{props.blog.readTime}</p>
                    </div>
                </div>
                <div className="heading_and_text">
                    <div className="head_and_ico">
                        <h1>{props.blog.title}</h1>
                        <h1>↗</h1>
                    </div>
                    <p>{props.blog.body}</p>
                </div>
            </div>
            <div className="avatar_label_group">
                <img
                    src={props.blog.authorImages}
                     style={{
                         width: "40px",
                         height: "40px",
                         borderRadius: "200px",
                }}/>
                <div className="text_and_support">
                    <p>{props.blog.author}</p>
                    <p>{props.blog.date}</p>
                </div>
            </div>
        </div>
    );
}

export default BlogPostCard;