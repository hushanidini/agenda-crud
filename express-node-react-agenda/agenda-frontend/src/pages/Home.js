import { useState } from "react";
import { useQueryClient } from "react-query";
import { Container, Row, Col, Table, Button, Alert } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { toast } from "react-toastify";
import moment from "moment";
import { useEventsData, useDeleteEvent } from "./../hooks/event.hook";
import EventDetailsModal from "./../componets/EventDetailsModal";
import EventModal from "../componets/EventModal";
import EditModal from "../componets/EditModal";


function Home() {
  const queryClient = useQueryClient();
  const [isOpenAddModel, setIsOpenAddModel] = useState(false);
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  /** remove event */
  const { mutateAsync: onDeleteEvent } = useDeleteEvent();
  const removeEvent = async (id) => {
    confirmAlert({
      title: "Confirm to delete!",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await onDeleteEvent({ id });

              if (response === "Event Deleted Successfully") {
                toast.success("Event Deleted Sucessfully!");
                queryClient.invalidateQueries("events-data");
              } else {
                toast.error("Something happen, pls check again.");
              }
            } catch (err) {
              toast.error(err?.message);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };

  /** when use custom query hook , Can fetch events data*/
  const { isLoading, data, isError, error, isFetching } = useEventsData(
    onSuccess,
    onError
  );

  if (isLoading || isFetching) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <Alert color="danger">{error.message}!</Alert>;
  }

  /**
   * view event details
   */
  const openDetailsModal = (eventId) => {
    setSelectedId(eventId);
    setIsOpenModel(true);
  };

  const openEditEventModal = (eventId) => {
    setSelectedId(eventId);
    setIsOpenEditModel(true);
  };



  return (
    <Container>
      <Row>
        <Col>
          <h2>Agenda List </h2>
        </Col>
      </Row>

      <Row>
        <Col xs="3">
          <Button
            color="primary"
            size="sm"
            onClick={() => setIsOpenAddModel(!isOpenAddModel)}
          >
            Add New
          </Button>{" "}
        </Col>
        <Col xs="auto">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn btn-secondary btn-sm"
            table="table-to-xls"
            filename="Events"
            sheet="tablexls"
            buttonText="Download as XLS"
          />
        </Col>
      </Row>

      <Row>
        <Table id="table-to-xls">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>DateTime</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((event, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{event?.title}</td>
                <td>{event?.description}</td>
                <td>{event?.status === '1' ? "Active" : "Inactive"}</td>
                <td>{moment(event?.start).format("DD MMM YYYY hh:mm:ss")}</td>
                <td>
                  <Row>
                    <Col xs="3">
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={() => openEditEventModal(event?.id)}
                      >
                        Edit
                      </Button>
                    </Col>
                    <Col xs="3">
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => openDetailsModal(event?.id)}
                      >
                        View
                      </Button>
                    </Col>
                    <Col xs="auto">
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => removeEvent(event?.id)}
                      >
                        Delete
                      </Button>{" "}
                    </Col>
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>

      {/* event detials modal */}
      <EventDetailsModal
        isOpenModel={isOpenModel}
        selectedId={selectedId}
        setIsOpenModel={setIsOpenModel}
        setSelectedId={setSelectedId}
      />
      {/* add modal */}
      <EventModal
        setIsOpenAddModel={setIsOpenAddModel}
        isOpenAddModel={isOpenAddModel}
      />
      {/* edit modal */}
      <EditModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        setIsOpenEditModel={setIsOpenEditModel}
        isOpenEditModel={isOpenEditModel}
      />
    </Container>
  );
}

export default Home;
