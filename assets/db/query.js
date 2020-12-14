const connection = require("./connection")

class DbQueryBuilder {
    constructor(){
        this.connection = connection
    }

    queryDepartments(){
        return this.connection.query
        ("SELECT * FROM department")
    }

    queryRoles(){
        return this.connection.query
        ("SELECT role.id, role.title, role.salary, role.department_id, department.name FROM role LEFT JOIN department on department_id = department.id")
    }

    queryEmployees(){
        return this.connection.query
        ("SELECT * FROM employee")
    }

    createDepartment(name){
        return this.connection.query("INSERT INTO department SET ?", {
            name: name
        })
    }

    createRole(title, salary, department_id){
        return this.connection.query("INSERT INTO role SET ?", {
            title: title,
            salary: salary,
            department_id: department_id
        })
    }

    createEmployee(first_name, last_name, role_id, manager_id){
        return this.connection.query("INSERT INTO employee SET ?", {
            first_name: first_name,
            last_name: last_name,
            role_id: role_id,
            manager_id: manager_id
        })
    }

    updateEmployeeRole(role_id, employee_id){
        // console.log(role_id, employee_id)
        return this.connection.query("UPDATE employee SET ? WHERE ?", [{
            role_id: role_id
        },
        {
            id: employee_id
        }])
    }
}

module.exports = new DbQueryBuilder(connection)