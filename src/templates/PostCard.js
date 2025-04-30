function Reply({data}) {
    const replyIds = data.child_ids.map(reply =>
        <a>{'>>' + reply + '  '}</a>
    )
    if (data.child_ids != [])
        return(
            <>
                {replyIds}
            </>
            
        )
}

// Дочерний компонент PostCard.jsx
const PostCard = ({ data }) => {
    return (
      <div className="postCard">
        <div className="cardContent postContent">
          <div className="postImages">
            <img src={data.image_url} alt="Post picture" />
          </div>
          <div className="postTextContent">
            <div className="postTitle">
              <p>{data.title}</p>
            </div>
            <div className="postMessage">
              <p>{data.text_}</p>
            </div>
            <div className="postReplies">
              <div className="postReplyID">
                <Reply data={data}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PostCard;