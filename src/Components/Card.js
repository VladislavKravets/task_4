import React from 'react';

function Card(props) {
    return (
        <div className="blog_post_card">
            <div className="img" style={{ backgroundImage: `url(${props.image}` }}>
                <div className="box">
                    <div>
                        <p>{props.author}</p>
                        <p>{props.date}</p>
                    </div>
                    <div>
                        <p>{props.topic}</p>
                    </div>
                </div>
            </div>
            <div className="content">
                <h2>{props.title}</h2>
                <p>{props.body}</p>
                <a href={props.link}>Read post ↗</a>
            </div>
        </div>
    );
}

export default Card;