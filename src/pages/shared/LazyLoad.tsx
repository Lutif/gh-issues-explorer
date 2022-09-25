import { Loading } from "./Loading";
import React, { lazy, Suspense } from "react";

export const lazyLoad = (component: any, name: any) => {
  const fetchComponent = () =>
    component().then((res: any) => ({ default: res[name] }));
  const Lazy = lazy(fetchComponent);

  return (props: any) => (
    <Suspense fallback={<Loading />}>
      <Lazy {...props} />
    </Suspense>
  );
};
