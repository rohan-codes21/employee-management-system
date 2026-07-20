import { useState } from "react";

function EmployeeForm({ onEmployeeAdded }) {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [salary, setSalary] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name.trim() || !role.trim() || !salary) {
            alert("Please fill in all fields.");
            return;
        }

        if (Number(salary) <= 0) {
            alert("Salary must be greater than 0.");
            return;
        }

        const newEmployee = {
            name: name,
            role: role,
            salary: Number(salary)
        };

        fetch("http://127.0.0.1:5000/api/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Employee added:", data);

                alert("Employee added successfully!");

                setName("");
                setRole("");
                setSalary("");
                onEmployeeAdded(); 
            })
            .catch((error) => {
                console.error("Error adding employee:", error);
            });
    };

    return (
    <section className="form-section">
        <h2>Add New Employee</h2>

        <form onSubmit={handleSubmit} className="employee-form">

            <div className="form-group">
                <label>Employee Name</label>

                <input
                    type="text"
                    placeholder="Enter employee name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Job Role</label>

                <input
                    type="text"
                    placeholder="Enter job role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Salary</label>

                <input
                    type="number"
                    placeholder="Enter salary"
                    value={salary}
                    onChange={(event) => setSalary(event.target.value)}
                />
            </div>

            <button type="submit">
                Add Employee
            </button>

        </form>
    </section>
);
}

export default EmployeeForm;