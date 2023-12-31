import { useEffect } from "react";

import { VmComponent } from "@/components/vm/VmComponent";
import { useCurrentComponentStore } from "@/stores/current-component";
import { MetaTags } from "./MetaTags";

type Props = {
  componentProps?: Record<string, unknown>;
  src: string;
  meta?: {
    title: string;
    description: string;
  };
};

export function ComponentWrapperPage(props: Props) {
  return (
    <>
      {props.meta && <MetaTags {...props.meta} />}

      <VmComponent src={props.src} props={props.componentProps} />
    </>
  );
}
