import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircleArrowUp, CircleArrowDown } from "lucide-react";
import SideBarContent from "./SideBarContent";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        console.log(`Fetching question with id ${id}`);
        const response = await axios.get(
          `http://localhost:4000/api/questions/${id}`
        );
        setQuestion(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching question data:", error);
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!question) {
    return <div>Question not found.</div>;
  }

  return (
    <div className="flex justify-around">
      <div className="w-full">
        <div className="bg-white shadow-md p-4 my-4">
          <h1 className="text-2xl font-bold">{question.question}</h1>
          <div className="flex mt-2">
            {question.questionTags.map((tag) => (
              <div
                key={tag}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2 text-xs"
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="flex items-center mt-4">
            <div className="text-sm text-gray-600">
              Asked by @{question.userPosted} on {question.askedOn.slice(0, 10)}
            </div>
          </div>
        </div>
        <div className="flex bg-white shadow-md p-4 my-4">
          <div>
            <CircleArrowUp size={24} />
            <p className="py-1">{question.upvotes}</p>
            <CircleArrowDown size={24} />
          </div>
          <p className="text-gray-600 p-10 pt-0">{question.questionBody}</p>
        </div>
        <div className="flex bg-white shadow-md p-4 my-4">
          <h1 className="text-2xl font-bold">Answers {question.noOfAnswers}</h1>
        </div>
      </div>
        <div className="p-5 pr-20">
          <SideBarContent />
        </div>
    </div>
  );
};

export default QuestionDetail;
