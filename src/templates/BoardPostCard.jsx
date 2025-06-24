import Markdown from "react-markdown";
import { useState, useEffect } from "react";
import "../postcard.css";
import { Link } from "react-router-dom";

const BoardPostCard = ({ board, data }) => {
  const [expandedImage, setExpandedImage] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  
  // Get the bucket name from environment variables or config
  const bucketName = "c84889de-nnchan-test";
  const s3BaseUrl = "https://s3.twcstorage.ru";
  
  // Base URL for your backend
  const apiBaseUrl = "http://127.0.0.1:8000";  // Use "" for relative URLs or "https://your-api.com" for absolute
  
  // Log image data when component mounts
  useEffect(() => {
    if (data.images && data.images.length > 0) {
      console.log("Post has detailed image data:", data.images);
      
      // Initialize loading state for all images
      const initialLoading = {};
      data.images.forEach(image => {
        initialLoading[image.id] = true;
      });
      setLoadingImages(initialLoading);
    }
  }, [data]);
  
  const handleImageClick = (imageUrl) => {
    console.log("Opening full-size image:", imageUrl);
    setExpandedImage(imageUrl);
  };
  
  const closeExpandedImage = () => {
    setExpandedImage(null);
  };
  
  const handleImageError = (imageId, isThumbnail) => {
    console.error(`Failed to load ${isThumbnail ? 'thumbnail' : 'image'} with ID: ${imageId}`);
    // Update state to use fallback
    setImageErrors(prev => ({
      ...prev,
      [imageId]: true
    }));
    
    // Set loading state to false
    setLoadingImages(prev => ({
      ...prev,
      [imageId]: false
    }));
  };
  
  const handleImageLoad = (imageId) => {
    console.log(`Image loaded successfully: ${imageId}`);
    // Set loading state to false
    setLoadingImages(prev => ({
      ...prev,
      [imageId]: false
    }));
  };
  
  // Build the appropriate URL based on the path
  const buildUrl = (path, isRedisThumb = false) => {
    if (!path) return null;
    
    // If it's a Redis thumbnail, use the direct /thumb endpoint
    if (isRedisThumb) {
      return `${apiBaseUrl}/${path}`;
    }
    
    // If path already contains http:// or https://, it's a complete URL
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Otherwise build the S3 URL
    return `${s3BaseUrl}/${bucketName}/${path}`;
  };
  
  const renderImages = () => {
    // First check if we have detailed image data
    if (data.images && data.images.length > 0) {
      console.log("Rendering with detailed image data:", data.images);
      return (
        <div className="postImages" data-count={data.images.length}>
          {data.images.map((image) => {
            // Check if the thumbnail is a Redis thumbnail or S3 path
            const isRedisThumbnail = image.thumbnail && !image.thumbnail.startsWith('media/');
            const useFullImage = imageErrors[image.id] || !image.thumbnail;
            
            // Determine which URL to use based on errors
            let thumbnailUrl;
            if (useFullImage) {
              // Use full image if thumbnail failed or doesn't exist
              thumbnailUrl = buildUrl(image.url);
            } else {
              // Use Redis or S3 thumbnail based on the path format
              thumbnailUrl = buildUrl(image.thumbnail, isRedisThumbnail);
            }
            
            // Full image is always from S3
            const fullImageUrl = buildUrl(image.url);
            
            // Determine if image is loading
            const isLoading = loadingImages[image.id] === true;
            
            return (
              <div 
                className={`image-container ${isLoading ? 'loading' : ''}`} 
                key={image.id}
              >
                <img
                  src={thumbnailUrl}
                  alt={image.filename || "Post image"}
                  onClick={() => handleImageClick(fullImageUrl)}
                  className={`post-thumbnail ${isLoading ? 'loading' : ''}`}
                  onError={() => handleImageError(image.id, !useFullImage)}
                  onLoad={() => handleImageLoad(image.id)}
                />
              </div>
            );
          })}
        </div>
      );
    }
    
    // Fall back to simple image URLs
    if (data.image_urls && data.image_urls.length > 0) {
      console.log("Rendering with simple image URLs:", data.image_urls);
      return (
        <div className="postImages" data-count={data.image_urls.length}>
          {data.image_urls.map((image, index) => {
            const imageId = `simple-${index}`;
            const isLoading = loadingImages[imageId] === true;
            
            return (
              <div 
                className={`image-container ${isLoading ? 'loading' : ''}`} 
                key={image || imageId}
              >
                <img
                  src={buildUrl(image)}
                  alt="Post image"
                  onClick={() => handleImageClick(buildUrl(image))}
                  className={`post-thumbnail ${isLoading ? 'loading' : ''}`}
                  onError={() => handleImageError(imageId, false)}
                  onLoad={() => handleImageLoad(imageId)}
                />
              </div>
            );
          })}
        </div>
      );
    }
    
    // No images
    return null;
  };
  
  return (
    <div key={data.id} className="postCard">
      <div className="cardContent postContent">
        {(data.images?.length > 0 || data.image_urls?.length > 0) && (
          <div className="postImages">
            {renderImages()}
          </div>
        )}
        <div className="postTextContent">
          <div className="postMenu">
            <div className="postTitle">
              <p>{data.title}</p>
            </div>
            <div className="postID cardNavigate">
              <a />
              <Link to={`/${data.board.tag}/thread/${data.id}`}>#{data.id}</Link>
            </div>
          </div>
          <div className="postMessage">
            <Markdown>{data.text}</Markdown>
          </div>
          <div className="postReplies">
            {/* <div className="postReplyID">
              <Reply data={data}/>
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Image modal for expanded view */}
      {expandedImage && (
        <div className="image-modal" onClick={closeExpandedImage}>
          <div className="modal-content">
            <img 
              src={expandedImage} 
              alt="Full size" 
              onError={() => {
                console.error("Failed to load full-size image");
                setExpandedImage(null);
              }}
            />
            <button className="modal-close" onClick={closeExpandedImage}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardPostCard; 