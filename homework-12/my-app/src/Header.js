import './Header.css';

function Header() {
    return (
        <header className="header conteiner">
            <a href="index.html">
                <p className="header__logo">
                    <span>Test</span>React
                </p>
            </a>
            <div className="header__main is-hidden">
                <div className="header__main-cross">
                    <span className="header__main-cross-one"></span>
                    <span className="header__main-cross-two"></span>
                </div>

                <a className="header__main-tel" href="tel:+380961111111">
                    <svg
                        className="header__main-pic"
                        width="10"
                        height="14"
                        viewBox="0 0 10 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.5 0H1.5C0.672848 0 0 0.588742 0 1.3125V12.6875C0 13.4113 0.672848 14 1.5 14H8.5C9.32715 14 10 13.4113 10 12.6875V1.3125C10 0.588742 9.32715 0 8.5 0ZM1.5 0.875H8.5C8.77588 0.875 9 1.07111 9 1.3125V10.5H1V1.3125C1 1.07111 1.22412 0.875 1.5 0.875ZM8.5 13.125H1.5C1.22412 13.125 1 12.9289 1 12.6875V11.375H9V12.6875C9 12.9289 8.77588 13.125 8.5 13.125Z"
                            fill="index.html757575"
                        ></path>
                    </svg>
                    +38 096 111 11 11
                </a>
                <a className="header__main-email" href="mailto:info@devstudio.com">
                    <svg
                        className="header__main-pic"
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.6875 0H1.31251C0.588747 0 0 0.560711 0 1.25001V8.74999C0 9.43929 0.588747 10 1.31251 10H12.6875C13.4113 10 14 9.43929 14 8.74999V1.25001C14 0.560711 13.4113 0 12.6875 0ZM12.6875 0.833329C12.7469 0.833329 12.8035 0.845074 12.8552 0.865586L7 5.69865L1.14479 0.865586C1.19649 0.845102 1.25304 0.833329 1.31248 0.833329H12.6875ZM12.6875 9.16664H1.31251C1.07112 9.16664 0.874996 8.97989 0.874996 8.74997V1.74601L6.71331 6.56493C6.79578 6.63287 6.89789 6.66666 7 6.66666C7.10211 6.66666 7.20422 6.6329 7.28669 6.56493L13.125 1.74601V8.74999C13.125 8.97989 12.9289 9.16664 12.6875 9.16664Z"
                            fill="index.html757575"
                        ></path>
                    </svg>
                    info@testreact.com
                </a>
                <div className="header__main-social">
                    <a className="header__main-social-link" href="index.html">
                        Instagram
                    </a>
                    <a className="header__main-social-link" href="index.html">
                        Twitter
                    </a>
                    <a className="header__main-social-link" href="index.html">
                        Facebook
                    </a>
                    <a className="header__main-social-link" href="index.html">
                        LinkedIn
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
