import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./App.css";

const App = ({
  url = "https://picsum.photos/v2/list",
  limit = 10,
  page = 1,
}) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);

  console.log(currentSlide);

  if (loading) {
    return <div>Loading data... Please wait !</div>;
  }

  if (errorMsg !== null) {
    return <div>Error occured ! {errorMsg}</div>;
  }

  // setTimeout(() => {
  //   setCurrentSlide(currentSlide  === images.length - 1 ? 0 : currentSlide +1);
  // }, 4000);

  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };
  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="App">
      <h2>Image Slider Project</h2>
      <div className="container">
        <BsArrowLeftCircleFill
          title="Previous"
          onClick={() => handlePrevious()}
          className="arrow arrow-left"
        />
        {images && images.length
          ? images.map((imageItem, index) => {
              return (
                <img
                  src={imageItem.download_url}
                  alt={imageItem.download_url}
                  key={imageItem.id}
                  className={
                    currentSlide === index
                      ? "current-image"
                      : "current-image hide-current-image"
                  }
                />
              );
            })
          : null}
        <BsArrowRightCircleFill
          title="Next"
          onClick={() => handleNext()}
          className="arrow arrow-right"
        />
        <span className="circle-indicators">
          {images && images.length
            ? images.map((_, index) => (
                <button
                  title={`Photo ${index}`}
                  key={index}
                  className={
                    currentSlide === index
                      ? "current-indicator"
                      : "current-indicator inactive-indicator"
                  }
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))
            : null}
        </span>
      </div>
    </div>
  );
};

export default App;
