import React, { useEffect, useState } from "react";
import ChatWindow from "./chat-window/ChatWindow";
import { useParams } from "react-router-dom";
import "./chat.scss";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const socket = new WebSocket(
      `wss://team5.opvk.tech/chat/recognition/${id}/`
    );

    socket.onopen = () => {
      console.log("Connection Established!");
    };

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("message");
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    socket.onclose = () => {
      console.log("Connection Closed!");
    };

    return () => {
      if (socket.readyState === 1) {
        socket.close();
      } else {
        socket.addEventListener("open", () => {
          socket.close();
        });
      }
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMessageSent = (message) => {
    setMessages([...messages, { ...message }]);
  };

  // const handleMessageSent = (message) => {
  //   if (messageInput.trim() !== "") {
  //     const message = {
  //       text: messageInput,
  //       timestamp: new Date().toISOString(),
  //     };
  //     socket.send(JSON.stringify(message));
  //     setMessageInput("");
  //   }
  // };

  return (
    <>
      <button
        className="chat-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <path
            d="M256,22.092c-138.983,0-256,95.395-256,218.074c0,68.111,36.742,131.331,99.275,172.501l-41,49.199
          c-10.61,12.731,1.49,31.898,17.712,27.361l127.252-35.623C360.614,481.645,512,380.357,512,240.167
          C512,117.51,395.009,22.092,256,22.092z"
          />
        </svg>
      </button>
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        onClose={handleClose}
        onMessageSent={handleMessageSent}
        title="My Messages"
      />
    </>
  );
};

export default Chat;
