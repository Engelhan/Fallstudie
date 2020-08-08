
INSERT INTO public."Users"(
	"Firstname", "Lastname", "Username", "Password", "RoleId")
	VALUES 
	('Max', 'Mustermann', 'Mamu', '1234', 1),
	('Lara', 'Loft', 'Lalo', '1234', 2),
	('Paul', 'Panzer', 'Papa', '1234', 3);

INSERT INTO public."Roles"(
	"RoleName")
	VALUES ('Admin'),
	('ProjectManager'),
	('Controlling');