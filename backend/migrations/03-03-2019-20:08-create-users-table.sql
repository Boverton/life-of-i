create table if not exists users (
  id INT auto_increment primary key,
  email varchar(50),
  username varchar(50),
  password text
)