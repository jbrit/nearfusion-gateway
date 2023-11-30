import type { NextPage } from "next";
import NFLogo from "@/components/NFLogo";
import React, { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { ComponentWrapperPage } from "@/components/ComponentWrapperPage";
import NearBlocks from "@/utils/nearblocks";
import { useQuery } from "@tanstack/react-query";
import QRCode from "react-qr-code";
import { useAuthStore } from "@/stores/auth";
import router from "next/router";

enum ModalOptions {
  Null,
  Send,
  Receive,
  Settings,
}
const Home: NextPage = () => {
  const [signedIn, accountId] = useAuthStore((store) => [
    store.signedIn,
    store.accountId,
  ]);
  const [modal, setModal] = useState(ModalOptions.Null);
  const [receiver, setReceiver] = useState("");
  if (typeof window !== "undefined" && !signedIn) {
    router.push(`/?next=${encodeURIComponent(router.asPath)}`);
  }
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof router.query.action === "string" &&
      signedIn
    ) {
      try {
        const { user: sendToUser } = JSON.parse(atob(router.query.action))
          .user as {
          user: string;
        };
        console.log();
        setReceiver(JSON.parse(atob(router.query.action)).user);
        setModal(ModalOptions.Send);
      } catch (error) {}
    }
  }, []);

  const shareable_url = `https://nearfusion.app/dashboard?action=${btoa(
    JSON.stringify({ user: accountId })
  )}`;

  const [selectedAsset, setSelectedAsset] = useState<undefined | string>(
    undefined
  );
  const {
    data: tokensData,
    isLoading: tokensLoading,
    isError: tokensError,
    isSuccess: tokensSuccess,
  } = useQuery([accountId, "tokens"], () => NearBlocks.tokens(accountId));
  return (
    <>
      {/* Modal Start */}
      {modal !== ModalOptions.Null && (
        <div
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid black",
              borderBottomWidth: "2px",
              borderRightWidth: "2px",
              minHeight: "100%",
            }}
            className="course-card_main"
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <span
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  fontFamily: "Joystix",
                  fontSize: "2rem",
                  padding: "1rem",
                }}
                onClick={() => {
                  setModal(ModalOptions.Null);
                  router.push("/dashboard");
                  setReceiver("");
                }}
              >
                X
              </span>
            </div>
            {modal === ModalOptions.Send && (
              <>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div style={{ marginBottom: "2rem" }}>
                    <label>Receiver</label>
                    <input
                      style={{
                        border: "2px solid black",
                        borderRadius: "none",
                        height: "2.75rem",
                        display: "block",
                        width: "100%",
                        marginBottom: "2rem",
                        padding: "0.5rem",
                      }}
                      value={receiver}
                      onChange={(e) => setReceiver(e.target.value)}
                      placeholder="abc.near"
                    />
                    <label>Amount</label>
                    <input
                      style={{
                        border: "2px solid black",
                        borderRadius: "none",
                        height: "2.75rem",
                        display: "block",
                        width: "100%",
                        marginBottom: "2rem",
                        padding: "0.5rem",
                      }}
                      placeholder="0.0"
                    ></input>
                    <label>Asset</label>
                    <select
                      style={{
                        border: "2px solid black",
                        borderRadius: "none",
                        height: "2.75rem",
                        display: "block",
                        width: "100%",

                        paddingLeft: "3rem",
                      }}
                      onChange={(e) => setSelectedAsset(e.target.value)}
                    >
                      <option disabled>
                        {tokensLoading
                          ? "Loading Assets..."
                          : tokensError
                          ? "Could not load assets"
                          : "Select an Asset"}
                      </option>
                      {tokensSuccess && (
                        <>
                          <option value="near">NEAR</option>
                          {tokensData.data.inventory.fts.map((ft) => (
                            <option value={ft.contract}>
                              {ft.ft_metas.symbol}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                  <button
                    onClick={() => {}}
                    style={{
                      minWidth: "50%",
                      display: "block",
                      margin: "auto",
                    }}
                    className="small-btn"
                  >
                    Send
                  </button>
                </form>
              </>
            )}
            {modal === ModalOptions.Receive && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <QRCode value={shareable_url} />
                </div>
                <div
                  style={{
                    border: "2px black solid",
                    padding: "0.5rem 2rem 0.5rem 0.5rem",
                    width: "calc(100% - 8rem)",
                    margin: "0 auto",
                    position: "relative",
                    textAlign: 'center'
                  }}
                >
                  {shareable_url}
                  <span
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      height: "100%",
                      width: "3rem",
                      display: "none",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(shareable_url);
                      // Alert the copied text
                      alert("URL Copied!");
                    }}
                  >
                    <div
                      style={{
                        height: "2rem",
                        width: "2rem",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          border: "2px black solid",
                          height: "1.5rem",
                          width: "1.5rem",
                          background: "white",
                          display: "block",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      ></span>
                      <span
                        style={{
                          border: "2px black solid",
                          height: "1.5rem",
                          width: "1.5rem",
                          background: "white",
                          display: "block",
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                        }}
                      ></span>
                    </div>
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "2rem",
                    textAlign: "center",
                    fontWeight: 500,
                    fontSize: "1.2rem",
                  }}
                >
                  Share the QRCode or copy the link to the clipboard to receive
                  a token
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Modal End */}
      <div style={{ display: "flex" }}>
        <NFLogo scale={0.8} style={{ zIndex: 2 }} />
        <span
          style={{
            display: "inline-block",
            fontSize: "1.5rem",
            margin: "auto",
          }}
        >
          {accountId}
        </span>
        <NFLogo scale={0.8} style={{ zIndex: 2, visibility: "hidden" }} />
      </div>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 500,
          textAlign: "center",
          margin: "0 0 1rem",
        }}
      >
        <ComponentWrapperPage
          src={"jibolaojo.near/widget/WalletBalance"}
          componentProps={{
            balance_type: "spendable",
          }}
        />{" "}
        NEAR
      </div>
      <Tab.Group>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <Tab.List>
            <Tab as={React.Fragment}>
              {({ selected }) => (
                <span
                  style={{
                    color: selected ? "black" : "#aaa",
                    borderBottom: "2px solid",
                    borderColor: selected ? "black" : "transparent",
                    cursor: "pointer",
                    fontWeight: 500,
                    margin: "0 0.5rem",
                  }}
                >
                  Assets
                </span>
              )}
            </Tab>
            <Tab as={React.Fragment}>
              {({ selected }) => (
                <span
                  style={{
                    color: selected ? "black" : "#aaa",
                    borderBottom: "2px solid",
                    borderColor: selected ? "black" : "transparent",
                    cursor: "pointer",
                    fontWeight: 500,
                    margin: "0 0.5rem",
                  }}
                >
                  Collectibles
                </span>
              )}
            </Tab>
          </Tab.List>
        </div>
        <div
          style={{
            padding: "0 1rem",
            maxHeight: "20rem",
            overflow: "auto",
          }}
        >
          <Tab.Panels>
            <Tab.Panel>
              <ComponentWrapperPage src={"jibolaojo.near/widget/Assets"} />
            </Tab.Panel>
            <Tab.Panel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "1rem",
                }}
              >
                <ComponentWrapperPage
                  src={"jibolaojo.near/widget/Collectibles"}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel>Transactions</Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          paddingTop: "1rem",
        }}
      >
        <button
          onClick={() => {
            setModal(ModalOptions.Send);
          }}
          className="nearfusion-btn btn-primary"
        >
          Send
        </button>
        <button
          onClick={() => {
            setModal(ModalOptions.Receive);
          }}
          className="nearfusion-btn btn-blue"
        >
          Receive
        </button>
      </div>
    </>
  );
};

export default Home;
