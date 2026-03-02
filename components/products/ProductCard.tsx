import { Product } from "@/src/generated/prisma/client";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);

  return (
    <div className="border bg-white flex flex-col h-full">
      <div className="relative w-full h-72">
        <Image
          className="object-cover"
          fill
          priority
          src={imagePath}
          alt={`Imagen Platillo ${product.name}`}
          sizes="(max-width: 1023px) 100vw, (max-width: 1535px) 33vw, 25vw"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <div className="mt-auto pt-5">
          <AddProductButton product={product} />
        </div>
      </div>
    </div>
  );
}
