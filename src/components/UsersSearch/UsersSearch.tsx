import { Input } from "antd";
import { GetProps } from "antd";
import React from "react";

type SearchProps = GetProps<typeof Input.Search>;

interface UsersSearchProps {
  onSearch: SearchProps["onSearch"];
}

const UsersSearch: React.FC<UsersSearchProps> = ({ onSearch }) => {
  return (
    <Input.Search
      placeholder="Введите текст для поиска"
      onSearch={onSearch}
      style={{ width: "100%", padding: "20px" }}
    />
  );
};

export default UsersSearch;
