export default function PostForm() {
    return (
        <div className="card postForm">
            <span className="cardHeader">
                <span className="red cardBullet"></span>
                <p className="cardName">Post form</p>
            </span>
            <form method="post" className="postFormHandler">
                <div className="typing">
                    <input type="text" placeholder="Title" id="pH"/>
                    <input type="text" placeholder="Text" id="pT"/>

                    <div className="functional">
                        <input type="password" name="tripcode" id="trip" placeholder="Tripcode (unnecessary)"/>
                        <button type="submit">Check</button>
                    </div>
                </div>
                <div className="posting">
                    <input type="file" name="postAttach" id="pA"/>
                    <progress value="10" max="100" className="postingProgress">10%</progress>
                    <button type="submit">Post</button>      
                </div>
            </form>
        </div>
    )
}