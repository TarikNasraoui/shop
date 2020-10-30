import bcrypt from "bcryptjs";
const users = [
  {
    name: "Tarik Nasraoui",
    email: "tarik1@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Tarik Nasraoui",
    email: "tarik2@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Tarik Nasraoui",
    email: "tarik3@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
