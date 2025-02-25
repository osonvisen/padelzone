import "./styling/Footer.css";
const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>
                &copy; {new Date().getFullYear()} PadelZone. Alle rettigheter
                reservert!
            </p>
            <p>
                Kontakt oss:{" "}
                <a href="mailto:support@padelzone.no">support@padelzone.no</a>
            </p>
        </footer>
    );
};

export default Footer;
