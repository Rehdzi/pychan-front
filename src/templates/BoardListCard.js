import api from "../api";
import { useState, useEffect } from "react";

function BoardEntries({data}) {
    const boardEntries = data.map(entry =>
        <a href={`/${entry.tag}`} class="boardTagSlashed">
            <span class="boardTagSlashed">/{entry.tag}/ </span>
            <span>{entry.name}—{entry.description}</span>
        </a>
    )
    return(
        <>
            {boardEntries}
        </>
    )
}

export default function BoardListCard() {
    const [boards, setBoards] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await api.get('/boards');
          setBoards(response.data); // Сохраняем данные в состояние
        } catch (error) {
          console.error('Ошибка:', error);
        }
      };
  
      fetchData();
    }, []);

    return(
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

                    <BoardEntries data={boards}/>
                        {/* <a href="/" class="boardTagSlashed">
                                                        <span class="boardTagSlashed">//</span>
                                                        <span>— </span>
                                                    </a> */}
                </div>
            </div>
        </div>
    )
}