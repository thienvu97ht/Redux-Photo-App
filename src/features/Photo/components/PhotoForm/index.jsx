// @ts-nocheck
import { PHOTO_CATEGORY_OPTIONS } from "constants/global";
import InputField from "custom-fields/InputField";
import RandomPhotoField from "custom-fields/RandomPhotoField";
import SelectField from "custom-fields/SelectField/index";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";

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
  };

  // npm i --save react-select
  return (
    <Formik
      initialValues={initiaValues}
      onSubmit={(values) => console.log("submit: ", values)}>
      {(formikProps) => {
        // do something here
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });

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
          </Form>
        );
      }}
    </Formik>
  );
}

export default PhotoForm;
