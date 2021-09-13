import React from "react";
import qs from "qs";
import { useState, useEffect } from "react";
import { List } from "./list";
import { SearchPannel } from "./search-pannel";
import { cleanObject, useDebounce, useMount } from "../../utils/index";
import { useHttp } from "../../utils/http";

export const ProjectListScreen = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedValue = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedValue) }).then(setList);
  }, [debouncedValue]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPannel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
