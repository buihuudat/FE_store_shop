import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.userData);
  console.log(user);
  return <div>ProfilePage</div>;
};

export default ProfilePage;
