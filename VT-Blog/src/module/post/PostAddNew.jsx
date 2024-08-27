/* eslint-disable no-undef */
import React from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { Field } from "../../component/field";
import { Label } from "../../component/label";
import { Input } from "../../component/input";
import { useForm } from "react-hook-form";
import { Button } from "../../component/button";
import { Radio } from "../../component/checkbox";
import { Dropdown } from "../../component/dropdown";
import { ImageUpload } from "../../component/image";
import Toggle from "../../component/toggle/Toggle";
import slugify from "slugify";
import { useState } from "react";
import { postStatus } from "../../utils/constants";

const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    mode: "onchange",
    defaultValues: {
      status: 2,
      category: "",
      title: "",
      slug: "",
    },
  });
  // nếu được chọn thì value sẽ gán vào status => watchStatus = approved => checked
  const watchStatus = watch("status");
  const watchCategory = watch("category");

  const addPostHandle = async (values) => {
    values.slug = slugify(values.slug || values.title);
    const cloneValues = { ...values };
    cloneValues.status = Number(values.status); // convert thanh number
    console.log(cloneValues);
  };

  const onSelectImage = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };
  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + getValues("image_name"));
    deleteObject(imageRef)
      .then(() => {
        console.log("Remove success!");
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log("Remove fail");
      });
  };

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const metadata = {
      contentType: file.type === "image/png" ? "image/png" : "image/jpeg",
    };
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPer =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPer);
        console.log("Upload is " + progressPer + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

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
            <Label>Author</Label>
            <Input
              control={control}
              placeholder="Enter your author"
              name="author"
            ></Input>
            {/* <Input control={control} placeholder="Find the author"></Input> */}
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Search></Dropdown.Search>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
          <Field></Field>
        </div>
        <div className="mb-5">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={onSelectImage}
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
