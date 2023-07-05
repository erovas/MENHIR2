CREATE TABLE "Accepted" (
    "ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "Response"	INTEGER NOT NULL
);

CREATE TABLE "StoryTypes" (
    "ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "Name"	TEXT NOT NULL UNIQUE
);

CREATE TABLE "Genders" (
    "ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "Name"	INTEGER NOT NULL UNIQUE
);

CREATE TABLE "Users" (
    "ID"	    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "IDGender"	INTEGER NOT NULL,
    "Date"	    INTEGER NOT NULL,
    "Username"	TEXT NOT NULL,
    "Age"		INTEGER NOT NULL,
    "Password"	TEXT NOT NULL,
    FOREIGN KEY("IDGender") REFERENCES "Genders"("ID")
);

CREATE TABLE "Wellbeings" (
    "ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "Name"	TEXT NOT NULL UNIQUE,
    "Description"	TEXT NOT NULL
);

CREATE TABLE "HobbiesConnect" (
    "ID"	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "Name"	        TEXT NOT NULL
);

CREATE TABLE "UserHobbiesConnect" (
    "ID"	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "IDUser"        INTEGER NOT NULL,
    "IDHobby"       INTEGER NOT NULL,
    FOREIGN KEY("IDUser") REFERENCES "Users"("ID"),
    FOREIGN KEY("IDHobby") REFERENCES "HobbiesConnect"("ID")
);

CREATE TABLE "HobbiesBeActive" (
    "ID"	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "Name"	        TEXT NOT NULL
);

CREATE TABLE "UserHobbiesBeActive" (
    "ID"	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "IDUser"        INTEGER NOT NULL,
    "IDHobby"       INTEGER NOT NULL,
    FOREIGN KEY("IDUser") REFERENCES "Users"("ID"),
    FOREIGN KEY("IDHobby") REFERENCES "HobbiesBeActive"("ID")
);

CREATE TABLE "HobbiesKeepLearning" (
    "ID"	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "Name"	        TEXT NOT NULL
);

CREATE TABLE "UserHobbiesKeepLearning" (
    "ID"	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "IDUser"        INTEGER NOT NULL,
    "IDHobby"       INTEGER NOT NULL,
    FOREIGN KEY("IDUser") REFERENCES "Users"("ID"),
    FOREIGN KEY("IDHobby") REFERENCES "HobbiesKeepLearning"("ID")
);

CREATE TABLE "HobbiesGive" (
    "ID"	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "Name"	        TEXT NOT NULL
);

CREATE TABLE "UserHobbiesGive" (
    "ID"	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "IDUser"        INTEGER NOT NULL,
    "IDHobby"       INTEGER NOT NULL,
    FOREIGN KEY("IDUser") REFERENCES "Users"("ID"),
    FOREIGN KEY("IDHobby") REFERENCES "HobbiesGive"("ID")
);

CREATE TABLE "HobbiesTakeNotice" (
    "ID"	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "Name"	        TEXT NOT NULL
);

CREATE TABLE "UserHobbiesTakeNotice" (
    "ID"	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "IDUser"        INTEGER NOT NULL,
    "IDHobby"       INTEGER NOT NULL,
    FOREIGN KEY("IDUser") REFERENCES "Users"("ID"),
    FOREIGN KEY("IDHobby") REFERENCES "HobbiesTakeNotice"("ID")
);

CREATE TABLE "Moods" (
    "ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "Name"	TEXT NOT NULL UNIQUE,
    "Filename"	TEXT
);

CREATE TABLE "UserStories" (
    "ID"	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "IDUser"	    INTEGER NOT NULL,
    "IDStoryType"	INTEGER NOT NULL,
    "IDMoodBefore"	INTEGER NOT NULL,
    "IDMoodAfter"	INTEGER NOT NULL,
    "Date"	        INTEGER NOT NULL,
    "Title"	        TEXT NOT NULL,
    "Text"	        TEXT,
    "Source"	    TEXT,
    FOREIGN KEY("IDUser") REFERENCES "Users"("ID"),
    FOREIGN KEY("IDStoryType") REFERENCES "StoryTypes"("ID"),
    FOREIGN KEY("IDMoodAfter") REFERENCES "Moods"("ID"),
    FOREIGN KEY("IDMoodBefore") REFERENCES "Moods"("ID")
)