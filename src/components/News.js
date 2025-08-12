import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 18,
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Global Times`;
    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    await this.fetchArticles();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { loading, page, totalResults } = this.state;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight &&
      !loading &&
      page < Math.ceil(totalResults / this.props.pageSize)
    ) {
      this.fetchMoreArticles();
    }
  }

  async fetchArticles() {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9f7df8946c5482d872a1bd9053b7821&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false
    });
  }

  async fetchMoreArticles() {
    this.setState({ loading: true });
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9f7df8946c5482d872a1bd9053b7821&page=${nextPage}&pageSize=${this.props.pageSize}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState(prevState => ({
      articles: prevState.articles.concat(data.articles),
      page: nextPage,
      loading: false
    }));
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center mb-4' style={{ marginTop: '5rem' }}>
          Global Times - {this.capitalizeFirstLetter(this.props.category)}
        </h2>

        <div className="row">
          {this.state.articles.map((element, index) => (
            <div className="col my-2 me-3" key={index}>
              <NewsItems
                title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 88) : ""}
                image={element.urlToImage ? element.urlToImage : "https://via.placeholder.com/150"}
                newsurl={element.url}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
          ))}
        </div>

        {this.state.loading && <Spinner />}
      </div>
    );
  }
}

export default News;
