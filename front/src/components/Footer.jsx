import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
// import "./Footer.css";
import logo from "../assets/img/pizza-logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container footer-container">
				<div className="header__logo">
					<img
						width="38"
						src={logo}
						alt="Pizza logo"
					/>
					<div>
						<h1>React Pizza</h1>
						<p>самая вкусная пицца во вселенной</p>
					</div>
				</div>
				<div className="footer-contact">
					<button className="footer-about-button">
						<Link to="/about">О пиццерии</Link>
					</button>
					<p>Email: contact@pizzeria.com</p>
					<a
						href="tel:+79997775588"
						className="phone-footer"
					>
						<p>Phone: +7 (999)-777-55-88</p>
					</a>
				</div>
				<div className="footer-social">
					<a
						href="https://facebook.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaFacebook size="2em" />
					</a>
					<a
						href="https://instagram.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaInstagram size="2em" />
					</a>
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaTwitter size="2em" />
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaLinkedin size="2em" />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
