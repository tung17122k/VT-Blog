import React from "react";
import { Field } from "../../component/field";
import { Label } from "../../component/label";
import { Input } from "../../component/input";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../component/button";
import { ImageUpload } from "../../component/image";
import useImage from "../../hooks/useFirebaseImage";
import { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

const UserUpdate = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onchange",
    defaultValues: {},
  });
  const [params] = useSearchParams();
  const userId = params.get("id");
  const {
    progress,
    image,
    handleDeleteImage,
    handleSelectImage,
    handleDeleteImageUI,
  } = useImage(setValue, getValues);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const colRef = doc(db, "users", userId);
      const docData = await getDoc(colRef);
      // console.log(docData.data());
      reset(docData && docData.data());
    }
    fetchData();
  }, [userId, reset]);
  if (!userId) return null;
  const imageName = getValues("avatar");

  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    try {
      // console.log(values);
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, { ...values });
      toast.success("Update user successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
    }
  };
  // const watchStatus = watch("status");
  // const watchRole = watch("role");

  return (
    <div>
      <h1 className="dashboard-heading">Update User</h1>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your Fullname"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your Username"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="dateOfBirth"
              placeholder="dd//mm//yyyy"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Phone number</Label>
            <Input
              control={control}
              name="phonenumber"
              placeholder="Enter your Phone number"
              required
            ></Input>
          </Field>
          <Field>
            <Label>New Password</Label>
            <Input
              control={control}
              name="password"
              placeholder="Enter your New Password"
              type="password"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmpassword"
              placeholder="Confirm Password"
              type="password"
              required
            ></Input>
          </Field>
        </div>
        <Field>
          <Label className="mb-4">Image</Label>
          <div className="mx-auto">
            <ImageUpload
              onChange={handleSelectImage}
              progress={progress}
              image={imageName}
              handleDeleteImage={handleDeleteImage}
              className="w-[400px] h-[400px] object-cover"
            ></ImageUpload>
          </div>
        </Field>
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

export default UserUpdate;
