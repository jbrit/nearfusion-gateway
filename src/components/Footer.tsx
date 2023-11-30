import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        width: "100vw",
      }}
    >
      <nav className="container">
        <div className="footer__container" style={{ padding: "2rem 0" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span className="footer__brand title-font">Near Fusion</span>
            <span>All rights reserved 2023</span>
          </div>
          <div className="footer__list">
            {/* <Link className="footer__link" href="/">
              About Us
            </Link> */}
            <Link
              className="footer__link"
              href="https://twitter.com/near_fusion"
            >
              Twitter
            </Link>
            <Link href="https://discord.com/invite/hzGBCpAu">
              <button className="footer__btn">Join Discord</button>
            </Link>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
