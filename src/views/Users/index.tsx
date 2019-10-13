import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useSubscription, useQuery } from "@apollo/react-hooks";

const QUERY = gql`
  query fetchUsers {
    users {
      _id
    }
  }
`;

const LAST_LOGIN = gql`
  subscription lastLogin {
    lastUser {
      token
      user {
        _id
        email
      }
    }
  }
`;

const UserListComponent = () => {
  const { data: lastLogin } = useSubscription(LAST_LOGIN);

  if (lastLogin) {
    const {
      lastUser: { user }
    } = lastLogin;
    return <div>{JSON.stringify(user, null, 2)}</div>;
  }

  return <div>No data</div>;
};

export default UserListComponent;
