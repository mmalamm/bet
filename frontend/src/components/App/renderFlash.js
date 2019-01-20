import React from "react";

import { createFlash, createLoggedInFlash } from "../Flash/Flash";

import {
  AUTH_FAILURE_FLASH,
  INVALID_USERNAME_FLASH,
  USERNAME_TAKEN_FLASH,
  GENERIC_ERROR_FLASH,
  LOGGED_IN_FLASH,
  SHORT_PASSWORD_FLASH
} from "../../constants";

const flashes = {
  [AUTH_FAILURE_FLASH]: "Incorrect username or password",
  [INVALID_USERNAME_FLASH]: "Username can only contain letters and/or numbers",
  [USERNAME_TAKEN_FLASH]: "That username is taken already",
  [GENERIC_ERROR_FLASH]: "Something unexpected happened",
  [SHORT_PASSWORD_FLASH]: "Password must be at least 3 characters long"
};

const renderFlash = flashProp => {
  if (flashProp === LOGGED_IN_FLASH) {
    const LoggedInFlash = createLoggedInFlash();
    return <LoggedInFlash loggedIn={true} />;
  }
  const flashContent =
    typeof flashProp === "string" ? flashes[flashProp] : flashProp;
  const Flash = createFlash(flashContent);
  return <Flash />;
};

export default renderFlash;
