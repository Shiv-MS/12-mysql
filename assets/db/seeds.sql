INSERT INTO 
department
(name) 
VALUES
("Sales"), ("HR"), ("Management");

INSERT INTO 
role
(title, salary, department_id) 
VALUES
("Sales Rep", 50000, 1), 
("Manager", 100000, 2), 
("HR", 70000, 3);

INSERT INTO 
employee
(first_name, last_name, role_id, manager_id) 
VALUES
("James", "Bond", 1, null),
("Homer", "Simpson", 2, 1), 
("Mike", "Tyson", 2, null), 
("Bart", "Simpson", 3, 1);
