import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFetchEventDetails } from "../hooks/event.hook";
import moment from "moment";

function EventDetailsModal(props) {
  const { setIsOpenModel, selectedId, setSelectedId, isOpenModel } = props;

  const { data: eventDetails, isFetching: isFetchingEvent } = useFetchEventDetails(selectedId);

  const closeDetailsModal = () => {
    setSelectedId();
    setIsOpenModel(false);
  };

  return (
    <Modal isOpen={isOpenModel} toggle={closeDetailsModal} backdrop={false}>
      <ModalHeader toggle={closeDetailsModal}>
        {!isFetchingEvent && eventDetails?.title}
      </ModalHeader>
      <ModalBody>
        <div>Description: {!isFetchingEvent && eventDetails?.description}</div>
        <div>
          DateTime:{" "}
          {!isFetchingEvent &&
            moment(eventDetails?.start).format("DD MMM YYYY hh:mm:ss")}
        </div>
        <div>
          Status:{" "}
          {!isFetchingEvent && eventDetails?.status === 1 ? "Active" : "Inactive"}
        </div>
      </ModalBody>
      <ModalFooter>
        {/* <Button color="primary" >
          Download PDF
        </Button> */}
        <Button color="secondary" onClick={closeDetailsModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EventDetailsModal;
