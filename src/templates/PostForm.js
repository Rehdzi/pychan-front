import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, quotePlugin, markdownShortcutPlugin, toolbarPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import '../editor.css'
import api from '../api';

export default function PostForm() {
    const [uploadProgress, setUploadProgress] = useState(0);
    const { tag } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await api.post('/new_thread/', {
                board_tag: tag,
                title: title.trim(),
                text: text.trim(),
                image_ids: null // Замените на реальные ID изображений после реализации загрузки
            },
            {
                // 3. Явное указание заголовков
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

            //navigate(`/${tag}/thread/${response.data.id}`);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
        } finally {
            setIsSubmitting(false);
            window.location.reload();
        }
    };

    return (
        <div className="card postForm">
            <span className="cardHeader">
                <span className="red cardBullet"></span>
                <p className="cardName">Post form</p>
            </span>
            <form method="post" onSubmit={handleSubmit} className="postFormHandler">
                <div className="typing">
                    <input 
                        type="text" 
                        placeholder="Title" 
                        id="pH"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={150}
                        disabled={isSubmitting}
                    />
                    <MDXEditor
                        className='editor'
                        markdown=""
                        placeholder="Enter your text here..."
                        onChange={setText}
                        plugins={[
                            quotePlugin(), 
                            markdownShortcutPlugin(),
                            toolbarPlugin({
                            toolbarClassName: 'inputToolbar',
                            toolbarContents: () => (
                                <>
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                </>
                            )
                            })
                        ]}
                        readOnly={isSubmitting}
                    />
                    {/* <input type="text" placeholder="Text" id="pT"/> */}

                    <div className="functional">
                        <input 
                            type="password"
                            name="tripcode"
                            id="trip"
                            placeholder="Tripcode (unnecessary)"
                            disabled={isSubmitting}
                        />
                        <button type="submit">Check</button>
                    </div>
                </div>
                <div className="posting">
                    <input 
                        type="file"
                        name="postAttach"
                        id="pA"
                    />
                    <progress value="10" max="100" className="postingProgress">10%</progress>
                    <button
                        type="submit"
                        disabled={isSubmitting || !text.trim()}>
                            Post
                    </button>      
                </div>
            </form>
        </div>
    )
}