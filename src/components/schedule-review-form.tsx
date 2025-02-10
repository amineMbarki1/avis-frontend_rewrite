import {
  Button,
  DatePicker,
  Input,
  RadioGroup,
  TimeInput,
} from "@heroui/react";
import SelectBusiness from "./select-business-input";
import SelectMerchant from "./select-merchant-input";
import {
  getLocalTimeZone,
  now,
  parseDate,
  Time,
  today,
} from "@internationalized/date";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import RadioCard from "./radio-card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { scheduleReview } from "@/api/schedule-request-api";
import { toast } from "react-toastify";

const formSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in the format YYYY-MM-DD",
  }),
  time: z.string().regex(/^\d{2}:\d{2}$/, {
    message: "Time must be in the format HH:mm",
  }),
  business: z.string().min(1, { message: "Business is required" }),
  type: z.string(),
});

export type Inputs = z.infer<typeof formSchema>;

export default function ScheduleReviewForm() {
  const formProps = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: today(getLocalTimeZone()).toString(),
      time: [
        `${now(getLocalTimeZone()).hour}`.padStart(2, "0"),
        `${now(getLocalTimeZone()).minute}`.padStart(2, "0"),
      ].join(":"),
    },
  });

  const queryClient = useQueryClient();

  const scheduleMutation = useMutation({
    mutationFn: scheduleReview,
    onSuccess() {
      toast.success("Avec succèes");
      queryClient.invalidateQueries("review-requests");
    },
    onError() {
      toast.error("une erreur est survenue");
    },
  });

  const [selectedMerchant, setSelectedMerchant] = useState(null);

  return (
    <FormProvider {...formProps}>
      <form
        className="flex flex-col gap-5"
        onSubmit={formProps.handleSubmit((values) =>
          scheduleMutation.mutate(values)
        )}
      >
        <div className="flex gap-2">
          <Controller
            name="date"
            render={({ field }) => (
              <DatePicker
                {...field}
                onChange={(value) => {
                  field.onChange(value.toString());
                }}
                value={parseDate(field.value)}
              />
            )}
          />

          <Controller
            name="time"
            render={({ field }) => (
              <TimeInput
                onChange={(value) => {
                  field.onChange(
                    [
                      `${value.hour}`.padStart(2, "0"),
                      `${value.minute}`.padStart(2, "0"),
                    ].join(":")
                  );
                }}
                value={
                  new Time(
                    +field.value.split(":")[0],
                    +field.value.split(":")[1]
                  )
                }
              />
            )}
          />
        </div>
        <Input
          className="opacity-[0.5]"
          value="America/Toronto"
          disabled
          label="timezone"
        />
        <SelectMerchant onSelectionChange={setSelectedMerchant} />
        <SelectBusiness
          initialFilters={{
            merchant: selectedMerchant,
          }}
        />

        <Controller
          name="type"
          render={({ field }) => (
            <RadioGroup
              onChange={(e) => field.onChange(e.target.value)}
              label="Type"
            >
              <RadioCard value="businessSMS">SMS</RadioCard>
              <RadioCard value="businessEmail">Email</RadioCard>
            </RadioGroup>
          )}
        />

        <Button isLoading={scheduleMutation.isLoading} type="submit">
          Confirmer
        </Button>
      </form>
    </FormProvider>
  );
}
