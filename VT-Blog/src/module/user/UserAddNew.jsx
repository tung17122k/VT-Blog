import React from "react";
import { useForm } from "react-hook-form";
import useImage from "../../hooks/useFirebaseImage";
import { useAuth } from "../../context/authContext";
import { Field } from "../../component/field";
import { Label } from "../../component/label";
import { Input } from "../../component/input";
import { Radio } from "../../component/checkbox";
import { Button } from "../../component/button";
import { ImageUpload } from "../../component/image";
import { userRole, userStatus } from "../../utils/constants";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import slugify from "slugify";
// import { createUserWithEmailAndPassword } from "firebase/auth";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.ACTIVE,
      role: userRole.ADMIN,
      createAt: new Date(),
    },
  });
  const {
    progress,
    image,
    handleDeleteImage,
    handleSelectImage,
    handleDeleteImageUI,
  } = useImage(setValue, getValues);
  const { userInfo } = useAuth();
  const watchStatus = watch("status");
  const watchRole = watch("role");

  const handleCreateUser = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await addDoc(collection(db, "users"), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: " ",
          trim: true,
        }),
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createAt: serverTimestamp(),
      });
      // console.log(values);
      toast.success(`Create new user ${values.username} successfully!`);
      reset({
        fullname: "",
        email: "",
        password: "",
        username: "",
        avatar: "",
        status: userStatus.ACTIVE,
        role: userRole.ADMIN,
        createAt: new Date(),
      });
      handleDeleteImageUI();
    } catch (error) {
      console.log(error);
      toast.error("Can't create new user");
    }
  };
  return (
    <div>
      <h1 className="dashboard-heading">Add New User</h1>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <Label>Avatar</Label>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-4">
          <ImageUpload
            className="object-cover h-full"
            onChange={handleSelectImage}
            progress={progress}
            image={image}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
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
            ></Input>
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              placeholder="Enter your Email"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              control={control}
              name="password"
              placeholder="Enter your Password"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-3">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Role</Label>
            <div className="flex items-center gap-x-3">
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
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
          Create User
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
