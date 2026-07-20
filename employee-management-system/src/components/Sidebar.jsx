function Sidebar({ activePage, setActivePage }) {
    return (
        <aside className="sidebar">
            <ul>
                <li
                    className={activePage === "dashboard" ? "active" : ""}
                    onClick={() => setActivePage("dashboard")}
                >
                    Dashboard
                </li>

                <li
                    className={activePage === "employees" ? "active" : ""}
                    onClick={() => setActivePage("employees")}
                >
                    Employees
                </li>

                <li
                    className={activePage === "add" ? "active" : ""}
                    onClick={() => setActivePage("add")}
                >
                    Add Employees
                </li>

                <li
                    className={activePage === "settings" ? "active" : ""}
                    onClick={() => setActivePage("settings")}
                >
                    Settings
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;