import { Avatar, Input, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

import { AuthApi } from "../../api";

const Permission = ["Admin", "Staff", "User"];
const ProfilePage = () => {
  const user = useSelector((state) => state.user.userData);

  const handleUpdateAvatar = async (e) => {
    await AuthApi.changeAvatar({ id: user.id, avatar: e.target.files[0] });
    console.log({ avatar: e.target.files[0] });
  };

  console.log(user);

  return (
    <Box p={10}>
      <Box display={"flex"} flexDirection="row" gap={5} alignItems="center">
        <Box position={"relative"}>
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{ width: 200, height: 200 }}
          />
          <Input type="file" onChange={(e) => handleUpdateAvatar(e)} />
        </Box>

        <Box>
          <Typography fontSize={26} fontWeight={600}>
            {user.name}
          </Typography>
          <Typography fontWeight={400}>
            {Permission[Number(user.permission)]}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
