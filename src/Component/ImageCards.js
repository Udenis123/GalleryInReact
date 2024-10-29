import React, { useState, useEffect } from 'react';
import { FaDownload,FaHeart} from 'react-icons/fa';

// Simulate logged-in user's email
const userEmail = 'user@example.com';
localStorage.setItem('userEmail', userEmail);

function ImageCards({ image }) {
  const tags = image.tags.split(',');

  const getInitialState = (key, initialValue) => {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : initialValue;
  };

  const [views, setViews] = useState(() => getInitialState(`${image.id}-views`, image.views));
  const [downloads, setDownloads] = useState(() => getInitialState(`${image.id}-downloads`, image.downloads));
  const [likes, setLikes] = useState(() => getInitialState(`${image.id}-likes`, image.likes));
  const [userLikes, setUserLikes] = useState(() => getInitialState(`${image.id}-userLikes`, []));
  const [hasLiked, setHasLiked] = useState(() => userLikes.includes(userEmail));

  useEffect(() => {
    setViews(prevViews => prevViews + 1);
  }, []);

  useEffect(() => {
    localStorage.setItem(`${image.id}-views`, JSON.stringify(views));
  }, [views]);

  useEffect(() => {
    localStorage.setItem(`${image.id}-downloads`, JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem(`${image.id}-likes`, JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem(`${image.id}-userLikes`, JSON.stringify(userLikes));
    setHasLiked(userLikes.includes(userEmail));
  }, [userLikes]);

  const handleDownload = (url, filename) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        setDownloads(prevDownloads => prevDownloads + 1);
      })
      .catch(error => console.error('Download failed:', error));
  };

  const handleLike = () => {
    if (!userLikes.includes(userEmail)) {
      setLikes(prevLikes => prevLikes + 1);
      setUserLikes(prevUserLikes => [...prevUserLikes, userEmail]);
      setHasLiked(true);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-xl h-fit">
      <img src={image.webformatURL} alt="" className={`w-full`} />
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">
          Photo by {image.user}
        </div>
        <ul>
          <li>
            <strong>Views:</strong> {views}
          </li>
          <li className='flex justify-between'>
            <div><strong>Downloads:</strong> {downloads}</div>
            <button
              onClick={() => handleDownload(image.largeImageURL, `${image.id}.jpg`)}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded ml-2 mb-1"
            >
              <FaDownload />
            </button>
          </li>
          <li className='flex justify-between'>
            <div><strong>Likes:</strong> {likes}</div>
            <button
              onClick={handleLike}
              disabled={hasLiked}
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-1 px-2 rounded ml-2 "
            >
                {
                    hasLiked?(<FaHeart/>):(<svg className='w-4 text-white font-bold' data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"></path>
                      </svg>)
                                  
                }

            </button>
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        {tags.map(tag => (
          <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ImageCards;
