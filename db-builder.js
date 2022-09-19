const mysql = require("mysql");
const cmd = require("child_process");
const { exit } = require("process");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "nima",
  password: "Nima1381*",
});

db.connect((err) => {
  db.query("SHOW DATABASES like 'FOO6'", (_, database) => {
    if (database.length > 0) {
      throw new Error("Database Exist");
    } else {
      db.query("CREATE DATABASE FOO6");
      cmd.exec(
        "npx prisma migrate dev --name init",
        (err, st, stder) => {
          db.query("use FOO6", () => {
            db.query("INSERT INTO Category VALUES (1, 'bar', 1);");
            db.query("INSERT INTO Category VALUES (2, 'baz', 1);");
            db.query(
              "INSERT INTO Category VALUES (3, 'foo', 1);",
              () => {
                exit(1);
              }
            );
          });
        }
      );
    }
  });
});
