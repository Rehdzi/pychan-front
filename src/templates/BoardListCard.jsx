import api from "../api";
import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";

function BoardEntries({data}) {
    const boardEntries = data.map(category =>
            <div className="boardsListCategory" key={category.id}>
                <p className="">{category.name}</p>
                {category.boards.map(entry =>
                <Link key={entry.id} to={`/${entry.tag}`} className="boardTagSlashed">
                    <span className="boardTagSlashed">/{entry.tag}/ </span>
                    <span>{entry.name}—{entry.description}</span>
                </Link>
                )}
            </div>
    )
    return(
        <>
            {boardEntries}
        </>
    )
}

function BoardListCard() {
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
                </div>
            </div>
        </div>
    )
}

export default BoardListCard;