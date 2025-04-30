import {Eye, Gear, CirclePlus} from '@gravity-ui/icons';

function Boardlist() {
    return(
        <div className="boardList">
        <div className="listContent">
            <div className="homeBtn">
            <a href="/">/~</a>
            </div>
            <div className="stripBoard">/b/</div>
            <div className="stripBoard">/soc/</div>
            <div className="stripBoard">/pol/</div>
            <a id="addBoardToList">
            <CirclePlus/>
            </a>
        </div>
        <div className="maintenanceList">
            <button>
                <Eye/>
            </button>
            <button id="settingButton">
                <Gear/>
            </button>
        </div>
        </div>
    )
}

export default Boardlist;