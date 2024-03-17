import React from "react";
import classnames from "classnames";
import "./chat-message.scss";

const ChatMessage = ({ message, isSameOrigin }) => {
  return (
    <div
      className={classnames("chat-message", {
        "is-same-origin": isSameOrigin
      })}
    >
      <div className="chat-message__item">
        <span className="chat-message__item__text">{message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
