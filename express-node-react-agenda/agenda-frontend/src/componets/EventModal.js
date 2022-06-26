import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import DateTimePicker from "react-datetime-picker";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useAddEvent } from "./../hooks/event.hook";

const EventModal = (props) => {
  const queryClient = useQueryClient();
  const { isOpenAddModel, setIsOpenAddModel } = props;

  const { mutateAsync: onAddEvent } = useAddEvent();

  const [eventDate, setEventDate] = useState(new Date());

  const initialState = {
    title: "",
    description: "",
    status: "0",
  };
  const [state, setState] = useState(initialState);

  const toggle = () => {
    setIsOpenAddModel(!isOpenAddModel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.title || !state.description || !state.status) {
      toast.error("Please provide value for required fields");
    } else {
      const data = {
        title: state?.title,
        description: state?.description,
        status: state?.status,
        start: eventDate,
      };

      const response = await onAddEvent(data);
      if (response === "Event Added Successfully") {
        toast.success(response);
        queryClient.invalidateQueries("events-data");
        setState(initialState);
        setIsOpenAddModel(false);
      } else {
        toast.error("Some thing went wrongs!");
      }
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <Modal isOpen={isOpenAddModel} toggle={toggle} backdrop={false}>
      <form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>Add New Event</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label for="exampleEmail">
              Title <span className="error-message">*</span>
            </Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleEmail">
              Date <span className="error-message">*</span>
            </Label>
            <DateTimePicker
              closeWidgets={false}
              format={"y-MM-dd h:mm:ss a"}
              onChange={setEventDate}
              value={eventDate}
              disabled={false}
              name="start"
            />
          </FormGroup>

          <FormGroup>
            <Label for="description">
              Description <span className="error-message">*</span>
            </Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="status">
              Status <span className="error-message">*</span>
            </Label>
            <Input
              type="select"
              name="status"
              id="status"
              onChange={handleInputChange}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </Input>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" type="submit">
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default EventModal;
