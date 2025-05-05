// function Reply({data}) {
//     const replyIds = data.child_ids.map(reply =>
//         <a>{'>>' + reply + '  '}</a>
//     )
//     if (data.child_ids != [])
//         return(
//             <>
//                 {replyIds}
//             </>
            
//         )
// }
import Markdown from "react-markdown";

// Дочерний компонент PostCard.jsx
const BoardPostCard = ({ data }) => {
    return (
      <div key={data.id} className="postCard">
        <div className="cardContent postContent">
          <div className="postImages">
            {data.image_ids.map(image =>(
              <img key={image.id} src={image.id} alt="Post picture" />
            ))}
          </div>
          <div className="postTextContent">
            <div className="postTitle">
              <p>{data.title}</p>
            </div>
            <div className="postMessage">
              <Markdown>{data.text}</Markdown>
            </div>
            <div className="postReplies">
              {/* <div className="postReplyID">
                <Reply data={data}/>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BoardPostCard;