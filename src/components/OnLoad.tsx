import { useEffect } from "react";

type OnLoadProps = {
  children: React.ReactNode;
  onLoad: Function;
};

const OnLoad = ({ children, onLoad }: OnLoadProps): JSX.Element => {
  useEffect(() => onLoad(), [onLoad]);
  return <>{children}</>;
};

export default OnLoad;
