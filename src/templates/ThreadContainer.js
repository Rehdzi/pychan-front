import api from "../api";
import BoardPostCard from "./BoardPostCard";
import { useState, useEffect } from "react";
import { useParams, useNavigate, data } from 'react-router-dom';
import ThreadReply from "./ThreadReply";


export default function ThreadContainer(){
    const { tag } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        loading: true,
        error: null,
        boardInfo: null,
        threads: []
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get(`/${tag}/ops`);
            const responseData = response.data;
            
            setData({
                loading: false,
                error: null,
                boardInfo: responseData.board_info,
                threads: responseData.ops
            });// Сохраняем данные в состояние
          } catch (error) {
            console.error('Ошибка:', error);
          }
        };
    
        fetchData();
      }, [tag]);
    
    return (
        <div className="postContainer">
            {data.threads.map((thread, index) =>(
                <div className="thread" key={thread.op.id}>
                    <BoardPostCard data={thread.op}/>
                    <ThreadReply data={thread.first_reply}/>
                    <ThreadReply data={thread.last_reply}/>
                </div>
                
            ))};
        
        </div>

    )
}