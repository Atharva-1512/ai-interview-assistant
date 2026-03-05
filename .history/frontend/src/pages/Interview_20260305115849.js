import { useEffect, useState } from "react";
import API from "../services/api";

function Interview() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/")
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Interview Page</h2>
      <p>{message}</p>
    </div>
  );
}

export default Interview;