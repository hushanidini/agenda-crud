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
import { useUpdateEvent, useFetchEventDetails } from "./../hooks/event.hook";
import Select from "react-select";

const EditModal = (props) => {
  const queryClient = useQueryClient();
  const { selectedId, setSelectedId, setIsOpenEditModel, isOpenEditModel } =
    props;

  const options = [
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
  ];
  // get event details
  const { data: eventDetails } = useFetchEventDetails(selectedId);

  const { mutateAsync: onUpdateEvent } = useUpdateEvent();

  const [eventDate, setEventDate] = useState(new Date());

  const initialState = {
    title: eventDetails?.title,
    description: eventDetails?.description,
  };

  /** Deep search of the options */
  const deepSearch = (options, value, tempObj = {}) => {
    if (options && value != null) {
      options.find((node) => {
        if (node.value === value) {
          tempObj.found = node;
          return node;
        }
        return deepSearch(node.options, value, tempObj);
      });
      if (tempObj.found) {
        return tempObj.found;
      }
    }
    return undefined;
  };
  /** check event status is not null then get the default option value */
  let initialValue = "";
  if (eventDetails?.status) {
    initialValue = deepSearch(options, eventDetails?.status);
  }

  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [state, setState] = useState(initialState);
  const closeModal = () => {
    setSelectedId();
    setIsOpenEditModel(false);
    setState(initialState);
    setSelectedOption(initialValue);
  };

  const handleSubmit = async (id) => {
    try {
      if (!state.title || !state.description || !selectedOption.value) {
        toast.error("Please provide value for required fields");
      } else {
        const data = {
          title: state?.title,
          description: state?.description,
          status: selectedOption.value,
          start: eventDate,
        };

        const response = await onUpdateEvent({ id, data });
        if (response === "Event Updated Successfully") {
          toast.success(response);
          queryClient.invalidateQueries("events-data");
          setState(initialState);
          setIsOpenEditModel(false);
        } else {
          toast.error("Some thing went wrongs!");
        }
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <Modal isOpen={isOpenEditModel} toggle={closeModal} backdrop={false}>
      <form>
        <ModalHeader toggle={closeModal}>Edit Event </ModalHeader>

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
              value={state?.title}
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
              value={state.description}
            />
          </FormGroup>

          <FormGroup>
            <Label for="status">
              Status <span className="error-message">*</span>
            </Label>
            <Select
              name="status"
              defaultValue={selectedOption}
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            {/* <Input
              type="select"
              name="status"
              id="status"
              onChange={handleInputChange}
              value={state.status}
            >
              <option value={1} selected={state.status === '1'}>Active</option>
              <option value={0} selected={state.status === '0'}>Inactive</option>
            </Input> */}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handleSubmit(selectedId)}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default EditModal;
