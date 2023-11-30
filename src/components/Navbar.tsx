import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth";
import router from "next/router";
import { ComponentWrapperPage } from "./ComponentWrapperPage";

type Props = {};

const Navbar = (props: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [requestSignInWithWallet, signedIn, accountId, logout] = useAuthStore(
    (store) => [
      store.requestSignInWithWallet,
      store.signedIn,
      store.accountId,
      store.logOut,
    ]
  );
  useEffect(() => {
    if (signedIn) router.push("/dashboard");
  }, [signedIn]);
  return (
    <nav className="navbar">
      <div className="container navbar__container">
        <Link href="/">
          <span className="navbar__brand title-font">NearFusion</span>
        </Link>
        <div className="navbar__list">
          {!signedIn && (
            <button
              onClick={requestSignInWithWallet}
              className="nearfusion-btn btn-primary"
            >
              Connect Wallet
            </button>
          )}
        </div>
        {signedIn && (
          <div
            style={{
              display: "flex",
              border: "2px solid black",
              padding: "2px",
              position: "relative",
            }}
          >
            <ComponentWrapperPage
              src={"mob.near/widget/ProfileImage"}
              componentProps={{
                balance_type: "spendable",
              }}
            />{" "}
            <span
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "1rem",
                padding: "0 0.5rem",
                fontSize: "1.25rem",
                fontWeight: 500,
                borderLeft: "2px solid black",
              }}
            >
              {accountId}
            </span>
            <span
              style={{
                userSelect: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontSize: "1.25rem",
              }}
              onClick={() => setOpenModal(!openModal)}
            >
              {!openModal ? (
                <span
                  style={{
                    transform: "rotate(90deg)",
                    display: "inline-block",
                    padding: "0.25rem",
                  }}
                >
                  {">"}
                </span>
              ) : (
                <span style={{ display: "inline-block", padding: "0.25rem" }}>
                  {"x"}
                </span>
              )}
            </span>
            {openModal && <div
              style={{
                top: "100%",
                right: 0,
                display: "flex",
                border: "2px solid black",
                padding: "2px",
                position: "absolute",
                width: "100%",
                cursor: "pointer",
              }}
              onClick={async () => {
                await logout();
              }}
            >
              Logout
            </div>}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
