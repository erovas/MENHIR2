INSERT INTO Accepted
    (Response)
VALUES
    (0);

INSERT INTO StoryTypes
    (Name)
VALUES 
    ('Text'), 
    ('Audio'), 
    ('Review');

INSERT INTO Genders 
    (Name)
VALUES 
    ('Male'), 
    ('Female'), 
    ('Identify as other');

INSERT INTO Wellbeings
    (
        Name, 
        Description
    )
VALUES 
    (
        'Connect', 
        'Socialise or connect with friends and family. You can do this in person (if allowed), via the internet (Zoom) or over the telephone or Facetime. When social distancing permits join a new club or group.'
    ),
    (
        'Be active',
        'Do somethings active every day. Physical exercise helps us to keep both our body fit. Find an activity you can enjoy or challenge yourself with. If it involves someone else then you algo get connection.'
        ),
    (
        'Keep learning',
        'Learning new things keeps our brains energised and healthy. Think of something you would like to learn more about, something you would like to learn to do - a new skill or a new hobby.'
    ),
    (
        'Give',
        'Giving to others, and to ourselves - this can be compliments, thoughtful gestures, listening, advice, time or doing something helpful for someone.'
    ),
    (
        'Take notice',
        'Take notice of the world around you - notice the beauty of nature. be mindful of your thoughts and feelings.'
    );

INSERT INTO HobbiesConnect
    (Name)
VALUES
    ('Catch up with friends'),
    ('Family activity'),
    ('Community/clubs'),
    ('Reconnect with sb'),
    ('Connect with nature'),
    ('Connect with your pets'),
    ('Horticulture'),
    ('Book club'),
    ('Travel');

INSERT INTO HobbiesBeActive
    (Name)
VALUES
    ('Yoga/pilates'),
    ('Walking/hiking'),
    ('Running/jogging'),
    ('Fishing'),
    ('Swimming/water sports'),
    ('Dance'),
    ('Sportive activity'),
    ('Gym'),
    ('Martial arts'),
    ('Archery'),
    ('Cycling'),
    ('Video gaming');


INSERT INTO HobbiesKeepLearning
    (Name)
VALUES
    ('Arts & crafts'),
    ('Photography'),
    ('Reading'),
    ('Creative writing'),
    ('Puzzles/word games'),
    ('Cooking/baking'),
    ('Gardening'),
    ('DIY'),
    ('Try new things'),
    ('Visit museum/gallery'),
    ('News/current affairs'),
    ('Education class');

INSERT INTO HobbiesGive
    (Name)
VALUES
    ('Volunteer'),
    ('Donate/charity'),
    ('Help others'),
    ('Be-friending'),
    ('Chat with a neighbour'),
    ('Fundraising');

INSERT INTO HobbiesTakeNotice
    (Name)
VALUES
    ('Visit a new place'),
    ('Explore your surroundings'),
    ('Keep up-to-date'),
    ('Be mindful/meditation'),
    ('Journaling/reading'),
    ('Listen to music');

INSERT INTO Moods
    (Name)
VALUES 
    ('Angry'), 
    ('Sad'), 
    ('Tired'), 
    ('Good'), 
    ('Happy')