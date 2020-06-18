import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import EntryPoint from "@/components/EntryPoint";
import "../public/css/base.css";
import "../public/css/tailwind.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp(props: AppProps) {
  return (
    <RecoilRoot>
      <EntryPoint {...props} />
    </RecoilRoot>
  );
}
