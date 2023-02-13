import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { setMenuType } from "../reducers/menuReducer";

const dataSort = [
  { name: "Mới nhất", type: "new" },
  { name: "Giá", type: "price" },
  { name: "Hot", type: "hot" },
];

export default function MenuSort() {
  const [value, setValue] = React.useState("new");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setValue(event.target.value);
    dispatch(setMenuType(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" sx={{ color: "black" }}>
          Sắp xếp
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Sắp xếp"
          onChange={handleChange}
          sx={{ color: "black" }}
        >
          {dataSort.map((data, i) => (
            <MenuItem key={i} value={data.type}>
              {data.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
