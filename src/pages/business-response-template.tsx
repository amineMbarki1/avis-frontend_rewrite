import { DeleteIcon } from "@/components/merchants-table";
import { Button, Divider, Textarea } from "@heroui/react";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function BusinessResponseTemplates() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: { templates: ["hello"] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "templates",
  });

  return (
    <form onSubmit={handleSubmit((values) => console.log(values))}>
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          <Textarea
            key={field.id} // important to include key with field's id
            {...register(`templates.${index}`)}
          />
          <div className="my-2 gap-2 flex items-center">
            <Divider className="max-w-[90%]" />
            <Button onPress={() => remove(index)} size="md" variant="light">
              <DeleteIcon />
            </Button>
          </div>
        </React.Fragment>
      ))}
      <Button
        onPress={() => append("")}
        variant="bordered"
        className="mt-2 self-start"
      >
        Ajouter
      </Button>
      <br />
      <Button className="ml-auto self-end">Confirmer</Button>
    </form>
  );
}
