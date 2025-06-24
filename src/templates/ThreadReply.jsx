import Markdown from "react-markdown"

export default function ThreadReply({data}) {
    return(
        <div className="postReply">
            <span className="threadStrip" />
            <div className="postCard postReply">
                <div className="cardContent postContent">
                <div className="postImages">
                    {data.image_urls.map(image =>(
                        <img key={image.id} src={image.id} alt="Post picture" />
                    ))}
                </div>
                <div className="postTextContent">
                    <div className="postMenu">
                        <div className="postID cardNavigate">
                            <a />
                            <p>#{data.id}</p>
                        </div>
                    </div>
                    <div className="postTitle"></div>
                    <div className="postMessage">
                        <Markdown>
                            {data.text}
                        </Markdown>
                    </div>
                    <div className="postReplies">
                    <div className="postReplyID"></div>
                    {/* <div className="postReplyID"></div>
                    <div className="postReplyID"></div>
                    <div className="postReplyID"></div> */}
                    </div>
                </div>
                </div>
            </div>
        </div>

    )
}