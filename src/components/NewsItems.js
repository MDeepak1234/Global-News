import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let { title, description, image, newsurl,author,date } = this.props;
        return (
                <div>
                    <div className="card" style={{ width: "20rem", height: "31rem" }}>
                        <img src={image} className="card-img-top" alt="..." style={{ height: "12rem" }} />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small>By {author} on {new Date(date).toGMTString()}</small></p>
                            <a rel='noreferrer' href={newsurl} target='_blank' className="btn btn-dark">Read More</a>
                        </div>
                    </div>
                </div>

        )

    }
}

export default NewsItems
