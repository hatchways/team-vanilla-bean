import React, { useContext } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";

import { CardContext } from "./cardContext";
import { useHistory } from "react-router-dom";

const DeleteModal = () => {
  const card = useContext(CardContext);
  const { openDelete, deadline, handleCloseDelete, handleDelete } = card;
  const history = useHistory();

  return (
    <Dialog
      open={openDelete}
      onClose={handleCloseDelete}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: { paddingBottom: "3%", height: deadline && "600px" }
      }}
    >
      <DialogTitle id="form-dialog-title">
        Are you sure you want to delete this task?
      </DialogTitle>

      <DialogActions>
        <Button color="primary" onClick={handleCloseDelete}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => handleDelete(history)}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
