import React, { useEffect, useState } from "react";
import ImageCards from "./ImageCards";
import Search from "./Search";


function Image() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [term, setTerm] = useState('');
  
    useEffect(() => {
      setIsLoading(true); // Start loading when term changes
      fetch(`https://pixabay.com/api/?key=45238518-062322df61f2468888a8773c4&q=${term}&image_type=photo&pretty=true`)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setImages(data.hits);
          setIsLoading(false); // Loading finished
        })
        .catch(error => {
          console.error(error);
        });
    }, [term]);
  
    return (
      <div className="container mx-auto">
        <Search searchTerm={(text)=>setTerm(text)}/>
          {!isLoading && images.length === 0 && <p className="text-center text-2xl text-gray-500 font-bold py-4">Image Not Founds !!!!</p>}
        {isLoading ? (
          <p className="text-center text-2xl text-gray-500 font-bold py-4 animate-pulse">Loading...</p>
        ) : (
          <div className="px-3 max-w-full grid h-auto justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {images.map((image) => (
              <ImageCards key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
    );
  }
  

export default Image
