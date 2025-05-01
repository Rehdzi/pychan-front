import api from "../api";
import { useState, useEffect } from "react";

function BoardEntries({data}) {
    const boardEntries = data.map(category =>
            <div className="boardsListCategory" key={category.id}>
                <p className="">{category.name}</p>
                {category.boards.map(entry =>
                <a key={entry.id} href={`/${entry.tag}`} class="boardTagSlashed">
                    <span class="boardTagSlashed">/{entry.tag}/ </span>
                    <span>{entry.name}—{entry.description}</span>
                </a>
                )}
            </div>
    )
    return(
        <>
            {boardEntries}
        </>
    )
}

export default function BoardListCard() {
    const [boardlist, setBoardlist] = useState([]);
  
    useEffect(() => {
      const fetchBoardlist = async () => {
        try {
          const response = await api.get('/boardlist');
          setBoardlist(response.data); // Сохраняем данные в состояние
        } catch (error) {
          console.error('Ошибка:', error);
        }
      };
  
      fetchBoardlist();
    }, []);

    return(
        <div id="boards">
            <div className="card">
                <span className="cardHeader">
                <span className="yellow cardBullet" />
                <p className="cardName">Boards list</p>
                </span>
                <div className="boardsList cardContent">
                    

                    <BoardEntries data={boardlist}/>
                        {/* <a href="/" class="boardTagSlashed">
                                                        <span class="boardTagSlashed">//</span>
                                                        <span>— </span>
                                                    </a> */}
                </div>
            </div>
        </div>
    )
}