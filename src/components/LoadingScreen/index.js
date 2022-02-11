import { Spin } from "antd";

const LoadingScreen = () => {
  const styling = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  };
  return (
    <div style={styling}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingScreen;
