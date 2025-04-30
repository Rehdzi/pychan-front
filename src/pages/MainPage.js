import api from "../api";
import PostCard from "../templates/PostCard";
import { useState, useEffect } from "react";

function MainPage() {

    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get('/boards/latest');
          setPosts(response.data); // Сохраняем данные в состояние
        } catch (error) {
          console.error('Ошибка:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
        <div className="pageContent">
            <header className="mainPageHeading">
                <div className="naming">
                <div className="boardTitle">
                    {"{"}title{"}"}
                </div>
                <div className="boardSlogan">
                    {"{"}motd{"}"}
                </div>
                </div>
                <div className="boardSplash">
                <a className="boardSplashLink">
                    <img
                    src="{splash_source}"
                    alt="BoardSplash"
                    className="boardSplashImage"
                    />
                    {/* <span class="boardSplashName">/soc/</span> */}
                </a>
                </div>
            </header>
            <main className="panels">
                <div className="leftContent">
                <div className="card">
                    <span className="cardHeader">
                    <span className="blue cardBullet" />
                    <p className="cardName">Picture of the day</p>
                    <a className="cardNavigate">on /a/</a>
                    </span>
                    <div className="cardContent">
                    <img src="./girl.jpg" />
                    </div>
                </div>
                <div className="card">
                    <span className="cardHeader">
                    <span className="green cardBullet" />
                    <p className="cardName">Thread of the day</p>
                    <a className="cardNavigate">on /a/</a>
                    </span>
                    <div className="cardContent ToTD">
                    <div className="postImages">
                        <img src="./girl.jpg" alt="Post picture" />
                    </div>
                    <div className="postTextContent mTText">
                        <p className="postTitle">LOREM IPSUM! DOLOR SIT AMET.</p>
                        <p className="postMessage">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                        dignissim libero est, sed commodo tellus luctus a. Quisque
                        volutpat porta mi, sit amet semper lorem tincidunt et. Curabitur
                        est dui, tempor a nulla eu.
                        </p>
                    </div>
                    </div>
                </div>
                <div id="boards">
                    <div className="card">
                    <span className="cardHeader">
                        <span className="yellow cardBullet" />
                        <p className="cardName">Boards list</p>
                    </span>
                    <div className="boardsList cardContent">
                        <div className="boardsListCategory">
                        <p className="" />
                        </div>
                        {/* <a href="/" class="boardTagSlashed">
                                                        <span class="boardTagSlashed">//</span>
                                                        <span>— </span>
                                                    </a> */}
                    </div>
                    </div>
                </div>
                </div>
                <div className="rightContent">
                <div className="card" style={{ marginRight: 0, flexGrow: 1 }}>
                    <span className="cardHeader">
                    <span className="red cardBullet" />
                    <p className="cardName">Latest posts</p>
                    </span>
                    <div className="cardContent">
                    <div className="postContainer">
                        {posts.map((post) => (
                            <PostCard 
                                key={post.id} 
                                data={post} 
                            />
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </main>
            </div>

    )
}

export default MainPage;