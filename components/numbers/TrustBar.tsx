import { TRUST_ITEMS } from "./constants";
import { TrustItem } from "./TrustItem";

export function TrustBar() {
  return (
    <div className="grid w-full grid-cols-1 gap-10 min-[810px]:grid-cols-4 min-[810px]:gap-4 min-[1200px]:grid-cols-2 min-[1200px]:gap-10">
      {TRUST_ITEMS.map((item) => (
        <TrustItem key={item.id} item={item} />
      ))}
    </div>
  );
}
