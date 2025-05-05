export default function ThreadReply({data}) {
    return(
        <div className="postReply">
            <span className="threadStrip" />
            <div className="postCard postReply">
                <div className="cardContent postContent">
                <div className="postImages">
                    <img src="/static/girl.jpg" alt="Post picture" />
                </div>
                <div className="postTextContent">
                    <div className="postMenu">
                    <div className="postID cardNavigate">
                        <a />
                    </div>
                    </div>
                    <div className="postTitle"></div>
                    <div className="postMessage">
                        {data.text}
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