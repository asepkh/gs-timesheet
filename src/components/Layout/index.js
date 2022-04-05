import { Suspense, lazy } from "react";
import { Layout as AntdLayout } from "antd";

import LoadingScreen from "@/components/LoadingScreen";

const { Content } = AntdLayout;

const Layout = (props) => {
  const Component = lazy(() => import(`@/pages/${props?.component}`));

  return (
    <Content className="site-content">
      <Suspense
        fallback={
          <div style={{ height: 400 }}>
            <LoadingScreen />
          </div>
        }
      >
        <Component />
      </Suspense>
    </Content>
  );
};

export default Layout;
