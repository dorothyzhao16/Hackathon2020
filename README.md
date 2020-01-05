# Hackathon2020
Hyland Software Hackathon 2020!

## To Install
1. Install Node.js, Yarn, and MySQL
2. Clone the repository
3. Run `yarn` in the directory
4. Create the MySQL table:
```
create table points (
  id varchar(64) not null,
  points int not null,
  primary key (id)
);
```
5. Run the application with `node app.js`
