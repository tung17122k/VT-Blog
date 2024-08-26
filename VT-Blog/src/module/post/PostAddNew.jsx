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
import Toggle from "../../component/toggle/Toggle";
import slugify from "slugify";
import { postStatus } from "../../utils/constants";

const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit } = useForm({
    mode: "onchange",
    defaultValues: {
      status: "",
      category: "",
    },
  });
  // nếu được chọn thì value sẽ gán vào status => watchStatus = approved => checked
  const watchStatus = watch("status");
  console.log("🚀 ~ PostAddNew ~ watchStatus:", watchStatus);
  const watchCategory = watch("category");

  const addPostHandle = async (values) => {
    console.log(values);
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = Number(values.status); // convert thanh number
    // console.log(values.status);
    // console.log(typeof cloneValues.status);

    // console.log("addPostHandler ~ cloneValues", cloneValues.status);
  };
  // console.log(postStatus.APPROVED);
  // console.log(Number(watchStatus));

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
          <Field>
            <Toggle on={true}></Toggle>
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
