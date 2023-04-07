import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)



  

  const  updateNews = async() =>{
   props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=11d1bbf07efc4606822de2773ce52f1f&page=${page}&pageSize=${props.pageSize}`;
    // https://newsapi.org/v2/top-headlines?country=in&category=$general&apiKey=11d1bbf07efc4606822de2773ce52f1f&page=1&pageSize=6
   props.setProgress(20);
   setLoading(true);
   props.setProgress(40);
    let data = await fetch(url);
   props.setProgress(60);
    let parsedData = await data.json();
   props.setProgress(80);
   setArticles(parsedData.articles)
   setTotalArticles(parsedData.totalArticles)
   setLoading(false)
   props.setProgress(100);
  }

  useEffect(() => {
    
    document.title = props.category[0].toUpperCase() + props.category.slice(1) +
      " - Hogwarts of News";
    updateNews(); 
  },[props.category]) // eslint-disable-line react-hooks/exhaustive-deps

  
  

   const fetchMoreData = async()=>{
     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=11d1bbf07efc4606822de2773ce52f1f&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalArticles(parsedData.totalResults)
   
  }


    let { mode } =props;
    return (
      <>
        <h2
          className={`text-center text-${mode === "light" ? "dark" : "light"}`}
          style={{ marginTop: "100px" }}
        >
          Hogwarts of News - Top {props.category.toUpperCase()} Headlines
        </h2>

        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalArticles}
          loader={<h4 className="text-center"><Spinner/></h4>}
        >

        

        <div className="container my-3">
        <h4 className="text-center">{loading && <Spinner/>}</h4>
        <div className="row">
          {articles.map((element) => {
              let publishTime = new Date(element.publishedAt).toLocaleString();
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description? element.description.slice(0, 88): ""}
                    publish_time={publishTime}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author ? element.author : "Anonymous"}
                    source={element.source.name}
                    bgColor={mode === "light" ? "white" : "#012F49"}
                    textColor={mode === "light" ? "black" : "white"}
                    btnColor={mode === "light" ? "black" : "#CBEBFD"}
                  />
                </div>
              );
            
          })}
        </div>
        </div>
        </InfiniteScroll>

       
      </>
    );
  }


News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
