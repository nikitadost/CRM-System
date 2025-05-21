import { Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import useDebouce from "../../hooks/useDebounce";

interface UsersSearchProps {
  onSearchChange: (debouncedSearch: string) => void;
}

const UsersSearch: React.FC<UsersSearchProps> = ({ onSearchChange }) => {
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebouce(search, 1000);
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <Input
      placeholder="Введите текст для поиска"
      onChange={(e) => setSearch(e.target.value)}
      style={{ width: "100%", padding: "20px" }}
    />
  );
};

export default UsersSearch;
