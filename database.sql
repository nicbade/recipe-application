CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);

CREATE TABLE "recipes" (
	"id" serial primary key,
	"name" varchar(80),
	"type" varchar(50),
	"servings" int
);