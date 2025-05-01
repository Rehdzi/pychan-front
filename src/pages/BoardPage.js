import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

export default function BoardPage() {
    const { tag } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        if (!/^[a-zA-Z0-9-]+$/.test(tag)) {
            navigate('/invalid-tag');
            return;
        }

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/${tag}`, { 
                    signal: controller.signal 
                });
                setBoard(response.data);
                setError(null);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.response?.data?.message || 'Ошибка загрузки данных');
                    console.error('Error:', err);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        return () => controller.abort();
    }, [tag, navigate]);

    if (!board) {
        return <div className="error">Данные доски не найдены</div>;
    }

    return(
        <div>
        <header className="mainPageHeading">
            <div className="naming">
                
                    <div className="boardTitle"><p>/{board.tag}/ {board.name}–{board.description} </p></div>
                
                <div className="boardSlogan"></div>
            </div>
        </header>

        <div className="panels">
            <div className="boardLeftContent">
                <div className="card postForm">
                        <span className="cardHeader">
                            <span className="red cardBullet"></span>
                            <p className="cardName">Post form</p>
                        </span>
                    <form method="post" className="postFormHandler">
                        <div className="typing">
                            

                            <div className="functional">
                                <input type="password" name="tripcode" id="trip" placeholder="Tripcode (unnecessary)"/>
                                <button type="submit">Check</button>
                            </div>
                        </div>
                        <div className="posting">
                            <input type="file" name="postAttach" id="pA"/>
                            <progress value="10" max="100" className="postingProgress">10%</progress>
                            
                        </div>
                    </form>
                </div>

                <div className="postContainer">
                    
                        <div className="postWithReplies">
                            <div className="postCard">
                                <div className="cardContent postContent">
                                    <div className="postImages">
                                        <img src="/static/girl.jpg" alt="Post picture"/>
                                    </div>
                                    <div className="postTextContent">

                                        <div className="postMenu">
                                            <div>
                                                <a href="/" className="postID cardNavigate"></a>
                                            </div>
                                        </div>

                                        <div className="postTitle">
                                            
                                        </div>

                                        <div className="postMessage">
                                            
                                        </div>
                                        <div className="postReplies">
                                            <div className="postReplyID">
                                                
                                            </div>
                                            <div className="postReplyID">
                                                
                                            </div>
                                            <div className="postReplyID">
                                                
                                            </div>
                                            <div className="postReplyID">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                                    <div className="postReply">
                                        <span className="threadStrip"></span>
                                        <div className="postCard postReply">
                                            <div className="cardContent postContent">
                                                <div className="postImages">
                                                    <img src="/static/girl.jpg" alt="Post picture"/>
                                                </div>
                                                <div className="postTextContent">

                                                    <div className="postMenu">
                                                        <div className="postID cardNavigate">
                                                            <a></a>
                                                        </div>
                                                    </div>

                                                    <div className="postTitle">
                                                        
                                                    </div>

                                                    <div className="postMessage">
                                                        
                                                    </div>
                                                    <div className="postReplies">
                                                        <div className="postReplyID">
                                                            
                                                        </div>
                                                        <div className="postReplyID">
                                                            
                                                        </div>
                                                        <div className="postReplyID">
                                                            
                                                        </div>
                                                        <div className="postReplyID">
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                
                        </div>

                    
                </div>
            </div>
            <div className="boardRightContent">
                <div className="card">
                        <span className="cardHeader">
                            <span className="blue cardBullet"></span>
                            <p className="cardName">Board of the day</p>
                        </span>
                    <div className="cardContent">
                        <div className="BoTD">
                            <p className="BoTDName">/b/</p>
                            <p>Posts per hour: 69</p>
                            <p>Unique Users: 420</p>
                            <p>Users per hour:</p>
                        </div>
                    </div>
                </div>
                <div className="card">
                        <span className="cardHeader">
                            <span className="purple cardBullet"></span>
                            <p className="cardName">Marked threads</p>
                            <a className="cardNavigate">Upd. 46 sec. ago</a>
                        </span>
                    <div className="cardContent mTHandler">
                        <div className="postCard markedThread">
                                <div className="postImages mTImg">
                                    <img src="/static/girl.jpg" alt="Post picture"/>
                                </div>
                                <div className="postTextContent mTText">
                                    <div className="postMenu">
                                        <p className="newRepliesAnnouncer">+2</p>
                                        <a className="cardNavigate">on /soc/</a>
                                        <a className="closeBtn">
                                            <i data-feather="x-circle"></i>
                                        </a>
                                    </div>
                                    <div className="postTitle">
                                        LOREM IPSUM! DOLOR SIT AMET.
                                    </div>
                                    <div className="postMessage">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim libero est, sed commodo tellus luctus a. Quisque volutpat porta mi, sit amet semper lorem tincidunt et. Curabitur est dui, tempor a nulla eu.
                                    </div>
                                </div>
                                <div className="red closeBtn"></div>
                        </div>

                        <div className="postCard markedThread">
                            <div className="postImages mTImg">
                                <img src="/static/girl.jpg" alt="Post picture"/>
                            </div>
                            <div className="postTextContent mTText">
                                <div className="postMenu">
                                    <p className="newRepliesAnnouncer">+1</p>
                                    <a className="cardNavigate">on /a/</a>
                                    <a className="closeBtn">
                                        <i data-feather="x-circle"></i>
                                    </a>
                                </div>
                                <div className="postTitle">
                                    LOREM IPSUM! DOLOR SIT AMET.
                                </div>
                                <div className="postMessage">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim libero est, sed commodo tellus luctus a. Quisque volutpat porta mi, sit amet semper lorem tincidunt et. Curabitur est dui, tempor a nulla eu.
                                </div>
                            </div>
                            <div className="red closeBtn"></div>
                        </div>

                        <div className="postCard markedThread">
                            <div className="postImages mTImg">
                                <img src="/static/girl.jpg" alt="Post picture"/>
                            </div>
                            <div className="postTextContent mTText">
                                <div className="postMenu">
                                    <p className="newRepliesAnnouncer">+3</p>
                                    <a className="cardNavigate">on /po/</a>
                                    <a className="closeBtn">
                                        <i data-feather="x-circle"></i>
                                    </a>
                                </div>
                                <div className="postTitle">
                                    LOREM IPSUM! DOLOR SIT AMET.
                                </div>
                                <div className="postMessage">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim libero est, sed commodo tellus luctus a. Quisque volutpat porta mi, sit amet semper lorem tincidunt et. Curabitur est dui, tempor a nulla eu.
                                </div>
                            </div>
                            <div className="red closeBtn"></div>
                        </div>
                    </div>
                </div>
                <div className="card">
                        <span className="cardHeader">
                            <span className="green cardBullet"></span>
                            <p className="cardName">Viewed threads</p>
                        </span>
                    <div className="cardContent">
                        <div className="postCard markedThread">
                            <div className="postImages mTImg">
                                <img src="/static/girl.jpg" alt="Post picture"/>
                            </div>
                            <div className="postTextContent mTText">
                                <div className="mTMenu">
                                    <a className="cardNavigate">on /po/</a>
                                    <a className="closeBtn">
                                        <i data-feather="x-circle"></i>
                                    </a>
                                </div>
                                <div className="postTitle">
                                    LOREM IPSUM! DOLOR SIT AMET.
                                </div>
                                <div className="postMessage">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim libero est, sed commodo tellus luctus a. Quisque volutpat porta mi, sit amet semper lorem tincidunt et. Curabitur est dui, tempor a nulla eu.
                                </div>
                            </div>
                            <div className="red closeBtn"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}