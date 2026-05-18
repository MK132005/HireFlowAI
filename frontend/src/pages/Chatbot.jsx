import { useState } from "react";
import API from "../services/api";

function Chatbot() {
  const [message, setMessage] = useState("");

  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    try {
      const res = await API.post(
        "/ai/chat",
        {
          message,
        }
      );

      setReply(res.data.reply);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">
        AI HR Assistant
      </h2>

      <input
        type="text"
        placeholder="Ask AI..."
        className="border p-3 w-full mb-4"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <button
        onClick={sendMessage}
        className="bg-black text-white px-5 py-2 rounded"
      >
        Ask AI
      </button>

      {reply && (
        <div className="mt-5 bg-gray-100 p-4 rounded">
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
}

export default Chatbot;