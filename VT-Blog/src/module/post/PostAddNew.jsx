/* eslint-disable no-undef */
import useImage from "../../hooks/useFirebaseImage";
import Toggle from "../../component/toggle/Toggle";
import styled from "styled-components";
import slugify from "slugify";
import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { Radio } from "../../component/checkbox";
import { postStatus } from "../../utils/constants";
import { Label } from "../../component/label";
import { Input } from "../../component/input";
import { ImageUpload } from "../../component/image";
import { Field } from "../../component/field";
import { Dropdown } from "../../component/dropdown";
import { db } from "../../firebase/firebaseConfig";
import { Button } from "../../component/button";
import {
  collection,
  where,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const { userInfo } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onchange",
    defaultValues: {
      status: 2,
      title: "",
      slug: "",
      feature: false,
      categoryId: "",
      image: "",
    },
  });
  // customhook Image
  const {
    progress,
    image,
    handleDeleteImage,
    handleSelectImage,
    handleDeleteImageUI,
  } = useImage(setValue, getValues);

  // gan img-url cho defValue(useForm)
  useEffect(() => {
    if (image) {
      setValue("image", image); // Update image in form
    }
  }, [image, setValue]);

  // get db from filebase
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "in", [1, 2]));
      let result = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
        setCategories(result);
      });
    }
    getData();
  }, []);

  // ui selection dropdown
  const handleChooseOption = (item) => {
    setValue("categoryId", item.id);
    setSelectCategory(item);
  };

  // nếu được chọn thì value sẽ gán vào status => watchStatus = approved => checked
  const watchStatus = watch("status");
  const watchFeature = watch("feature");

  const addPostHandle = async (values) => {
    if (!image) {
      toast.error("Please upload an image before submitting");
      return;
    }
    setLoading(true);
    try {
      values.slug = slugify(values.slug || values.title, { lower: true });
      const cloneValues = { ...values };
      cloneValues.status = Number(values.status); // convert thanh number
      console.log(cloneValues);
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userId: userInfo.uid,
        createAt: serverTimestamp(),
      });
      toast.success("Add new post successfully");

      reset({
        status: 2,
        title: "",
        slug: "",
        feature: false,
        categoryId: "",
        image: "",
      });
      setSelectCategory({});
      // handleDeleteImage();
      handleDeleteImageUI();
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading();
    }
  };

  useEffect(() => {
    document.title = "VT Blog - Add new post";
  }, []);

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add New Post</h1>
      <form onSubmit={handleSubmit(addPostHandle)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-3">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED} // nếu checked => gán watchStatus === postStatus.APPROVED
                value={postStatus.APPROVED}
              >
                Appoved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={`${selectCategory.name || "Select category"}`}
              ></Dropdown.Select>
              <Dropdown.List>
                {categories.map((item) => (
                  <Dropdown.Option
                    key={item.id}
                    onClick={() => handleChooseOption(item)}
                  >
                    {item.name}
                  </Dropdown.Option>
                ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 text-sm font-medium bg-gray-200 rounded-lg text-primary bg-primary bg-opacity-20">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              on={watchFeature === true}
              onClick={() => {
                setValue("feature", !watchFeature);
              }}
            ></Toggle>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={loading}
          disabled={loading}
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
