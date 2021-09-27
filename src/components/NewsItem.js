import React from 'react'

const NewsItem = (props)=> {


 
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    let d = new Date(date);
    let dateTime = d.toLocaleString();
    return (
        <div className="my-3">
            <div className="card">
                <img src={imageUrl ? imageUrl : "https://images.wsj.net/im-407095/social"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 style={{ display: 'inline' }} className="card-title">{title}</h5> 
                        <span  className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
                        {source}
                    </span>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By <b> {!author ? "Unknown" : author}</b> on  <b>{dateTime}</b></small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
                </div>
            </div>
        </div>
    )
    
}

export default NewsItem
