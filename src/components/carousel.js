import React, { useState } from "react";
import Slider from "react-slick";
import Card from "./card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
  const [flippedCards, setFlippedCards] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const data = [
    {
      id: 1,
      category: "Math",
      question: "What is 2 + 2?",
      answer: "The answer is 4.",
    },
    {
      id: 2,
      category: "Science",
      question: "What is the boiling point of water?",
      answer: "100°C or 212°F.",
    },
    {
      id: 3,
      category: "Geography",
      question: "What is the capital of France?",
      answer: "Paris.",
    },
    {
      id: 4,
      category: "History",
      question: "Who was the first president of the United States?",
      answer: "George Washington.",
    },
    // Add more data as needed
  ];

  const setFlipped = (id, value) => {
    setFlippedCards((prev) => ({ ...prev, [id]: value }));
  };

  const progressPercentage = ((currentSlide + 1) / data.length) * 100;

  return (
    <div className="w-3/4 m-auto">
      <div className="mt-20">
        <Slider {...settings}>
          {data.map((item) => (
            <div key={item.id} className="flex justify-center items-center">
              <Card
                id={item.id}
                category={item.category}
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
    </div>
  );
}

export default Carousel;
