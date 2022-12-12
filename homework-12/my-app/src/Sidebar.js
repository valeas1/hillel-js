import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <nav className="sidebar__menu">
                <a className="sidebar__menu-link" href="index.html">
                    Главная
                </a>
                <a className="sidebar__menu-link" href="index.html">
                    Документация
                </a>
                <a className="sidebar__menu-link" href="index.html">
                    Контакты
                </a>
            </nav>
        </div>
    );
}

export default Sidebar;
