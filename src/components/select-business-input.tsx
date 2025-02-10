import { getBusinesses } from "@/api/business-api";
import { Avatar, Select, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { Controller } from "react-hook-form";

export default function SelectBusiness({
  initialFilters,
}: {
  initialFilters?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.8 });

  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    ["businesses", { limit: 10, filters: initialFilters }],
    {
      getNextPageParam(lastPage, pages) {
        const { total, totalPages, page } = lastPage.data;
        if (pages.length >= totalPages) return;
        return page + 1;
      },

      queryFn: getBusinesses,
      enabled: isOpen,
      onError(err) {
        console.error(err);
      },
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const businesses = data?.pages?.flatMap((page) => page.data.businesses);

  return (
    <Controller
      name="business"
      render={({ field }) => (
        <Select
          multiple={false}
          isLoading={isFetching}
          label="Sélectionner un commerce"
          onOpenChange={setIsOpen}
          items={businesses || []}
          renderValue={([selected]) => {
            return selected.data.name;
          }}
          onSelectionChange={(selected) =>
            field.onChange(Array.from(selected)[0])
          }
        >
          {(business) => (
            <SelectItem
              value={business}
              textValue={business.name}
              key={business._id}
            >
              {business.name}
            </SelectItem>
          )}
        </Select>
      )}
    />
  );
}
