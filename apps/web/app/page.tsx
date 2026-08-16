import React from "react";
import FilterBar from "@/features/filters";
import { ProductList } from "@/features/products/components/ProductList";

const HomePage: React.FC = () => {
  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-px border-t-black/10 mb-5 sm:mb-6" />

        <div className="flex md:space-x-5 items-start">
          <FilterBar />

          <div className="w-full">
            <ProductList />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
