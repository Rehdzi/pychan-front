import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../api";

export default function ThreadPage() {

    const { tag } = useParams();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/${tag}/thread/${id}`);
            console.log(response.data);
        }
    }, [id]);

    return (<div className='pageContent'>
            <h1>ThreadPage</h1>
        </div>);
}