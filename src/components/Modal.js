import { motion } from "framer-motion";
import { Form, redirect } from "react-router-dom";
import { User, addUser } from "../firestore.js";

export async function action({ request }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  user.time = +user.time.split(" ")[0];
  if (!user.name.trim()) user.name = "Annonymous";
  addUser(User(user.name, user.time));
  return redirect("/leaderboard");
}

const Modal = ({ time }) => {
  return (
    <div className="backdrop">
      <motion.div
        id="modal"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Form id="modal-form" method="post">
          <input name="time" readOnly value={`${time} seconds`}></input>
          <input
            name="name"
            type="text"
            placeholder="Enter Name"
            maxLength={17}
            pattern="[a-zA-Z0-9!.]*"
          ></input>
          <button type="submit">Submit Score</button>
        </Form>
      </motion.div>
    </div>
  );
};

export default Modal;
