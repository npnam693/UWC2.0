import { memo } from "react";
import { Avatar } from "@mui/material";
import styles from "./style.module.css";

function MessageUser({ data, onSelect }) {
  // const fakeTime = () => {
  //   const h = Math.round(Math.random() * 12);
  //   const m = Math.round(Math.random() * 60);
  //   const s = Math.round(Math.random() * 1);
  //   return s
  //     ? h.toString() + ":" + m.toString() + "AM"
  //     : h.toString() + ":" + m.toString() + "PM";
  // };

  // const fakeLastMess = () => {
  //   const data = [
  //     "Ổn không anh bạn chẻ?",
  //     "Sắp xong rồi nè",
  //     "7h là xong nha",
  //     "Lát gọi lại cho tôi",
  //     "Tôi sẽ liên lạc lại với bạn",
  //     "Cảm ơn nhiều nha",
  //     "Không có gì",
  //     "Bạn phải làm lại cái này ngay",
  //     "Như vậy là không ổn rồi",
  //     "Sắp tới tôi có việc đột xuât",
  //     "Tôi đi đây :<<",
  //   ];
  //   return data[Math.round(Math.random() * (data.length - 1))];
  // };

  return (
    <div
      className={styles.wrapper}
      onClick={(e) => {
        onSelect(e, data.id);
      }}
    >
      <div className={styles.left}>
        <Avatar
          src={data.avatar}
          sx={{
            width: "40px",
            height: "40px",
            border: "1px solid #cccccc",
          }}
        ></Avatar>
        <div className={styles.info}>
          <h4
            style={{
              color: "#121212",
              fontWeight: "500",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {data.name}
          </h4>
          <p
            style={{
              fontWeight: "300",
              fontSize: "14px",
              color: "#a1a1a1",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "16ch",
            }}
          >
            {/* {fakeLastMess()} */}
            Bạn bị sa thải rồi nhé :vv
          </p>
        </div>
      </div>
      <div className={styles.right}>{/* fakeTime() */}8:12 AM</div>
    </div>
  );
}

export default memo(MessageUser);
