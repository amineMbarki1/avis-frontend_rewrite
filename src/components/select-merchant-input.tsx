import { getMerchants } from "@/api/merchant-api";
import { Avatar, Select, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { Controller } from "react-hook-form";

export default function SelectMerchant({
  onSelectionChange,
}: {
  onSelectionChange?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.8 });

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    ["merchants", { limit: 10 }],
    {
      getNextPageParam(lastPage, pages) {
        const { total, totalPages, page } = lastPage.data;
        if (pages.length >= totalPages) return;
        return page + 1;
      },

      queryFn: getMerchants,
      enabled: isOpen,
      onError(err) {
        console.error(err);
      },
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const merchants = data?.pages?.flatMap((page) => page.data.merchants);

  return (
    <Controller
      name="merchant"
      render={({ field }) => (
        <Select
          multiple={false}
          isLoading={isFetching}
          label="Sélectionner un commercant"
          onOpenChange={setIsOpen}
          items={merchants || []}
          renderValue={([selected]) => {
            return selected.data.firstName + " " + selected.data.lastName;
          }}
          onSelectionChange={(selected) => {
            field.onChange(Array.from(selected)[0]);
            if (onSelectionChange) onSelectionChange(Array.from(selected)[0]);
          }}
        >
          {(merchant) => (
            <SelectItem
              value={merchant}
              textValue={merchant.firstName}
              key={merchant._id}
            >
              <div className="gap-2 flex items-center">
                <Avatar size="sm" name={merchant.firstName} />
                {merchant.firstName} {merchant.lastName}
              </div>
            </SelectItem>
          )}
        </Select>
      )}
    />
  );
}
