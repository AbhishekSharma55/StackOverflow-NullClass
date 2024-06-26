import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleArrowUp } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { useAlert } from "../context/AlertContext";
import { useTranslation } from "react-i18next";

const Questions = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const showAlert = useAlert();
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {

    // const AuthenticationStatus = async () =>{
    //   try {
    //     const response = await axios.get(`${apiUrl}/api/auth/current`);
    //     if (response.status === 200) {
    //       console.log("User is authenticated");
    //     }
    //   } catch (error) {
    //     console.log("User is not authenticated");
    //   }
    // }

    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/questions`);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        showAlert(
          "An error occurred while fetching Questions. Please try again later.",
          "error"
        );
        setLoading(false);
      }
    };
    const totalQuestions = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/totalquestions`
        );
        setTotalQuestions(response.data);
      } catch (error) {
        showAlert(
          "An error occurred while fetching Questions. Please try again later.",
          "error"
        );
      }
    };
    totalQuestions();
    fetchQuestion();
    // AuthenticationStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ apiUrl ]);

  if (loading) {
    return <div>{t("Loading")}</div>;
  }

  if (!questions) {
    return <div>{t("QuestionsNotFound")}</div>;
  }

  return (
    <div className="max-w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{t("AllQuestions")}</h1>
        <button
          type="button"
          onClick={() => {
            navigate("/askquestion");
          }}
          className="bg-blue-500 rounded-md transition ease-in-out delay-10 hover:bg-blue-400 px-4"
        >
          <Link to="/askquestion" className="text-xs text-white">
            {t("AskQuestions")}
          </Link>
        </button>
      </div>
      <h1 className="text-sm font-light">{totalQuestions} {t("questions")}</h1>
      {questions ? (
        questions.map((question) => (
          <Link key={question._id} to={`/question/${question._id}`} >
            <div className="bg-white shadow p-4 my-4 max-w-full hover:shadow-xl border rounded-xl" >
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
                    <div className="flex items-center mr-4 text-xl">
                      <CircleArrowUp size={24} />
                      <span className="px-2">{question.upvotes.length}</span>
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
                      <span>{question.noOfAnswers} {t("answers")}</span>
                    </div>
                    <div className="text-sm text-gray-600 break-words">
                      {t("AskedBy")} @{question.userPosted} on{" "}
                      {moment(question.askedOn).fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div>{t("NoQuestionsFound")}</div>
      )}
    </div>
  );
};

export default Questions;
