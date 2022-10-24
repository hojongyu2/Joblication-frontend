import { useContext, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Box, Button, Card, IconButton, Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import NoteModal from "./components/modal/NoteModal";
import { MyCompanyListContext } from "./context/MyCompanyListContext";
// fake data generator
const getItems = (count, offset = 0) => Array.from({ length: count }, (v, k) => k).map((k) => ({
  id: `item-${k + offset}-${new Date().getTime()}`,
  content: `item ${k + offset}`,
}));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 275,
});

function QuoteApp() {
  const { dragMyCompanyList, setDragMyCompanyList } = useContext(MyCompanyListContext);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(dragMyCompanyList[sInd], source.index, destination.index);
      const newState = [...dragMyCompanyList];
      newState[sInd] = items;
      setDragMyCompanyList(newState);
    } else {
      const results = move(dragMyCompanyList[sInd], dragMyCompanyList[dInd], source, destination);
      const newState = [...dragMyCompanyList];
      newState[sInd] = results[sInd];
      newState[dInd] = results[dInd];
      setDragMyCompanyList(newState.filter((group) => group.length));
    }
  }

  return (
    <div>
      <Box style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {dragMyCompanyList.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
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
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                          )}
                          sx={{
                            color: "white", padding: "10px", margin: "10px", borderRadius: "10px",
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
                          <Typography
                            sx={{
                              color: "black", fontSize: "15px", display: "inline-flex", marginRight: "5px",
                            }}
                          >
                            <CircleIcon sx={{ width: "8px", marginRight: "5px" }}></CircleIcon>
                            {item.location}
                          </Typography>
                          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <IconButton onClick={() => window.open(item.url)}>
                              <LaunchIcon color="primary"></LaunchIcon>
                            </IconButton>
                            <Button>
                              <NoteModal></NoteModal>
                            </Button>
                            <IconButton>
                              <DeleteIcon>
                              </DeleteIcon>
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
          ))}
        </DragDropContext>
      </Box>
    </div>
  );
}

export default QuoteApp;
