import React from 'react';

function FeaturesBlog(props) {
    return (
        <div className="features_blog">
            <img src={require("../assets/card.jpg")} alt=""
                 style={{width: "560px", height: "320px"}}/>
            <div className="content">
                <div className="heading_sub">
                    <div className="badge_group">
                        <div className="badge">
                            <p>{props.blog.topic}</p>
                        </div>
                        <div className="content">
                            <p>{props.blog.readTime}</p>
                        </div>
                    </div>
                    <div className="heading_text">
                        <h1>{props.blog.title}</h1>
                        <p>{props.blog.body}</p>
                    </div>
                </div>
                <div className="avatar_label_group">
                    <img
                        src={props.blog.authorImages}
                        alt="img" style={{width: "40px", height: "40px", borderRadius: "200px"}}/>
                    <div className="text_and_support">
                        <p>{props.blog.author}</p>
                        <p>{props.blog.date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturesBlog;