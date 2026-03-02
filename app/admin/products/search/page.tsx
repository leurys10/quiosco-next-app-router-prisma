import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import prisma from "@/lib/prisma";

async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: {
    search: string;
  };
}) {
  const params = await searchParams;

  const products = await searchProducts(params.search);

  return (
    <>
      <Heading> Resultados de búsqueda: {params.search}</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
        <ProductSearchForm />
      </div>
      {products.length ? (
 <ProductsTable products={products} />
      ) : <p className="text-center text-lg">No hay resultados </p>}
     
    </>
  );
}
