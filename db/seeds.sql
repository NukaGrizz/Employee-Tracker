INSERT INTO department (name, description)
VALUES
    ('Engineering', 'the builders'),
    ('Sales', 'the sellers');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Senior Software Engineer', 150000.00, 1),
    ('Software Developer', 90000.00, 1),
    ('Sales Manager', 80000.00, 2),
    ('Sales Rep', 65000.00, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Nuka', 'Grizz', 1, NULL),
    ('Joe', 'T', 2, 1),
    ('Eddy', 'M', 3, NULL),
    ('Forrest', 'H', 4, 3);