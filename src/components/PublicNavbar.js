import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const PublicNavbar = ({ availableGenres }) => {
  return (
    <Navbar variant="dark" className="public-nav">
      <Navbar.Brand href="#trending" className="page-name">
        Uku & Lele's Movie Collection
      </Navbar.Brand>
      <Nav className="mr-auto">
        <NavDropdown
          title="Browse by Category"
          id="nav-dropdown"
          className="nav-dropdown"
        >
          {availableGenres.map((genre, i) => (
            <NavDropdown.Item
              key={i}
              href={"#" + genre.name.toLowerCase().split(" ").join("-")}
              onSelect={() => {}}
            >
              {genre.name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;
