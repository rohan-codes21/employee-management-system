import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import Footer from "./components/footer";
import SearchBar from "./components/SearchBar";

function App() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activePage, setActivePage] = useState("dashboard");
    const [searchTerm, setSearchTerm] = useState("");

    const fetchEmployees = () => {
    setLoading(true);
    setError("");

    fetch("http://127.0.0.1:5000/api/employees")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch employees");
            }

            return response.json();
        })
        .then((data) => {
            setEmployees(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching employees:", error);
            setError("Unable to load employees. Please try again.");
            setLoading(false);
        });
};

    useEffect(() => {
        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app">
            <Sidebar 
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <div className="main">
                <Header />

                {activePage === "dashboard" && (
    <Dashboard employees={employees} />
)}

{activePage === "employees" && (
    <>
        {loading && (
            <p className="status-messege">Loading employees...</p>
        )}
        {error && (
            <p className="error-message">{error}</p>
        )}
        
        <SearchBar
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
        />

        <EmployeeList
            employees={filteredEmployees}
            onEmployeeDeleted={fetchEmployees}
            onEmployeeUpdated={fetchEmployees}
        />
    </>
)}

{activePage === "add" && (
    <EmployeeForm onEmployeeAdded={fetchEmployees} />
)}

{activePage === "settings" && (
    <div className="settings-page">
        <h2>Settings</h2>
        <p>Settings page coming soon.</p>
    </div>
)}
                <Footer />
            </div>
        </div>
    );
}

export default App;