const { prompt } = require("inquirer");
const connection = require("./db/connection.js")

const db = require("./db");


init();

function init() {
  
    //shows the initial questions
    loadMainPrompts();
  }
  
  async function loadMainPrompts() {
    const { choice } = await prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE"
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE"
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES"
          },
          {
            name: "Add Role",
            value: "ADD_ROLE"
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          {
            name: "Quit",
            value: "QUIT"
          }
        ]
      }
    ]);
  
    // This switch statement calls the appropriate 
    // function depending on what the user choses. The 
    // functions below this are then fired depending on the choice
    switch (choice) {
      case "VIEW_EMPLOYEES":
        return viewEmployees();
      case "ADD_EMPLOYEE":
        return addEmployee();
      case "UPDATE_EMPLOYEE_ROLE":
        return updateEmployeeRole();
      case "VIEW_DEPARTMENTS":
        return viewDepartments();
      case "ADD_DEPARTMENT":
        return addDepartment();
      case "VIEW_ROLES":
        return viewRoles();
      case "ADD_ROLE":
        return addRole();
      default:
        return quit();
    }
  }
  
  //this function queries the db to find all employees.  
  //It connects to the db and runs a query within the findAllEmployees function
  //inside the db/index.js file
  async function viewEmployees() {
    const employees = await db.findAllEmployees();
  
    console.log("\n");
    console.table(employees);
  
    loadMainPrompts();
  }
  //this function queries the db to find all employees and allows the user to update employee role.  
  //It connects to the db and runs a query within the findAllEmployees function inside the db/index.js file
  //It then prompts via inquirer asking which employee's role to update by choosing employee id
  //It then queries the db with the findAllRoles function inside the db/index.js file using the employee id chosen by the user
  //It then allows the user to update the employee role by firing the updateEmployeeRole inside the db/index.js file.
  async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
      }
    ]);
  
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to assign the selected employee?",
        choices: roleChoices
      }
    ]);
  
    await db.updateEmployeeRole(employeeId, roleId);
  
    console.log("Updated employee's role");
  
    loadMainPrompts();
  }
  
  //this function queries the db to find all employee roles.
  //It connects to the db and runs a query within the findAllRoles function inside the db/index.js file
  async function viewRoles() {
    const roles = await db.findAllRoles();
  
    console.log("\n");
    console.table(roles);
  
    loadMainPrompts();
  }
  
  //this function queries the db to add employee roles.
  //It connects to the db and runs a query within the findAllDepartments function inside the db/index.js file
  //It then prompts via inquirer asking name of role, salary of role, and which department the role belongs to.
  //Once it receives the info required the createRole function is fired inside the db/index.js file to create the role.
  async function addRole() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await prompt([
      {
        name: "title",
        message: "What is the name of the role?"
      },
      {
        name: "salary",
        message: "What is the salary of the role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices
      }
    ]);
  
    await db.createRole(role);
  
    console.log(`Added ${role.title} to the database`);
  
    loadMainPrompts();
  }
  
  //this function queries the db to find all departments.
  //It connects to the db and runs a query within the findAllDepartments function inside the db/index.js file
  async function viewDepartments() {
    const departments = await db.findAllDepartments();
  
    console.log("\n");
    console.table(departments);
  
    loadMainPrompts();
  }
  //this function queries the db to add Departments.
  //It prompts via inquirer asking the name of the department
  //It connects to the db and runs a query within the createDepartment function inside the db/index.js file
  //Once that function receives the values from the inquirer prompts a new department is made.
  async function addDepartment() {
    const department = await prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ]);
  
    await db.createDepartment(department);
  
    console.log(`Added ${department.name} to the database`);
  
    loadMainPrompts();
  }
  
  //this function queries the db to add Employees.
  //It connects to the db and runs a query within the findAllRoles and findAllEmployees function inside the db/index.js file
  //It prompts via inquirer asking the name of the employee, role, manager.
  //Once that function receives the values from the inquirer prompt a new employee is made by thr createEmployee function inside the db/index.js file
  async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();
  
    const employee = await prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the employee's last name?"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt({
      type: "list",
      name: "roleId",
      message: "What is the employee's role?",
      choices: roleChoices
    });
  
    employee.role_id = roleId;
  
    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
      type: "list",
      name: "managerId",
      message: "Who is the employee's manager?",
      choices: managerChoices
    });
  
    employee.manager_id = managerId;
  
    await db.createEmployee(employee);
  
    console.log(
      `Added ${employee.first_name} ${employee.last_name} to the database`
    );
  
    loadMainPrompts();
  }
  
  function quit() {
    console.log("Goodbye!");
    process.exit();
  }
  