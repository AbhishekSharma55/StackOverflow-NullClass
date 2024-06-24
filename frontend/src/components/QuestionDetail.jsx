import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircleArrowUp, CircleArrowDown } from "lucide-react";
import SideBarContent from "./SideBarContent";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import moment from "moment";
import { useTranslation } from "react-i18next";

const QuestionDetail = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const {t} = useTranslation();
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const showAlert = useAlert();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/questions/${id}`
        );
        setQuestion(response.data);
        setLoading(false);
      } catch (error) {
        showAlert(
          "An error occurred while fetching Questions. Please try again later.",
          "error"
        );
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [showAlert, id, apiUrl]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/questions/${id}/answers`
        );
        setAnswers(response.data);
        setLoading(false);
      } catch (error) {
        showAlert(
          "An error occurred while fetching Answers. Please try again later.",
          "error"
        );
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [showAlert, id ,apiUrl]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const deleteQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showAlert("User not authenticated", "error");
        navigate("/login");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${apiUrl}/api/questions/${id}`,
        config
      );
      if (response.data.msg) {
        showAlert(response.data.msg, "success");
        navigate("/");
      } else {
        showAlert(response.data.err, "error");
      }
    } catch (error) {
      showAlert("An error occurred. Please try again later.", "error");
    }
  };

  const deleteAnswer = async (index) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showAlert("User not authenticated", "error");
        navigate("/login");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${apiUrl}/api/questions/${id}/answers/${answers[index]._id}`,
        config
      );
      if (response.data.msg) {
        showAlert(response.data.msg, "success");
        setAnswers(answers.filter((_, i) => i !== index));
      } else {
        showAlert(response.data.err, "error");
      }
    } catch (error) {
      showAlert("An error occurred. Please try again later.", "error");
    }
  };

  const incrementVote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showAlert("User not authenticated", "error");
        navigate("/login");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${apiUrl}/api/questions/${id}/upvote`,
        {},
        config
      );
      if (response.data.msg) {
        setQuestion(response.data.question);
        showAlert(response.data.msg, "success");
      } else {
        showAlert(response.data.err, "error");
      }
    } catch (error) {
      showAlert("An error occurred. Please try again later.", "error");
    }
  };

  const decrementVote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showAlert("User not authenticated", "error");
        navigate("/login");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${apiUrl}/api/questions/${id}/downvote`,
        {},
        config
      );
      if (response.data.msg) {
        setQuestion(response.data.question);
        showAlert(response.data.msg, "success");
      } else {
        showAlert(response.data.err, "error");
      }
      showAlert("Downvoted successfully", "success");
    } catch (error) {
      showAlert("An error occurred. Please try again later.", "error");
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showAlert("User not authenticated", "error");
        navigate("/login");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${apiUrl}/api/questions/${id}/answer`,
        { answer },
        config
      );
      setQuestion(response.data.question);
      setAnswers([...answers, response.data.answers]);
      setAnswer("");
      showAlert("Answer posted successfully", "success");
    } catch (error) {
      showAlert("An error occurred. Please try again later.", "error");
    }
  };

  if (loading) {
    return <div>{t("Loading")}</div>;
  }

  if (!question) {
    return <div>{t("QuestionsNotFound")}</div>;
  }

  return (
    <div className="container lg:pr-40 md:flex md:justify-">
      <div className="w-full md:w-3/4">
        <div className="bg-white shadow-md p-4 mb-4">
          <h1 className="text-2xl font-bold">{question.question}</h1>
          <div className="flex flex-wrap mt-2">
            {question.questionTags.map((tag) => (
              <div
                key={tag}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2 mb-2 text-xs"
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="flex items-center mt-4 justify-between">
            <div className="text-sm text-gray-600">
              {t("AskQuestions")} @{question.userPosted} on{" "}
              {moment(question.askedOn).fromNow()}
            </div>
            <div className="text-sm">
              <button
                className="border border-black rounded p-1"
                onClick={deleteQuestion}
              >
                {t("DeleteQuestion")}
              </button>
            </div>
          </div>
        </div>
        <div className="flex bg-white shadow-md p-4 mb-4">
          <div>
            <button
              onClick={() => {
                incrementVote();
              }}
            >
              <CircleArrowUp size={24} />
            </button>
            <p className="py-1 text-xl text-center">
              {question.upvotes ? question.upvotes.length : 0}
            </p>
            <button
              onClick={() => {
                decrementVote();
              }}
            >
              <CircleArrowDown size={24} />
            </button>
          </div>
          <p className="text-gray-600 p-4 text-xl">{question.questionBody}</p>
        </div>
        <div className="bg-white shadow-md p-4 mb-4">
          <h1 className="text-2xl font-bold">{t("answers")} {question.noOfAnswers}</h1>
        </div>
        <div>
          {answers.map((answer, index) => (
            <div className="bg-white shadow-md p-4 mb-4" key={answer._id}>
              <div className="flex flex-col">
                <div className="text-xl font-bold">{t("answers")} {index + 1}</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-gray-600">
                  {t("AnsweredBy")} @{answer.userPosted} on{" "}
                  {moment(answer.answeredOn).fromNow()}
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteAnswer(index);
                    }}
                    className="border border-black rounded p-1"
                  >
                    {t("DeleteAnswer")}
                  </button>
                </div>
              </div>
              <p className="text-gray-600 py-4 text-lg">{answer.answer}</p>
            </div>
          ))}
        </div>

        <div className="p-3">
          <form onSubmit={handleAnswerSubmit}>
            <div className="mb-4">
              <label
                htmlFor="answer"
                className="block text-sm font-medium text-gray-700"
              >
                {t("YourAnswer")}
              </label>
              <textarea
                id="answer"
                name="answer"
                rows={3}
                className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-orange-500 focus:border-orange-500 border border-gray-300 rounded-md"
                value={answer}
                onChange={handleAnswerChange}
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                value="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                {t("SubmitAnswer")}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/4 p-4">
        <SideBarContent />
      </div>
    </div>
  );
};

export default QuestionDetail;
