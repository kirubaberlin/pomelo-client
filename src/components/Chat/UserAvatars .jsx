import React from "react";

const UserAvatars = ({ users }) => {
  return (
    <div className="user-avatars">
      {users.map((user) => (
        <div key={user.id} className="user-avatar">
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserAvatars;
