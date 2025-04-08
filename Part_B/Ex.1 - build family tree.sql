CREATE TABLE persons (
    Person_Id INT PRIMARY KEY,
    Personal_Name VARCHAR(50),
    Family_Name VARCHAR(50),
    Gender CHAR(1),
    Father_Id INT,
    Mother_Id INT,
    Spouse_Id INT,
    FOREIGN KEY (Father_Id) REFERENCES persons(Person_Id),
    FOREIGN KEY (Mother_Id) REFERENCES persons(Person_Id),
    FOREIGN KEY (Spouse_Id) REFERENCES persons(Person_Id)
);


INSERT INTO persons (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id) VALUES
(1, 'David', 'Cohen', 'M', NULL, NULL, NULL),
(2, 'Miriam', 'Levi', 'F', NULL, NULL, 1),
(3, 'Yossi', 'Mizrahi', 'M', 1, 2, NULL),
(4, 'Sara', 'Gold', 'F', 1, 2, NULL),
(5, 'Avi', 'Katz', 'M', 1, 2, 6),
(6, 'Rachel', 'Katz', 'F', 5, NULL, 5),
(7, 'Noa', 'Shwartz', 'F', 1, 2, NULL),
(8, 'Eli', 'BenDavid', 'M', 3, 4, NULL),
(9, 'Tali', 'BenDavid', 'F', 5, 6, 8),
(10, 'Omer', 'Cohen', 'M', 1, 2, NULL);


-- Ex.1 Build Family tree

CREATE TABLE family_relationships (
    Person_Id INT,
    Relative_Id INT,
    Connection_Type VARCHAR(20)
);


INSERT INTO family_relationships (Person_Id, Relative_Id, Connection_Type)
SELECT p1.Person_Id, p1.Father_Id, 'אב'
FROM persons p1
WHERE p1.Father_Id IS NOT NULL

UNION ALL

SELECT p1.Person_Id, p1.Mother_Id, 'אם'
FROM persons p1
WHERE p1.Mother_Id IS NOT NULL

UNION ALL

SELECT p1.Person_Id, p2.Person_Id, 'בת זוג'
FROM persons p1
JOIN persons p2 ON p1.Spouse_Id = p2.Person_Id
WHERE p1.Gender = 'M' AND p2.Gender = 'F' AND p1.Spouse_Id IS NOT NULL


UNION ALL

SELECT p1.Person_Id, p2.Person_Id, 'בן זוג'
FROM persons p1
JOIN persons p2 ON p1.Spouse_Id = p2.Person_Id
WHERE p1.Gender = 'F' AND p2.Gender = 'M' AND p1.Spouse_Id IS NOT NULL

UNION ALL

SELECT p1.Person_Id, p2.Person_Id, 'אח'
FROM persons p1
JOIN persons p2 ON p1.Father_Id = p2.Father_Id AND p1.Mother_Id = p2.Mother_Id AND p1.Person_Id != p2.Person_Id AND p2.Gender = 'M'

UNION ALL

SELECT p1.Person_Id, p2.Person_Id, 'אחות'
FROM persons p1
JOIN persons p2 ON p1.Father_Id = p2.Father_Id AND p1.Mother_Id = p2.Mother_Id AND p1.Person_Id != p2.Person_Id AND p2.Gender = 'F';


	select * from family_relationships
	select * from persons