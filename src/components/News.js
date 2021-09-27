import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f91a1c3f7d894e00ac8436bd85bd2f5f&page=1&pageSize=${this.props.pageSize}`;
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
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f91a1c3f7d894e00ac8436bd85bd2f5f&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
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
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f91a1c3f7d894e00ac8436bd85bd2f5f&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
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
                <h2 className="text-center">NewsMonkey - Top Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return  <div className="col-md-4" key={element.url}>
                        <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
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
