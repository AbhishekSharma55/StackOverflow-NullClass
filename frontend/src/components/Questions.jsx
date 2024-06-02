import React from "react";
import { Link } from "react-router-dom";
import { CircleArrowUp } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

const Questions = () => {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/questions`);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching question data:", error);
        setLoading(false);
      }
    };
    const totalQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/totalquestions`);
        setTotalQuestions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching total questions:", error);
      }
    };
    totalQuestions();
    fetchQuestion();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!questions) {
    return <div>Questions not found.</div>;
  }

  return (
    <div className="max-w-full">
      <h1 className="text-2xl font-bold">Questions</h1>
      <h1 className="text-sm font-light">{totalQuestions} questions found!</h1>
      {questions ? (
        questions.map((question) => (
          <Link key={question._id} to={`/question/${question._id}`}>
            <div className="bg-white shadow-md p-4 my-4 max-w-full">
              <div className="flex flex-col justify-between items-start">
                <div className="w-full">
                  <h2 className="text-xl font-bold break-words">
                    {question.question}
                  </h2>
                  <p className="text-gray-600 break-words">
                    {question.questionBody}
                  </p>
                  <div className="flex flex-wrap mt-2">
                    {question.questionTags.map((tag) => (
                      <div
                        key={tag}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2 text-xs break-words"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-4 flex-wrap">
                    <div className="flex items-center mr-4">
                      <CircleArrowUp size={24} />
                      <span>{question.upvotes}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{question.noOfAnswers} answers</span>
                    </div>
                    <div className="text-sm text-gray-600 break-words">
                      Asked by {question.userPosted} on {question.askedOn}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div>No Questions Found!</div>
      )}
    </div>
  );
};

export default Questions;
