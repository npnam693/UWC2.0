import React, { useEffect, useState, useRef } from "react";
import { Grid, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import VideocamIcon from "@mui/icons-material/Videocam";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import styles from "./style.module.css";
import MessageUser from "../../components/MessageUser";
// eslint-disable-next-line
import { MyMessage, Message } from "../../components/Messages";
import axios from "axios";

const ChatPage = () => {
  const chatBody = useRef(null);
  const messEndRef = useRef(null);
  const [users, setUsers] = useState([]);
  const fakeAvatar =
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/125.jpg";
  const fakeMessages = [
    { message: "Hello, tôi có vấn đề cần hỏi.", me: false },
    {
      message:
        "Bạn có thể đổi lịch làm việc của tôi ngày 12 sang ngày 13 thay cho Sang được không?",
      me: false,
    },
    { message: "Hello ông dà, việc này dễ như ăn kẹo. Để đó tô lo", me: true },
    { message: "Oke, cảm ơn nhiều nhé", me: false },
    { message: "Đổi sang lịch của ông Sang là m phải làm...", me: true },
    {
      message:
        "Công việc của Sang chắc m cũng biết rõ việc là gì rồi nhỉ. Tôi phổ biến lại để ông nắm rõ và thực hiện nhé. Sáng 13 ông công lái công nông đi qua sông và xách mông chạy về nhà rồi làm gà tối 9h nhậu nhé :vv,",

      me: true,
    },
    { message: "Oke luôn ông dà", me: false },
    { message: "Ông chuẩn bị 2 két đi :>>", me: false },
    { message: "Oke luôn", me: true },
  ];
  // eslint-disable-next-line
  const [messages, setMessages] = useState(fakeMessages);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");

  const renderMessage = messages.map((mess, index) => {
    if (mess.me) {
      return (
        <MyMessage
          key={index}
          data={{ message: mess.message }}
          ref={messEndRef}
        />
      );
    } else {
      return (
        <Message
          key={index}
          data={{ avatar: fakeAvatar, message: mess.message }}
        />
      );
    }
  });

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://63823d929842ca8d3ca4bcfc.mockapi.io/staffs")
      .then((data) => {
        setUsers(data.data);
      });
    // eslint-disable-next-line
  }, []);

  const handleSend = () => {
    if (message.trim().length > 0) {
      setMessages((presState) => [
        ...presState,
        { message: message.trim(), me: true },
      ]);
      setMessage("");
    }
  };

  return (
    <div style={{ marginRight: "20px" }}>
      <Grid container className={styles.wrapper}>
        <Grid item xs={3} className={styles.userBox}>
          <div className={styles.searchBox}>
            <SearchIcon
              sx={{
                color: "#000",
                opacity: "0.7",
                marginLeft: "6px",
                fontSize: "24px",
                top: "0",
                bottom: "0",
                marginRight: "4px",
                "&:hover": {
                  cursor: "pointer",
                  opacity: "1",
                },
              }}
            />
            <input className={styles.searchInput} />
          </div>
          <div className={styles.listUsers}>
            {users.map((user) => (
              <MessageUser key={user.id} data={user} />
            ))}
          </div>
        </Grid>
        <Grid item xs={9} className={styles.chatBox}>
          <div className={styles.chatTop}>
            <div className={styles.chatHeader}>
              <div className={styles.headerUser}>
                <Avatar
                  sx={{
                    width: "50px",
                    height: "50px",
                    border: "1px solid #cccccc",
                    cursor: "pointer",
                  }}
                  src={
                    "https://profilepicture7.com/img/img_dongman/2/-76423796.jpg"
                  }
                ></Avatar>
                <div className={styles.userInfo}>
                  <h4 style={{ color: "#121212" }}>Lê Văn Lâm</h4>
                  <p style={{ fontSize: "14px", color: "#a1a1a1" }}>Online</p>
                </div>
              </div>
              <div className={styles.headerTools}>
                <VideocamIcon
                  sx={{
                    fontSize: "28px",
                    marginRight: "24px",
                    color: "#212c6d",
                    "&:hover": { cursor: "pointer" },
                  }}
                ></VideocamIcon>
                <DensityMediumIcon
                  sx={{
                    fontSize: "28px",
                    marginRight: "24px",
                    color: "#212c6d",
                    "&:hover": { cursor: "pointer" },
                  }}
                ></DensityMediumIcon>
              </div>
            </div>
          </div>
          <div className={styles.chatBody} ref={chatBody}>
            {renderMessage}
          </div>
          <div className={styles.chatBot}>
            <ChatBubbleOutlineIcon
              sx={{
                fontSize: "32px",
                marginLeft: "12px",
                color: "#6ca2ff",
                "&:hover": { cursor: "pointer" },
              }}
            />
            <input
              className={styles.chatInput}
              type="text"
              value={message}
              onChange={handleInput}
              style={{
                flex: "1",
                margin: "0 16px",
                outline: "none",
                backgroundColor: "#fff",
                fontSize: "16px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #cccccc",
              }}
            />
            <SendIcon
              sx={{
                fontSize: "32px",
                marginRight: "12px",
                color: "#6ca2ff",
                "&:hover": { cursor: "pointer" },
              }}
              onClick={handleSend}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatPage;
