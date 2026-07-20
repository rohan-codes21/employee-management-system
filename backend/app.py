from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)


# MySQL database connection
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Qwert@123",
        database="employee_management"
    )


@app.route("/")
def home():
    return "Employee Management System Backend is running!"


# GET all employees
@app.route("/api/employees", methods=["GET"])
def get_employees():

    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM employees")

    employees = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify(employees)


# POST new employee
@app.route("/api/employees", methods=["POST"])
def add_employee():

    data = request.get_json()

    connection = get_db_connection()
    cursor = connection.cursor()

    sql = """
        INSERT INTO employees (name, role, salary)
        VALUES (%s, %s, %s)
    """

    values = (
        data["name"],
        data["role"],
        data["salary"]
    )

    cursor.execute(sql, values)

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Employee added successfully"
    }), 201


# PUT update employee
@app.route("/api/employees/<int:employee_id>", methods=["PUT"])
def update_employee(employee_id):

    data = request.get_json()

    connection = get_db_connection()
    cursor = connection.cursor()

    sql = """
        UPDATE employees
        SET name = %s, role = %s, salary = %s
        WHERE id = %s
    """

    values = (
        data["name"],
        data["role"],
        data["salary"],
        employee_id
    )

    cursor.execute(sql, values)

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Employee updated successfully"
    })


# DELETE employee
@app.route("/api/employees/<int:employee_id>", methods=["DELETE"])
def delete_employee(employee_id):

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM employees WHERE id = %s",
        (employee_id,)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return jsonify({
        "message": "Employee deleted successfully"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)