import User from "../app/components/Users/Users";
import Posts from "../App/components/Posts/Posts";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";

export type menuRoute = {
  name: string;
  path: string;
  component: any;
  icon?: any;
};

export const menuRoutes: menuRoute[] = [
  {
    name: "Users",
    path: "/user",
    component: User,
    icon: AccountCircleOutlinedIcon,
  },
  {
    name: "Posts",
    path: "/post",
    component: Posts,
    icon: PostAddOutlinedIcon,
  },
];
