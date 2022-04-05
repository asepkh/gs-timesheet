import { useState } from "react";
import { Select, Divider, Input, Typography, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const SelectOther = ({ data, isFetch, onAddItem, ...props }) => {
  const [items, setItems] = useState([...(data || [])]);
  const [name, setName] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = async (e) => {
    await e.preventDefault();
    await onAddItem(name);

    if (!isFetch) await setItems([...items, name || `No Title`]);

    setName("");
  };

  return (
    <Select
      {...props}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: "8px 0" }} />
          <Space align="center" style={{ padding: "0 8px 4px" }}>
            <Input
              placeholder="Please enter an option"
              value={name}
              onChange={onNameChange}
            />
            <Typography.Link onClick={addItem} style={{ whiteSpace: "nowrap" }}>
              <PlusOutlined /> Add Option
            </Typography.Link>
          </Space>
        </>
      )}
    >
      {(isFetch ? data : items).map((item) => (
        <Option value={item} key={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
};

export default SelectOther;
