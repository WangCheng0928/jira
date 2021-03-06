import React from "react";

export interface User {
  id: number;
  name: string;
  token: string;
}

interface SearchPannelProps {
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPannelProps["param"]) => void;
  users: User[];
}

export const SearchPannel = ({ param, setParam, users }: SearchPannelProps) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(event) => {
            console.log(event.target.value);
            setParam({
              ...param,
              personId: event.target.value,
            });
          }}
        >
          <option>负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
