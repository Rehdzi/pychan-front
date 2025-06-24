import { useState, useRef, useCallback } from 'react';
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
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files || []);
        if (newFiles.length > 0) {
            setFiles(prevFiles => [...prevFiles, ...newFiles]);
            // Reset the input value to allow selecting the same file again
            e.target.value = '';
        }
    };

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        const droppedFiles = Array.from(e.dataTransfer.files || []);
        if (droppedFiles.length > 0) {
            setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
        }
    }, []);

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const removeFile = (indexToRemove) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setIsSubmitting(true);
        setError(null);
        setUploadProgress(0);

        try {
            const formData = new FormData();
            
            // Add text data
            formData.append('board_tag', tag);
            formData.append('title', title.trim());
            formData.append('text', text.trim());
            formData.append('is_visible', 'true');

            // Add files
            files.forEach((file) => {
                formData.append('files', file);
            });

            const response = await api.post('/new_thread/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                }
            });

            if (response.status === 201) {
                navigate(`/${tag}/thread/${response.data.id}`);
            }
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card postForm">
            <span className="cardHeader">
                <span className="red cardBullet"></span>
                <p className="cardName">Post form</p>
            </span>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
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
                    <div 
                        className={`file-drop-area ${isDragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <p>Drag and drop files here or</p>
                        <button 
                            type="button" 
                            onClick={handleFileButtonClick}
                            disabled={isSubmitting}
                        >
                            Select Files
                        </button>
                        <input 
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            multiple
                            disabled={isSubmitting}
                        />
                    </div>
                    
                    {files.length > 0 && (
                        <div className="file-preview-container">
                            <h4>Selected Files ({files.length})</h4>
                            <ul className="file-preview-list">
                                {files.map((file, index) => (
                                    <li key={`${file.name}-${index}`} className="file-item">
                                        <span className="file-name">{file.name}</span>
                                        <span className="file-size">({(file.size / 1024).toFixed(1)} KB)</span>
                                        <button 
                                            type="button" 
                                            className="remove-file" 
                                            onClick={() => removeFile(index)}
                                            disabled={isSubmitting}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {isSubmitting && (
                        <div className="upload-progress">
                            <label>Uploading: {uploadProgress}%</label>
                            <progress 
                                value={uploadProgress} 
                                max="100" 
                                className="postingProgress"
                            >
                                {uploadProgress}%
                            </progress>
                        </div>
                    )}
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