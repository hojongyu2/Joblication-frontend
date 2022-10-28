import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import LaunchIcon from "@mui/icons-material/Launch";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box, Button, Card, Container, IconButton, Typography,
} from "@mui/material";
import cloneDeep from "lodash.clonedeep";
import { useNavigate } from "react-router-dom";
import { MyCompanyListContext } from "../../context/MyCompanyListContext";
import { SearchContext } from "../../context/SearchContext";
import Layout from "../layout/Layout";
import NoteModal from "../modal/NoteModal";
import Axios from "../../utilities/Axios";
import { NoteContext } from "../../context/NoteContext";

function Test() {
  const {
    myCompanyList, setIsMyCompanyDataLoading,
    setCompanyId,
  } = useContext(MyCompanyListContext);

  const { pagenatedData } = useContext(SearchContext);

  const { setIsMyNoteDataLoading } = useContext(NoteContext);

  const navigate = useNavigate();

  const myCompanyListClone = cloneDeep(myCompanyList);

  const columnsFromBackend = {
    column1: {
      name: "Watch list",
      items: myCompanyListClone,
    },
    column2: {
      name: "Applied",
      items: [],
    },
    column3: {
      name: "Interview",
      items: [],
    },
    column4: {
      name: "Accepted",
      items: [],
    },
  };

  const columnClone = cloneDeep(columnsFromBackend);
  console.log(columnClone);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  // this will allow you to make a deep copy when there is a nested array/obj;
  const [columns, setColumns] = useState(columnClone);

  // persist data when there is a change on data
  useEffect(() => {
    setColumns(columnClone);
  }, [myCompanyList]);

  const deleteCompany = async (element) => {
    const response = await Axios.post("/delete-company", {
      savedCompanyId: element,
    });

    if (response.data === true) {
      setIsMyCompanyDataLoading(true);
      setTimeout(() => {
        setIsMyCompanyDataLoading(false);
      }, 100);
    } else {
      setIsMyCompanyDataLoading(true);
      setTimeout(() => {
        setIsMyCompanyDataLoading(false);
      }, 100);
    }
  };

  return (
    <Layout>
      {pagenatedData && (
        navigate("/")
        // go to main page if search funcionality has been actvated
      )}
      <Container style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <Box style={{ margin: 10, maxWidth: "275px" }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "#eeeeee",
                        padding: 4,
                        height: "100vh",
                        minWidth: 275,
                        overflow: "scroll",
                      }}
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item._id}
                          draggableId={item._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                padding: 10,
                                margin: 10,
                                minHeight: "50px",
                                backgroundColor: snapshot.isDragging
                                  ? "#263B4A"
                                  : "white",
                                color: "white",
                                ...provided.draggableProps.style,
                              }}
                            >
                              <Typography sx={{ color: "black", fontSize: "20px", display: "inline-flex" }}>
                                <CircleIcon sx={{ width: "8px", marginRight: "5px" }} />
                                {item.jobTitle}
                              </Typography>
                              <Typography sx={{
                                color: "black", fontSize: "15px", display: "inline-flex", marginRight: "5px",
                              }}
                              >
                                <CircleIcon sx={{ width: "8px", marginRight: "5px" }} />
                                {item.company}
                              </Typography>
                              <Typography sx={{ color: "black", fontSize: "15px", display: "inline-flex" }}>
                                <CircleIcon sx={{ width: "8px", marginRight: "5px" }} />
                                {item.location}
                              </Typography>
                              <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <IconButton>
                                  <LaunchIcon color="primary" onClick={() => window.open(item.url)} />
                                </IconButton>
                                <Button onClick={() => {
                                  // when the note button is clicked, ;
                                  // then update the note state variable
                                  // after .01 sec to the latest note
                                  setIsMyNoteDataLoading(true);
                                  setCompanyId(item._id);
                                  setTimeout(() => {
                                    setIsMyNoteDataLoading(false);
                                  }, 10);
                                }}
                                >
                                  <NoteModal></NoteModal>
                                </Button>
                                <IconButton>
                                  <DeleteIcon color="primary" onClick={() => deleteCompany(item._id)}></DeleteIcon>
                                </IconButton>
                              </Box>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Box>
            </Box>
          ))}
        </DragDropContext>
      </Container>
    </Layout>
  );
}

export default Test;
