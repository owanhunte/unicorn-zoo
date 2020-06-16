declare module '@pwabuilder/pwaauth';

declare type PwaAuthProps = {
  signInButtonText?: string;
  googleKey?: string;
  appearance?: "button" | "list" | "none";
  signInCompleted: (ev: CustomEvent) => void;
};
