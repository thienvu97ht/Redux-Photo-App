// @ts-nocheck
import { PHOTO_CATEGORY_OPTIONS } from "constants/global";
import InputField from "custom-fields/InputField";
import RandomPhotoField from "custom-fields/RandomPhotoField";
import SelectField from "custom-fields/SelectField/index";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Button, FormGroup, Spinner } from "reactstrap";
import * as Yup from "yup";

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
};

function PhotoForm(props) {
  const initiaValues = {
    title: "",
    categoryId: null,
    photo: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("This field is required."),

    categoryId: Yup.number().required("This field is required.").nullable(),

    photo: Yup.string().required("This field is required."),
  });

  // npm i --save react-select
  return (
    <Formik
      initialValues={initiaValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}>
      {(formikProps) => {
        // do something here
        const { isSubmitting } = formikProps;

        return (
          <Form>
            <FastField
              name="title"
              component={InputField}
              label="Title"
              placeholder="Eg: Wow nature ..."
            />

            <FastField
              name="categoryId"
              component={SelectField}
              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField
              name="photo"
              component={RandomPhotoField}
              label="Photo"
            />

            <FormGroup>
              <Button type="submit">
                {isSubmitting && <Spinner size="sm" />}
                Add to album
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
