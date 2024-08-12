import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Card from "./card";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

import { API_URL } from "../App";

function Carousel() {
  const [flippedCards, setFlippedCards] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    draggable: false,
    centerMode: true,
    beforeChange: (current, next) => {
      setFlippedCards({});
      setCurrentSlide(next);
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/problems`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const setFlipped = (id, value) => {
    setFlippedCards((prev) => ({ ...prev, [id]: value }));
  };

  const progressPercentage = ((currentSlide + 1) / data.length) * 100;

  return (
    <div className="w-3/4 m-auto">
      {data.length > 0 ? (
        <div className="mt-20">
          <Slider {...settings}>
            {data.map((item, index) => (
              <div key={index} className="flex justify-center items-center">
                <Card
                  index={index}
                  category={item.categories}
                  question={item.question}
                  answer={item.answer}
                  flipped={!!flippedCards[item.id]}
                  setFlipped={(value) => setFlipped(item.id, value)}
                />
              </div>
            ))}
          </Slider>
          <div className="mt-4">
            <div className="relative h-2 w-full bg-gray-300 rounded">
              <div
                className="absolute h-2 bg-indigo-500 rounded"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-center mt-2">
              {currentSlide + 1}/{data.length}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-white text-2xl mt-20">Loading...</div>
      )}
    </div>
  );
}

export default Carousel;
