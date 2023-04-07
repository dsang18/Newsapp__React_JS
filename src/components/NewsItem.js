
const NewsItem = (props) =>{
  

    let {title, description,imageurl, newsurl, publish_time, author, source, bgColor, textColor, btnColor} = props;
    return (
      <div className="my-3">
        <div className="card border-2" style={{backgroundColor: bgColor, color: textColor}} >
         <span className="position-absolute top-0 translate-middle badge" style={{backgroundColor: "#c10606", zIndex:'1', left:'50%', height:"2.2em"}}>
          <p style={{fontSize: '1.2em'}}>{source}</p></span>
            <img src={imageurl} className="card-img-top" alt={imageurl} style={{width:"97%" , 
            height:"50%"}} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <div className="d-flex justify-content-between">
                  <a href={newsurl} target="_blank" className={`btn btn-sm text-${btnColor==="black"?"light":"dark"} fw-bold`}style={{backgroundColor: btnColor}} rel="noreferrer">Read More</a>
                </div>
                <p className="card-text my-0"><small style={{color:textColor}}>Last updated {publish_time}</small></p>
                <p className="card-text my-0"><small style={{color:textColor}}>By {author}</small></p>
            </div>
        </div>
      </div>
    )
  }


export default NewsItem