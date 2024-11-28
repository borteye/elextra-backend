const CHECK_USERNAME_EXISTENCE = "SELECT * FROM users WHERE username = $1";
const CHECK_EMAIL_EXISTENCE = "SELECT * FROM users WHERE email = $1";
const CREATE_USER =
  "INSERT INTO users(username, email, password) VALUES($1, $2, $3)";

export { CHECK_USERNAME_EXISTENCE, CHECK_EMAIL_EXISTENCE, CREATE_USER };
