import React, { useState, useContext } from 'react';

import uiContext from '../uiContext';

// QUERY GET_NOTE. Fetch the note based on the query params id, fill in the snapshot state.

const EditNote = () => {
  const uiCtx = useContext(uiContext);
  console.log(uiCtx.noteSaved);
  return (
    <>
      <h4>Note created is</h4>
    </>
  );
};

export default EditNote;
