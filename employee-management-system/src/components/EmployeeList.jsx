import { useState } from "react";
import EmployeeCard from "./EmployeeCard";

function EmployeeList({
    employees,
    onEmployeeDeleted,
    onEmployeeUpdated
}) {
    const [sortOption, setSortOption] = useState("default");

    const sortedEmployees = [...employees].sort((a, b) => {
        if (sortOption === "name-asc") {
            return a.name.localeCompare(b.name);
        }

        if (sortOption === "name-desc") {
            return b.name.localeCompare(a.name);
        }

        if (sortOption === "salary-low") {
            return Number(a.salary) - Number(b.salary);
        }

        if (sortOption === "salary-high") {
            return Number(b.salary) - Number(a.salary);
        }

        return 0;
    });

    return (
        <section className="employee-section">

            <div className="employee-header">
                <h2>Employees</h2>

                <select
                    value={sortOption}
                    onChange={(event) =>
                        setSortOption(event.target.value)
                    }
                >
                    <option value="default">
                        Sort Employees
                    </option>

                    <option value="name-asc">
                        Name: A → Z
                    </option>

                    <option value="name-desc">
                        Name: Z → A
                    </option>

                    <option value="salary-low">
                        Salary: Low → High
                    </option>

                    <option value="salary-high">
                        Salary: High → Low
                    </option>
                </select>
            </div>

            {sortedEmployees.length === 0 ? (
                <p className="empty-message">
                    No employees found.
                </p>
            ) : (
                <div className="employee-grid">
                    {sortedEmployees.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            onEmployeeDeleted={onEmployeeDeleted}
                            onEmployeeUpdated={onEmployeeUpdated}
                        />
                    ))}
                </div>
            )}

        </section>
    );
}

export default EmployeeList;