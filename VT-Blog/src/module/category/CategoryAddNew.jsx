import React from "react";
import { Field, FieldCheckbox } from "../../component/field";
import { Radio } from "../../component/checkbox";
import { useForm } from "react-hook-form";
import { Label } from "../../component/label";
import { Input } from "../../component/input";
import { categoryStatus } from "../../utils/constants";
import { Button } from "../../component/button";
import slugify from "slugify";
import { collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { addDoc } from "firebase/firestore";

const CategoryAddNew = () => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onchange",
    defaultValues: {
      status: 1,
      slug: "",
      name: "",
      createAt: new Date(),
    },
  });
  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.slug = slugify(newValues.name || newValues.slug, { lower: true });
    newValues.status = Number(newValues.status);
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...newValues,
        createAt: serverTimestamp(),
      });
      toast.success("Create successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
        createAt: new Date(),
      });
    }
  };
  const watchStatus = watch("status");
  return (
    <div>
      <h1 className="dashboard-heading">Add New Category</h1>
      <form autoComplete="off" onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <label htmlFor="">Slug</label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex gap-x-7">
              <FieldCheckbox>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === categoryStatus.APPROVED}
                  value={categoryStatus.APPROVED}
                >
                  Approved
                </Radio>
              </FieldCheckbox>
              <FieldCheckbox>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                  value={categoryStatus.UNAPPROVED}
                >
                  Unapproved
                </Radio>
              </FieldCheckbox>
            </div>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[300px]"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
