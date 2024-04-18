import React, { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";
import "../css/Emoji.css";

const Emoji = ({ setComment }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const handleEmojiModal = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObj) => {
    setComment((prevMessage) => prevMessage + emojiObj.emoji);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(e.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <span
        class="material-symbols-outlined emojiSymbol"
        title="Emoji"
        id="emoji-open"
        onClick={() => handleEmojiModal()}
      >
        mood
      </span>
      {showEmojiPicker && (
        <div className="emojiPicker" ref={emojiPickerRef}>
          <EmojiPicker onEmojiClick={handleEmojiClick} width={300} height={400} skinTonesDisabled={true} searchDisabled={true} theme="light" />
        </div>
      )}
    </div>
  );
};

export default Emoji;
