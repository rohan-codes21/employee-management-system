function Dashboard({ employees }) {

    const totalEmployees = employees.length;

    const totalDepartments = new Set(
        employees.map(employee => employee.role)
    ).size;

    const totalManagers = employees.filter(
        employee =>
            employee.role &&
            employee.role.toLowerCase().includes("manager")
    ).length;

    const totalPayroll = employees.reduce(
        (total, employee) => total + Number(employee.salary || 0),
        0
    );

    const averageSalary =
        totalEmployees > 0
            ? totalPayroll / totalEmployees
            : 0;

    return (
        <div className="dashboard">

            <h2>Dashboard</h2>

            <div className="cards">

                <div className="card">
                    <h3>{totalEmployees}</h3>
                    <p>Total Employees</p>
                </div>

                <div className="card">
                    <h3>{totalDepartments}</h3>
                    <p>Departments</p>
                </div>

                <div className="card">
                    <h3>{totalManagers}</h3>
                    <p>Managers</p>
                </div>

                <div className="card">
                    <h3>₹{totalPayroll.toLocaleString()}</h3>
                    <p>Total Payroll</p>
                </div>

                <div className="card">
                    <h3>₹{Math.round(averageSalary).toLocaleString()}</h3>
                    <p>Average Salary</p>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;