import * as Yup from "yup";

// Function to filter the feed by category
export function filterByCategory(feed, category) {
  return feed.filter((item) => item.category === category);
}

// Function to sort the feed by date
export function sortByDate(feed, order) {
  return [...feed].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (order === "asc") {
      return dateA - dateB;
    } else if (order === "desc") {
      return dateB - dateA;
    }

    return 0;
  });
}

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .label("First Name"),
  lastName: Yup.string().required("Last name is required").label("Last Name"),
  joinDate: Yup.string().required("Join date is required").label("Join Date"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must match password.")
    .required("Confirm Password is required."),
});

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter a registered email")
    .label("Email")
    .email("Enter a valid email"),
});
