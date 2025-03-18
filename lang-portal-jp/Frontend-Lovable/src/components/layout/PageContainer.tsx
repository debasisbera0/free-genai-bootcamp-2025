
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs";

interface PageContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const PageContainer = ({ title, description, children }: PageContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Breadcrumbs />
      <div className="max-w-7xl w-full mx-auto px-6 py-6 mt-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-japanese-dark">{title}</h1>
          {description && (
            <p className="mt-2 text-japanese-grey-dark">{description}</p>
          )}
        </div>
        {children}
      </div>
    </motion.div>
  );
};

export default PageContainer;
