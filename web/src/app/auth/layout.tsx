import { FC, ReactNode } from "react";

interface authLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<authLayoutProps> = ({ children }) => {
  return (
    <section className="w-full">
      <div className="h-screen flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
