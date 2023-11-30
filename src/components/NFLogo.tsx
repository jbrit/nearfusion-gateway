import React from "react";

type Props = {
  style?: React.CSSProperties;
  scale?: number
};

const NFLogo: React.FC<Props> = ({ style, scale }) => {
  const scaleFactor = scale ?? 1;
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        margin: `${scaleFactor}rem`,
        height: `${scaleFactor*60}px`,
        width: `${scaleFactor*70}px`,
        padding: `${scaleFactor*4}px`,
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <span
        style={{
          backgroundColor: "black",
          display: "inline-flex",
          position: "absolute",
          height: `calc(100% - ${scaleFactor*4}px)`,
          width: `calc(100% - ${scaleFactor*4}px)`,
          top: `-${scaleFactor*4}px`,
          left: `-${scaleFactor*4}px`,
          zIndex: 1,
        }}
      />
      <span
        style={{
          fontFamily: "Joystix",
          fontWeight: 700,
          fontSize: `${scaleFactor*2}rem`,
          backgroundColor: "white",
          border: "2px black solid",
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: `${scaleFactor*0.5}rem`,
          height: "100%",
          width: "100%",
          ...style,
        }}
      >
        NF
      </span>
      <span
        style={{
          backgroundColor: "black",
          display: "inline-flex",
          position: "absolute",
          height: `calc(100% - ${scaleFactor*4}px)`,
          width: `calc(100% - ${scaleFactor*4}px)`,
          bottom: `-${scaleFactor*4}px`,
          right: `-${scaleFactor*4}px`,
          zIndex: 1,
        }}
      />
    </span>
  );
};

export default NFLogo;
