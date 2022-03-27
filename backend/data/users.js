import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin", 10),
    isAdmin: true,
  },
  {
    name: "mohsin",
    email: "mohsinogen@gmail.com",
    password: bcrypt.hashSync("mohsin", 10),
    isAdmin: false,
  },
];

export default users;
