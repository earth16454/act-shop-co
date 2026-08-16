import React from "react";
import FilterBar from "../features/filters";

const HomePage: React.FC = () => {
  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-px border-t-black/10 mb-5 sm:mb-6" />

        <div className="flex md:space-x-5 items-start">
          <FilterBar />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
