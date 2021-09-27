import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {


    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b24e1ef076f4eeb82db4e8e6d2940c4&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({
            articles: parsedData.articles, 
            totalResults: parsedData.totalResults, 
            loading:false
        });
    }

    handlePreviousClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b24e1ef076f4eeb82db4e8e6d2940c4&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({articles: parsedData.articles});

       
        console.log("Next");
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles,
            loading:false
        });
    }

    handleNextClick = async ()=>{
        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8b24e1ef076f4eeb82db4e8e6d2940c4&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            console.log(this.state.page+1);
            let data = await fetch(url);
            let parsedData = await data.json();
            // console.log(parsedData);
            // this.setState({articles: parsedData.articles});
            console.log("Next");
            this.setState({
                page: this.state.page+1,
                articles: parsedData.articles,
                loading:false
            });
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center mb-5">NewsMonkey - Top Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!(this.state.loading ) && this.state.articles.map((element)=>{
                        return  <div className="col-md-4" key={element.url}>
                        <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>    
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1?true:false} className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        );
    }
}

export default News;
