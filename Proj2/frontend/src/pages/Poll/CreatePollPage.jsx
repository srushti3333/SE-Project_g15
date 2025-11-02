import React, { useState } from "react";
import Button from "../../components/common/Button/Button";
import { GROUP_POLLS } from "../../utils/constants";
import './CreatePollPage.css';

const CreatePollPage = ({ group, onBack }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleAddOption = () => setOptions([...options, ""]);

  const handleSubmit = () => {
    const newPoll = {
      id: Date.now(),
      question,
      options: options.map(o => ({ text: o, votes: 0 })),
      votedUsers: [],
      createdBy: "Alice"
    };

    GROUP_POLLS[group.id].push(newPoll);
    alert("Poll created!");
    onBack();
  };

  return (
    <div className="create-poll-container">
      <h2>Create Poll</h2>

      <label>Poll Question</label>
      <input
        placeholder="Enter poll question"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />

      {options.map((opt, i) => (
        <div key={i}>
          <label>{`Option ${i + 1}`}</label>
          <input
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={e => {
              const arr = [...options];
              arr[i] = e.target.value;
              setOptions(arr);
            }}
          />
        </div>
      ))}

      <div className="create-poll-actions">
        <Button onClick={handleAddOption}>+ Add Option</Button>
        <Button variant="success" onClick={handleSubmit}>Create Poll</Button>
        <Button variant="secondary" onClick={onBack}>Cancel</Button>
      </div>
    </div>
  );
};

export default CreatePollPage;
