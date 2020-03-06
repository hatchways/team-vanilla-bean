import React, { useContext } from "react";
import { Grid, Typography, Link } from "@material-ui/core";
import AttachmentIcon from "@material-ui/icons/Attachment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import parseISO from "date-fns/parseISO";
import { CardContext } from "./cardContext";

const Attachment = () => {
  const card = useContext(CardContext);
  const { attachment, handleAttachmentChange, openAttachment } = card;

  return (
    openAttachment && (
      <Grid item container>
        <Grid item xs={1}>
          <AttachmentIcon color="primary" />
        </Grid>

        <Grid item xs={11}>
          <Typography gutterBottom variant="h3">
            Attachment:
          </Typography>
          <input type="file" name="file" onChange={handleAttachmentChange} />
        </Grid>
      </Grid>
    )
  );
};

export default Attachment;
