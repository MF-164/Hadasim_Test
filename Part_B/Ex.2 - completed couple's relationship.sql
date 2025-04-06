select * from persons

UPDATE p1
SET p1.Spouse_Id = p2.Person_Id
FROM persons p1
JOIN persons p2 ON p1.Person_Id = p2.Spouse_Id
WHERE p1.Spouse_Id IS NULL;

select * from persons
