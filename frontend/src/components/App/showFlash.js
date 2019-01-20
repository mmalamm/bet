import React from "react";

import { createFlash } from "../Flash/Flash";

const flashes = {
  AUTH_FAILURE_FLASH: "Incorrect username or password",
  INVALID_USERNAME_FLASH: "Username can only contain letters and/or numbers",
  USERNAME_TAKEN_FLASH: "That username is taken already",
  GENERIC_ERROR_FLASH: "Something unexpected happened"
};

const showFlash = flashProp => {
  const flashContent =
    typeof flashProp === "string" ? flashes[flashProp] : flashProp;
  const Flash = createFlash(flashContent);
  return <Flash />;
};

export default showFlash;
