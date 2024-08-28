/* eslint-disable no-undef */
import React from "react";
import styled from "styled-components";
import { Field } from "../../component/field";
import { Label } from "../../component/label";
import { Input } from "../../component/input";
import { useForm } from "react-hook-form";
import { Button } from "../../component/button";
import { Radio } from "../../component/checkbox";
import { Dropdown } from "../../component/dropdown";
import { ImageUpload } from "../../component/image";
import slugify from "slugify";
import { postStatus } from "../../utils/constants";
import useImage from "../../hooks/useFirebaseImage";

const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    mode: "onchange",
    defaultValues: {
      status: 2,
      category: "",
      title: "",
      slug: "",
    },
  });
  const { progress, image, handleDeleteImage, handleSelectImage } = useImage(
    setValue,
    getValues
  );
  // nếu được chọn thì value sẽ gán vào status => watchStatus = approved => checked
  const watchStatus = watch("status");
  const watchCategory = watch("category");

  const addPostHandle = async (values) => {
    values.slug = slugify(values.slug || values.title);
    const cloneValues = { ...values };
    cloneValues.status = Number(values.status); // convert thanh number
    console.log(cloneValues);
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
              onChange={handleSelectImage}
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
