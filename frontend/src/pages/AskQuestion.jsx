// AskQuestion.jsx
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [questionTags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.post('http://localhost:4000/api/postquestion', { title, questionBody, questionTags }, config);

      if (response.status === 200) {
        navigate('/', { state: { verificationMessage: 'Question Posted successful!.' } }); // Redirect to home or questions page
      } else {
        setError('Failed to submit the question. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 md:py-20">
      <div className="px-4 md:px-0 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Ask a Question</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-[700px] mx-auto mt-2">
            Get answers to your questions from our community of experts.
          </p>
        </div>
        <div className="border p-4 rounded shadow">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Ask your question</h2>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <label htmlFor="title">Question Title</label>
              <input
                required
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a clear and concise title"
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="body">Question Body</label>
              <textarea
                required
                id="body"
                value={questionBody}
                onChange={(e) => setQuestionBody(e.target.value)}
                placeholder="Provide details about your question"
                rows={5}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="tags">Tags</label>
              <input
                required
                id="tags"
                value={questionTags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add relevant tags (separated by commas)"
                className="border p-2 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded justify-self-end"
            >
              Ask Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;