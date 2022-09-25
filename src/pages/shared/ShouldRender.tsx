import { ReactElement } from "react";
interface ShouldRenderProps {
  if: Boolean;
  children: ReactElement<unknown> | null;
}

export const ShouldRender: React.FC<ShouldRenderProps> = (props) => {
  return props.if ? props.children : null;
};
