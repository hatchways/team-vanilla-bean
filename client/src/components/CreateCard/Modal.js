import React, { useContext, useEffect } from "react";
import { Dialog, DialogContent, Grid } from "@material-ui/core";
import Header from "./Header";
import Description from "./Description";
import Deadline from "./Deadline";
import Comment from "./Comment";
import ButtonList from "./ButtonList";
import { CardContext } from "./cardContext";
import { authFetch } from "../../AuthService";
import { useParams, useHistory } from "react-router-dom";
import { handleError } from "../../utils/handleAlerts";
import DeleteModal from "./DeleteModal";

const CardModal = () => {
  const card = useContext(CardContext);
  const { openCard, handleCloseCard, deadline, fetchCard } = card;
  const { dashboardId, columnId, taskId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if ((dashboardId, columnId, taskId)) {
      const fetchUrlCard = async () => {
        try {
          const res = await authFetch(`/dashboards/${dashboardId}`, {
            method: "POST"
          });

          const column = res.result.columns[columnId]._id;
          const task = res.result.columns[columnId].tasks[taskId]._id;
          const dashboard = res.result._id;

          if (column !== columnId || task !== taskId || dashboard !== dashboardId) {
            history.push(`/dashboards/${dashboardId}`);
            handleError("cannot access");
          } else {
            fetchCard(taskId, columnId, res.result);
          }
        } catch (e) {
          history.push(`/dashboards/${dashboardId}`);
          handleError("cannot access");
        }
      };
      fetchUrlCard();
    }
  }, []);

  const handleClose = () => {
    history.push(`/dashboards/${dashboardId}`);
    handleCloseCard();
  };

  return (
    <Dialog
      open={openCard}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      PaperProps={{
        style: { paddingBottom: "3%", height: deadline && "600px" }
      }}>
      <DialogContent>
        <Grid container spacing={4}>
          <Header dashboardId={dashboardId} />
          <Grid item xs={10} container spacing={4}>
            <Description dashboardId={dashboardId} />
            <DeleteModal dashboardId={dashboardId} />
            <Deadline dashboardId={dashboardId} />
            <Comment dashboardId={dashboardId} />
          </Grid>
          <ButtonList dashboardId={dashboardId} />
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
