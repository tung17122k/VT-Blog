import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Field, FieldCheckbox } from "../../component/field";
import { Label } from "../../component/label";
import { Input } from "../../component/input";
import { Button } from "../../component/button";
import { Radio } from "../../component/checkbox";
import { useForm } from "react-hook-form";
import { categoryStatus } from "../../utils/constants";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import slugify from "slugify";
import { toast } from "react-toastify";

const CategoryUpdate = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onchange",
    defaultValues: {},
  });
  const watchStatus = watch("status");

  // get param
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);
  const handleUpdateCategory = async (values) => {
    console.log(values);
    if (!isValid) return;
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    toast.success("Update category successfully");
    navigate("/manage/category");
  };

  if (!categoryId) return null;
  return (
    <div>
      <h1 className="dashboard-heading">Edit Category</h1>
      <form autoComplete="off" onSubmit={handleSubmit(handleUpdateCategory)}>
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
          className="mx-auto w-[200px]"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
