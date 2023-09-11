CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE notes(
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes(title, contents)
VALUES
('First Note', 'A note about something'),
('Second Note', 'A note about something else');