import { useState } from "react";

function EmployeeCard({ employee, onEmployeeDeleted, onEmployeeUpdated }) {
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(employee.name);
    const [role, setRole] = useState(employee.role);
    const [salary, setSalary] = useState(employee.salary);

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${employee.name}?`
        );

        if (!confirmDelete) {
            return;
        }

        fetch(`http://127.0.0.1:5000/api/employees/${employee.id}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("Employee deleted successfully!");
                onEmployeeDeleted();
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
            });
    };

    const handleUpdate = (event) => {
        event.preventDefault();

        if (!name.trim() || !role.trim() || !salary) {
            alert("Please fill in all fields.");
            return;
        }

        if (Number(salary) <= 0) {
            alert("Salary must be greater than 0.");
            return;
        }

        const updatedEmployee = {
            name: name,
            role: role,
            salary: Number(salary)
        };

        fetch(`http://127.0.0.1:5000/api/employees/${employee.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEmployee)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                alert("Employee updated successfully!");

                setIsEditing(false);

                onEmployeeUpdated();
            })
            .catch((error) => {
                console.error("Error updating employee:", error);
            });
    };

    if (isEditing) {
        return (
            <form onSubmit={handleUpdate} className="employee-card">
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />

                <input
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                />

                <input
                    type="number"
                    value={salary}
                    onChange={(event) => setSalary(event.target.value)}
                />

                <button type="submit">
                    Save
                </button>

                <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                >
                    Cancel
                </button>
            </form>
        );
    }

    return (
        <div className="employee-card">
            <h3>{employee.name}</h3>

            <p>{employee.role}</p>

            <p>Salary: ₹{employee.salary}</p>

            <button onClick={() => setIsEditing(true)}>
                Edit
            </button>

            <button onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
}

export default EmployeeCard;