import React from "react";

export default async function ProductPage({
  params,
}: PageProps<"/product/[...slug]">) {
  const { slug } = await params;

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0">{slug.join("/")}</main>
  );
}
