import React, { useState, useEffect } from "react";
import WebApp from "./WebApp";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactElement | Array<React.ReactElement>;
};

const Layout: React.FunctionComponent<Props> = (props) => {
  const [showAppComponent, setShowAppComponent] = useState(false);

  useEffect(() => {
    (async () => {
      setShowAppComponent(true);
    })();
  }, []);

  return (
    <React.Fragment>
      {showAppComponent ? (
        <WebApp {...props} />
      ) : (
        <div className="flex items-center justify-center w-full min-h-screen">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Layout;
